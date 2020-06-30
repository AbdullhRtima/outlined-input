import {
    Dimensions,
    Platform,
    PixelRatio
} from 'react-native';
import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp
} from 'react-native-responsive-screen';
import { isTablet } from 'react-native-device-info';

/**
 * constants
 */
const { width: windowWidth, height: windowHeight } = Dimensions.get('window');
const scale = windowWidth / 320;

/**
 * normalize font to be responsive
 * @param size
 */
export function normalizeFont(size) {
    const newSize = size * scale;

    if (Platform.OS === 'ios') {
        return Math.round(PixelRatio.roundToNearestPixel(newSize));
    } else {
        return Math.round(PixelRatio.roundToNearestPixel(newSize)) - 2;
    }
};

/**
 * return width percent as DP
 * * @param precent
 */
export function ConvertWidthPercentageToDp(precent: string) {
    const widthAsDP = wp(precent);
    return widthAsDP;
};

/**
 * return height percent as DP
 * * @param precent
 */
export function ConvertHeightPercentageToDp(precent: string) {
    const heightAsDP = hp(precent);
    return heightAsDP;
};

/**
 * export as default
 */
export default {
    window: {
        windowWidth,
        windowHeight,
    },
    isSmallDevice: windowWidth < 375,
    isTablet: isTablet(),
};