var colors = {
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

  // Material Design Palette

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

  greyBright: '#E0E0E0',
  grey: '#9E9E9E',
  greyDark: '#616161',

  blueGreyBright: '#90A4AE',
  blueGrey: '#607D8B',
  blueGreyDark: '#455A64',

  // Social/Brand Colors

  facebookColor: '#1877f2', // '#3b5999',
  messengerColor: '#0084ff',
  googlePlusColor: '#dd4b39',
  googleColor: '#f1f1f1',
  twitterColor: '#55acee',
  youtubeColor: '#cd201f',
  yahooColor: '#410093',
  linkedInColor: '#0077B5',
  skypeColor: '#00AFF0',
  dropboxColor: '#007ee5',
  slackColor: '#3aaf85',
  tumblrColor: '#34465d',
  instagramColor: '#e4405f',
  flickrColor: '#ff0084',
  iosColor: '#8e8e93',
  windowsColor: '#68217a',
  androidColor: '#a4c639',
  microsoftColor: '#2f2f2f',
};

export function setThemeColors(primaryBright, primary, primaryDark, accentBright, accent, accentDark) {
  colors.primaryBright = primaryBright;
  colors.primary = primary;
  colors.primaryDark = primaryDark;

  colors.accentBright = accentBright;
  colors.accent = accent;
  colors.accentDark = accentDark;
};

setThemeColors(colors.indigoBright, color.indigo, color.indigoDark, color.pinkBright, color.pink, color.pinkDark);

export default colors;
