import {Dimensions, Keyboard, TouchableOpacity} from 'react-native';
import React from 'react';
import CarouselItem from './CarouselItem';
import Carousel from 'react-native-reanimated-carousel';

export const CarouselComponent = ({data}: {data: any}) => {
  const width = Dimensions.get('window').width;
  return (
    <TouchableOpacity
      style={{flex: 1}}
      activeOpacity={1}
      onPress={() => {
        Keyboard.dismiss();
      }}>
      <Carousel
        loop
        width={300}
        height={width / 2}
        autoPlay={true}
        data={data}
        scrollAnimationDuration={1000}
        renderItem={({index}) => <CarouselItem item={data[index]} />}
      />
    </TouchableOpacity>
  );
};
