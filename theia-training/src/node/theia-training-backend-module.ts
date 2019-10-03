import { ContainerModule } from "inversify";
import { NodeFileListService } from "./node-file-list-service";
import { ConnectionContainerModule } from "@theia/core/lib/node/messaging/connection-container-module";
import { fileListPath } from "../common/file-list-protocol";

const fileListConnectionModule = ConnectionContainerModule.create(({ bind, bindBackendService }) => {
    bind(NodeFileListService).toSelf().inSingletonScope();
    bindBackendService(fileListPath, NodeFileListService);
});

export default new ContainerModule(bind => {
    bind(ConnectionContainerModule).toConstantValue(fileListConnectionModule);
});