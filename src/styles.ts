import { color as themeColor } from '../theme';
import color from 'color';
import configureFonts from './fonts';
import { Theme } from './types';

const DefaultTheme: Theme = {
    dark: false,
    roundness: 4,
    colors: {
        primary: '#6200ee',
        accent: '#03dac4',
        background: '#f6f6f6',
        surface: themeColor.light,
        error: '#B00020',
        text: color.dark,
        onBackground: '#000000',
        onSurface: '#000000',
        disabled: color(color.dark)
            .alpha(0.26)
            .rgb()
            .string(),
        placeholder: color(themeColor.dark)
            .alpha(0.54)
            .rgb()
            .string(),
        backdrop: color(themeColor.dark)
            .alpha(0.5)
            .rgb()
            .string(),
        notification: themeColor.pinkA400,
    },
    fonts: configureFonts(),
    animation: {
        scale: 1.0,
    },
};

export default DefaultTheme;