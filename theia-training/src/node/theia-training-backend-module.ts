import { ContainerModule } from 'inversify';
import { BackendApplicationContribution } from '@theia/core/lib/node/backend-application';
import { TheiaTrainingBackendContribution } from './theia-training-backend-contribution';

export default new ContainerModule(bind => {
    bind(TheiaTrainingBackendContribution).toSelf().inSingletonScope();
    bind(BackendApplicationContribution).toService(TheiaTrainingBackendContribution);
});