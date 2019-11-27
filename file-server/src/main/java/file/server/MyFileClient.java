package file.server;

import org.eclipse.lsp4j.jsonrpc.services.JsonNotification;

public interface MyFileClient {

    @JsonNotification("onDidChangeSomething")
	void onDidChangeSomething(String uri);

}