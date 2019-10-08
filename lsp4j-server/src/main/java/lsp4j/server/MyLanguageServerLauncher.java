package lsp4j.server;

import java.util.concurrent.Future;

import org.eclipse.lsp4j.jsonrpc.Launcher;
import org.eclipse.lsp4j.launch.LSPLauncher;
import org.eclipse.lsp4j.services.LanguageClient;

public class MyLanguageServerLauncher {

    public static void main(String[] args) throws Exception {
        MyLanguageServer server = new MyLanguageServer();
        Launcher<LanguageClient> launcher = LSPLauncher.createServerLauncher(server, System.in, System.out);
        server.connect(launcher.getRemoteProxy());
        Future<Void> future = launcher.startListening();
        while (!future.isDone()) {
            Thread.sleep(10_000l);
        }
    }

}
