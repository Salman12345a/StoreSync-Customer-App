import {
  View,
  StyleSheet,
  Animated,
  Image,
  SafeAreaView,
  Keyboard,
  Alert,
  Dimensions,
} from 'react-native';
import React, {useEffect, useRef, useState} from 'react';
import {
  GestureHandlerRootView,
  PanGestureHandler,
  State,
} from 'react-native-gesture-handler';
import CustomSafeAreaView from '@components/global/CustomSafeAreaView';
import ProductSlider from '@components/login/ProductSlider';
import {resetAndNavigate} from '@utils/NavigationUtils';
import CustomText from '@components/ui/CustomText';
import {Colors, Fonts, lightColors} from '@utils/Constants';
import CustomInput from '@components/ui/Custominput';
import CustomButton from '@components/ui/CustomButton';
import useKeyboardOffsetHeight from '@utils/useKeyboardOffsetHeight';
import LinearGradient from 'react-native-linear-gradient';
import {customerLogin} from '@service/authService';

const bottomColors = [...lightColors].reverse();

const {width} = Dimensions.get('window');
const responsiveFontSize = (fontSize: number): number => {
  const baseWidth = 375; // Reference width (e.g., iPhone X)
  return Math.round((fontSize * width) / baseWidth);
};

const CustomerLogin: React.FC = () => {
  const [phoneNumber, setPhoneNumber] = useState('');
  const [loading, setLoading] = useState(false);
  const [gestureSequence, setGestureSequence] = useState<string[]>([]);
  const keyboardOffsetHeight = useKeyboardOffsetHeight();

  const animatedValue = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    if (keyboardOffsetHeight == 0) {
      Animated.timing(animatedValue, {
        toValue: 0,
        duration: 200,
        useNativeDriver: true,
      }).start();
    } else {
      Animated.timing(animatedValue, {
        toValue: -keyboardOffsetHeight * 0.84,
        duration: 1000,
        useNativeDriver: true,
      }).start();
    }
  });

  const handleAuth = async () => {
    Keyboard.dismiss();
    setLoading(true);
    try {
      await customerLogin(phoneNumber);
      resetAndNavigate('ProductDashboard');
    } catch (error) {
      Alert.alert('Login Failed');
    } finally {
      setLoading(false);
    }
  };

  const handleGesture = ({nativeEvent}: any) => {
    if (nativeEvent.state === State.END) {
      const {translationX, translationY} = nativeEvent;
      let direction = '';

      // Determine the direction of the gesture
      if (Math.abs(translationX) > Math.abs(translationY)) {
        direction = translationX > 0 ? 'right' : 'left';
      } else {
        direction = translationY > 0 ? 'down' : 'up';
      }

      // Update the gesture sequence, maintaining the last 5 gestures
      const newSequence = [...gestureSequence, direction].slice(-5);
      console.log(newSequence);
      setGestureSequence(newSequence);

      // Check if the gesture sequence matches the target sequence
      if (newSequence.join(' ') === 'up down left right') {
        setGestureSequence([]); // Reset the gesture sequence
        resetAndNavigate('DeliveryLogin'); // Navigate to the target screen
      }
    }
  };

  return (
    <GestureHandlerRootView style={styles.container}>
      <View style={styles.container}>
        <CustomSafeAreaView>
          <ProductSlider />
          <PanGestureHandler onHandlerStateChange={handleGesture}>
            <Animated.ScrollView
              bounces={false}
              keyboardDismissMode="on-drag"
              keyboardShouldPersistTaps="handled"
              contentContainerStyle={styles.subContainer}
              style={{transform: [{translateY: animatedValue}]}}>
              <LinearGradient colors={bottomColors} style={styles.gradient} />
              <View style={styles.content}>
                <Image
                  source={require('@assets/images/Logo.png')}
                  style={styles.logo}
                />
                <CustomText varient="h9">
                  your local shopping, perfectly synced
                </CustomText>
                <CustomText
                  varient="h5"
                  fontFamily={Fonts.SemiBold}
                  style={styles.text}>
                  Log in or Sign up
                </CustomText>
                <CustomInput
                  onChangeText={text => {
                    setPhoneNumber(text.slice(0, 10));
                  }}
                  onClear={() => setPhoneNumber('')}
                  value={phoneNumber}
                  left={
                    <CustomText
                      style={styles.phoneText}
                      varient="h6"
                      fontFamily={Fonts.SemiBold}>
                      +91
                    </CustomText>
                  }
                  placeholder="Enter mobile number"
                  inputMode="numeric"
                />

                <CustomButton
                  disabled={phoneNumber?.length != 10}
                  onPress={() => handleAuth()}
                  loading={loading}
                  title="Continue"
                />
              </View>
            </Animated.ScrollView>
          </PanGestureHandler>
        </CustomSafeAreaView>

        <View style={styles.footer}>
          <SafeAreaView>
            <CustomText fontSize={responsiveFontSize(6)}>
              By Continuing, you agree to our Terms of Service & Privacy Policy{' '}
            </CustomText>
          </SafeAreaView>
        </View>
      </View>
    </GestureHandlerRootView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  text: {
    marginTop: 2,
    marginBottom: 25,
    opacity: 0.8,
  },
  subContainer: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
    marginBottom: 20,
  },
  content: {
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    backgroundColor: 'white',
    paddingHorizontal: 20,
    paddingBottom: 20,
  },
  logo: {
    height: 50,
    width: 50,
    borderRadius: 20,
    marginVertical: 10,
  },
  phoneText: {
    marginLeft: 10,
  },
  footer: {
    borderTopWidth: 0.8,
    borderColor: Colors.border,
    paddingBottom: 10,
    zIndex: 22,
    position: 'absolute',
    bottom: 0,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 10,
    backgroundColor: '#f8f9fc',
    width: '100%',
  },
  gradient: {
    paddingTop: 60,
    width: '100%',
  },
});

export default CustomerLogin;
