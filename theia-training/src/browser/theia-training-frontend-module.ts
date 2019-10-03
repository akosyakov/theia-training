import '../../src/browser/style/index.css';

import { ContainerModule } from 'inversify';
import { FileListViewContribution } from './file-list-view-contribution';
import { bindViewContribution, WidgetFactory, FrontendApplicationContribution } from '@theia/core/lib/browser';
import { FileListWidget } from './file-list-widget';

export default new ContainerModule(bind => {
    bind(FileListWidget).toSelf();
    bind(WidgetFactory).toDynamicValue(context => ({
        id: FileListWidget.ID,
        createWidget: () => context.container.get(FileListWidget)
    }));
    bindViewContribution(bind, FileListViewContribution);
    bind(FrontendApplicationContribution).toService(FileListViewContribution);
});