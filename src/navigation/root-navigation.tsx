import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {APP_SCREEN, RootStackParamList} from './screen-types';
import {NavigationContainer} from '@react-navigation/native';
import AuthenScreen from './authen';
import UnAuthenScreen from './unAuthen';
import {useSelector} from 'react-redux';
import {RootState} from '../store';
const Stack = createNativeStackNavigator<RootStackParamList>();

const RootNavigation = () => {
  const appToken = useSelector<RootState, any>(state => state.appReducer.token);


  



  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{headerShown: false}}>
        {appToken != null && appToken  ? (
          <Stack.Screen name={APP_SCREEN.AUTH} component={AuthenScreen} />
          ) : (
            <Stack.Screen name={APP_SCREEN.UN_AUTH} component={UnAuthenScreen} />
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default RootNavigation;
