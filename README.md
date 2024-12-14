# React Native Orbit Menu

A modern, customizable circular menu component for React Native with smooth gesture-based rotation and animations.

![Demo](insert_demo_gif_path_here)

## Features

- Smooth circular rotation with gesture control
- Customizable center content
- Configurable size and styling
- RTL support
- Optional center content rotation
- Animated transitions
- TypeScript support

## Installation

```bash
# Install the package
npm install react-native-orbit-menu

# Install peer dependencies if you haven't already
npm install react-native-gesture-handler react-native-reanimated
```

### Additional Setup

1. Ensure you have Reanimated's Babel plugin in your `babel.config.js`:

```javascript
module.exports = {
  presets: ["module:metro-react-native-babel-preset"],
  plugins: ["react-native-reanimated/plugin"],
};
```

2. Wrap your app with `GestureHandlerRootView`:

```javascript
import { GestureHandlerRootView } from "react-native-gesture-handler";

export default function App() {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      {/* Your app content */}
    </GestureHandlerRootView>
  );
}
```

## Usage

Here's a basic example:

```javascript
import React from "react";
import { Image, StyleSheet } from "react-native";
import OrbitMenu from "react-native-orbit-menu";

const App = () => {
  const menuItems = [
    <Image source={require("./icon1.png")} style={styles.icon} />,
    <Image source={require("./icon2.png")} style={styles.icon} />,
    <Image source={require("./icon3.png")} style={styles.icon} />,
    <Image source={require("./icon4.png")} style={styles.icon} />,
  ];

  return (
    <OrbitMenu
      content={menuItems}
      centerContent={
        <Image source={require("./center.png")} style={styles.centerIcon} />
      }
      size={300}
      rotateCenterImage={true}
      onRotationChange={(angle) => console.log("Current angle:", angle)}
    />
  );
};

const styles = StyleSheet.create({
  icon: {
    width: 40,
    height: 40,
  },
  centerIcon: {
    width: "100%",
    height: "100%",
  },
});

export default App;
```

## Props

| Prop                    | Type        | Default      | Description                                               |
| ----------------------- | ----------- | ------------ | --------------------------------------------------------- |
| `content`               | ReactNode[] | `[]`         | Array of elements to be displayed in circular arrangement |
| `size`                  | number      | screen width | Overall size of the menu container                        |
| `contentContainerStyle` | StyleProp   | undefined    | Style for the containers holding menu items               |
| `centerContent`         | ReactNode   | undefined    | Element to be displayed in the center                     |
| `centerContentSize`     | number      | size/4       | Size of the center content container                      |
| `rotateCenterImage`     | boolean     | false        | Whether to rotate the center content with the menu        |
| `backgroundColor`       | string      | undefined    | Background color of the menu container                    |
| `onRotationChange`      | function    | undefined    | Callback fired when rotation angle changes                |

### Style Props for Content Containers

The `contentContainerStyle` prop accepts the following properties:

```javascript
{
  backgroundColor?: string;
  borderColor?: string;
  borderRadius?: number;
  borderWidth?: number;
}
```

## Examples

### Custom Styling

```javascript
<OrbitMenu
  content={menuItems}
  size={400}
  contentContainerStyle={{
    backgroundColor: "#ffffff",
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "#e0e0e0",
  }}
  backgroundColor="#f5f5f5"
/>
```

### With Center Content Rotation

```javascript
<OrbitMenu
  content={menuItems}
  centerContent={<YourCenterComponent />}
  rotateCenterImage={true}
  centerContentSize={100}
/>
```

### With Rotation Callback

```javascript
<OrbitMenu
  content={menuItems}
  onRotationChange={(angle) => {
    console.log("Current rotation:", angle);
    // Handle rotation change
  }}
/>
```

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

MIT © [Mathusuthan]

## Support

For questions and support, please open an issue in the GitHub repository.
