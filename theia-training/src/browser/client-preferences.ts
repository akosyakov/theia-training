import { interfaces } from 'inversify';
import { createPreferenceProxy, PreferenceProxy, PreferenceService, PreferenceContribution, PreferenceSchema } from '@theia/core/lib/browser';

export const ClientConfigSchema: PreferenceSchema = {
    "type": "object",
    "title": "Example configuration",
    "properties": {
        "languageServerExample.maxNumberOfProblems": {
            "scope": "resource",
            "type": "number",
            "default": 100,
            "description": "Controls the maximum number of problems produced by the server."
        },
        "languageServerExample.trace.server": {
            "scope": "window",
            "type": "string",
            "enum": [
                "off",
                "messages",
                "verbose"
            ],
            "default": "off",
            "description": "Traces the communication between Theia and the language server."
        }
    }
};

export interface ClientConfiguration {
    'languageServerExample.maxNumberOfProblems': number;
    'languageServerExample.trace.server': 'off' | 'messages' | 'verbose';
}

export const ClientPreferences = Symbol('ClientPreferences');
export type ClientPreferences = PreferenceProxy<ClientConfiguration>;

export function createClientPreferences(preferences: PreferenceService): ClientPreferences {
    return createPreferenceProxy(preferences, ClientConfigSchema);
}

export function bindClientPreferences(bind: interfaces.Bind): void {
    bind(ClientPreferences).toDynamicValue(ctx => {
        const preferences = ctx.container.get<PreferenceService>(PreferenceService);
        return createClientPreferences(preferences);
    });
    bind(PreferenceContribution).toConstantValue({ schema: ClientConfigSchema });
}
