import { Pressable, StyleProp, View, ViewStyle } from 'react-native';
import Feather from '@expo/vector-icons/Feather';
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
  return (
    <View style={ globalStyles.toolsContainer }>

      { items.map(item => 
        <Pressable onPress={ item.onPress }>
          <Feather name={ item.name } size={ 36 } color="black" />
        </Pressable>
      )}
    
    </View>
  )
}

export default FooterToolBar;