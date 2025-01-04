import {View, Text, Alert, StyleSheet} from 'react-native';
import React, {FC, useState} from 'react';
import {resetAndNavigate} from '@utils/NavigationUtils';
import {deliveryLogin} from '@service/authService';
import CustomSafeAreaView from '@components/global/CustomSafeAreaView';
import {ScrollView} from 'react-native-gesture-handler';
import {screenHeight} from '@utils/Scaling';
import LottieView from 'lottie-react-native';
import {GestureHandlerRootView} from 'react-native-gesture-handler'; // Import the GestureHandlerRootView
import CustomText from '@components/ui/CustomText';
import {Fonts} from '@utils/Constants';
import CustomInput from '@components/ui/Custominput';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {RFValue} from 'react-native-responsive-fontsize';
import CustomButton from '@components/ui/CustomButton';

const DeliveryLogin: FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const handleLogin = async () => {
    setLoading(true);
    try {
      await deliveryLogin(email, password);
      resetAndNavigate('DeliveryDashboard');
    } catch (error) {
      Alert.alert('Login Failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    // Wrap the entire component with GestureHandlerRootView
    <GestureHandlerRootView style={{flex: 1}}>
      <CustomSafeAreaView>
        <ScrollView
          keyboardShouldPersistTaps="handled"
          keyboardDismissMode="on-drag">
          <View style={styles.container}>
            <View style={styles.lottieContainer}>
              <LottieView
                source={require('@assets/animations/delivery_man.json')}
                autoPlay
                loop
                style={styles.lottie}
              />
            </View>
            <CustomText varient="h3" fontFamily={Fonts.Bold}>
              Delivery Partner Portal
            </CustomText>
            <CustomText varient="h6" fontFamily={Fonts.SemiBold}>
              Just open the door..
            </CustomText>
            <CustomInput
              onChangeText={setEmail}
              value={email}
              left={
                <Icon
                  name="email"
                  size={RFValue(18)}
                  color="#340c5c"
                  style={{marginLeft: 10}}
                />
              }
              placeholder="Email"
              inputMode="email"
              right={false}
            />
            <CustomInput
              onChangeText={setPassword}
              value={password}
              left={
                <Icon
                  name="key"
                  size={RFValue(18)}
                  color="#340c5c"
                  style={{marginLeft: 10}}
                />
              }
              placeholder="Password"
              secureTextEntry
              right={false}
            />

            <CustomButton
              disabled={email.length == 0 || password.length < 8}
              title="Login"
              onPress={handleLogin}
              loading={loading}
            />
          </View>
        </ScrollView>
      </CustomSafeAreaView>
    </GestureHandlerRootView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    alignItems: 'center',
  },
  lottie: {
    height: '100%',
    width: '100%',
  },
  lottieContainer: {
    height: screenHeight * 0.12,
    width: '100%',
  },
  text: {
    marginTop: 2,
    marginBottom: 25,
    opacity: 0.8,
  },
});

export default DeliveryLogin;
