import React from 'react';
import { View, StyleSheet, useWindowDimensions } from 'react-native';

const MobileFrame = ({ children }) => {
  const { width } = useWindowDimensions();

  // Apply padding and optional maxWidth for large screens
  const dynamicStyles = {
    paddingHorizontal: width * 0.04, // responsive side padding
    maxWidth: 600,                   // keep it readable on desktop
    width: '100%',
    flex: 1,
  };

  return (
    <View style={styles.outerWrapper}>
      <View style={[styles.innerWrapper, dynamicStyles]}>
        {children}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  outerWrapper: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#fff',
  },
  innerWrapper: {
    flex: 1,
    alignSelf: 'center',
  },
});

export default MobileFrame;
