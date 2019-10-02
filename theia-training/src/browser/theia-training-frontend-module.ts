import { ContainerModule } from 'inversify';
import { TheiaTrainingFrontendContribution } from './theia-training-frontend-contribution';
import { CommandContribution, MenuContribution } from '@theia/core/lib/common';
import { KeybindingContribution, FrontendApplicationContribution } from '@theia/core/lib/browser';

export default new ContainerModule(bind => {
    bind(TheiaTrainingFrontendContribution).toSelf().inSingletonScope();
    bind(CommandContribution).toService(TheiaTrainingFrontendContribution);
    bind(MenuContribution).toService(TheiaTrainingFrontendContribution);
    bind(KeybindingContribution).toService(TheiaTrainingFrontendContribution);
    bind(FrontendApplicationContribution).toService(TheiaTrainingFrontendContribution);
});