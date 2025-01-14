import {View, Text, StyleSheet} from 'react-native';
import React, {FC} from 'react';
import CustomText from '@components/ui/CustomText';
import {Fonts} from '@utils/Constants';
import {formatISOToCustom} from '@utils/DateUtils';
import CustomTextLeft from '@components/ui/CustomTextLeft';

interface CartItem {
  _id: string | number;
  item: any;
  count: number;
}

interface Order {
  orderId: string;
  items: CartItem[];
  totalPrice: number;
  createdAt: string;
  status: 'confirmed' | 'completed';
}

const OrderItem: FC<{item: Order; index: number}> = ({item, index}) => {
  return (
    <View style={[styles.container, {borderTopWidth: index === 0 ? 0.7 : 0}]}>
      <View style={styles.flexRowBottom}>
        <CustomText varient="h8" fontFamily={Fonts.Medium}>
          #{item.orderId}
        </CustomText>
        <CustomText
          varient="h8"
          fontFamily={Fonts.Medium}
          style={{textTransform: 'capitalize'}}>
          {item.status}
        </CustomText>
      </View>

      <View>
        <View>
          {item?.items?.map((i, idx) => {
            return (
              <CustomTextLeft varient="h8" numberOfLines={1} key={idx}>
                {i.count}x{i.item.name}
              </CustomTextLeft>
            );
          })}
        </View>
        <View style={{alignItems: 'flex-end'}}>
          <CustomText
            varient="h5"
            fontFamily={Fonts.SemiBold}
            style={{marginTop: 10}}>
            ₹{item.totalPrice}
          </CustomText>
          <CustomText varient="h9">
            {formatISOToCustom(item.createdAt)}
          </CustomText>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    borderBottomWidth: 0.7,
    paddingVertical: 15,
    opacity: 0.9,
  },
  flexRowBottom: {
    justifyContent: 'space-between',
    alignItems: 'center',
    flexDirection: 'row',
  },
});
export default OrderItem;
