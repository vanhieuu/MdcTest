import {StyleSheet, Dimensions} from 'react-native';
const {width, height} = Dimensions.get('window');

const [shortDimension] = width < height ? [width, height] : [height, width];

const guidelineBaseWidth = 350;

const scale = (size: number) => (shortDimension / guidelineBaseWidth) * size;

export const sizeScale = (size: number, factor = 0.5) =>
  size + (scale(size) - size) * factor;
export const enhance = <T>(arrStyle: Array<T>) => {
  return StyleSheet.flatten<T>(arrStyle);
};

export const checkKeyInObject = (T: any, key: string) => {
  return Object.keys(T).includes(key);
};
export const propsToStyle = <T = any>(arrStyle: Array<T>) => {
  return arrStyle
    .filter(
      x => x !== undefined && !Object.values(x!).some(v => v === undefined),
    )
    .reduce((prev: any, curr: any) => {
      // eslint-disable-next-line prefer-destructuring
      const firstKey = Object.keys(curr)[0];
      const firstValue = curr[firstKey];

      if (
        !['opacity', 'zIndex', 'flex'].includes(firstKey as never) &&
        typeof firstValue === 'number'
      ) {
        curr[firstKey as string] = sizeScale(firstValue);
      }
      return {...prev, ...curr};
    }, {});
};
