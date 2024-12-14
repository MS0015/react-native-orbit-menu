import React from "react";
import { View, StyleSheet, I18nManager } from "react-native";
import { Gesture, GestureDetector } from "react-native-gesture-handler";
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withSpring,
  runOnJS,
} from "react-native-reanimated";
import {
  getWidthPercentage,
  pointOnCircle,
  calculateRadius,
  calculateAngle,
} from "./utils";

const OrbitMenu = ({
  content = [],
  size = getWidthPercentage(100),
  contentContainerStyle,
  centerContent,
  centerContentSize = size / 4,
  rotateCenterImage = false,
  backgroundColor,
  onRotationChange,
}) => {
  const offsetAngle = useSharedValue(0);
  const prevTouchPoint = useSharedValue({ x: 0, y: 0 });

  const center = { x: size / 2, y: size / 2 };
  const radius = size / 3;
  const divisionAngle = content.length ? 360 / content.length : 0;

  const panGesture = Gesture.Pan()
    .onStart((e) => {
      "worklet";
      prevTouchPoint.value = { x: e.x, y: e.y };
    })
    .onUpdate((e) => {
      "worklet";
      const currentPoint = { x: e.x, y: e.y };
      const touchDistance = calculateRadius(center, currentPoint);

      if (touchDistance > radius * 0.3 && touchDistance < radius * 1.5) {
        const angleMoved = calculateAngle(
          center,
          prevTouchPoint.value,
          currentPoint
        );

        const newAngle =
          offsetAngle.value + (I18nManager.isRTL ? -angleMoved : angleMoved);
        offsetAngle.value = newAngle;

        if (onRotationChange) {
          runOnJS(onRotationChange)(newAngle);
        }

        prevTouchPoint.value = currentPoint;
      }
    });

  const getElementStyle = (index) => {
    return useAnimatedStyle(() => {
      const [x, y] = pointOnCircle({
        radius,
        angle: divisionAngle * (index + 1) + offsetAngle.value + 90,
        cx: center.x,
        cy: center.y,
      });

      const elementSize = size / 4;

      return {
        transform: [
          { translateX: withSpring(x - elementSize / 2) },
          { translateY: withSpring(y - elementSize / 2) },
        ],
      };
    });
  };

  const centerContentStyle = useAnimatedStyle(() => {
    if (!rotateCenterImage) return {};

    return {
      transform: [
        {
          rotate: `${
            I18nManager.isRTL ? -offsetAngle.value : offsetAngle.value
          }deg`,
        },
      ],
    };
  });

  return (
    <GestureDetector gesture={panGesture}>
      <View
        style={[
          styles.container,
          { width: size, height: size, backgroundColor },
        ]}
      >
        {content.map((element, index) => {
          const elementSize = size / 4;

          return (
            <Animated.View
              key={index}
              style={[
                styles.element,
                {
                  width: elementSize,
                  height: elementSize,
                  backgroundColor: contentContainerStyle?.backgroundColor,
                  borderColor: contentContainerStyle?.borderColor,
                  borderRadius: contentContainerStyle?.borderRadius,
                  borderWidth: contentContainerStyle?.borderWidth,
                },
                getElementStyle(index),
              ]}
            >
              {element}
            </Animated.View>
          );
        })}

        {centerContent && (
          <Animated.View
            style={[
              styles.centerContent,
              {
                left: center.x - centerContentSize / 2,
                top: center.y - centerContentSize / 2,
                width: centerContentSize,
                height: centerContentSize,
              },
              centerContentStyle,
            ]}
          >
            {centerContent}
          </Animated.View>
        )}
      </View>
    </GestureDetector>
  );
};

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    bottom: 130,
    left: -100,
  },
  element: {
    position: "absolute",
    justifyContent: "center",
    alignItems: "center",
  },
  centerContent: {
    position: "absolute",
    justifyContent: "center",
    alignItems: "center",
  },
});

export default OrbitMenu;
