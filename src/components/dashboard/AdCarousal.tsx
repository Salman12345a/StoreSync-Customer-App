import React, {FC, useRef, useState, useEffect} from 'react';
import {
  View,
  StyleSheet,
  Image,
  ScrollView,
  NativeSyntheticEvent,
  NativeScrollEvent,
  Dimensions,
  TouchableWithoutFeedback,
  ImageSourcePropType,
} from 'react-native';
import {useSharedValue} from 'react-native-reanimated';
import ScalePress from '../ui/ScalePress'; // Update with the correct path if ScalePress is custom

const {width: screenWidth} = Dimensions.get('window');

interface AdCarousalProps {
  adData: ImageSourcePropType[];
}

const AdCarousal: FC<AdCarousalProps> = ({adData}) => {
  if (!adData || adData.length === 0) {
    return null; // Handle edge case when no data is provided
  }

  const progressValue = useSharedValue(0);
  const scrollViewRef = useRef<ScrollView>(null);
  const [currentIndex, setCurrentIndex] = useState(1); // Start from the first "real" slide
  const [isUserInteracting, setIsUserInteracting] = useState(false);

  const extendedData = [
    adData[adData.length - 1], // Add last item at the beginning for looping
    ...adData,
    adData[0], // Add first item at the end for looping
  ];

  const onScroll = (event: NativeSyntheticEvent<NativeScrollEvent>) => {
    const contentOffsetX = event.nativeEvent.contentOffset.x;
    const index = Math.round(contentOffsetX / screenWidth);
    setCurrentIndex(index);

    // Update shared value for potential animations
    progressValue.value = index;
  };

  const handleScrollEnd = () => {
    if (scrollViewRef.current) {
      if (currentIndex === 0) {
        // Snap to last "real" slide
        scrollViewRef.current.scrollTo({
          x: adData.length * screenWidth,
          animated: false,
        });
        setCurrentIndex(adData.length);
      } else if (currentIndex === adData.length + 1) {
        // Snap to first "real" slide
        scrollViewRef.current.scrollTo({
          x: screenWidth,
          animated: false,
        });
        setCurrentIndex(1);
      }
    }
  };

  const nextSlide = () => {
    if (!isUserInteracting && scrollViewRef.current) {
      const nextIndex = currentIndex + 1;
      scrollViewRef.current.scrollTo({
        x: nextIndex * screenWidth,
        animated: true,
      });
      setCurrentIndex(nextIndex);
    }
  };

  useEffect(() => {
    const interval = setInterval(nextSlide, 3000); // Auto-play every 3 seconds
    return () => clearInterval(interval); // Cleanup interval on component unmount
  }, [currentIndex, isUserInteracting]);

  const handleUserInteractionStart = () => setIsUserInteracting(true);
  const handleUserInteractionEnd = () => setIsUserInteracting(false);

  return (
    <View style={styles.container}>
      <ScrollView
        ref={scrollViewRef}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        snapToInterval={screenWidth} // Ensures smooth snapping
        snapToAlignment="center" // Aligns each slide to the center
        onScroll={onScroll}
        onMomentumScrollEnd={handleScrollEnd}
        scrollEventThrottle={16}
        onTouchStart={handleUserInteractionStart}
        onTouchEnd={handleUserInteractionEnd}
        onScrollBeginDrag={handleUserInteractionStart}
        onScrollEndDrag={handleUserInteractionEnd}
        contentContainerStyle={{width: extendedData.length * screenWidth}}>
        {extendedData.map((item, index) => (
          <TouchableWithoutFeedback key={index}>
            <ScalePress>
              <View style={styles.slide}>
                <Image source={item} style={styles.img} />
              </View>
            </ScalePress>
          </TouchableWithoutFeedback>
        ))}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: 180, // Adjusted height
    justifyContent: 'center',
    marginRight: 10,
  },
  slide: {
    paddingHorizontal: 10,
    width: screenWidth, // Full screen width
    height: '100%',
    overflow: 'hidden',
    backgroundColor: 'transparent',
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 4},
    shadowOpacity: 0.3,

    shadowRadius: 5,
    elevation: 5, // For Android shadow
  },
  img: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover', // Ensures the image covers the entire slide
    borderRadius: 20,
  },
});

export default AdCarousal;
