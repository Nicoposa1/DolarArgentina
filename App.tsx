/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React from 'react';
import {SafeAreaView, StyleSheet, Text} from 'react-native';
import {AUTH_TOKEN} from "@env"

function App(): JSX.Element {
  const [data, setData] = React.useState<any>(null);
  console.log('🚀 ~ file: App.tsx:13 ~ App ~ data:', data);

  React.useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('https://api.estadisticasbcra.com/usd', {
          headers: {
            Authorization: 'Bearer ' + AUTH_TOKEN,
          },
        });
        const json = await response.json();
        setData(json);
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, []);

  return (
    <SafeAreaView>
      <Text>{data && data[data.length - 1].v}</Text>
    </SafeAreaView>
  );
}

export default App;
