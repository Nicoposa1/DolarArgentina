import {Keyboard, StyleSheet, Text, TextInput, View} from 'react-native';
import React from 'react';
import {useSelector} from 'react-redux';

const Transformer = ({
  usdTransform,
  setUsdTransform,
  isDolar,
}: {
  usdTransform: number;
  setUsdTransform: (value: number) => void;
  isDolar: boolean;
}) => {
  const {dolarBlue} = useSelector((state: any) => state.coins);
  return (
    <>
      <View style={styles.bodyContainer}>
        <Text style={[styles.subtitle, {marginTop: 10}]}>
          {isDolar ? 'Transforma USD$ a ARS$' : 'Transforma ARS$ a USD$'}
        </Text>
        <TextInput
          style={styles.input}
          onChangeText={text => {
            setUsdTransform(text ? parseFloat(text) : 0);
          }}
          onBlur={Keyboard.dismiss}
          value={usdTransform ? usdTransform.toString() : ''}
          placeholder={isDolar ? 'USD$' : 'ARS$'}
          placeholderTextColor={'gray'}
          keyboardType="numeric"
        />
      </View>
      {usdTransform > 0 ? (
        <View
          style={{
            height: 40,
          }}>
          <Text style={styles.resultsText}>
            {isDolar ? 'ARS$' : 'USD$'}
            {isDolar
              ? usdTransform
                ? (usdTransform * dolarBlue?.venta)
                    .toFixed(2)
                    .replace(/\d(?=(\d{3})+\.)/g, '$&,')
                : ''
              : usdTransform
              ? (usdTransform / dolarBlue?.venta)
                  .toFixed(2)
                  .replace(/\d(?=(\d{3})+\.)/g, '$&,')
              : ''}
          </Text>
        </View>
      ) : (
        <View
          style={{
            height: 40,
          }}
        />
      )}
    </>
  );
};

export default Transformer;

const styles = StyleSheet.create({
  bodyContainer: {
    marginTop: 20,
    justifyContent: 'center',
    height: 100,
  },
  resultsText: {
    fontSize: 20,
    fontWeight: '700',
    marginTop: 10,
    marginLeft: 10,
    color: 'white',
    fontFamily: 'Montserrat-Regular',
  },
  subtitle: {
    fontSize: 20,
    fontWeight: '700',
    marginBottom: 10,
    marginLeft: 10,
    color: 'white',
    fontFamily: 'Montserrat-Regular',
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 10,
    fontFamily: 'Montserrat',
    color: 'black',
  },
});
