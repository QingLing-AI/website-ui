
interface I18nConfigLocale {
    /**
     * @description Number of concurrently pending promises returned
     */
    concurrency?: number;
    /**
     * @description The entry file or folder
     */
    entry: string;
    /**
     * @description The language that will use as translation ref
     */
    entryLocale: string;
    /**
     * @description ChatGPT model name to use
     */
    modelName?: string;
    /**
     * @description Where you store your locale files
     */
    output: string;
    /**
     * @description All languages that need to be translated
     */
    outputLocales: string[];
    /**
     * @description Provide some context for a more accurate translation
     */
    reference?: string;
    /**
     * @description Save translation results immediately after each chunk is completed
     * @default false
     */
    saveImmediately?: boolean;
    /**
     * @description Split locale JSON by token
     */
    splitToken?: number;
    /**
     * @description Sampling temperature to use
     */
    temperature?: number;
    /**
     * @description Nucleus sampling threshold
     */
    topP?: number;
}

interface I18nConfig extends I18nConfigLocale {
    experimental?: {
        jsonMode?: boolean;
    };
}

export type Config = I18nConfig;
export const defineConfig = (config: Partial<Config>): Config => {
  return config as Config;
};