import {View, Text, Image, StyleSheet} from 'react-native';
import React, {FC} from 'react';
import Animated, {interpolate, useAnimatedStyle} from 'react-native-reanimated';
import LinearGradient from 'react-native-linear-gradient';
import {darkWeatherColors} from '@utils/Constants';
import {screenHeight, screenWidth} from '@utils/Scaling';
import LottieView from 'lottie-react-native';
import {useCollapsibleContext} from '@r0b0t3d/react-native-collapsible';

const Visuals: FC = () => {
  const {scrollY} = useCollapsibleContext();

  const headerAnimatedStyle = useAnimatedStyle(() => {
    const opacity = interpolate(scrollY.value, [0, 120], [1, 0]);
    return {opacity};
  });
  return (
    <Animated.View style={[styles.container, headerAnimatedStyle]}>
      <LinearGradient colors={darkWeatherColors} style={styles.gradient} />
      <Image
        source={require('@assets/images/cloud.png')}
        style={styles.cloud}
      />
      <LottieView
        autoPlay={true}
        enableMergePathsAndroidForKitKatAndAbove={true}
        loop={true}
        style={styles.lottie}
        source={require('@assets/animations/raining.json')}
      />
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    width: '100%',
    height: '100%',
  },

  lottie: {
    width: '100%',
    height: 180,
    position: 'absolute',
    transform: [{scaleX: -1}],
  },

  gradient: {
    width: '100%',
    height: screenHeight * 0.4,
    position: 'absolute',
  },

  cloud: {
    width: screenWidth,
    height: 100, // Adjust this value if necessary to fit the cloud properly
    resizeMode: 'stretch',
  },
});

export default Visuals;
