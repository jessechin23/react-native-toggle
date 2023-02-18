import React, { useState } from 'react'
import { Animated, StyleSheet, Text, TouchableOpacity, Pressable, View, I18nManager, Switch } from 'react-native'
import ReactNativeHapticFeedback from 'react-native-haptic-feedback'
import Lottie from 'lottie-react-native'
import { delay } from '../example/src/utils/Tools'

interface ToggleProps {
    testID?: string
    useReactNativeSwitch?: boolean
    showLoadingIndicator?: boolean
    isLoading?: boolean
    onColor?: string
    offColor?: string
    circleColor?: string
    onText?: string
    offText?: string
    textColor?: string
    customToggleWidth?: number
    customToggleHeight?: number
    onPress: () => void
}

function Toggle(props: ToggleProps): React.ReactElement {
    const {
        useReactNativeSwitch = true,
        showLoadingIndicator = true,
        onColor = "#00c04b",
        offColor = "#ededed",
        circleColor = 'white',
        onText = 'On',
        offText = 'Off',
        textColor = 'white',
        customToggleWidth = 57,
        customToggleHeight = 32
    } = props

    const [status, setStatus] = useState(false)
    const [animation, setAnimation] = useState(new Animated.Value(0))

    // #region toggle background color animation
    const handleAnimation = () => {
        Animated.timing(animation, {
            toValue: status ? 0 : 1,
            duration: 150,
            useNativeDriver: false
        }).start()
    }

    const boxInterpolation = animation.interpolate({
        inputRange: [0, 1],
        outputRange: [offColor, onColor]
    })
    const animatedStyle = {
        backgroundColor: boxInterpolation
    }
    // #endregion


    const toggleHandle = () => {
        // setLoad(true)
        // delay(2000).then(() => setLoad(false));
        // ReactNativeHapticFeedback.trigger("selection");
        // ReactNativeHapticFeedback.trigger("impactLight", {
        //     enableVibrateFallback: true,
        //     ignoreAndroidSystemSettings: false
        // })
        setStatus(!status)
        handleAnimation()

        props.onPress()
    }

    // let toValue;
    // if (!I18nManager.isRTL && status) {
    //     toValue = 40 - 20;
    // } else if (I18nManager.isRTL && status) {
    //     toValue = -40 + 20;
    // } else {
    //     toValue = -1;
    // }

    // Animated.timing(new Animated.Value(0), {
    //     toValue,
    //     duration: 100,
    //     useNativeDriver: true,
    // }).start();

    const renderNativeToggle = (): JSX.Element => {
        return (<Switch
            trackColor={{ false: offColor, true: onColor }}
            // thumbColor={status ? "#f5dd4b" : "#f4f3f4"}
            thumbColor={circleColor}
            ios_backgroundColor={offColor}
            onValueChange={toggleHandle}
            value={status}
        />)
    }

    const renderCustomToggle = (): JSX.Element => {
        return (
            <Pressable
                // activeOpacity={1}
                onLongPress={() => console.log('long pressed')}
                onPressOut={toggleHandle}
            >
                <Animated.View style={[{ ...styles.background, ...animatedStyle }, {
                    width: customToggleWidth,
                    height: customToggleHeight,
                    backgroundColor: status ? onColor : offColor
                }]}>

                    <Text style={{ color: textColor, position: 'absolute', marginLeft: status ? 5 : 32, marginTop: 7 }}>{status ? onText : offText}</Text>
                    {/* <Text style={{ color: textColor, position: 'absolute', marginLeft: 32, marginTop: 7 }}>{offText}</Text> */}
                    <Animated.View style={[styles.toggle, {
                        transform: [{
                            translateX: status ? 25 : 0,
                        }],
                        backgroundColor: circleColor
                    }]} />
                </Animated.View>
            </Pressable>
        )
    }

    const renderSwitch = (): JSX.Element => {
        if (useReactNativeSwitch) {
            return renderNativeToggle()
        } else {
            return renderCustomToggle()
        }
    }

    return (
        <View>
            {showLoadingIndicator && props.isLoading && <Lottie style={{ height: 25 }} source={require("./assets/loading.json")} autoPlay loop />}
            {(!showLoadingIndicator || (showLoadingIndicator && !props.isLoading)) && renderSwitch()
            }
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        width: 50,
        backgroundColor: 'blue',
        borderRadius: 20,
        // justifyContent: 'center',
        // alignItems: 'center',
    },
    labelStyle: {
        marginHorizontal: 10,
    },
    background: {
        borderRadius: 32,
        padding: 2
    },
    toggle: {
        width: 28,
        height: 28,
        borderRadius: 32,

        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 1,
        },
        shadowOpacity: 0.22,
        shadowRadius: 2.22,

        // elevation: 3,
    },
    box: {
        width: 150,
        height: 150,
        backgroundColor: '#5AD2F4'
    }
});

export default Toggle