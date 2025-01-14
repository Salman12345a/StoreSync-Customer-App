import React, {useRef, useEffect, useState, useCallback, FC} from 'react';
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
import {useAnimatedStyle, withTiming, Easing} from 'react-native-reanimated';
import withCart from '@features/cart/WithCart';
import withLiveStatus from '@features/map/withLiveStatus';

const NOTICE_HEIGHT = -(NoticeHeight + 12);

const ProductDashboard: FC = () => {
  const {scrollY, expand} = useCollapsibleContext();
  const previousScroll = useRef<number>(0);
  const [scrollPosition, setScrollPosition] = useState(0);
  const noticePosition = useRef(new Animated.Value(NOTICE_HEIGHT)).current;
  const [showBackToTop, setShowBackToTop] = useState(false);
  const [isBackToTopDisabled, setIsBackToTopDisabled] = useState(true); // Initially disabled
  const [isScrollDown, setIsScrollDown] = useState(false); // State for scroll direction

  const handleScroll = useCallback(
    (event: any) => {
      const currentScroll = event.nativeEvent.contentOffset.y;
      setScrollPosition(currentScroll);

      // Update scroll direction
      const scrollingDown = currentScroll > 100;
      setIsScrollDown(scrollingDown);

      // Disable the Back to Top button when the user scrolls manually to the top
      if (currentScroll <= 0) {
        setShowBackToTop(false);
        setIsBackToTopDisabled(true);
      } else {
        setIsBackToTopDisabled(false); // Enable button when scrolling down
      }

      // Show/hide button based on position and scroll direction
      if (
        scrollingDown &&
        currentScroll < previousScroll.current &&
        currentScroll <= 100
      ) {
        setShowBackToTop(false);
      } else if (scrollingDown && currentScroll > previousScroll.current) {
        if (!isBackToTopDisabled) {
          setShowBackToTop(true);
        }
      } else if (currentScroll <= 150) {
        setShowBackToTop(false);
      }

      previousScroll.current = currentScroll;
    },
    [isBackToTopDisabled],
  );

  const backToTopStyle = useAnimatedStyle(() => ({
    opacity: withTiming(showBackToTop && !isBackToTopDisabled ? 1 : 0, {
      duration: 300,
    }),
    transform: [
      {
        translateY: withTiming(showBackToTop && !isBackToTopDisabled ? 0 : 10, {
          duration: 300,
        }),
      },
    ],
  }));

  const animateNotice = (toValue: number, duration: number) =>
    Animated.timing(noticePosition, {
      toValue,
      duration,
      useNativeDriver: true,
    }).start();

  const slideDown = () => animateNotice(0, 1200);
  const slideUp = () => animateNotice(NOTICE_HEIGHT, 1200);

  useEffect(() => {
    slideDown();
    const timeoutId = setTimeout(slideUp, 3500);
    return () => clearTimeout(timeoutId);
  }, []);

  const handleShowNotice = useCallback(() => {
    slideDown();
    const timeoutId = setTimeout(slideUp, 3500);
    return () => clearTimeout(timeoutId);
  }, []);

  const handleBackToTopClick = () => {
    // Smooth and slower animation to scroll to top
    scrollY.value = withTiming(0, {
      duration: 1000, // Increased duration for a slower scroll
      easing: Easing.out(Easing.cubic), // Smoother easing for a professional feel
    });

    expand(); // Expand header if required

    // Update states after the animation
    setIsBackToTopDisabled(true);
    setShowBackToTop(false);
  };

  return (
    <NoticeAnimation noticePosition={noticePosition}>
      <>
        <Visuals />
        <SafeAreaView />

        {/* Back to Top Button */}
        {showBackToTop && !isBackToTopDisabled && (
          <Animated.View style={[styles.backToTopButton, backToTopStyle]}>
            <TouchableOpacity
              onPress={handleBackToTopClick}
              style={styles.backToTopContent}>
              <Icon
                name="arrow-up-circle-outline"
                color="white"
                size={RFValue(12)}
              />
              <CustomText
                variant="h9"
                style={styles.backToTopText}
                fontFamily={Fonts.SemiBold}>
                Back to top
              </CustomText>
            </TouchableOpacity>
          </Animated.View>
        )}

        {/* Main Content */}
        <CollapsibleContainer style={styles.panelContainer}>
          <CollapsibleHeaderContainer containerStyle={styles.transparent}>
            <AnimatedHeader showNotice={handleShowNotice} />
            <StickSearchBar />
          </CollapsibleHeaderContainer>
          <CollapsibleScrollView
            nestedScrollEnabled
            style={styles.panelContainer}
            showsVerticalScrollIndicator={false}
            onScroll={handleScroll}
            onScrollEndDrag={handleScroll}>
            <Content />
            <View style={styles.footer}>
              <CustomTextLeft
                fontSize={RFValue(32)}
                fontFamily={Fonts.Bold}
                style={styles.footerText}>
                Perfectly synced your local store's
              </CustomTextLeft>
              <CustomTextLeft
                fontFamily={Fonts.Bold}
                style={styles.footerSubText}>
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
    backgroundColor: 'black',
    borderRadius: 20,
    paddingHorizontal: 10,
    paddingVertical: 5,
    zIndex: 999,
    marginTop: 4,
  },
  backToTopContent: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  backToTopText: {
    color: 'white',
  },
  footer: {
    backgroundColor: '#F8F8F8',
    padding: 20,
  },
  footerText: {
    opacity: 0.2,
  },
  footerSubText: {
    marginTop: 10,
    paddingBottom: 100,
    opacity: 0.2,
  },
});

export default withLiveStatus(
  withCart(withCollapsibleContext(ProductDashboard)),
);
