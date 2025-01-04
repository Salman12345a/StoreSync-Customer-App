import {View, Text, StyleSheet, SafeAreaView} from 'react-native';
import React, {FC} from 'react';
import {NoticeHeight} from '@utils/Scaling';
import Svg, {Defs, G, Path, Use} from 'react-native-svg';
import CustomText from '@components/ui/CustomText';
import {Fonts} from '@utils/Constants';
import {wavyData} from '@utils/dummyData';

const Notice: FC = () => {
  return (
    <View style={{height: NoticeHeight}}>
      <View style={styles.container}>
        <View style={styles.noticeContainer}>
          <SafeAreaView style={{padding: 10}}>
            <CustomText
              style={styles.heading}
              variant="h8"
              fontFamily={Fonts.SemiBold}>
              It's raining near this location
            </CustomText>
            <CustomText varient="h9" style={styles.textCenter}>
              Our delivery partners are experiencing delays
            </CustomText>
          </SafeAreaView>
        </View>
      </View>

      <Svg
        height="35"
        width="100%"
        fill="#CCD5E4"
        viewBox="0 0 4000 1000"
        preserveAspectRatio="none"
        style={styles.wave}>
        <Defs>
          <Path id="wavepath" d={wavyData} />
        </Defs>

        <G>
          <Use href="#wavepath" y="321" />
        </G>
      </Svg>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#CCD5E4',
  },
  noticeContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#CCD5E4',
  },
  textCenter: {
    textAlign: 'center',
    marginBottom: 8,
  },
  heading: {
    color: '#2D3875',
    marginBottom: 8,
  },
  wave: {
    width: '100%',
    transform: [{rotate: '180deg'}],
  },
});

export default Notice;
