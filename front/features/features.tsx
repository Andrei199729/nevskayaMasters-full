import {Dimensions} from 'react-native';

const {width, height} = Dimensions.get('window');
console.log(typeof width);

const vw = (percentage: number) => (width * percentage) / 100;
const vh = (percentage: number) => (height * percentage) / 100;

export const getBlockWidth = () => {
  if (width >= 1280) return vw(45);
  if (width >= 768) return vw(70);
  return vw(88);
};

export const getBlockWidthModalWall = () => {
  if (width >= 1280) return vw(46);
  if (width >= 768) return vw(70);
  return vw(88);
};

export const getBlockHeightModalWall = () => {
  if (width >= 1280) return vh(77);
  if (width >= 768) return vh(40);
  return vh(50);
};

export const getBlockFlexDirection = () => {
  if (width >= 1280) return 'row';
  if (width >= 768) return 'column';
  return 'column';
};

export const getBtnView = () => {
  if (width >= 1280) return 1;
  if (width >= 768) return 0;
  return 0;
};

export const getModalElements = () => {
  if (width >= 1280) return vw(24);
  if (width >= 768) return vw(70);
  return vw(88);
};

export const getModalElementsPositionTop = () => {
  if (width >= 1280) return 30;
  if (width >= 768) return 450;
  return 490;
};

export const getModalWidthFormElements = () => {
  if (width >= 1280) return vw(50);
  if (width >= 768) return vw(90);
  return vw(95);
};
