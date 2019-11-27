import '../../src/browser/style/index.css';

import { ContainerModule } from 'inversify';
import { FileListViewContribution } from './file-list-view-contribution';
import { bindViewContribution, WidgetFactory, FrontendApplicationContribution, WebSocketConnectionProvider } from '@theia/core/lib/browser';
import { FileListWidget } from './file-list-widget';
import { FileListService, fileListPath } from '../common/file-list-protocol';
import { MessageService } from '@theia/core/lib/common/message-service';

export default new ContainerModule(bind => {
    bind(FileListWidget).toSelf();
    bind(WidgetFactory).toDynamicValue(context => ({
        id: FileListWidget.ID,
        createWidget: () => context.container.get(FileListWidget)
    }));
    bindViewContribution(bind, FileListViewContribution);
    bind(FrontendApplicationContribution).toService(FileListViewContribution);

    bind(FileListService).toDynamicValue(({ container }) => {
        const messageService = container.get(MessageService);
        const service = WebSocketConnectionProvider.createProxy<FileListService>(container, fileListPath);
        service.setClient({
            onDidChangeSomething: uri => messageService.info(uri)
        });
        return service;
    }).inSingletonScope();
});