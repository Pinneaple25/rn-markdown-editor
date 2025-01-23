import AsyncStorage from "@react-native-async-storage/async-storage";
import { useState } from "react";
import { Alert } from "react-native";

export const useTextHandler = () => {
  const [txt, setTxt] = useState("");

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

  return {
    txt,
    setTxt,
    saveText,
    loadText,
    deleteText,
  }
}

export default useTextHandler;