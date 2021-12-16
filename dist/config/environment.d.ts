interface Environment {
    dark_theme: boolean | null;
}
declare const environment: Environment;
export declare function setEnvironment(darkTheme: boolean | null): Environment;
export default environment;
