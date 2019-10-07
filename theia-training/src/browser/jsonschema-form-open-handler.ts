import { WidgetOpenHandler } from "@theia/core/lib/browser";
import { JsonschemaFormWidget, JsonschemaFormWidgetOptions } from "./jsonschema-form-widget";
import URI from "@theia/core/lib/common/uri";
import { injectable, inject } from "inversify";
import { EditorManager } from "@theia/editor/lib/browser";
import { JsonschemaFormPreferences } from "./jsonschema-form-preferences";

@injectable()
export class JsonschemaFormOpenHandler extends WidgetOpenHandler<JsonschemaFormWidget> {

    readonly id = JsonschemaFormWidget.id;
    readonly label = "Form";

    @inject(EditorManager)
    protected readonly editorManager: EditorManager;

    @inject(JsonschemaFormPreferences)
    protected readonly preferences: JsonschemaFormPreferences;

    /**
     * Task 1: Open JSON data file with JSON-Form by default:
     * - Only JSON files can be opened.
     * - If a file name ends with `-data` (e.g.  `simple-data.json`) then the JSON-form should be opened by default instead of the code editor.
     * - Otherwise the code editor should be opened.
     *
     * Task 2: Make suffix of JSON data files configurable
     * - `jsonschema-form-preferences.ts` defines `jsonschema-form.dataSuffix` preference which can be changes by a user: `File` -> `Settings` -> `Open Preferences`
     *  - Using this preference make suffix of JSON data files configurable.
     *
     * ## Bonus
     *
     * Task 3: Control when a JSON-Form widget should be opened with preferences
     * - Add a new preference `jsonschema-form.dataSuffix` in `jsonschema-form-preferences.ts`. It should be of `string` type, but allow only following values:
     *   - `always` to open any JSON file with JSON-FORM widget;
     *   - `never` to never apply it;
     *   - and `default` to base it on suffix matching as it was implemented in Task 1.
     */
    canHandle(uri: URI): number {
        return -1;
    }

    protected createWidgetOptions(uri: URI): JsonschemaFormWidgetOptions {
        return { uri: uri.withoutFragment().toString() };
    }

}