import {View, Text, StyleSheet, Image} from 'react-native';
import React from 'react';
import {useCartStore} from '@state/cartStore';
import CustomText from '@components/ui/CustomText';
import {Colors, Fonts} from '@utils/Constants';
import OrderItem from './OrderItem';
import CustomTextLeft from '@components/ui/CustomTextLeft';

const OrderList = () => {
  const cartItems = useCartStore(state => state.cart);
  const totalItems = cartItems?.reduce((acc, cart) => acc + cart?.count, 0);
  return (
    <View style={styles.container}>
      <View style={styles.flexRow}>
        <View style={styles.imgContainer}>
          <Image
            source={require('@assets/icons/clock.png')}
            style={styles.img}
          />
        </View>
        <View>
          <CustomText varient="h5" fontFamily={Fonts.SemiBold}>
            Delivery in 9 minutes
          </CustomText>
          <CustomTextLeft
            varient="h8"
            style={{opacity: 0.5}}
            fontFamily={Fonts.SemiBold}>
            Shipment of {totalItems || 0} item
          </CustomTextLeft>
        </View>
      </View>

      {cartItems?.map(item => {
        return <OrderItem key={item._id} item={item} />;
      })}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    borderRadius: 15,
    marginBottom: 15,
  },
  flexRow: {
    alignItems: 'center',
    flexDirection: 'row',
    paddingHorizontal: 10,
    paddingVertical: 12,
    gap: 12,
  },
  imgContainer: {
    backgroundColor: Colors.backgroundSecondary,
    padding: 10,
    borderRadius: 15,
  },
  img: {
    width: 30,
    height: 30,
  },
});

export default OrderList;