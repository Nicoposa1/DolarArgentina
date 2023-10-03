import {
  View,
  Text,
  StyleSheet,
  StatusBar,
  TextInput,
  ScrollView,
} from 'react-native';
import React from 'react';
import {AUTH_TOKEN} from '@env';
import LinearGradient from 'react-native-linear-gradient';
import Carousel, {Pagination} from 'react-native-snap-carousel';

export const HomeScreen = () => {
  const [data, setData] = React.useState<any>(null);
  console.log('🚀 ~ file: HomeScreen.tsx:9 ~ HomeScreen ~ data:', data);
  const [usdPrice, setUsdPrice] = React.useState<number>(0);
  console.log(
    '🚀 ~ file: HomeScreen.tsx:10 ~ HomeScreen ~ usdPrice:',
    usdPrice,
  );
  const [arsTransform, setArsTransform] = React.useState<number>(0);
  const [arsTransformed, setArsTransformed] = React.useState<String>('');
  const [usdTransform, setUsdTransform] = React.useState<number>('');
  const [usdTransformed, setUsdTransformed] = React.useState<String>('');
  const items = [1, 2, 3, 4, 5, 6]; // Los elementos de tu carrusel

  React.useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('https://dolarapi.com/v1/dolares/blue');
        const json = await response.json();
        setData(json);
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, []);

  const renderItem = ({item}) => (
    <View style={styles.item}>
      <Text style={styles.itemText}>{item}</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <StatusBar backgroundColor="red" />
      <LinearGradient
        colors={['#0072ff', '#00c6ff']}
        start={{x: 0, y: 0}}
        end={{x: 1, y: 0}}
        style={{
          padding: 10,
          borderBottomEndRadius: 10,
          borderBottomStartRadius: 10,
          height: '100%',
        }}>
        <View style={styles.headerContainer}>
          <Text style={{color: 'white', fontSize: 40, fontWeight: '700'}}>
            USD$1 = {data?.venta}
          </Text>
        </View>
        <View style={styles.bodyContainer}>
          <Text style={[styles.subtitle, {marginTop: 10}]}>
            Transforma USD$ a ARS$
          </Text>
          <TextInput
            style={{
              height: 40,
              borderColor: 'gray',
              borderWidth: 1,
              backgroundColor: 'white',
              borderRadius: 10,
              padding: 10,
            }}
            onChangeText={text => {
              setUsdTransform(text ? parseInt(text) : 0);
            }}
            value={usdTransform ? usdTransform.toString() : ''}
            placeholder="USD$"
            placeholderTextColor={'gray'}
            keyboardType="numeric"
          />
          {usdTransform > 0 && (
            <Text style={styles.resultsText}>
              ARS$
              {usdTransform
                ? (usdTransform * data?.venta)
                    .toFixed(2)
                    .replace(/\d(?=(\d{3})+\.)/g, '$&,')
                : ''}
            </Text>
          )}
        </View>
        <View
          style={[
            styles.bodyContainer,
            {
              height: 100,
            },
          ]}>
          <Text style={[styles.subtitle, {marginTop: 10}]}>
            Transforma ARS$ a USD$
          </Text>
          <TextInput
            style={{
              height: 40,
              borderColor: 'gray',
              borderWidth: 1,
              backgroundColor: 'white',
              borderRadius: 10,
              padding: 10,
            }}
            onChangeText={text => {
              setArsTransform(text ? parseInt(text) : 0);
            }}
            value={arsTransform ? arsTransform.toString() : ''}
            placeholder="ARS$"
            placeholderTextColor={'gray'}
            keyboardType="numeric"
          />
        </View>
        {arsTransform > 0 ? (
          <View
            style={{
              height: 40,
            }}>
            <Text style={[styles.resultsText]}>
              USD$
              {arsTransform
                ? (arsTransform / data?.venta)
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

        <View style={{
          marginTop: 20,
          height: 100,
          width: '100%',
          justifyContent: 'center',
          alignItems: 'center',
        }}>
          <Carousel
            data={items}
            renderItem={renderItem}
            sliderWidth={300}
            itemWidth={100}
            loop
            autoplay
            autoplayInterval={3000}
          />
        </View>

        <ScrollView
          style={styles.budgetContainer}
          horizontal={true}
          pagingEnabled={true}>
          <View style={styles.budget}>
            <Text style={styles.crrouselSubtitle}>Compra USD Oficial </Text>
            <Text style={styles.carrouselText}>ARS$ {data?.compra}</Text>
          </View>
          <View style={styles.budget}>
            <Text style={styles.crrouselSubtitle}>Venta USD Oficial </Text>
            <Text style={styles.carrouselText}>ARS$ {data?.venta}</Text>
          </View>
          <View style={styles.budget}>
            <Text style={styles.crrouselSubtitle}>Compra USD Oficial </Text>
            <Text style={styles.carrouselText}>ARS$ {data?.compra}</Text>
          </View>
        </ScrollView>
      </LinearGradient>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  headerContainer: {
    marginTop: 80,
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  header: {
    height: 100,
    backgroundColor: 'red',
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  bodyContainer: {
    marginTop: 20,
    justifyContent: 'center',
  },
  resultsText: {
    fontSize: 20,
    fontWeight: '700',
    marginTop: 10,
    marginLeft: 10,
    color: 'white',
  },
  subtitle: {
    fontSize: 20,
    fontWeight: '700',
    marginBottom: 10,
    marginLeft: 10,
    color: 'white',
  },
  budgetContainer: {
    marginTop: 20,
    height: 100,
    width: '100%',
  },

  budget: {
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 10,
    width: '50%',
    alignItems: 'center',
    height: 80,
    marginRight: 10,
    justifyContent: 'center',
  },
  carrouselText: {
    fontSize: 20,
    fontWeight: '700',
    color: '#0072ff',
  },
  crrouselSubtitle: {
    fontSize: 15,
    fontWeight: '700',
    color: '#0072ff',
  },
  item: {
    backgroundColor: 'lightblue',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 5,
    height: 100,
    width: 100,
  },
  itemText: {
    fontSize: 24,
    fontWeight: 'bold',
  },
});
