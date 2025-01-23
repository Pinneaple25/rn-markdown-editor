import { useEffect, useState } from "react";
import { View, TextInput, Alert, Keyboard } from "react-native";
import { router } from "expo-router";

import AsyncStorage from '@react-native-async-storage/async-storage';

import FooterToolBar from "@/components/FooterToolBar";
import HeaderToolBar from "@/components/HeaderToolBar";
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
    if (!url)
      return setIsVisible(true);

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
      <HeaderToolBar items={[
        { name: 'save-outline', onPress: saveText },
        { name: 'paper-plane-outline', onPress: sendRequest },
        { name: 'link-outline', onPress: () => setIsVisible(true) },
        { name: 'logo-markdown', onPress: () => router.push({ pathname: '/viewer', params: { txt } }) },
        { name: 'checkmark-outline', onPress: Keyboard.dismiss },
      ]}/>

      <TextInput
        value={ txt }
        style={ globalStyles.textInput }
        multiline
        onChangeText={ setTxt }
      />

      <FooterToolBar items={[
        { name: 'type', onPress: () => console.log() },
        { name: 'bold', onPress: () => console.log() },
        { name: 'italic', onPress: () => console.log() },
        { name: 'list', onPress: () => console.log() },
      ]}/>

      <ModalPromp
        isVisible={ isVisible }
        onClose={ async () => await onClosePromp() }
        inputValue={ url }
        title="Write the URL"
        onChangeText={ setUrl }
      />
    </View>
  );
}

export default MarkdownApp;