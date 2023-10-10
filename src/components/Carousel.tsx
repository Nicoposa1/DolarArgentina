import {Dimensions, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import CarouselItem from './CarouselItem';
import Carousel from 'react-native-reanimated-carousel';

export const CarouselComponent = ({data}: {data: any}) => {
  const width = Dimensions.get('window').width;
  return (
    <View style={{flex: 1}}>
      <Carousel
        loop
        width={300}
        height={width / 2}
        autoPlay={true}
        data={data}
        scrollAnimationDuration={1000}
        onSnapToItem={index => console.log('current index:', index)}
        renderItem={({index}) => <CarouselItem item={data[index]} />}
      />
    </View>
  );
};
