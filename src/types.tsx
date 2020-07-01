import {
    TextInput as NativeTextInput,
    Animated, TextStyle, ViewStyle
  } from 'react-native';
  import { TextInputProps } from './TextInput';
  
  export type RenderProps = {
    ref: (a: NativeTextInput | null | undefined) => void;
    onChangeText?: (a: string) => void;
    placeholder?: string;
    placeholderTextColor?: string;
    editable?: boolean;
    selectionColor?: string;
    onFocus?: (args: any) => void;
    onBlur?: (args: any) => void;
    underlineColorAndroid?: string;
    style: any;
    multiline?: boolean;
    numberOfLines?: number;
    value?: string;
    adjustsFontSizeToFit?: boolean;
  };
  type TextInputTypesWithoutMode = $Omit<TextInputProps, 'mode'>;
  export type State = {
    labeled: Animated.Value;
    error: Animated.Value;
    focused: boolean;
    placeholder: string | null | undefined;
    value: string | null | undefined;
    labelLayout: { measured: boolean; width: number; height: number };
  };
  export type ChildTextInputProps = {
    parentState: State;
    innerRef: (ref: NativeTextInput | null | undefined) => void;
    onFocus?: (args: any) => void;
    onBlur?: (args: any) => void;
    onChangeText?: (value: string) => void;
    onLayoutAnimatedText: (args: any) => void;
    outlineStyle?: ViewStyle;
  } & TextInputTypesWithoutMode;
  export type LabelProps = {
    mode?: 'flat' | 'outlined';
    placeholderStyle: any;
    placeholderOpacity: number | Animated.Value | Animated.AnimatedInterpolation;
    baseLabelTranslateX: number;
    baseLabelTranslateY: number;
    wiggleOffsetX: number;
    labelScale: number;
    fontSize: number;
    fontWeight: TextStyle['fontWeight'];
    font: any;
    topPosition: number;
    paddingOffset?: { paddingHorizontal: number } | null | undefined;
    placeholderColor: string | null | undefined;
    backgroundColor?: string | null | undefined;
    label?: string | null | undefined;
    hasActiveOutline: boolean | null | undefined;
    activeColor: string;
    errorColor?: string;
    error: boolean | null | undefined;
    onLayoutAnimatedText: (args: any) => void;
  };
  export type InputLabelProps = {
    parentState: State;
    labelProps: LabelProps;
    labelBackground?: any;
  };
  export type LabelBackgroundProps = {
    labelProps: LabelProps;
    labelStyle: any;
    parentState: State;
  };
  
  export declare type Theme = {
    dark: boolean;
    mode?: 'adaptive' | 'exact';
    roundness: number;
    colors: {
      primary: string;
      background: string;
      surface: string;
      accent: string;
      error: string;
      text: string;
      onSurface: string;
      onBackground: string;
      disabled: string;
      placeholder: string;
      backdrop: string;
      notification: string;
    };
    fonts: Fonts;
    animation: {
      scale: number;
    };
  };
  export declare type Fonts = {
    regular: string;
    medium: string
    light: string
    thin: string
  };
  export type $Omit<T, K> = Pick<T, Exclude<keyof T, K>>;