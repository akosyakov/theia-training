package file.server;

import java.io.IOException;
import java.net.URI;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.concurrent.CompletableFuture;
import java.util.stream.Collectors;

import org.eclipse.lsp4j.jsonrpc.services.JsonRequest;

public class MyFileServer {

    // use it to send notifications and data to the fronend
    private MyFileClient client;

    public void setClient(MyFileClient client) {
        this.client = client;
    }

    @JsonRequest("getFiles")
    public CompletableFuture<MyFiles> listFiles(String uri) throws IOException {
        client.onDidChangeSomething(uri);

        Path fsPath = Paths.get(URI.create(uri));
        MyFiles result = new MyFiles();
        if (!Files.isDirectory(fsPath)) {
            result.setIsDirectory(false);
            return CompletableFuture.completedFuture(result);
        }
        result.setIsDirectory(true);
        result.setChildren(Files.list(fsPath).map(f -> {
            String fileUri = f.toUri().toString();
            if (Files.isDirectory(f)) {
                // remove trailing separator
                fileUri = fileUri.substring(0, fileUri.length() - 1);
            }
            return fileUri;
        }).collect(Collectors.toList()));
        return CompletableFuture.completedFuture(result);
    }

}