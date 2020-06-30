
/**
 * all colors in application live here
 */
const color = {
    light: '#FFF',
    dark: '#000',
    crimson: '#E51938',
    danger: '#ff4444',
    transparent: 'rgba(0,0,0,0)',
    greyishBrown: 'rgb(72,72,72)',
    pinkA400: '#f50057',
    pinkishGrey: 'rgb(206,206,206)',
    darkSkyBlue: 'rgb(74,144,226)',
    transparentOverlay: 'rgba(0,0,0,0.5)',
    success: '#4BB543',
    warning: '#FFCC00',
    disabled: '#D3D3D3',
    white: 'rgb(247, 247, 247)',
    cherryRed: 'rgb(244, 0, 57)',
    moreTransparent: 'rgba(0, 0, 0, .32)'
};
/**
 * this color schema will be imporved later in dark mode set up :)
 */
export const colorSchemes = {
    light: {
      background: '#FFF',
      text: '#333',
    },
    dark: {
      background: '#333',
      text: '#fff',
    },
};

/**
 * export color as default
 */
export default color;

/**
 * export color type
 */
export type Color = keyof typeof color;