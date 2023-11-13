import {StyleSheet} from 'react-native';
import {sizeScale} from '../../common/handle';
export const textPresets = StyleSheet.create({
  linkTitle: {
    fontSize: sizeScale(24),
    lineHeight: 32,
    fontWeight: '600',
    color: '#000000',
  },
  linkSubtitle: {
    fontSize: sizeScale(20),
    lineHeight: 32,
    fontWeight: '600',
    color: '#000000',
  },
  linkLarge: {
    fontSize: sizeScale(18),
    lineHeight: 34,
    fontWeight: '600',
    color: '#000000',
  },
  linkMedium: {
    fontSize: sizeScale(16),
    lineHeight: 30,
    fontWeight: '600',
    color: '#000000',
  },
  linkSmall: {
    fontSize: sizeScale(14),
    lineHeight: 20,
    fontWeight: '600',
    color: '#000000',
  },
  linkXSmall: {
    fontSize: sizeScale(11),
    lineHeight: 20,
    fontWeight: '600',
    color: '#000000',
  },
  linkXXSmall: {
    fontSize: sizeScale(9),
    lineHeight: 20,
    fontWeight: '600',
    color: '#000000',
  },
  textMedium: {
    fontSize: sizeScale(16),
    lineHeight: 30,
    fontWeight: 'normal',
    color: '#000000',
  },
  textSmall: {
    fontSize: sizeScale(14),
    lineHeight: 20,
    fontWeight: 'normal',
    color: '#000000',
  },
  textXSmall: {
    fontSize: sizeScale(11),
    lineHeight: 20,
    fontWeight: 'normal',
    color: '#000000',
  },
  textXXSmall: {
    fontSize: sizeScale(9),
    lineHeight: 20,
    fontWeight: 'normal',
    color: '#000000',
  },
  default: {},
});

export type TextPresetNames = keyof typeof textPresets;
