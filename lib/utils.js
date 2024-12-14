"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.pointOnCircle = exports.getWidthPercentage = exports.getScreenWidth = exports.calculateRadius = exports.calculateAngle = void 0;
var _reactNative = require("react-native");
var _reactNativeReanimated = require("react-native-reanimated");
var getScreenWidth = exports.getScreenWidth = function getScreenWidth() {
  return _reactNative.Dimensions.get('screen').width;
};
var getWidthPercentage = exports.getWidthPercentage = function getWidthPercentage(percentage) {
  return getScreenWidth() * Number(percentage) / 100;
};

// Mark functions that will be used in worklets with 'worklet'
var pointOnCircle = exports.pointOnCircle = function pointOnCircle(config) {
  'worklet';

  var radius = config.radius,
    angle = config.angle,
    cx = config.cx,
    cy = config.cy;
  var angleInRadians = angle * (Math.PI / 180);
  var x = cx + radius * Math.cos(angleInRadians);
  var y = cy + radius * Math.sin(angleInRadians);
  return [x, y];
};
var calculateRadius = exports.calculateRadius = function calculateRadius(center, point) {
  'worklet';

  var dx = center.x - point.x;
  var dy = center.y - point.y;
  return Math.sqrt(dx * dx + dy * dy);
};
var calculateAngle = exports.calculateAngle = function calculateAngle(center, p1, p2) {
  'worklet';

  var angle1 = Math.atan2(p1.y - center.y, p1.x - center.x);
  var angle2 = Math.atan2(p2.y - center.y, p2.x - center.x);
  return (angle2 - angle1) * 180 / Math.PI;
};