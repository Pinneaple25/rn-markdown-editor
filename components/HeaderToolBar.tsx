import { Pressable, View } from 'react-native';
import Ionicon from '@expo/vector-icons/Ionicons';
import { globalStyles } from '@/styles/global-styles';

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

      { items.map((item, i) => 
        <Pressable key={ i } onPress={ item.onPress }>
          <Ionicon name={ item.name } size={ 36 } color="black" />
        </Pressable>
      )}
    
    </View>
  )
}

export default HeaderToolBar;