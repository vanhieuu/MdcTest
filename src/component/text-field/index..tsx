/* eslint-disable @typescript-eslint/no-explicit-any */
import React, {forwardRef} from 'react';


import {InputFlat} from './inputFlat';
import { TextFieldProps } from './type';

const TextFieldComponent = forwardRef<any, TextFieldProps>((props, refs) => {
  // state
  const {typeInput = 'flat'} = props;

  // render

  return <InputFlat {...props} ref={refs} />;
});
export const TextField = TextFieldComponent;
