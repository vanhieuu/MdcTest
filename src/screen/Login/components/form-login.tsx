import React, {memo, useCallback, useEffect, useMemo} from 'react';
import {View,TouchableOpacity} from 'react-native';
import {StyleSheet} from 'react-native';
import {FormProvider, useForm} from 'react-hook-form';
import * as yup from 'yup';
import {yupResolver} from '@hookform/resolvers/yup';
import {FormLoginType, Input} from './input';
import {AppTheme, useTheme} from '../../../themes';
import { Text } from '../../../component/text';

interface FormLoginProps {
  onSubmit: (data: FormLoginType) => void;
}

const FormLoginComponent = ({onSubmit}: FormLoginProps) => {
  const validate = useMemo<yup.ObjectSchema<FormLoginType>>(
    () =>
      yup.object().shape({
        name: yup
          .string()
          .required('Tên đăng nhập không được để trống')
          .trim('Tài khoản không hợp lệ')
          .trim('Tên đăng nhập không hợp lệ'),

        password: yup
          .string()
          .min(6, 'Mật khẩu phải từ 6 ký tự trở lên')
          .trim('Mật khẩu không hợp lệ')
          .required('Mật khẩu không được để trống'),
      }),
    [],
  );

  const formMethod = useForm<FormLoginType>({
    mode: 'onSubmit',
    resolver: yupResolver(validate),
  });
  const theme = useTheme();
  const styles = rootStyle(theme);
  const onSubmitKey = useCallback(() => {
    formMethod.handleSubmit(onSubmit)();
  }, [formMethod, onSubmit]);

  useEffect(() => {
    const timeOut = setTimeout(() => {
      formMethod.clearErrors;
    }, 3000);

    return clearTimeout(timeOut);
  }, [formMethod, onSubmit]);

  return (
    <>
      <View style={styles.block}>
        <FormProvider {...formMethod}>
          <Input
            name={'name'}
            placeholder={'Nhập tên đăng nhập'}
            // typeInput={'flat'}
            secureTextEntry={false}
            title="Tên đăng nhập"
            defaultValue="test"
          />
          <Input
            name={'password'}
            secureTextEntry={true}
            placeholder={'Nhập mật khẩu'}
            // typeInput={'flat'}
            title="Mật khẩu"
            defaultValue="123456"
          />
        </FormProvider>
        <View style={styles.contentForgetPasswordView}>
          <TouchableOpacity onPress={() => {}}>
            <Text fontSize={16} style={{color: theme.colors.neutral03}}>
              Quên mật khẩu
            </Text>
          </TouchableOpacity>
        </View>
        <View style={styles.contentLogin}>
          <TouchableOpacity onPress={onSubmitKey}  style={styles.button}  >
            <Text style={styles.text}>Đăng nhập</Text>
          </TouchableOpacity>
          <TouchableOpacity style={{backgroundColor:'#000',width:45,height:45,justifyContent:'center',alignItems:'center'}}>
            <Text style={{color:'#fff'}}>FaceId</Text>
          </TouchableOpacity>
        </View>
      </View>
    </>
  );
};

export const FormLogin = memo(FormLoginComponent);

const rootStyle = (theme: AppTheme) =>
  StyleSheet.create({
    block: {
      marginHorizontal: 16,
    },
    contentForgetPasswordView: {
      flexDirection: 'row',
      justifyContent: 'flex-end',
    },
    button: {
      textAlign: 'center',
  
      height: 48,
      backgroundColor: 'black',
      borderRadius: 20,
      alignItems: 'center',
      justifyContent: 'center',
      left:-10,
      marginTop: 20,
      marginBottom: 20,
      width:'85%'

    },
    text: {
      color: theme.colors.white,
      fontSize: 16,
      fontWeight: '700',
    },
    contentLogin:{
      flexDirection:'row',
      alignItems:'center',
      justifyContent:'space-between'
    }
  });
