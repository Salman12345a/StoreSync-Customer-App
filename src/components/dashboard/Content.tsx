import React from 'react';
import {View, StyleSheet} from 'react-native';
import {adData} from '@utils/dummyData'; // Ensure this path is correct
import AdCarousal from './AdCarousal'; // Ensure this path is correct

const Content = () => {
  return (
    <View style={styles.container}>
      <AdCarousal adData={adData} />{' '}
      {/* Ensure adData is being passed correctly */}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 20, // This style should be fine for spacing
  },
});

export default Content;
