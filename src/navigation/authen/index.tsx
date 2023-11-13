import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {APP_SCREEN, AuthenParamList} from '../screen-types';
import Home from '../../screen/Home';
type Props = {};

const Stack = createNativeStackNavigator<AuthenParamList>();

const AuthenScreen = (props: Props) => {
  return (
    <Stack.Navigator screenOptions={{headerShown:false}}>
      <Stack.Screen name={APP_SCREEN.HOME} component={Home} />
    </Stack.Navigator>
  );
};

export default AuthenScreen;

const styles = StyleSheet.create({});
