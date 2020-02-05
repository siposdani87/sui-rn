const environment = {
    dark_theme: 'auto',
};

export function setEnvironment(darkTheme) {
    environment.dark_theme = darkTheme;

    return environment;
}

setEnvironment('auto');

export default environment;
