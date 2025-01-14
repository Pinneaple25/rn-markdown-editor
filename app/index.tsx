import { useEffect, useState } from "react";
import { Pressable, View, TextInput, Alert } from "react-native";
import Ionicons from '@expo/vector-icons/Ionicons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { globalStyles } from '@/styles/global-styles';

export const MarkdownApp = () => {

  const [txt, setTxt] = useState("");

  useEffect(() => {
    loadText();
  }, []);
  
  const saveText = async () => {
    try {
      await AsyncStorage.setItem('my-key', txt);
      Alert.alert("", "Changes saved.");
    } catch (e) {
      Alert.alert("Error on save!", `${e}`);
    }
  };

  const loadText = async () => {
    try {
      const value = await AsyncStorage.getItem('my-key');
      if (value !== null) {
        setTxt(value);
      }
    } catch (e) {
      Alert.alert("Error on load!", `${e}`);
    }
  };

  return (
    <View
      style={ globalStyles.container }
    >
      <TextInput
        value={ txt }
        style={ globalStyles.textInput }
        multiline
        onChangeText={ setTxt }
      />

      <View style={ globalStyles.buttonsContainer }>
        <Pressable style={ globalStyles.button } onPress={ saveText }>
          <Ionicons name="save" size={32} color="green" />
        </Pressable>

        <Pressable style={ globalStyles.button } onPress={() => console.log('Send information')}>
          <Ionicons name="send" size={32} color="blue" />
        </Pressable>
      </View>
      </View>
  );
}

export default MarkdownApp;