export enum APP_SCREEN {
  LOGIN = 'LOGIN',
  HOME = 'HOME',
  UN_AUTH = 'UN_AUTH',
  AUTH = 'AUTHEN',
}

export type UnAuthenParamList = {
  [APP_SCREEN.LOGIN]: undefined;
};
export type AuthenParamList = {
  [APP_SCREEN.HOME]: undefined;
};

export type RootStackParamList = {
  [APP_SCREEN.AUTH]: undefined;
  [APP_SCREEN.UN_AUTH]: undefined;
} & AuthenParamList &
  UnAuthenParamList;
