import { StyleSheet } from 'react-native';

/**
 * A stylesheet that contains a common styles in application
 */
export default StyleSheet.create({
    flex: { flex: 1 },
    nonFlex: { flex: 0 },
    fullWidth: { width: '100%' },
    nonFlexCenter: {
        justifyContent: 'center',
        alignItems: 'center'
    }
});