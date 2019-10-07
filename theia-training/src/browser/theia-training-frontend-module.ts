import '../../src/browser/style/index.css';

import { ContainerModule } from "inversify";
import { OpenHandler, WidgetFactory } from "@theia/core/lib/browser";
import { ThemeService } from "@theia/core/lib/browser/theming";
import { JsonschemaFormWidget, JsonschemaFormWidgetOptions } from './jsonschema-form-widget';
import { JsonschemaFormOpenHandler } from './jsonschema-form-open-handler';
import { bindJsonschemaFormPreferences } from "./jsonschema-form-preferences";

const bootstrapLink = document.createElement("link");
bootstrapLink.rel = 'stylesheet';
document.head.appendChild(bootstrapLink);

function updateTheme(newTheme: string): void {
    const theme = bootstrapLink.getAttribute('theme');
    if (theme === newTheme) {
        return;
    }
    bootstrapLink.setAttribute('theme', newTheme);
    bootstrapLink.href = newTheme === 'dark' ?
        '//cdnjs.cloudflare.com/ajax/libs/bootswatch/3.3.6/darkly/bootstrap.min.css' :
        '//maxcdn.bootstrapcdn.com/bootstrap/3.3.6/css/bootstrap.min.css';
}
updateTheme(ThemeService.get().getCurrentTheme().id);
ThemeService.get().onThemeChange(({ newTheme }) => updateTheme(newTheme.id));

export default new ContainerModule(bind => {
    bind(OpenHandler).to(JsonschemaFormOpenHandler).inSingletonScope();
    bind(WidgetFactory).toDynamicValue(({ container }) => ({
        id: JsonschemaFormWidget.id,
        createWidget: (options: JsonschemaFormWidgetOptions) => {
            const child = container.createChild();
            child.bind(JsonschemaFormWidgetOptions).toConstantValue(options);
            child.bind(JsonschemaFormWidget).toSelf();
            return child.get(JsonschemaFormWidget);
        }
    }));

    bindJsonschemaFormPreferences(bind);
});