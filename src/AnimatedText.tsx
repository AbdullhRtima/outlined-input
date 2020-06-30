import * as React from 'react';
import { Animated, TextStyle, TextProps } from 'react-native';
import { withTheme } from './theming';

interface AnimatedTextProps extends TextProps {
  style?: TextStyle;
}

/**
 * A function component that shows an animated text
 */
function AnimatedText({ style, ...rest }: AnimatedTextProps) {

  return (
    <Animated.Text
      {...rest}
      style={style}
    />
  );
}

export default withTheme(AnimatedText);