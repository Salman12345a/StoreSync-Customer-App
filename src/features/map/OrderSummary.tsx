import {View, Text, StyleSheet} from 'react-native';
import React, {FC} from 'react';
import CustomTextLeft from '@components/ui/CustomTextLeft';
import {Colors, Fonts} from '@utils/Constants';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {RFValue} from 'react-native-responsive-fontsize';
import BillDetails from '@features/order/BillDetails';
import {Image} from 'react-native';
import CustomText from '@components/ui/CustomText';

const OrderSummary: FC<{order: any}> = ({order}) => {
  const totalPrice =
    order?.items?.reduce(
      (total: number, cartItem: any) =>
        total + cartItem.item.price * cartItem.count,
      0,
    ) || 0;
  return (
    <View style={styles.container}>
      <View style={styles.flexRow}>
        <View style={styles.iconContainer}>
          <Icon
            name="shopping-outline"
            color={Colors.disabled}
            size={RFValue(20)}
          />
        </View>
        <View>
          <CustomTextLeft
            numberOfLines={1}
            varient="h7"
            fontFamily={Fonts.SemiBold}>
            Order summary
          </CustomTextLeft>

          <CustomTextLeft varient="h9" fontFamily={Fonts.Medium}>
            Order ID -#{order?.orderId}
          </CustomTextLeft>
        </View>
      </View>

      {order?.items?.map((item: any, index: number) => {
        return (
          <View style={styles.flexRow} key={index}>
            <View style={styles.imgContainer}>
              <Image source={{uri: item?.item?.image}} style={styles.img} />
            </View>
            <View style={{width: '55%'}}>
              <CustomTextLeft
                numberOfLines={2}
                varient="h8"
                fontFamily={Fonts.Medium}>
                {item.item.name}
              </CustomTextLeft>
              <CustomTextLeft varient="h9">{item.item.quantity}</CustomTextLeft>
            </View>

            <View style={{width: '20%', alignItems: 'flex-end'}}>
              <CustomTextLeft
                varient="h8"
                fontFamily={Fonts.Medium}
                style={{alignSelf: 'flex-end', marginTop: 4}}>
                ₹{item.count * item.item.price}
              </CustomTextLeft>
              <CustomText
                varient="h8"
                fontFamily={Fonts.Medium}
                style={{alignSelf: 'flex-end', marginTop: 4}}>
                {item.count}x
              </CustomText>
            </View>
          </View>
        );
      })}

      <BillDetails totalItemPrice={totalPrice} />
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
    width: '100%',
    borderRadius: 15,
    marginTop: 15,
    paddingVertical: 10,
    backgroundColor: '#fff',
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
  img: {
    width: 40,
    height: 40,
  },
  imgContainer: {
    backgroundColor: Colors.backgroundSecondary,
    padding: 10,
    borderRadius: 15,
    width: '17%',
  },
});
export default OrderSummary;
