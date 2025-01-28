import { useEffect, useState } from "react";
import { View, TextInput, Alert, Keyboard } from "react-native";
import { router } from "expo-router";

import FooterToolBar from "@/components/FooterToolBar";
import HeaderToolBar from "@/components/HeaderToolBar";
import ModalPromp from "@/components/ModalPromp";
import useRequest from "@/hooks/useRequest";
import useTextHandler from "@/hooks/useTextHandler";
import { globalStyles } from '@/styles/global-styles';

export const MarkdownApp = () => {
  const [isVisible, setIsVisible] = useState(false);
  const { url, setUrl, postRequest, saveUrl } = useRequest();
  const { 
    txt,
    setTxt,
    selector,
    setSelector,
    saveText,
    loadText,
    deleteText,
    underline,
    indexLine,
  } = useTextHandler();

  useEffect(() => {
    loadText();
  }, []);

  const confirmChanges = () => {
    saveText();
    Keyboard.dismiss();
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
    <View style={ globalStyles.container }>
      <HeaderToolBar items={[
        { name: 'paper-plane-outline', onPress: sendRequest },
        { name: 'link-outline', onPress: () => setIsVisible(true) },
        { name: 'logo-markdown', onPress: () => router.push({ pathname: '/viewer', params: { txt } }) },
        { name: 'checkmark-outline', onPress: confirmChanges },
      ]}/>

      <TextInput
        value={ txt }
        selection={ selector }
        style={ globalStyles.textInput }
        multiline
        onChangeText={ setTxt }
        onSelectionChange={ (event) => setSelector(event.nativeEvent.selection) }
      />

      <FooterToolBar items={[
        { name: 'text-height', onPress: () => indexLine('#', 6) },
        { name: 'bold', onPress: () => underline('**') },
        { name: 'italic', onPress: () => underline('_') },
        { name: 'list-ul', onPress: () => indexLine('+') },
        { name: 'list-ol', onPress: () => indexLine('1.') },
        { name: 'quote-left', onPress: () => indexLine('>') },
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