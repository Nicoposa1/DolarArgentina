import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {CurrencyData} from '../interfaces/Home';
import Carousel from 'react-native-snap-carousel';

export const CarouselComponent = ({
  data,
  renderItem,
}: {
  data: any;
  renderItem: ({item}: {item: CurrencyData}) => JSX.Element;
}) => {
  return (
    <View
      style={{
        marginTop: 20,
        height: 200,
        width: '100%',
        justifyContent: 'center',
        alignItems: 'center',
      }}>
      <Carousel
        data={data}
        renderItem={renderItem}
        sliderWidth={300}
        itemWidth={100}
        loop
        autoplay
        autoplayInterval={3000}
      />
    </View>
  );
};

const styles = StyleSheet.create({});
