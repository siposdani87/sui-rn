const baseColors = {
    // Theme

    primaryBright: '',
    primary: '',
    primaryDark: '',
    primaryText: '',

    accentBright: '',
    accent: '',
    accentDark: '',
    accentText: '',

    // Black & White & Grey

    whiteBright: '#FFFFFF',
    white: '#FAFAFA',
    whiteDark: '#F5F5F5',

    lightGreyBright: '#EEEEEE',
    lightGrey: '#E0E0E0',
    lightGreyDark: '#BDBDBD',

    deepGreyBright: '#9E9E9E',
    deepGrey: '#757575',
    deepGreyDark: '#616161',

    blackBright: '#424242',
    black: '#212121',
    blackDark: '#000000',

    // Material Design Palette

    // greyBright: '#E0E0E0',
    // grey: '#9E9E9E',
    // greyDark: '#616161',

    blueGreyBright: '#90A4AE',
    blueGrey: '#607D8B',
    blueGreyDark: '#455A64',

    redBright: '#e57373',
    red: '#F44336',
    redDark: '#d32f2f',

    pinkBright: '#F06292',
    pink: '#E91E63',
    pinkDark: '#C2185B',

    purpleBright: '#BA68C8',
    purple: '#9C27B0',
    purpleDark: '#7B1FA2',

    deepPurpleBright: '#9575CD',
    deepPurple: '#673AB7',
    deepPurpleDark: '#512DA8',

    indigoBright: '#7986CB',
    indigo: '#3F51B5',
    indigoDark: '#303F9F',

    blueBright: '#64B5F6',
    blue: '#2196F3',
    blueDark: '#1976D2',

    lightBlueBright: '#4FC3F7',
    lightBlue: '#03A9F4',
    lightBlueDark: '#0288D1',

    cyanBright: '#4DD0E1',
    cyan: '#00BCD4',
    cyanDark: '#0097A7',

    tealBright: '#4DB6AC',
    teal: '#009688',
    tealDark: '#00796B',

    greenBright: '#81C784',
    green: '#4CAF50',
    greenDark: '#388E3C',

    lightGreenBright: '#AED581',
    lightGreen: '#8BC34A',
    lightGreenDark: '#689F38',

    limeBright: '#DCE775',
    lime: '#CDDC39',
    limeDark: '#AFB42B',

    yellowBright: '#FFF176',
    yellow: '#FFEB3B',
    yellowDark: '#FBC02D',

    amberBright: '#FFD54F',
    amber: '#FFC107',
    amberDark: '#FFA000',

    orangeBright: '#FFB74D',
    orange: '#FF9800',
    orangeDark: '#F57C00',

    deepOrangeBright: '#FF8A65',
    deepOrange: '#FF5722',
    deepOrangeDark: '#E64A19',

    brownBright: '#A1887F',
    brown: '#795548',
    brownDark: '#5D4037',
};

const additionalColors = {
    successBright: baseColors.greenBright,
    success: baseColors.green,
    successDark: baseColors.greenDark,
    successText: baseColors.white,

    infoBright: baseColors.blueBright,
    info: baseColors.blue,
    infoDark: baseColors.blueDark,
    infoText: baseColors.white,

    warningBright: baseColors.amberBright,
    warning: baseColors.amber,
    warningDark: baseColors.amberDark,
    warningText: baseColors.white,

    errorBright: baseColors.redBright,
    error: baseColors.red,
    errorDark: baseColors.redDark,
    errorText: baseColors.white,

    labelDefaultLight: baseColors.deepGrey,
    labelDisabledLight: baseColors.lightGreyDark,

    labelDefaultDark: baseColors.lightGreyDark,
    labelDisabledDark: baseColors.deepGrey,

    inputDefaultLight: baseColors.lightGreyDark,
    inputDisabledLight: baseColors.lightGrey,

    inputDefaultDark: baseColors.deepGrey,
    inputDisabledDark: baseColors.deepGreyDark,

    contentDefaultLight: baseColors.black,
    contentDisabledLight: baseColors.deepGreyBright,

    contentDefaultDark: baseColors.white,
    contentDisabledDark: baseColors.lightGreyDark,

    checkboxDefaultLight: baseColors.deepGrey,
    checkboxDisabledLight: baseColors.lightGrey,

    checkboxDefaultDark: baseColors.lightGrey,
    checkboxDisabledDark: baseColors.deepGrey,

    primaryDefaultLight: baseColors.primary,
    primaryDisabledLight: baseColors.lightGreyDark,

    primaryDefaultDark: baseColors.primaryBright,
    primaryDisabledDark: baseColors.deepGrey,

    accentDefaultLight: baseColors.accent,
    accentDisabledLight: baseColors.lightGreyDark,

    accentDefaultDark: baseColors.accentBright,
    accentDisabledDark: baseColors.deepGrey,

    errorDefaultLight: baseColors.red,
    errorDisabledLight: baseColors.redDark,

    errorDefaultDark: baseColors.redBright,
    errorDisabledDark: baseColors.redDark,
};

const colors = Object.assign(baseColors, additionalColors);

export function setThemeColors(
    primaryBright: string,
    primary: string,
    primaryDark: string,
    primaryText: string,
    accentBright: string,
    accent: string,
    accentDark: string,
    accentText: string,
) {
    colors.primaryBright = primaryBright;
    colors.primary = primary;
    colors.primaryDark = primaryDark;
    colors.primaryText = primaryText;

    colors.accentBright = accentBright;
    colors.accent = accent;
    colors.accentDark = accentDark;
    colors.accentText = accentText;

    colors.primaryDefaultLight = primary;
    colors.primaryDefaultDark = primaryBright;
    colors.accentDefaultLight = accent;
    colors.accentDefaultDark = accentBright;

    return colors;
}

setThemeColors(
    colors.indigoBright,
    colors.indigo,
    colors.indigoDark,
    colors.white,
    colors.pinkBright,
    colors.pink,
    colors.pinkDark,
    colors.white,
);

export default colors;
