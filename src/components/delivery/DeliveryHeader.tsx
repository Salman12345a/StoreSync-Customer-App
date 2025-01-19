import {View, Text, StyleSheet, Image, TouchableOpacity} from 'react-native';
import React, {FC} from 'react';
import {useAuthStore} from '@state/authStore';
import {Colors, Fonts} from '@utils/Constants';
import CustomTextW from '@components/ui/CustomTextW';
import {resetAndNavigate} from '@utils/NavigationUtils';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {storage, tokenStorage} from '@state/storage';

interface DeliveryHeaderProps {
  name: string;
  email: string;
}

const DeliveryHeader: FC<DeliveryHeaderProps> = ({name, email}) => {
  const {logout} = useAuthStore();
  return (
    <View style={styles.flexRow}>
      <View style={styles.imgContainer}>
        <Image
          source={require('@assets/images/delivery_boy.png')}
          style={styles.img}
        />
      </View>
      <View style={styles.infoContainer}>
        <CustomTextW
          varient="h4"
          fontFamily={Fonts.SemiBold}
          color={Colors.backgroundPrimary}>
          Hello {name}!
        </CustomTextW>
        <CustomTextW varient="h8" fontFamily={Fonts.Medium}>
          {email}
        </CustomTextW>
      </View>

      <TouchableOpacity
        onPress={() => {
          resetAndNavigate('CustomerLogin');
          logout();
          tokenStorage.clearAll();
          storage.clearAll();
        }}>
        <Icon name="logout" size={30} color="white" />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  flexRow: {
    justifyContent: 'space-between',
    alignItems: 'center',
    flexDirection: 'row',
    padding: 10,
  },
  imgContainer: {
    padding: 4,
    borderRadius: 100,
    height: 60,
    width: 60,
    overflow: 'hidden',
    backgroundColor: Colors.backgroundSecondary,
  },
  img: {
    width: '100%',
    bottom: -8,
    height: '100%',
    resizeMode: 'contain',
  },
  infoContainer: {
    width: '70%',
  },
});

export default DeliveryHeader;
