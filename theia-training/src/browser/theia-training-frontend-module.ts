import '../../src/browser/style/index.css';

import { ContainerModule } from 'inversify';
import { TheiaTrainingFrontendContribution } from './theia-training-frontend-contribution';
import { FrontendApplicationContribution } from '@theia/core/lib/browser';
import { MenuContribution } from '@theia/core';

export default new ContainerModule((bind, unbind, isBound, rebind) => {
    bind(TheiaTrainingFrontendContribution).toSelf().inSingletonScope();
    bind(MenuContribution).toService(TheiaTrainingFrontendContribution);
    bind(FrontendApplicationContribution).toService(TheiaTrainingFrontendContribution);

    // BONUS: remove `Call Hierarch` view contribution
});