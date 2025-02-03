import { Pressable, ScrollView, View } from 'react-native';
import { router, useLocalSearchParams } from 'expo-router';
import Ionicons from '@expo/vector-icons/Ionicons';
import Markdown from 'react-native-markdown-display';
import { globalStyles } from '@/styles/global-styles';

export const ViewerScreen = () => {
  const { txt } = useLocalSearchParams();
  
  return (
    <View>
      <View style={ [globalStyles.toolsContainer, { justifyContent: 'flex-start' }] }>
        <Pressable onPress={ router.back }>
          <Ionicons name='arrow-back-outline' size={36}/>
        </Pressable>
      </View>
      <ScrollView style={{ padding: 10, marginBottom: 10 }}>
        <Markdown>
          { txt }
        </Markdown>
      </ScrollView>
    </View>
  );
}

export default ViewerScreen;