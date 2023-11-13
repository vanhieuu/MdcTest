import {StyleSheet, View, TouchableOpacity, Alert} from 'react-native';
import React from 'react';
import {SafeAreaView} from 'react-native-safe-area-context';
import {Text} from '../../component/text';
import {FormLoginType} from './components/input';
import {FormLogin} from './components/form-login';
import {apiLogin, onGetToken, onSetToken} from '../../api';
import {AppTheme, useTheme} from '../../themes';
import {useDispatch} from 'react-redux';
import {appActions} from '../../store/appReducer';
const LoginScreen = () => {
  const [isCheck, setIsCheck] = React.useState<boolean>(true);
  const theme = useTheme();
  const dispatch = useDispatch();

  const onSubmit = React.useCallback(async (data: FormLoginType) => {
    const result = await apiLogin(data.name, data.password);
    console.log(result,'res')
    if (result.result === 1) {
      dispatch(appActions.onSetProfile(result));
      dispatch(appActions.onSetLoginToken(result.result));

      if (isCheck === true) {
        dispatch(appActions.onSetLoginToken(result.result));
       await onSetToken('loginInfor', data);
      }
    } else {
      Alert.alert('Tên đăng nhập hoặc mật khẩu không chính xác');
    }

    console.log(result, 'res');
  }, []);

  React.useEffect(() => {
    const onGetData = async () => {
       await onGetToken('loginInfor').then(res => onSubmit(res));
      // console.log(res, 'JsonValue');
    };
    onGetData();
  }, [isCheck]);

  const onPressAutoLogin = () => {
    console.log(isCheck);
    setIsCheck(prev => !prev);
  };
  const styles = rootStyles(theme);

  return (
    <SafeAreaView style={styles.root}>
      <View style={styles.content}>
        <Text fontSize={24} color="#000">
          ĐĂNG NHẬP
        </Text>
      </View>
      <FormLogin onSubmit={onSubmit} />
      <View style={styles.autoLoginContain}>
        <TouchableOpacity onPress={onPressAutoLogin}>
          <View
            style={[
              styles.checkBoxStyle,
              {
                backgroundColor: isCheck ? theme.colors.text : 'transparent',
              },
            ]}></View>
        </TouchableOpacity>
        <Text color={'#000'} fontSize={12}>
          Tự động đăng nhập
        </Text>
      </View>
    </SafeAreaView>
  );
};

export default React.memo(LoginScreen);

const rootStyles = (theme: AppTheme) =>
  StyleSheet.create({
    root: {
      justifyContent: 'center',
      flex: 1,
      backgroundColor: '#fff',
    },
    content: {
      justifyContent: 'center',
      alignItems: 'center',
      // backgroundColor:'red',
      marginBottom: 50,
    },
    autoLoginContain: {
      marginTop: 20,
      // backgroundColor: 'red',
      flexDirection: 'row',
      marginHorizontal: 20,
    },
    checkBoxStyle: {
      width: 20,
      height: 20,
      borderWidth: 1,
      marginRight: 8,
      borderColor: theme.colors.gray05,
    },
  });
