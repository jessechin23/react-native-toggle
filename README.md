# react-native-toggle

**** work in progress ****

The goal of this project is to create a customisable toggle button with loading animation when the app is waiting for an API response.  With a iOS-like toggle animation.

Customisable toggle switch for React Native

## Installation

```sh
npm install react-native-toggle
```

## Usage

```js
import { Toggle } from 'react-native-toggle';

// ...

<Toggle onPress={() => { }} 
    isLoading={loading}
    useReactNativeSwitch={false}
    showLoadingIndicator={true}
/>
```

## Contributing

See the [contributing guide](CONTRIBUTING.md) to learn how to contribute to the repository and the development workflow.

## License

MIT

---

Made with [create-react-native-library](https://github.com/callstack/react-native-builder-bob)
