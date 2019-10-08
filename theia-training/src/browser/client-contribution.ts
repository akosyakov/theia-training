import { injectable, inject } from "inversify";
import { BaseLanguageClientContribution, DocumentSelector, ILanguageClient } from '@theia/languages/lib/browser';
import { SemanticHighlightingService } from '@theia/editor/lib/browser/semantic-highlight/semantic-highlighting-service';
import { MessageConnection } from "vscode-jsonrpc";

@injectable()
export class ClientContribution extends BaseLanguageClientContribution {

    readonly id = 'languageServerExample';
    readonly name = 'Language Server Example';

    @inject(SemanticHighlightingService)
    protected readonly semanticHighlightingService: SemanticHighlightingService;

    // Register the server for plain text documents
    protected get documentSelector(): DocumentSelector | undefined {
        return [{ scheme: 'file', language: 'plaintext' }];
    }

    // Notify the server about file changes to '.clientrc files contained in the workspace
    protected get globPatterns(): string[] {
        return ['**/.clientrc'];
    }

    protected get configurationSection(): string[] {
        return [this.id];
    }

    createLanguageClient(connection: MessageConnection): ILanguageClient {
        const client: ILanguageClient & Readonly<{ languageId: string }> = Object.assign(super.createLanguageClient(connection), { languageId: this.id });
        client.registerFeature(SemanticHighlightingService.createNewFeature(this.semanticHighlightingService, client));
        return client;
    }

}