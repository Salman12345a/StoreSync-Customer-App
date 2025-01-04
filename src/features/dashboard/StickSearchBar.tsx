import React, {FC} from 'react';
import {StyleSheet} from 'react-native';
import {
  StickyView,
  useCollapsibleContext,
} from '@r0b0t3d/react-native-collapsible';
import {Colors} from '@utils/Constants';
import Animated, {
  useAnimatedStyle,
  interpolateColor,
  Extrapolate,
} from 'react-native-reanimated';
import SearchBar from '@components/dashboard/SearchBar';

const StickSearchBar: FC = () => {
  const {scrollY} = useCollapsibleContext();

  // Animated style for background color
  const animatedBackgroundStyle = useAnimatedStyle(() => {
    const backgroundColor = interpolateColor(
      scrollY.value,
      [0, 140], // Scroll range
      ['rgba(255, 255, 255, 0)', 'rgba(255, 255, 255, 1)'], // Colors
    );
    return {backgroundColor};
  });

  // Animated style for shadow opacity
  const animatedShadowStyle = useAnimatedStyle(() => {
    const opacity = scrollY.value < 140 ? scrollY.value / 140 : 1;
    return {opacity};
  });

  return (
    <StickyView style={[styles.stick]}>
      {/* Animated View for SearchBar */}
      <Animated.View style={[styles.container, animatedBackgroundStyle]}>
        <SearchBar />
      </Animated.View>

      {/* Shadow below the SearchBar */}
      <Animated.View style={[styles.shadow, animatedShadowStyle]} />
    </StickyView>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    position: 'relative',
    zIndex: 1,
    marginBottom: 10,
  },
  stick: {
    backgroundColor: 'transparent',
  },

  shadow: {
    height: 10,
    width: '100%',
    borderBottomWidth: 1,
    borderBottomColor: 'transparent',
    position: 'absolute',
    bottom: 0,
  },
});

export default StickSearchBar;
