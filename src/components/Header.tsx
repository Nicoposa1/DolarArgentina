import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {CurrencyData} from '../interfaces/Home';

export const Header = ({data}: {data: CurrencyData}) => {
  return (
    <View style={styles.headerContainer}>
      <Text
        style={{
          color: 'white',
          fontSize: 40,
          fontWeight: '700',
          fontFamily: 'Montserrat-Bold',
        }}>
        USD$1 = {data?.venta}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  headerContainer: {
    marginTop: 80,
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
});
