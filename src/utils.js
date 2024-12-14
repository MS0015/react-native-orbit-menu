import {Dimensions} from 'react-native';
import {runOnJS} from 'react-native-reanimated';

export const getScreenWidth = () => Dimensions.get('screen').width;

export const getWidthPercentage = percentage => {
  return (getScreenWidth() * Number(percentage)) / 100;
};

// Mark functions that will be used in worklets with 'worklet'
export const pointOnCircle = config => {
  'worklet';
  const {radius, angle, cx, cy} = config;
  const angleInRadians = angle * (Math.PI / 180);
  const x = cx + radius * Math.cos(angleInRadians);
  const y = cy + radius * Math.sin(angleInRadians);
  return [x, y];
};

export const calculateRadius = (center, point) => {
  'worklet';
  const dx = center.x - point.x;
  const dy = center.y - point.y;
  return Math.sqrt(dx * dx + dy * dy);
};

export const calculateAngle = (center, p1, p2) => {
  'worklet';
  const angle1 = Math.atan2(p1.y - center.y, p1.x - center.x);
  const angle2 = Math.atan2(p2.y - center.y, p2.x - center.x);
  return ((angle2 - angle1) * 180) / Math.PI;
};
