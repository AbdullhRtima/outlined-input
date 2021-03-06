import * as React from 'react';
import {
  TouchableWithoutFeedback,
  View,
  ViewStyle,
  StyleSheet,
  StyleProp,
} from 'react-native';
import color from 'color';
import { withTheme } from './../core/theming';
import { Theme } from './../types';

type Props = React.ComponentPropsWithRef<typeof TouchableWithoutFeedback> & {
  /**
   * Whether to render the ripple outside the view bounds.
   */
  borderless?: boolean;
  /**
   * Type of background drawabale to display the feedback (Android).
   * https://facebook.github.io/react-native/docs/touchablenativefeedback.html#background
   */
  background?: Object;
  /**
   * Whether to start the ripple at the center (Web).
   */
  centered?: boolean;
  /**
   * Whether to prevent interaction with the touchable.
   */
  disabled?: boolean;
  /**
   * Function to execute on press. If not set, will cause the touchable to be disabled.
   */
  onPress?: () => void | null;
  /**
   * Function to execute on long press.
   */
  onLongPress?: () => void;
  /**
   * Color of the ripple effect (Android >= 5.0 and Web).
   */
  rippleColor?: string;
  /**
   * Color of the underlay for the highlight effect (Android < 5.0 and iOS).
   */
  underlayColor?: string;
  /**
   * Content of the `TouchableRipple`.
   */
  children: React.ReactNode;
  style?: StyleProp<ViewStyle>;
  /**
   * @optional
   */
  theme: Theme;
};

/**
 * A wrapper for views that should respond to touches.
 * Provides a material "ink ripple" interaction effect for supported platforms (>= Android Lollipop).
 * On unsupported platforms, it falls back to a highlight effect.
 *
 * ## Usage
 * ```js
 * import * as React from 'react';
 * import { View } from 'react-native';
 * import { Text, TouchableRipple } from 'react-native-paper';
 *
 * const MyComponent = () => (
 *   <TouchableRipple
 *     onPress={() => console.log('Pressed')}
 *     rippleColor="rgba(0, 0, 0, .32)"
 *   >
 *     <Text>Press me</Text>
 *   </TouchableRipple>
 * );
 *
 * export default MyComponent;
 * ```
 */
class TouchableRipple extends React.Component<Props> {
  static defaultProps = {
    borderless: false,
  };

  /**
   * Whether ripple effect is supported.
   */
  static supported = true;

  private handlePressIn = (e: any) => {
    const { centered, rippleColor, onPressIn, theme } = this.props;

    onPressIn?.(e);

    const { dark, colors } = theme;
    const calculatedRippleColor =
      rippleColor ||
      color(colors.text)
        .alpha(dark ? 0.32 : 0.2)
        .rgb()
        .string();

    const button = e.currentTarget;
    const style = window.getComputedStyle(button);
    const dimensions = button.getBoundingClientRect();

    let touchX;
    let touchY;

    if (centered) {
      touchX = dimensions.width / 2;
      touchY = dimensions.height / 2;
    } else {
      const startX = e.nativeEvent.touches
        ? e.nativeEvent.touches[0].pageX
        : e.pageX;
      const startY = e.nativeEvent.touches
        ? e.nativeEvent.touches[0].pageY
        : e.pageY;

      touchX = startX - dimensions.left;
      touchY = startY - dimensions.top;
    }

    // Get the size of the button to determine how big the ripple should be
    const size = centered
      ? // If ripple is always centered, we don't need to make it too big
        Math.min(dimensions.width, dimensions.height) * 1.25
      : // Otherwise make it twice as big so clicking on one end spreads ripple to other
        Math.max(dimensions.width, dimensions.height) * 2;

    // Create a container for our ripple effect so we don't need to change the parent's style
    const container = document.createElement('span');

    container.setAttribute('data-paper-ripple', '');

    Object.assign(container.style, {
      position: 'absolute',
      pointerEvents: 'none',
      top: '0',
      left: '0',
      right: '0',
      bottom: '0',
      borderTopLeftRadius: style.borderTopLeftRadius,
      borderTopRightRadius: style.borderTopRightRadius,
      borderBottomRightRadius: style.borderBottomRightRadius,
      borderBottomLeftRadius: style.borderBottomLeftRadius,
      overflow: centered ? 'visible' : 'hidden',
    });

    // Create span to show the ripple effect
    const ripple = document.createElement('span');

    Object.assign(ripple.style, {
      position: 'absolute',
      pointerEvents: 'none',
      backgroundColor: calculatedRippleColor,
      borderRadius: '50%',

      /* Transition configuration */
      transitionProperty: 'transform opacity',
      transitionDuration: `${Math.min(size * 1.5, 350)}ms`,
      transitionTimingFunction: 'linear',
      transformOrigin: 'center',

      /* We'll animate these properties */
      transform: 'translate3d(-50%, -50%, 0) scale3d(0.1, 0.1, 0.1)',
      opacity: '0.5',

      // Position the ripple where cursor was
      left: `${touchX}px`,
      top: `${touchY}px`,
      width: `${size}px`,
      height: `${size}px`,
    });

    // Finally, append it to DOM
    container.appendChild(ripple);
    button.appendChild(container);

    // rAF runs in the same frame as the event handler
    // Use double rAF to ensure the transition class is added in next frame
    // This will make sure that the transition animation is triggered
    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        Object.assign(ripple.style, {
          transform: 'translate3d(-50%, -50%, 0) scale3d(1, 1, 1)',
          opacity: '1',
        });
      });
    });
  };

  private handlePressOut = (e: any) => {
    this.props.onPressOut && this.props.onPressOut(e);

    const containers = e.currentTarget.querySelectorAll(
      '[data-paper-ripple]'
    ) as HTMLElement[];

    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        containers.forEach(container => {
          // @ts-ignore
          const ripple = container.firstChild;

          // @ts-ignore
          Object.assign(ripple.style, {
            transitionDuration: '250ms',
            opacity: 0,
          });

          // Finally remove the span after the transition
          setTimeout(() => {
            // @ts-ignore
            const { parentNode } = container;

            if (parentNode) {
              parentNode.removeChild(container);
            }
          }, 500);
        });
      });
    });
  };

  render() {
    /* eslint-disable @typescript-eslint/no-unused-vars */
    const {
      style,
      background,
      borderless,
      disabled: disabledProp,
      rippleColor,
      underlayColor,
      children,
      theme,
      ...rest
    } = this.props;
    /* eslint-enable @typescript-eslint/no-unused-vars */

    const disabled = disabledProp || !this.props.onPress;

    return (
      <TouchableWithoutFeedback
        {...rest}
        onPressIn={this.handlePressIn}
        onPressOut={this.handlePressOut}
        disabled={disabled}
      >
        <View
          style={[styles.touchable, borderless && styles.borderless, style]}
        >
          {React.Children.only(children)}
        </View>
      </TouchableWithoutFeedback>
    );
  }
}

const styles = StyleSheet.create({
  touchable: {
    position: 'relative',
  },
  borderless: {
    overflow: 'hidden',
  },
});

export default withTheme(TouchableRipple);
