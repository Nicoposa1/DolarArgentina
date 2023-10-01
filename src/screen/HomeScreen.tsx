import {View, Text, StyleSheet, StatusBar, TextInput} from 'react-native';
import React from 'react';
import {AUTH_TOKEN} from '@env';
import LinearGradient from 'react-native-linear-gradient';
// import LinearGradient from 'react-native-linear-gradient';

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
  const [usdTransform, setUsdTransform] = React.useState<number>(0);
  const [usdTransformed, setUsdTransformed] = React.useState<String>('');

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
          <Text style={styles.resultsText}>USD${usdTransformed}</Text>
        </View>
        <Text style={styles.subtitle}>Transforma ARS$ a USD$</Text>
        <TextInput
          style={{
            height: 40,
            borderColor: 'gray',
            borderWidth: 1,
            backgroundColor: 'white',
            borderRadius: 10,
            padding: 10,
          }}
          onChangeText={number => {
            setArsTransform(number ? parseInt(number) : 0);
          }}
          value={arsTransform ? arsTransform.toString() : ''}
          placeholder="ARS$"
          placeholderTextColor={'gray'}
          keyboardType="numeric"
        />
        <Text style={styles.resultsText}>ARS${arsTransformed}</Text>
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
});
