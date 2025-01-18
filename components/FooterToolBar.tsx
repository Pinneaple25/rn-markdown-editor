import { useEffect } from 'react';
import { Animated, Keyboard, Pressable, StyleProp, ViewStyle } from 'react-native';
import Feather from '@expo/vector-icons/Feather';
import useAnimation from '@/hooks/useAnimation';
import { globalStyles } from '@/styles/global-styles';

interface Props {
  items: Item[],
  style?: StyleProp<ViewStyle>,
  isVisible?: boolean,
}

interface Item {
  name: keyof typeof Feather.glyphMap;
  onPress: () => void;
}

export const FooterToolBar = ({ items }: Props) => {
  const { animatedValue, animateTo, animateBack } = useAnimation({ initialValue: 60, toValue: 0 });

  useEffect(() => {
    Keyboard.addListener('keyboardDidShow', animateTo);
    Keyboard.addListener('keyboardDidHide', animateBack);
  }, []);

  return (
    <Animated.View style={ [globalStyles.toolsContainer, { transform: [{ translateY: animatedValue }] }] }>
      { items.map((item, i) => 
        <Pressable key={ i } onPress={ item.onPress }>
          <Feather name={ item.name } size={ 36 } color="black" />
        </Pressable>
      )}
    </Animated.View>
  )
}

export default FooterToolBar;