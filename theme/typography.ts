import ReactNative , { Platform } from "react-native";

export function isRTL() {
    return ReactNative.I18nManager.isRTL;
};

/**
 * all fonts in application live here
 */
const typography = Object.freeze({
    regular: Platform.select({
        android: isRTL() ? 'NotoKufiArabic-Regular' : 'Roboto-Regular',
        ios: isRTL() ? 'NotoKufiArabic' : 'Roboto-Regular'
    }),
    bold: Platform.select({
        android: isRTL() ? 'NotoKufiArabic-Bold' : 'Roboto-Bold',
        ios: isRTL() ? 'NotoKufiArabic-Bold' : 'Roboto-Bold'
    }),
    light: isRTL() ? 'Roboto-Light' : 'Roboto-Light',
    black: isRTL() ? 'Roboto-Black' : 'Roboto-Black',
    medium: isRTL() ? 'Roboto-Medium' : 'Roboto-Medium'
});

/**
 * export font as default
 */
export default typography;

/**
 * export font type
 */
export type Typography = keyof typeof typography;