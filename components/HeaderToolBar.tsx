import { globalStyles } from '@/styles/global-styles';
import Ionicon from '@expo/vector-icons/Ionicons';
import { Pressable, StyleProp, View, ViewStyle } from 'react-native';

interface Props {
  items: Item[],
}

interface Item {
  name: keyof typeof Ionicon.glyphMap;
  onPress: () => void;
}

export const HeaderToolBar = ({ items }: Props) => {
  return (
    <View style={[ globalStyles.toolsContainer, { justifyContent: 'flex-end' } ]}>

      { items.map(item => 
        <Pressable onPress={ item.onPress }>
          <Ionicon name={ item.name } size={ 36 } color="black" />
        </Pressable>
      )}
    
    </View>
  )
}

export default HeaderToolBar;