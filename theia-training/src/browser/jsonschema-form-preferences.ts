import { interfaces } from 'inversify';
import { createPreferenceProxy, PreferenceProxy, PreferenceService, PreferenceContribution, PreferenceSchema } from '@theia/core/lib/browser';

export const JsonschemaFormConigurationSchema: PreferenceSchema = {
    'type': 'object',
    properties: {
        'jsonschema-form.dataSuffix': {
            type: 'string',
            description: 'Control when a JSON-Form widget should be opened',
            default: '-data'
        }
    }
};

export interface JsonschemaFormConfiguration {
    'jsonschema-form.dataSuffix': string;
}

export const JsonschemaFormPreferences = Symbol('JsonschemaFormPreferences');
export type JsonschemaFormPreferences = PreferenceProxy<JsonschemaFormConfiguration>;

export function createJsonschemaFormPreferences(preferences: PreferenceService): JsonschemaFormPreferences {
    return createPreferenceProxy(preferences, JsonschemaFormConigurationSchema);
}

export function bindJsonschemaFormPreferences(bind: interfaces.Bind): void {
    bind(JsonschemaFormPreferences).toDynamicValue(ctx => {
        const preferences = ctx.container.get<PreferenceService>(PreferenceService);
        return createJsonschemaFormPreferences(preferences);
    });
    bind(PreferenceContribution).toConstantValue({ schema: JsonschemaFormConigurationSchema });
}
