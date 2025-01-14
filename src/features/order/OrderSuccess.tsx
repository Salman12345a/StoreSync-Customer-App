import {View, Text, StyleSheet} from 'react-native';
import React, {FC, useEffect} from 'react';
import LottieView from 'lottie-react-native';
import {screenWidth} from '@utils/Scaling';
import {Colors, Fonts} from '@utils/Constants';
import CustomInput from '@components/ui/Custominput';
import CustomText from '@components/ui/CustomText';
import {useAuthStore} from '@state/authStore';
import {replace} from '@utils/NavigationUtils';

const OrderSuccess: FC = () => {
  const {user} = useAuthStore();

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      replace('LiveTracking');
    }, 2300);
    return () => clearTimeout(timeoutId);
  }, []);

  return (
    <View style={styles.container}>
      <LottieView
        source={require('@assets/animations/confirm.json')}
        autoPlay
        loop={false}
        speed={1}
        style={styles.lottieView}
        enableMergePathsAndroidForKitKatAndAbove
        hardwareAccelerationAndroid
      />
      <CustomText
        varient="h8"
        fontFamily={Fonts.SemiBold}
        style={styles.orderPlaceText}>
        ORDER PLACED
      </CustomText>
      <View style={styles.deliveryContainer}>
        <CustomText
          varient="h4"
          fontFamily={Fonts.SemiBold}
          style={styles.delivery}>
          Delivering to Home
        </CustomText>
      </View>
      <CustomText
        varient="h8"
        style={styles.addressText}
        fontFamily={Fonts.Medium}>
        {user?.address || 'SomeWhere,Knowhere'}
      </CustomText>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
  },
  lottieView: {
    width: screenWidth * 0.6,
    height: 150,
  },
  orderPlaceText: {
    opacity: 0.4,
  },
  deliveryContainer: {
    borderBottomWidth: 2,
    paddingBottom: 4,
    marginBottom: 5,
    borderColor: Colors.secondary,
  },
  delivery: {
    marginTop: 15,
    borderColor: Colors.secondary,
  },
  addressText: {
    opacity: 0.8,
    textAlign: 'center',
    width: '80%',
    marginTop: 10,
  },
});

export default OrderSuccess;
