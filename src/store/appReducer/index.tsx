import {createSlice, PayloadAction} from '@reduxjs/toolkit';

export type NewsHome = {
  cover: string;
  title: string;
  description: string;
};

export interface LoginState {
  token: string;
  dataHome: NewsHome[];
  profile:any
}

const initialState: LoginState = {
  token: '',
  profile:{},
  dataHome: [
    {
      cover: '',
      description: '',
      title: '',
    },
  ],
};

export const appSlice = createSlice({
  name: 'counter',
  initialState,
  reducers: {
    onSetLoginToken: (state, actions: PayloadAction<any>) => {
      state.token = actions.payload;
    },
    onSetData: (state, actions: PayloadAction<any>) => {
      state.dataHome = actions.payload;
    },
    onSetProfile:(state,actions:PayloadAction<any>) =>{
      state.profile = actions.payload
    }
  },
});

// Action creators are generated for each case reducer function
export const appActions = {...appSlice.actions};

export default appSlice.reducer;
