import { ContainerModule } from "inversify";
import { NodeFileListService } from "./node-file-list-service";
import { ConnectionContainerModule } from "@theia/core/lib/node/messaging/connection-container-module";
import { BackendApplicationContribution } from "@theia/core/lib/node/backend-application";
import { fileListPath, FileListClient } from "../common/file-list-protocol";
import { FileListServiceClient } from "./file-list-service-client";

const fileListConnectionModule = ConnectionContainerModule.create(({ bind, bindBackendService }) => {
    bind(NodeFileListService).toSelf().inSingletonScope();
    bindBackendService(fileListPath, NodeFileListService, (server, client: FileListClient) => {
        server.setClient(client);
        return server;
    });
});

export default new ContainerModule(bind => {
    bind(FileListServiceClient).toSelf().inSingletonScope();
    bind(BackendApplicationContribution).toService(FileListServiceClient);
    bind(ConnectionContainerModule).toConstantValue(fileListConnectionModule);
});