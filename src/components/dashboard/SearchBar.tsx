import {View, TouchableOpacity, StyleSheet} from 'react-native';
import React, {FC} from 'react';

import Icon from 'react-native-vector-icons/Ionicons';
import {Colors, Fonts} from '@utils/Constants';
import {RFValue} from 'react-native-responsive-fontsize';
import RollingBar from 'react-native-rolling-bar';
import CustomTextLeft from '@components/ui/CustomTextLeft';

const SearchBar: FC = () => {
  return (
    <TouchableOpacity style={styles.container} activeOpacity={0.8}>
      <Icon name="search" color={Colors.text} size={RFValue(20)} />
      <RollingBar
        interval={3000}
        defaultStyle={false}
        customStyle={styles.textContainer}>
        <CustomTextLeft varient="h6" fontFamily={Fonts.Medium}>
          Search "chocolates"
        </CustomTextLeft>
        <CustomTextLeft varient="h6" fontFamily={Fonts.Medium}>
          Search "milk"
        </CustomTextLeft>
        <CustomTextLeft varient="h6" fontFamily={Fonts.Medium}>
          Search for ata, dal, rice
        </CustomTextLeft>
        <CustomTextLeft varient="h6" fontFamily={Fonts.Medium}>
          Search for "chips"{' '}
        </CustomTextLeft>
        <CustomTextLeft varient="h6" fontFamily={Fonts.Medium}>
          Search for "soaps,toothpaste"{' '}
        </CustomTextLeft>
      </RollingBar>
      <View style={styles.divider} />
      <Icon name="mic" color={Colors.text} size={RFValue(20)} />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderRadius: 10,
    borderWidth: 0.6,
    borderColor: Colors.border,
    marginTop: 45,
    overflow: 'hidden',
    marginHorizontal: 10,
    paddingHorizontal: 10,
    backgroundColor: 'white', // Added this line to ensure a solid white background
    height: 55, // Ensures consistent height
    marginBottom: 7,
  },
  textContainer: {
    width: '90%',
    paddingLeft: 10,
    height: 50,
    color: Colors.text,
  },
  divider: {
    width: 1,
    height: 24,
    backgroundColor: '#ddd',
    marginHorizontal: 10,
  },
});

export default SearchBar;
