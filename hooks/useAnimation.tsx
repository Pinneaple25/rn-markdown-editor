import { Animated, useAnimatedValue } from "react-native";

interface Props {
  initialValue?: number,
  toValue?: number,
  duration?: number,
}

export const useAnimation = ({ initialValue = 0, toValue = 1, duration = 300 }: Props) => {
  const animatedValue = useAnimatedValue(initialValue);

  const animateTo = () => {
    Animated.timing(animatedValue, {
      toValue,
      duration,
      useNativeDriver: true,
    }).start();
  };

  const animateBack = () => {
    Animated.timing(animatedValue, {
      toValue: initialValue,
      duration,
      useNativeDriver: true,
    }).start();
  };

  return {
    animatedValue,
    animateTo,
    animateBack,
  }
}

export default useAnimation;