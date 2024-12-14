"use strict";

function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _react = _interopRequireDefault(require("react"));
var _reactNative = require("react-native");
var _reactNativeGestureHandler = require("react-native-gesture-handler");
var _reactNativeReanimated = _interopRequireWildcard(require("react-native-reanimated"));
var _utils = require("./utils");
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != _typeof(e) && "function" != typeof e) return { "default": e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && {}.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n["default"] = e, t && t.set(e, n), n; }
function _interopRequireDefault(e) { return e && e.__esModule ? e : { "default": e }; }
function _slicedToArray(r, e) { return _arrayWithHoles(r) || _iterableToArrayLimit(r, e) || _unsupportedIterableToArray(r, e) || _nonIterableRest(); }
function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(r, a) { if (r) { if ("string" == typeof r) return _arrayLikeToArray(r, a); var t = {}.toString.call(r).slice(8, -1); return "Object" === t && r.constructor && (t = r.constructor.name), "Map" === t || "Set" === t ? Array.from(r) : "Arguments" === t || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t) ? _arrayLikeToArray(r, a) : void 0; } }
function _arrayLikeToArray(r, a) { (null == a || a > r.length) && (a = r.length); for (var e = 0, n = Array(a); e < a; e++) n[e] = r[e]; return n; }
function _iterableToArrayLimit(r, l) { var t = null == r ? null : "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"]; if (null != t) { var e, n, i, u, a = [], f = !0, o = !1; try { if (i = (t = t.call(r)).next, 0 === l) { if (Object(t) !== t) return; f = !1; } else for (; !(f = (e = i.call(t)).done) && (a.push(e.value), a.length !== l); f = !0); } catch (r) { o = !0, n = r; } finally { try { if (!f && null != t["return"] && (u = t["return"](), Object(u) !== u)) return; } finally { if (o) throw n; } } return a; } }
function _arrayWithHoles(r) { if (Array.isArray(r)) return r; }
var OrbitMenu = function OrbitMenu(_ref) {
  var _ref$content = _ref.content,
    content = _ref$content === void 0 ? [] : _ref$content,
    _ref$size = _ref.size,
    size = _ref$size === void 0 ? (0, _utils.getWidthPercentage)(100) : _ref$size,
    contentContainerStyle = _ref.contentContainerStyle,
    centerContent = _ref.centerContent,
    _ref$centerContentSiz = _ref.centerContentSize,
    centerContentSize = _ref$centerContentSiz === void 0 ? size / 4 : _ref$centerContentSiz,
    _ref$rotateCenterImag = _ref.rotateCenterImage,
    rotateCenterImage = _ref$rotateCenterImag === void 0 ? false : _ref$rotateCenterImag,
    backgroundColor = _ref.backgroundColor,
    onRotationChange = _ref.onRotationChange;
  var offsetAngle = (0, _reactNativeReanimated.useSharedValue)(0);
  var prevTouchPoint = (0, _reactNativeReanimated.useSharedValue)({
    x: 0,
    y: 0
  });
  var center = {
    x: size / 2,
    y: size / 2
  };
  var radius = size / 3;
  var divisionAngle = content.length ? 360 / content.length : 0;
  var panGesture = _reactNativeGestureHandler.Gesture.Pan().onStart(function (e) {
    "worklet";

    prevTouchPoint.value = {
      x: e.x,
      y: e.y
    };
  }).onUpdate(function (e) {
    "worklet";

    var currentPoint = {
      x: e.x,
      y: e.y
    };
    var touchDistance = (0, _utils.calculateRadius)(center, currentPoint);
    if (touchDistance > radius * 0.3 && touchDistance < radius * 1.5) {
      var angleMoved = (0, _utils.calculateAngle)(center, prevTouchPoint.value, currentPoint);
      var newAngle = offsetAngle.value + (_reactNative.I18nManager.isRTL ? -angleMoved : angleMoved);
      offsetAngle.value = newAngle;
      if (onRotationChange) {
        (0, _reactNativeReanimated.runOnJS)(onRotationChange)(newAngle);
      }
      prevTouchPoint.value = currentPoint;
    }
  });
  var getElementStyle = function getElementStyle(index) {
    return (0, _reactNativeReanimated.useAnimatedStyle)(function () {
      var _pointOnCircle = (0, _utils.pointOnCircle)({
          radius: radius,
          angle: divisionAngle * (index + 1) + offsetAngle.value + 90,
          cx: center.x,
          cy: center.y
        }),
        _pointOnCircle2 = _slicedToArray(_pointOnCircle, 2),
        x = _pointOnCircle2[0],
        y = _pointOnCircle2[1];
      var elementSize = size / 4;
      return {
        transform: [{
          translateX: (0, _reactNativeReanimated.withSpring)(x - elementSize / 2)
        }, {
          translateY: (0, _reactNativeReanimated.withSpring)(y - elementSize / 2)
        }]
      };
    });
  };
  var centerContentStyle = (0, _reactNativeReanimated.useAnimatedStyle)(function () {
    if (!rotateCenterImage) return {};
    return {
      transform: [{
        rotate: "".concat(_reactNative.I18nManager.isRTL ? -offsetAngle.value : offsetAngle.value, "deg")
      }]
    };
  });
  return /*#__PURE__*/_react["default"].createElement(_reactNativeGestureHandler.GestureDetector, {
    gesture: panGesture
  }, /*#__PURE__*/_react["default"].createElement(_reactNative.View, {
    style: [styles.container, {
      width: size,
      height: size,
      backgroundColor: backgroundColor
    }]
  }, content.map(function (element, index) {
    var elementSize = size / 4;
    return /*#__PURE__*/_react["default"].createElement(_reactNativeReanimated["default"].View, {
      key: index,
      style: [styles.element, {
        width: elementSize,
        height: elementSize,
        backgroundColor: contentContainerStyle === null || contentContainerStyle === void 0 ? void 0 : contentContainerStyle.backgroundColor,
        borderColor: contentContainerStyle === null || contentContainerStyle === void 0 ? void 0 : contentContainerStyle.borderColor,
        borderRadius: contentContainerStyle === null || contentContainerStyle === void 0 ? void 0 : contentContainerStyle.borderRadius,
        borderWidth: contentContainerStyle === null || contentContainerStyle === void 0 ? void 0 : contentContainerStyle.borderWidth
      }, getElementStyle(index)]
    }, element);
  }), centerContent && /*#__PURE__*/_react["default"].createElement(_reactNativeReanimated["default"].View, {
    style: [styles.centerContent, {
      left: center.x - centerContentSize / 2,
      top: center.y - centerContentSize / 2,
      width: centerContentSize,
      height: centerContentSize
    }, centerContentStyle]
  }, centerContent)));
};
var styles = _reactNative.StyleSheet.create({
  container: {
    position: "absolute",
    bottom: 130,
    left: -100
  },
  element: {
    position: "absolute",
    justifyContent: "center",
    alignItems: "center"
  },
  centerContent: {
    position: "absolute",
    justifyContent: "center",
    alignItems: "center"
  }
});
var _default = exports["default"] = OrbitMenu;