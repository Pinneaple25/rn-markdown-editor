import { useEffect, useState } from "react";
import { Alert } from "react-native";
import axios from 'axios'
import AsyncStorage from "@react-native-async-storage/async-storage";

export const useRequest = () => {
  const [url, setUrl] = useState<string>('');

  useEffect(() => {
    loadUrl();
  }, [])
  
  const loadUrl = async () => {
    const value = await AsyncStorage.getItem('url');
    setUrl(value ?? "");
  }

  const saveUrl = async () => {
    await AsyncStorage.setItem('url', url);
  }

  const postRequest = async (content: string): Promise<boolean> => {
    if (!url){ 
      Alert.alert("Oops!", "It's seens like you forgot to set the URL.");
      return false;
    }

    return await axios.post<boolean>(url, content, { timeout: 5000 })
      .then(() => true)
      .catch((err: any) => {
        Alert.alert("Something went wrong!", err.message)
        return false;
      });
  }

  return {
    url,
    setUrl,
    saveUrl,
    postRequest,
  }
}

export default useRequest;