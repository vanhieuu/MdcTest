
import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {APP_SCREEN, UnAuthenParamList} from '../screen-types';

import Login from '../../screen/Login';


const Stack = createNativeStackNavigator<UnAuthenParamList>();

const UnAuthenScreen = () => {
  return (
    <Stack.Navigator screenOptions={{headerShown:false}}>
      <Stack.Screen name={APP_SCREEN.LOGIN} component={Login} />
    </Stack.Navigator>
  );
};

export default UnAuthenScreen;
