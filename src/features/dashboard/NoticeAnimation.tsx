import {View, Text, StyleSheet, Animated as RNAnimated} from 'react-native';
import React, {FC} from 'react';
import {NoticeHeight} from '@utils/Scaling';
import Notice from '@components/dashboard/Notice';

const NOTICE_HEIGHT = -(NoticeHeight + 12); // Negative value to start above the screen

const NoticeAnimation: FC<{
  noticePosition: any;
  children: React.ReactElement;
}> = ({noticePosition, children}) => {
  return (
    <View style={styles.container}>
      <RNAnimated.View
        style={[
          styles.noticeContainer,
          {transform: [{translateY: noticePosition}]},
        ]}>
        <Notice />
      </RNAnimated.View>
      <RNAnimated.View
        style={[
          styles.contentContainer,
          {
            transform: [
              {
                translateY: noticePosition.interpolate({
                  inputRange: [NOTICE_HEIGHT, 38],
                  outputRange: [0, NoticeHeight + -30], // Start high and then bring it down to its final position
                }),
              },
            ],
          },
        ]}>
        {children}
      </RNAnimated.View>
    </View>
  );
};

const styles = StyleSheet.create({
  noticeContainer: {
    width: '100%',
    zIndex: 999,
    position: 'absolute',
  },
  contentContainer: {
    flex: 1,
    width: '100%',
  },
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
});

export default NoticeAnimation;
