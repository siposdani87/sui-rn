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

  // Black & White

  whiteBright: '#FFFFFF',
  white: '#FEFEFE',
  whiteDark: '#F9F9F9',

  blackBright: '#404040',
  black: '#252525',
  blackDark: '#000000',

  // Additional Palette

  lightGreyBright: '#F0F0F0',
  lightGrey: '#E5E5E5',
  lightGreyDark: '#D0D0D0',

  deepGreyBright: '#3B3B3B',
  deepGrey: '#303030',
  deepGreyDark: '#1B1B1B',

  // Material Design Palette

  greyBright: '#E0E0E0',
  grey: '#9E9E9E',
  greyDark: '#616161',

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

const widgetColors = {
  labelDefaultLight: baseColors.greyDark,
  labelDisabledLight: baseColors.lightGreyDark,

  labelDefaultDark: baseColors.grey,
  labelDisabledDark: baseColors.deepGreyBright,

  inputDefaultLight: baseColors.greyBright,
  inputDisabledLight: baseColors.lightGreyDark,

  inputDefaultDark: baseColors.blackBright,
  inputDisabledDark: baseColors.deepGreyBright,

  contentDefaultLight: baseColors.black,
  contentDisabledLight: baseColors.grey,

  contentDefaultDark: baseColors.white,
  contentDisabledDark: baseColors.greyDark,

  checkboxDefaultLight: baseColors.greyDark,
  checkboxDisabledLight: baseColors.greyBright,

  checkboxDefaultDark: baseColors.lightGrey,
  checkboxDisabledDark: baseColors.deepGrey,

  primaryDefaultLight: baseColors.primary,
  primaryDisabledLight: baseColors.grey,

  primaryDefaultDark: baseColors.primaryBright,
  primaryDisabledDark: baseColors.greyDark,

  accentDefaultLight: baseColors.accent,
  accentDisabledLight: baseColors.grey,

  accentDefaultDark: baseColors.accentBright,
  accentDisabledDark: baseColors.greyDark,

  errorDefaultLight: baseColors.red,
  errorDisabledLight: baseColors.redDark,

  errorDefaultDark: baseColors.redBright,
  errorDisabledDark: baseColors.redDark,
};

const colors = Object.assign(baseColors, widgetColors);

export function setThemeColors(primaryBright, primary, primaryDark, primaryText, accentBright, accent, accentDark, accentText) {
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

setThemeColors(colors.indigoBright, colors.indigo, colors.indigoDark, colors.white, colors.pinkBright, colors.pink, colors.pinkDark, colors.white);

export default colors;
