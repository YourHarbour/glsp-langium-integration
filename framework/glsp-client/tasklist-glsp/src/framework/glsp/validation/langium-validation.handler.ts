import { Action, GLSPActionDispatcher, IActionHandler, ICommand, Marker, SetMarkersAction, TYPES } from '@eclipse-glsp/client';
import { inject, injectable } from 'inversify';
import { LangiumMessageTypes, ValidateGlspType, ValidateLangiumType } from '../../common/constants/langium-message-types.js';
import { ValidationUriRegex } from '../../common/constants/langium-uri-regex.js';
import { ValidationResult } from '../../common/types/types.js';
import { LANGIUM_COMPONENT_TYPES } from '../constants/langium-component-types.js';
import { MonacoContainerUIExtension } from '../editor/monaco-container.extension.js';
import { LangiumWorkerHandler } from '../worker/langium-worker.handler.js';
import { LangiumScopingInformationSuccessAction } from './validation.action.js';

/**
 * Handles `LangiumScopingInformationSuccessAction` to trigger a batch validation using the Langium Language Server.
 * If validation should also occur on other actions, override `handleCustomAction`.
 *
 * While multiple action handlers for the same action could exist, to prevent any unexpected behaviour, rebind
 * this component on extension like this:
 * `rebind(LANGIUM_COMPONENT_TYPES.LangiumValidationHandler).to(MyLangiumValidationHandler)`
 */
@injectable()
export class LangiumValidationHandler implements IActionHandler {
    @inject(TYPES.IActionDispatcher)
    protected actionDispatcher: GLSPActionDispatcher;
    @inject(LANGIUM_COMPONENT_TYPES.MonacoContainerUIExtension)
    protected monacoContainer: MonacoContainerUIExtension;

    constructor(@inject(LANGIUM_COMPONENT_TYPES.LangiumWorkerHandler) protected langiumWorkerHandler: LangiumWorkerHandler) {
        // Register the handling of the eventual Langium response
        this.langiumWorkerHandler.connection.then(connection =>
            connection.onNotification(ValidateLangiumType, validationResults => this.handleLangiumValidationResponse(validationResults))
        );
    }

    public handle(action: Action): ICommand | Action | void {
        if (LangiumScopingInformationSuccessAction.is(action)) {
            return this.handleLangiumScopingInformationSuccessAction(action);
        }

        return this.handleCustomAction(action);
    }

    /**
     * In virtually every case, it makes sense to revalidate the model elements if the relevant scoping information has been updated.
     *
     * @param action `LangiumScopingInformationSuccessAction`
     */
    protected handleLangiumScopingInformationSuccessAction(action: LangiumScopingInformationSuccessAction): ICommand | Action | void {
        if (action.elementsToValidate) {
            this.langiumWorkerHandler.connection.then(connection =>
                connection.sendNotification(ValidateGlspType, action.elementsToValidate)
            );
        }
    }

    /**
     * In the event that validation should be triggered on an action different than an update of the scoping information,
     * this needs to be implemented manually.
     *
     * @param action Any configured action
     */
    protected handleCustomAction(action: Action): ICommand | Action | void {}

    protected handleLangiumValidationResponse(validationResults: ValidationResult[]) {
        // Shows node-level error markers
        const markers = this.generateMarkers(validationResults);
        this.actionDispatcher.dispatch(SetMarkersAction.create(markers, { reason: LangiumMessageTypes.VALIDATE_LANGIUM }));
        // Ensures that we get updated error messages on the editor-level
        this.monacoContainer.revalidateEditors();
    }

    protected generateMarkers(diagnostics: ValidationResult[]): Marker[] {
        return diagnostics
            .map(validation => {
                if (!validation.diagnostics.length) {
                    return;
                }

                const match = validation.uri.match(ValidationUriRegex);
                if (match) {
                    // The parsing engine of GLSP has issues with < and >, as they denote XML-tags
                    const msg = validation.diagnostics
                        .map(dia => dia.message)
                        .toString()
                        .replaceAll('>', '"')
                        .replaceAll('<', '"');
                    return { label: msg, description: msg, elementId: match[1], kind: 'error' };
                }

                return;
            })
            .filter(marker => marker != null);
    }
}
