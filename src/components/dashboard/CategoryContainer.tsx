import {View, Text, StyleSheet, Image} from 'react-native';
import React, {FC} from 'react';
import {navigate} from '@utils/NavigationUtils';
import ScalePress from '@components/ui/ScalePress';
import CustomText from '@components/ui/CustomText';
import {Fonts} from '@utils/Constants';

interface Item {
  id: string | number; // Replace with the actual type of ID
  name: string;
  image: any; // Replace `any` with the appropriate type for the image source
}

interface CategoryContainerProps {
  data: Item[];
}

const CategoryContainer: FC<CategoryContainerProps> = ({data}) => {
  const renderItems = (items: Item[]) =>
    items.map(item => (
      <ScalePress
        onPress={() => navigate('ProductCategories')}
        key={item.id}
        style={styles.item}>
        <View style={styles.imageContainer}>
          <Image source={item.image} style={styles.image} />
        </View>
        <CustomText style={styles.text} varient="h8" fontFamily={Fonts.Medium}>
          {item.name}
        </CustomText>
      </ScalePress>
    ));

  return (
    <View style={styles.container}>
      <View style={styles.row}>{renderItems(data?.slice(0, 4))}</View>
      <View style={styles.row}>{renderItems(data?.slice(4))}</View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginVertical: 15,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center', // Changed to `center` for better alignment
    marginBottom: 25,
  },
  text: {
    textAlign: 'center',
  },
  item: {
    width: '22%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  imageContainer: {
    width: '100%',
    height: 80,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
    padding: 6,
    backgroundColor: '#E5F3F3',
    marginBottom: 8,
  },
  image: {
    width: '100%',
    height: '100%',
    resizeMode: 'contain',
  },
});

export default CategoryContainer;
