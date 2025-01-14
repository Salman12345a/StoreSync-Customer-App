import React, {FC} from 'react';
import {View, Text, StyleSheet} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {RFValue} from 'react-native-responsive-fontsize';
import {Colors, Fonts} from '@utils/Constants';
import CustomText from '@components/ui/CustomText';
import CustomTextLeft from '@components/ui/CustomTextLeft';

interface DeliveryDetailsProps {
  details: {
    address?: string;
    name?: string;
    phone?: string;
  };
}

const DeliveryDetails: FC<DeliveryDetailsProps> = ({details}) => {
  return (
    <View style={styles.container}>
      {/* Delivery Header */}
      <View style={styles.flexRow}>
        <View style={styles.iconContainer}>
          <Icon name="bike-fast" color={Colors.disabled} size={RFValue(20)} />
        </View>
        <View>
          <CustomTextLeft variant="h5" fontFamily={Fonts.SemiBold}>
            Your delivery details
          </CustomTextLeft>
          <CustomTextLeft variant="h8" fontFamily={Fonts.Medium}>
            Details of your current order
          </CustomTextLeft>
        </View>
      </View>

      {/* Delivery Address */}
      <View style={styles.flexRow}>
        <View style={styles.iconContainer}>
          <Icon
            name="map-marker-outline"
            color={Colors.disabled}
            size={RFValue(20)}
          />
        </View>
        <View style={{width: '80%'}}>
          <CustomTextLeft variant="h8" fontFamily={Fonts.Medium}>
            Delivery at Home
          </CustomTextLeft>
          <CustomTextLeft
            variant="h8"
            numberOfLines={2}
            fontFamily={Fonts.Regular}>
            {details?.address || '-----'}
          </CustomTextLeft>
        </View>
      </View>

      {/* Receiver's Contact */}
      <View style={styles.flexRow}>
        <View style={styles.iconContainer}>
          <Icon
            name="phone-outline"
            color={Colors.disabled}
            size={RFValue(20)}
          />
        </View>
        <View style={{width: '80%'}}>
          <CustomTextLeft variant="h8" fontFamily={Fonts.Medium}>
            {details?.name || '-----'} - {details?.phone || '-----'}
          </CustomTextLeft>
          <CustomTextLeft
            variant="h8"
            numberOfLines={2}
            fontFamily={Fonts.Regular}>
            Receiver's contact no.
          </CustomTextLeft>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    borderRadius: 15,
    marginVertical: 15,
    paddingVertical: 10,
    backgroundColor: '#fff',
  },
  flexRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    padding: 10,
    borderBottomWidth: 0.7,
    borderColor: Colors.border,
  },
  iconContainer: {
    backgroundColor: Colors.backgroundSecondary,
    borderRadius: 100,
    padding: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default DeliveryDetails;
