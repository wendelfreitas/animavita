import React from 'react';
import styled, {DefaultTheme, css} from 'styled-components/native';
import {px2ddp, useTheme, ThemeContextType} from '@animavita/theme';
import {LinearGradient} from 'expo-linear-gradient';
import {ActivityIndicator, TouchableOpacityProps} from 'react-native';

import Typography from '../Typography';

// styles
const DisabledStyle = css``;

const RoundedStyle = css<{size: ButtonSize}>`
  border-radius: ${({size}) => {
    switch (size) {
      case LARGE:
        return px2ddp(15);
      case SMALL:
        return px2ddp(10);
    }
  }}px;
`;

const OutlineTypeStyle = css<{disabled?: boolean}>`
  background-color: transparent;
  border-width: ${px2ddp(0.8)}px;
  border-color: ${({theme, disabled}) => (disabled ? theme.grey : theme.greenLight)};
  ${({disabled}) => disabled && DisabledStyle}
`;

const LargeSizeStyle = css<{gradient?: ButtonActive; active?: ButtonActive}>`
  padding: ${({gradient, active}) => {
    if (gradient || active) return `${px2ddp(5 + 0.8)}px ${px2ddp(9 + 0.8)}px`;

    return `${px2ddp(5)}px ${px2ddp(9)}px`;
  }};
`;

const SmallSizeStyle = css<{gradient?: ButtonActive; active?: ButtonActive}>`
  padding: ${({gradient, active}) => {
    if (gradient || active) return `${px2ddp(3 + 0.8)}px ${px2ddp(7 + 0.8)}px`;

    return `${px2ddp(3)}px ${px2ddp(7)}px`;
  }};
`;

const TouchableStyle = css<{
  active?: ButtonActive;
  gradient?: ButtonActive;
  outline?: ButtonOutline;
  rounded?: ButtonRounded;
  disabled?: ButtonDisabled;
  size: ButtonSize;
}>`
  ${({outline, active, gradient}) => {
    if (!outline || active || gradient) return;

    return OutlineTypeStyle;
  }}
  ${({rounded}) => {
    if (!rounded) return;

    return RoundedStyle;
  }}
  ${({size, active, gradient, disabled}) => {
    if (!disabled && (active || gradient)) return;

    switch (size) {
      case LARGE:
        return LargeSizeStyle;
      case SMALL:
        return SmallSizeStyle;
    }
  }}
  justify-content: center;
`;

const Touchable = styled.TouchableOpacity<{
  active?: ButtonActive;
  gradient?: ButtonActive;
  outline?: ButtonOutline;
  rounded?: ButtonRounded;
  disabled?: ButtonDisabled;
  size: ButtonSize;
}>`
  ${TouchableStyle}
`;

const StyledLinearGradient = styled(LinearGradient)<{
  rounded?: ButtonRounded;
  gradient?: ButtonActive;
  active?: ButtonActive;
  size: ButtonSize;
}>`
  ${({size}) => {
    switch (size) {
      case LARGE:
        return LargeSizeStyle;
      case SMALL:
        return SmallSizeStyle;
    }
  }}
  ${({rounded, gradient, active}) => {
    if (!rounded && (gradient || active)) return;
    return RoundedStyle;
  }}
`;

const Text = styled(Typography)`
  text-align: center;
`;

// types
const gradientConfig = {
  start: {
    x: 0,
    y: 0,
  },
  end: {
    x: 1,
    y: 1,
  },
  locations: [0.1, 0.9],
};

const LARGE = 'large';
const SMALL = 'small';

type ButtonActive = boolean;
type ButtonSize = typeof LARGE | typeof SMALL;
type ButtonRounded = boolean;
type ButtonText = string;
type ButtonDisabled = boolean;
type ButtonOutline = boolean;
type ButtonTextColor = string;

interface ButtonProps extends TouchableOpacityProps {
  readonly rounded?: ButtonRounded;
  readonly active?: ButtonActive;
  readonly gradient?: ButtonActive;
  readonly outline?: ButtonOutline;
  readonly textColor?: ButtonTextColor;
  disabled?: ButtonDisabled;
  text: ButtonText;
  size: ButtonSize;
  loading?: boolean;
}

type ButtonComponentType = React.FC<ButtonProps & {theme: DefaultTheme}>;

function getColor(
  theme: ThemeContextType,
  disabled?: ButtonDisabled,
  color?: ButtonTextColor,
  active?: ButtonActive,
): string {
  if (disabled) return theme.styledTheme.grey;
  if (color) return color;
  if (active) return theme.styledTheme.white;

  return theme.styledTheme.greenLight;
}

const Button: ButtonComponentType = ({text, children, loading, ...props}) => {
  const {active, gradient, disabled, rounded, outline, size, textColor: color} = props;
  const theme = useTheme();

  const textColor = getColor(theme, disabled, color, active || gradient);
  const textSize = size === SMALL ? 'body' : 'title-3';
  const {locations, start, end} = gradientConfig;
  const gradientStyle = !disabled && (active || gradient);

  if (__DEV__) {
    if (disabled && (active || gradient)) console.warn("You can't use `gradient` prop when your button is disabled.");
    if (rounded && !outline && !gradient && !active)
      console.warn('To use `rounded` prop you need the `outline`, `gradient` or `active` prop as well.');
    if (children && text) console.warn("You can't use `title` prop combined with `children`. Use only one of both.");
  }

  function renderChildren() {
    if (loading) return <ActivityIndicator size="large" color={theme.styledTheme.white} />;

    return children ? (
      children
    ) : (
      <Text variant={textSize} color={textColor} type="bold">
        {text}
      </Text>
    );
  }

  return (
    <Touchable {...props}>
      {gradientStyle ? (
        <StyledLinearGradient
          size={size}
          locations={locations}
          start={start}
          end={end}
          colors={[theme.styledTheme.greenDark, theme.styledTheme.greenLight]}
          active={active}
          rounded={rounded}
          gradient={gradient}>
          {renderChildren()}
        </StyledLinearGradient>
      ) : (
        renderChildren()
      )}
    </Touchable>
  );
};

export default Button as React.FC<ButtonProps>;
