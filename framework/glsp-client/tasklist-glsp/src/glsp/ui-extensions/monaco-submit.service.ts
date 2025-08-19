import { GLSPActionDispatcher, TYPES } from '@eclipse-glsp/client';
import { inject, injectable } from 'inversify';
import { MonacoLabelConfig } from '../../framework/common/types/types.js';
import { MonacoSubmitService } from '../../framework/glsp/editor/monaco-submit.service.js';
import { ApplyLangiumEditOperation } from '../communication/communication.action.js';

@injectable()
export class HealthcareMonacoSubmitService extends MonacoSubmitService {
    @inject(TYPES.IActionDispatcher)
    protected actionDispatcher: GLSPActionDispatcher;

    public override handleSubmit(label: MonacoLabelConfig, text: string, ast: any): void {
        for (const key in ast) {
            if (!key.startsWith('$')) {
                const ruleObj = ast[key];
                const res: any = { elementId: label.containerId, rule: ruleObj['$type'], tokens: [], text };
                for (const k in ruleObj) {
                    if (!k.startsWith('$')) {
                        if (Array.isArray(ruleObj[k])) {
                            ruleObj[k].forEach(str => res.tokens.push({ property: k, text: str }));
                        } else if (ruleObj[k] != null) {
                            const token: any = { property: k };
                            if (typeof ruleObj[k] === 'string') {
                                token.text = ruleObj[k];
                            } else if ('refId' in ruleObj[k]) {
                                token.node = ruleObj[k].refId;
                            }
                            res.tokens.push(token);
                        }
                    }
                }
                this.actionDispatcher.dispatch(ApplyLangiumEditOperation.create(res));
                return;
            }
        }
        // A fail-safe in case the rule cannot be determined, e.g. unknown first keyword
        this.actionDispatcher.dispatch(ApplyLangiumEditOperation.create({ elementId: label.containerId, rule: '', tokens: [], text }));
    }
}
