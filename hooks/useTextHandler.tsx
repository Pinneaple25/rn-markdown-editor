import { useEffect, useRef, useState } from "react";
import { Alert } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

export const useTextHandler = () => {
  const [txt, setTxt] = useState("");
  const prevTxt = useRef("")
  const [{start, end}, setSelector] = useState({ end: 0, start: 0});

  useEffect(() => {
    changeSelection();
    prevTxt.current = txt;
  }, [txt]);

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

  const underline = (s: string) => {
    if (isSelectedDiffLines()) 
      return;

    if (selectionContains(s)) 
      return deleteFromText(s);

    insertInText(s);
  }

  const getSelectedText = (offset = 0) => txt.slice(start - offset, end + offset);

  const getSelectedLines = () => {
    const startLines = txt.slice(0, start).split('\n').length + 1;
    const endLines = txt.slice(end).split('\n').length + 1;

    return { startLines, endLines };
  }

  const insertInText = (s: string) => {
    const begin = txt.slice(0, start);
    const selected = txt.slice(start, end);
    const ending = txt.slice(end);

    const result = begin + s + selected + s + ending;
    setTxt(result); 
  }

  const deleteFromText = (s: string) => {
    const offset = s.length;

    const begin = txt.slice(0, start - offset);
    const selected = txt.slice(start - offset, end + offset)
      .replace(s, '')
      .replace(s, '');
    const ending = txt.slice(end + offset);

    const result = begin + selected + ending
    setTxt(result); 
  }

  const isSelectedDiffLines = () => {
    const selectedText = getSelectedText();
    return selectedText.includes('\n');
  }

  const selectionContains = (s: string) => {
    const selectedText = getSelectedText(s.length);

    console.log(selectedText);

    if (selectedText.includes('\n'))
      return false

    return selectedText.includes(s);
  }

  const changeSelection = () => {
    if (end === start) return;

    const diff = txt.length - prevTxt.current.length;
    if (diff % 2 === 1) return;

    setSelector({ start: start + diff / 2, end: end + diff / 2});
  }

  return {
    txt,
    setTxt,
    selector: {start, end},
    setSelector,
    saveText,
    loadText,
    deleteText,
    underline,
  }
}

export default useTextHandler;