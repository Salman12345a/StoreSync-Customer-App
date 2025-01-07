import React, {useRef, useEffect, FC} from 'react';
import {
  View,
  Animated,
  SafeAreaView,
  StyleSheet,
  TouchableOpacity,
  Platform,
} from 'react-native';

import NoticeAnimation from './NoticeAnimation';
import {NoticeHeight, screenHeight} from '@utils/Scaling';
import Visuals from './Visuals';
import {
  CollapsibleContainer,
  CollapsibleHeaderContainer,
  CollapsibleScrollView,
  useCollapsibleContext,
  withCollapsibleContext,
} from '@r0b0t3d/react-native-collapsible';
import AnimatedHeader from './AnimatedHeader';
import StickSearchBar from './StickSearchBar';
import Content from '@components/dashboard/Content';
import {RFValue} from 'react-native-responsive-fontsize';
import {Fonts} from '@utils/Constants';
import CustomTextLeft from '@components/ui/CustomTextLeft';
import Icon from 'react-native-vector-icons/Ionicons';
import CustomText from '@components/ui/CustomText';
import {useAnimatedStyle, withTiming} from 'react-native-reanimated';

const NOTICE_HEIGHT = -(NoticeHeight + 12);

const ProductDashboard: FC = () => {
  const {scrollY, expand} = useCollapsibleContext();
  const previousScroll = useRef<number>(0);

  const backToTopStyle = useAnimatedStyle(() => {
    const isScrollingUp =
      scrollY.value < previousScroll.current && scrollY.value > 180;
    const opacity = withTiming(isScrollingUp ? 1 : 0, {duration: 300});
    const translateY = withTiming(isScrollingUp ? 0 : 10, {duration: 300});

    previousScroll.current = scrollY.value;

    return {
      opacity,
      transform: [{translateY}],
    };
  });
  // Animated value reference for notice position
  const noticePosition = useRef(new Animated.Value(NOTICE_HEIGHT)).current;

  // Slide up animation
  const slideUp = () => {
    Animated.timing(noticePosition, {
      toValue: NOTICE_HEIGHT,
      duration: 1200,
      useNativeDriver: true, // Use native driver for better performance
    }).start();
  };

  // Slide down animation
  const slideDown = () => {
    Animated.timing(noticePosition, {
      toValue: 0,
      duration: 1200,
      useNativeDriver: true, // Use native driver for better performance
    }).start();
  };

  // UseEffect to trigger slide animations
  useEffect(() => {
    slideDown(); // Trigger slide down initially
    const timeoutId = setTimeout(() => {
      slideUp(); // Trigger slide up after 3500ms
    }, 3500);

    // Cleanup timeout on component unmount
    return () => clearTimeout(timeoutId);
  }, []);

  // Render
  return (
    <NoticeAnimation noticePosition={noticePosition}>
      <>
        <Visuals />
        <SafeAreaView />

        <Animated.View style={[styles.backToTopButton, backToTopStyle]}>
          <TouchableOpacity
            onPress={() => {
              scrollY.value = 0;
              expand;
            }}
            style={{flexDirection: 'row', alignItems: 'center', gap: 6}}>
            <Icon
              name="arrow-up-circle-outline"
              color="white"
              size={RFValue(12)}
            />
            <CustomText
              varient="h9"
              style={{color: 'white'}}
              fontFamily={Fonts.SemiBold}>
              Back to top
            </CustomText>
          </TouchableOpacity>
        </Animated.View>

        <CollapsibleContainer style={styles.panelContainer}>
          <CollapsibleHeaderContainer containerStyle={styles.transparent}>
            <AnimatedHeader
              showNotice={() => {
                slideDown();
                const timeoutId = setTimeout(() => {
                  slideUp();
                }, 3500);

                // Cleanup timeout after notice is shown
                return () => clearTimeout(timeoutId);
              }}
            />
            <StickSearchBar />
          </CollapsibleHeaderContainer>
          <CollapsibleScrollView
            nestedScrollEnabled
            style={styles.panelContainer}
            showsVerticalScrollIndicator={false}>
            <Content />
            <View style={{backgroundColor: '#F8F8F8', padding: 20}}>
              <CustomTextLeft
                fontSize={RFValue(32)}
                fontFamily={Fonts.Bold}
                style={{opacity: 0.2}}>
                Perfectly synced your local store's
              </CustomTextLeft>
              <CustomTextLeft
                fontFamily={Fonts.Bold}
                style={{marginTop: 10, paddingBottom: 100, opacity: 0.2}}>
                Developed By Quadserv
              </CustomTextLeft>
            </View>
          </CollapsibleScrollView>
        </CollapsibleContainer>
      </>
    </NoticeAnimation>
  );
};

const styles = StyleSheet.create({
  panelContainer: {
    flex: 1,
  },
  transparent: {
    backgroundColor: 'transparent',
  },
  backToTopButton: {
    position: 'absolute',
    alignSelf: 'center',
    top: Platform.OS === 'ios' ? screenHeight * 0.18 : 100,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    backgroundColor: 'black',
    borderRadius: 20,
    paddingHorizontal: 10,
    paddingVertical: 5,
    zIndex: 999,
  },
});

export default withCollapsibleContext(ProductDashboard);
