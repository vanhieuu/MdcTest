import {api} from './apit';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const apiLogin = (username: string, password: string) =>
  api.onLogin(username, password).then(res => res.data);
export const apiOnGetData = (page: number) =>
  api.onGetData(page).then(res => res.data);

export const onSetToken = async (key: string, value: any) => {
  try {
    await AsyncStorage.setItem(key, value);
  } catch (e) {
    console.error(e);
  }
};

export const onGetToken = async (key: string) => {
  try {
    const value = await AsyncStorage.getItem(key);
    if (value !== null) {
      return value
    }
  } catch (e) {
    // error reading value
  }
};
