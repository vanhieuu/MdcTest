import React from 'react';
import {RegisterOptions, useController, useFormContext} from 'react-hook-form';
import {TextInputProps, TouchableOpacity} from 'react-native';
import {useTheme} from '../../../themes';
import {Text} from '../../../component/text';
import {TextField} from '../../../component/text-field/index.';
import { SvgComponent } from '../../../assets/svgIcon';

export type FormLoginType = {
  name: string;
  password: string;
};

export type HookFormRules = Exclude<
  RegisterOptions,
  'valueAsNumber' | 'valueAsDate' | 'setValueAs'
>;
interface InputProps extends TextInputProps {
  name: keyof FormLoginType;

  title: string;
  rules?: HookFormRules;
  label?: string;
  onSubmit?: () => void;
  nameTrigger?: keyof FormLoginType;
  defaultValue?: string;
}

const InputComponent = (props: InputProps) => {
  const {
    name,
    rules,
    nameTrigger,
    defaultValue = '',
    title,
    onSubmit,
    label,
    placeholder,
   
    ...rest
  } = props;
  const {trigger, getValues} = useFormContext<FormLoginType>();
  const [isPassword, setIsPassword] = React.useState<boolean>(true);
  const theme = useTheme();
  const {
    field,
    fieldState: {invalid, error},
  } = useController({
    name,
    rules,
    defaultValue,
  });

  return (
    <>
      <Text
        color={theme.colors.text}
        fontFamily="medium"
        style={{marginBottom: 8}}>
        {title}
      </Text>
      <TextField
        typeInput={'flat'}
        onSubmit={onSubmit}
        ref={field.ref}
        nameTrigger={nameTrigger}
        trigger={trigger}
        error={invalid}
        inputStyle={{
          color: invalid ? theme.colors.error : 'black',
          fontSize: 16,
          // lineHeight:26,
        }}
        label={label}
        value={field.value}
        name={name}
        placeholder={placeholder}
        placeholderColor={'#B2B2B2'}
        secureTextEntry={name === 'password' ? isPassword : false}
        onChangeText={field.onChange}
        onBlur={field.onBlur}
        defaultValue={getValues()[name]}
        rightChildren={
          name === 'password' ? (
            <TouchableOpacity
              onPress={() => {
                setIsPassword(!isPassword);
              }}>
                 <Text>Show</Text>
              </TouchableOpacity>
          ) : null
        }
        {...rest}
      />
    </>
  );
};

export const Input = React.memo(InputComponent);
