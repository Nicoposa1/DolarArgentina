import PropTypes from 'prop-types';
import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {CurrencyData} from '../interfaces/Home';

const CarouselItem = ({item}: {item: CurrencyData}) => (
  <View
    style={{
      width: 300,
      height: 200,
      justifyContent: 'center',
      alignItems: 'center',
    }}>
    <View style={styles.item}>
      <Text style={styles.itemText}>{item.nombre}</Text>
      <Text style={[styles.itemText, {color: '#0072ff', marginTop: 10}]}>
        {item?.compra}
      </Text>
      <Text style={[styles.itemText, {color: '#0072ff'}]}>{item?.venta}</Text>
    </View>
  </View>
);
CarouselItem.propTypes = {
  item: PropTypes.shape({
    casa: PropTypes.string.isRequired,
    compra: PropTypes.number,
    fechaActualizacion: PropTypes.string.isRequired,
    nombre: PropTypes.string.isRequired,
    venta: PropTypes.number.isRequired,
  }).isRequired,
};

const styles = StyleSheet.create({
  item: {
    backgroundColor: 'white',
    borderRadius: 10,
    height: 120,
    width: 200,
    padding: 10,
    justifyContent: 'center',
    marginTop: 10,
  },
  itemText: {
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});

export default CarouselItem;
