import { useEffect, useState } from "react";
import { Pressable, View, TextInput, Alert } from "react-native";

import Ionicons from '@expo/vector-icons/Ionicons';

import AsyncStorage from '@react-native-async-storage/async-storage';

import ModalPromp from "@/components/ModalPromp";
import { useRequest } from "@/hooks/useRequest";
import { globalStyles } from '@/styles/global-styles';

export const MarkdownApp = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [txt, setTxt] = useState("");
  const { url, setUrl, postRequest, saveUrl } = useRequest();

  useEffect(() => {
    loadText();
  }, []);
  
  const saveText = async () => {
    try {
      await AsyncStorage.setItem('text', txt);
      Alert.alert("Text saved!", "The text was successfully saved.");
    } catch (e) {
      Alert.alert("Oops!", "Something went wrong while saving the text.");
    }
  };

  const loadText = async () => {
    const value = await AsyncStorage.getItem('text');
    if (value !== null) 
      setTxt(value);
  };

  const deleteText = async () => {
    await AsyncStorage.removeItem('text');
    setTxt("");
  }

  const onClosePromp = async () => {
    setIsVisible(false);
    await saveUrl();
  }

  const sendRequest = async () => {
    const isRequestSucceded = await postRequest(txt);

    if (!isRequestSucceded) 
      return;

    Alert.alert("Request succeded!", "Do you wish to clean the text?", [
      { text: 'Sure, clean this mess', onPress: deleteText, style: 'default', },
      { text: 'No, I want to continue writing it', style: 'cancel' },
    ], { cancelable: true });
  }

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

        <Pressable style={ globalStyles.button } onPress={ async() => await sendRequest() }>
          <Ionicons name="send" size={32} color="blue" />
        </Pressable>

        <Pressable style={ globalStyles.button } onPress={ () => setIsVisible(true) }>
          <Ionicons name="settings" size={32} color="gray" />
        </Pressable>

        <ModalPromp
          isVisible={ isVisible }
          onClose={ async () => await onClosePromp() }
          inputValue={ url }
          title="Write the URL"
          onChangeText={ setUrl }
        />
      </View>
      </View>
  );
}

export default MarkdownApp;