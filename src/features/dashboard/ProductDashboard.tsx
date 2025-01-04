import React, {useRef, useEffect} from 'react';
import {View, Text, Animated, SafeAreaView, StyleSheet} from 'react-native';

import NoticeAnimation from './NoticeAnimation';
import {NoticeHeight} from '@utils/Scaling';
import Visuals from './Visuals';
import {
  CollapsibleContainer,
  CollapsibleHeaderContainer,
  CollapsibleScrollView,
  withCollapsibleContext,
} from '@r0b0t3d/react-native-collapsible';
import AnimatedHeader from './AnimatedHeader';
import StickSearchBar from './StickSearchBar';
import Content from '@components/dashboard/Content';
import CustomText from '@components/ui/CustomText';
import {RFValue} from 'react-native-responsive-fontsize';
import {Fonts} from '@utils/Constants';
import CustomTextLeft from '@components/ui/CustomTextLeft';

const NOTICE_HEIGHT = -(NoticeHeight + 12);

const ProductDashboard = () => {
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
});

export default withCollapsibleContext(ProductDashboard);
