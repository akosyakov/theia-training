package lsp4j.server;

import java.util.concurrent.CompletableFuture;

import org.eclipse.lsp4j.DidOpenTextDocumentParams;
import org.eclipse.lsp4j.MessageActionItem;
import org.eclipse.lsp4j.MessageParams;
import org.eclipse.lsp4j.PublishDiagnosticsParams;
import org.eclipse.lsp4j.ShowMessageRequestParams;
import org.eclipse.lsp4j.TextDocumentItem;
import org.eclipse.lsp4j.services.LanguageClient;
import org.junit.Test;
import org.junit.Assert;

public class MyLanguageServerTest {

    @Test
    public void justAnExample() {
        final PublishDiagnosticsParams[] actual = new PublishDiagnosticsParams[1];
        MyLanguageServer server = new MyLanguageServer();
        server.connect(new LanguageClient() {

            @Override
            public void telemetryEvent(Object object) {

            }

            @Override
            public CompletableFuture<MessageActionItem> showMessageRequest(ShowMessageRequestParams requestParams) {
                return null;
            }

            @Override
            public void showMessage(MessageParams messageParams) {

            }

            @Override
            public void publishDiagnostics(PublishDiagnosticsParams diagnostics) {
                actual[0] = diagnostics;
            }

            @Override
            public void logMessage(MessageParams message) {

            }
        });
        TextDocumentItem item = new TextDocumentItem();
        item.setUri("test:test");
        item.setText("AAA bbb\nCCCC\n\n\n");
        DidOpenTextDocumentParams params = new DidOpenTextDocumentParams(item);
        server.didOpen(params);
        Assert.assertEquals(2, actual[0].getDiagnostics().size());
    }

}