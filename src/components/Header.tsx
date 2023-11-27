import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import { useSelector } from 'react-redux';

export const Header = () => {
  const {dolarBlue} = useSelector((state: any) => state.coins);
  return (
    <View style={styles.headerContainer}>
      <Text
        style={{
          color: 'white',
          fontSize: 40,
          fontWeight: '700',
          fontFamily: 'Montserrat-Bold',
        }}>
        USD$1 = {dolarBlue?.venta}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  headerContainer: {
    marginTop: 40,
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
});
