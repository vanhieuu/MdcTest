import {useEffect} from 'react';
import  {
  Easing,
  ExtrapolationType,
  interpolate,
  SharedValue,
  useDerivedValue,
  useSharedValue,
  withTiming,
  WithTimingConfig,
} from 'react-native-reanimated';

import {sharedBin} from './math';



export const useSharedTransition = (
    state: boolean | number,
    config?: WithTimingConfig,
  ): SharedValue<number> => {
    const value = useSharedValue(0);
    useEffect(() => {
      value.value = typeof state === 'boolean' ? sharedBin(state) : state;
    }, [state, value]);
    return useDerivedValue(() =>
      withTiming(
        value.value,
        Object.assign(
          {duration: 500, easing: Easing.bezier(0.33, 0.01, 0, 1)},
          config,
        ),
      ),
    );
  };
  
  export const useInterpolate = (
    progress: SharedValue<number>,
    input: number[],
    output: number[],
    type?: ExtrapolationType,
  ) => useDerivedValue(() => interpolate(progress.value, input, output, type));