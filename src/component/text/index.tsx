import React, {memo, useMemo} from 'react';


import {
  StyleProp,
  StyleSheet,
  Text as ReactNativeText,
  TextStyle,
} from 'react-native';

import {TextProps} from './type';
import {enhance, propsToStyle, sizeScale} from '../../common/handle';
import {useTheme} from '../../themes';

const styles = StyleSheet.create({
  flex: {
    flex: 1,
  },
});

const TextComponent = (props: TextProps) => {
  // state
  const theme = useTheme();
  const {
    tx,
    txOptions,
    text,
    children,
    flex,
    fontSize = 14,
    fontWeight,
    fontFamily = 'primary',
    color,
    center,
    textTransform,
    textAlign,
    fontStyle,
    letterSpacing,
    lineHeight,
    colorTheme,
    style: styleOverride = {},
    ...rest
  } = props;
 

  const content = useMemo(
    () => text || children,
    [ text, children],
  );

  const styleComponent = useMemo(
    () =>
      enhance([
        [
          flex === true && styles.flex,
          {fontSize: sizeScale(fontSize)},

          center && {textAlign: 'center'},

          propsToStyle([
            {fontWeight},
            {color},
            {textAlign},
            {textTransform},
            {fontStyle},
            {letterSpacing},
            {lineHeight},
          ]),
          enhance([styleOverride]),
        ] as StyleProp<TextStyle>,
      ]),
    [
      flex,
      fontSize,
      fontWeight,
      fontFamily,
      color,
      colorTheme,
      theme.colors,
      center,
      textAlign,
      textTransform,
      fontStyle,
      letterSpacing,
      lineHeight,
      styleOverride,
    ],
  );
  // render
  return (
    <ReactNativeText
      allowFontScaling={false}
      {...rest}
      style={[styleComponent]}>
      {content}
    </ReactNativeText>
  );
};
export const Text = memo(TextComponent);
