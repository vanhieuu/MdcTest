import {api} from './apit';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const apiLogin = (username: string, password: string) =>
  api.onLogin(username, password).then(res => res.data);
export const apiOnGetData = (page: number) =>
  api.onGetData(page).then(res => res.data);

export const onSetToken = async (key: string, value: any) => {
  try {
    const jsonValue = JSON.stringify(value)
    await AsyncStorage.setItem(key, jsonValue);
  } catch (e) {
    console.error(e);
  }
};

export const onGetToken = async (key: string) => {
  try {
    const jsonValue = await AsyncStorage.getItem(key);
    return jsonValue != null ? JSON.parse(jsonValue) : null;
    
  } catch (e) {
    // error reading value
  }
};
