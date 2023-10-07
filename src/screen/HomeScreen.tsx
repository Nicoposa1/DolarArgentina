import {
  View,
  Text,
  StyleSheet,
  StatusBar,
  TextInput,
  ScrollView,
  Dimensions,
  Keyboard,
} from 'react-native';
import React from 'react';
import {AUTH_TOKEN} from '@env';
import LinearGradient from 'react-native-linear-gradient';
import Carousel, {Pagination} from 'react-native-snap-carousel';
import {CurrencyData} from '../interfaces/Home';
import {Header} from '../components/Header';
import Transformer from '../components/Transformer';
import {CarouselComponent} from '../components/Carousel';

export const HomeScreen = () => {
  const [data, setData] = React.useState<CurrencyData>({
    casa: '',
    compra: 0,
    fechaActualizacion: '',
    nombre: '',
    venta: 0,
  });
  console.log('🚀 ~ file: HomeScreen.tsx:9 ~ HomeScreen ~ data:', data);
  const [usdPrice, setUsdPrice] = React.useState<number>(0);
  const [allPrices, setAllPrices] = React.useState<CurrencyData[]>([]);
  console.log(
    '🚀 ~ file: HomeScreen.tsx:26 ~ HomeScreen ~ allPrices:',
    allPrices,
  );
  const [arsTransform, setArsTransform] = React.useState<number>(0);
  const [arsTransformed, setArsTransformed] = React.useState<String>('');
  const [usdTransform, setUsdTransform] = React.useState<any>('');
  const [usdTransformed, setUsdTransformed] = React.useState<String>('');

  React.useEffect(() => {
    const fetchAllData = async () => {
      try {
        const response = await fetch('https://dolarapi.com/v1/dolares');
        const json = await response.json();
        setAllPrices(json);
      } catch (error) {
        console.error(error);
      }
    };
    fetchAllData();
    const fetchData = async () => {
      try {
        const response = await fetch('https://dolarapi.com/v1/dolares/blue');
        const json = await response.json();
        setData(json);
      } catch (error) {
      }
    };
    fetchData();
  }, []);

  const renderItem = ({item}: {item: CurrencyData}) => (
    <View style={styles.item}>
      <Text style={{
        fontSize: 10,
        fontWeight: 'bold',
        textAlign: 'center',
        color: '#0072ff',
      }} >{item.nombre}</Text>
      <Text style={[styles.itemText, {color: '#0072ff', marginTop: 10}]}>
        {item?.compra}
      </Text>
      <Text style={[styles.itemText, {color: '#0072ff'}]}>{item.venta}</Text>
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
        <Header data={data} />
        <Transformer
          usdTransform={usdTransform}
          setUsdTransform={setUsdTransform}
          data={data}
          isDolar={true}
        />
        <Transformer
          usdTransform={arsTransform}
          setUsdTransform={setArsTransform}
          data={data}
          isDolar={false}
        />
        <CarouselComponent
          data={allPrices.map(item => item)}
          renderItem={renderItem}
        />
      </LinearGradient>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
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
    height: 100,
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
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 10,
    width: 100,
    alignItems: 'center',
    height: 120,
    marginRight: 10,
    justifyContent: 'center',
  },
  itemText: {
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});
