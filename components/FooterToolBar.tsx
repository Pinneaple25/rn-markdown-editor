import { useEffect } from 'react';
import { Animated, Keyboard, Pressable, StyleProp, View, ViewStyle } from 'react-native';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import useAnimation from '@/hooks/useAnimation';
import { globalStyles } from '@/styles/global-styles';

interface Props {
  items: Item[],
  style?: StyleProp<ViewStyle>,
  isVisible?: boolean,
}

interface Item {
  name: keyof typeof FontAwesome.glyphMap;
  onPress: () => void;
}

export const FooterToolBar = ({ items }: Props) => {
  const { animatedValue, animateTo, animateBack } = useAnimation({ initialValue: 60, toValue: 0 });

  useEffect(() => {
    Keyboard.addListener('keyboardDidShow', animateTo);
    Keyboard.addListener('keyboardDidHide', animateBack);
  }, []);

  return (
    <Animated.ScrollView 
      horizontal={ true } 
      showsHorizontalScrollIndicator={ true }
      keyboardShouldPersistTaps={ true } 
      style={{
        transform: [{ translateY: animatedValue }],
        position: 'absolute',
        bottom: 0,
        right: 0,
        left: 0,
      }}
    >
      <View style={ globalStyles.toolsContainer }>
        { items.map((item, i) =>
          <Pressable key={ i } onPress={ item.onPress } style={{ height: 36 }}>
            <FontAwesome name={ item.name } size={ 32 } color="black" />
          </Pressable>
        )}
      </View>
    </Animated.ScrollView>
  )
}

export default FooterToolBar;