import {StyleSheet} from 'react-native';
import styled, {DefaultTheme} from 'styled-components/native';
import Theme from '../theme/Theme';

export const FullScreen = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
`;

export const Title = styled.Text`
  font-size: 30;
  color: ${props => props.theme.darkBlue};
  font-weight: bold;
`;

type ColoredTextProps = {
  themeColor?: keyof DefaultTheme;
};

export const ColoredText = styled.Text<ColoredTextProps>`
  color: ${props => props.theme[props.themeColor || 'darkBlue']};
`;

const common = StyleSheet.create({
  fullScreenCenter: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 30,
    color: Theme.darkBlue,
    fontWeight: 'bold',
  },
  containWidth: {
    width: '100%',
  },
});

export default common;
