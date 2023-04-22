export type EnvironmentType = {
    dark_theme: boolean | null;
};
declare const environment: EnvironmentType;
export declare function setEnvironment(darkTheme: boolean | null): EnvironmentType;
export default environment;
