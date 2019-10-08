import { ContainerModule } from 'inversify';
import { LanguageClientContribution } from '@theia/languages/lib/browser';
import { ClientContribution } from './client-contribution';
import { bindClientPreferences } from './client-preferences';

export default new ContainerModule(bind => {
    bindClientPreferences(bind);
    bind(LanguageClientContribution).to(ClientContribution).inSingletonScope();
});