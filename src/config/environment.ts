interface Environment {
    dark_theme: boolean | null;
}

const environment: Environment = {
    dark_theme: null,
};

export function setEnvironment(darkTheme: boolean | null) {
    environment.dark_theme = darkTheme;

    return environment;
}

setEnvironment(null);

export default environment;
