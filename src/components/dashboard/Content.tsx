import React from 'react';
import {View, StyleSheet} from 'react-native';
import {adData, categories} from '@utils/dummyData'; // Ensure this path is correct
import AdCarousal from './AdCarousal'; // Ensure this path is correct
import CustomTextLeft from '@components/ui/CustomTextLeft';
import {Fonts} from '@utils/Constants';
import CategoryContainer from './CategoryContainer';

const Content = () => {
  return (
    <View style={styles.container}>
      <AdCarousal adData={adData} />
      <View style={styles.contain}>
        <CustomTextLeft varient="h5" fontFamily={Fonts.SemiBold}>
          Grocery & Kitchen
        </CustomTextLeft>
        <CategoryContainer data={categories} />
        <CustomTextLeft varient="h5" fontFamily={Fonts.SemiBold}>
          Bestsellers
        </CustomTextLeft>
        <CategoryContainer data={categories} />
        <CustomTextLeft varient="h5" fontFamily={Fonts.SemiBold}>
          Snaks & Drinks
        </CustomTextLeft>
        <CategoryContainer data={categories} />
        <CustomTextLeft varient="h5" fontFamily={Fonts.SemiBold}>
          Home & Lifestyle
        </CustomTextLeft>
        <CategoryContainer data={categories} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: 20,
    backgroundColor: '#ffff ',
  },
  contain: {
    marginTop: 20,
    paddingHorizontal: 10,
  },
});

export default Content;
