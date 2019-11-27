package file.server;

import java.util.concurrent.Future;

import org.eclipse.lsp4j.jsonrpc.Launcher;

public class MyFileServerLauncher {

    public static void main(String[] args) throws Exception {
        MyFileServer server = new MyFileServer();
        Launcher<MyFileClient> launcher = Launcher.createLauncher(server, MyFileClient.class, System.in, System.out);
        server.setClient(launcher.getRemoteProxy());
        Future<Void> future = launcher.startListening();
        while (!future.isDone()) {
            Thread.sleep(10_000l);
        }
    }

}