import * as React from 'react'

import { StyleSheet, Switch, Text, View } from 'react-native'
import { Toggle } from 'react-native-toggle'
import { delay } from './utils/Tools'

export default function App() {
  const [loading, setLoading] = React.useState(false)

  return (
    <View style={styles.container}>
      <Toggle onPress={() => {
        setLoading(true)
        delay(2000).then(() => setLoading(false));
      }} isLoading={loading} useReactNativeSwitch={false} showLoadingIndicator={false} />
      <Toggle onPress={() => {
        setLoading(true)
        delay(2000).then(() => setLoading(false));
      }} isLoading={loading} useReactNativeSwitch={true} showLoadingIndicator={false} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  box: {
    width: 60,
    height: 60,
    marginVertical: 20,
  },
});
