import { AstNode, LangiumDocument } from 'langium';
import { LangiumMessageTypes } from '../../common/constants/langium-message-types.js';
import { EditorUriRegex } from '../../common/constants/langium-uri-regex.js';
import { GlspLangiumSharedServices } from '../../common/types/types.js';

/** Sends an AST of a `LangiumDocument` to the GLSP client using an id once a document has been validated  */
export class DocumentAstHandler {
    constructor(protected services: GlspLangiumSharedServices) {}

    public onDocumentValidated(doc: LangiumDocument<AstNode>) {
        const uri = doc.uri.toString();
        // Only execute this for a Monaco editor
        if (uri.match(EditorUriRegex)) {
            const minimizedAst = this.extractMinimalAst(doc.parseResult.value);
            this.services.glsp.GlspConnection.connection.then(connection =>
                connection.sendNotification(`${LangiumMessageTypes.AST_LANGIUM}/${uri.split('/').at(-1)}`, { uri, ast: minimizedAst })
            );
        }
    }

    /** Since the complete AST contains technical Langium details and circular references, it is minimized before communication with the client */
    protected extractMinimalAst(value: any) {
        if ('$type' in value) {
            // handle grammar rule
            const minimizedAst: any = {};
            for (const key in value) {
                if (key === '$type') {
                    minimizedAst[key] = value[key];
                } else if (!key.startsWith('$')) {
                    if (typeof value[key] === 'string') {
                        minimizedAst[key] = value[key];
                    } else if (Array.isArray(value[key])) {
                        minimizedAst[key] = value[key].map(ele => {
                            if (typeof ele === 'string') {
                                return ele;
                            } else {
                                return this.extractMinimalAst(ele);
                            }
                        });
                    } else {
                        minimizedAst[key] = this.extractMinimalAst(value[key]);
                    }
                }
            }
            return minimizedAst;
        } else if ('$refText' in value && '$nodeDescription' in value && value['$nodeDescription'] != null) {
            // handle reference
            const desc = value['$nodeDescription'];
            return {
                name: desc.name,
                type: desc.type,
                refId: desc.path
            };
        }
    }
}
