import {View, StyleSheet} from 'react-native';
import React from 'react';
import LinearGradient from 'react-native-linear-gradient';
import {CurrencyData} from '../interfaces/Home';
import {Header} from '../components/Header';
import Transformer from '../components/Transformer';
import {CarouselComponent} from '../components/Carousel';
import {
  AdEventType,
  BannerAd,
  BannerAdSize,
  InterstitialAd,
  TestIds,
} from 'react-native-google-mobile-ads';
import {useDispatch, useSelector} from 'react-redux';
import {setCoins, setDolarBlue} from '../store/reducers/coins';

const adUnitId = __DEV__ ? TestIds.BANNER : `${process.env.ADS_TOKEN}`;

const adUnitId2 = __DEV__ ? TestIds.INTERSTITIAL : `${process.env.ADS_TOKEN}`;

const interstitial = InterstitialAd.createForAdRequest(adUnitId2, {
  requestNonPersonalizedAdsOnly: true,
  keywords: ['finance', 'clothing'],
});

export const HomeScreen = () => {
  const dispatch = useDispatch();
  const {coins} = useSelector((state: any) => state.coins);
  const [arsTransform, setArsTransform] = React.useState<number>(0);
  const [usdTransform, setUsdTransform] = React.useState<any>('');

  React.useEffect(() => {
    const fetchAllData = async () => {
      try {
        const response = await fetch('https://dolarapi.com/v1/dolares');
        const json = await response.json();
        dispatch(setCoins(json));
      } catch (error) {
        console.error(error);
      }
    };
    fetchAllData();
    const fetchData = async () => {
      try {
        const response = await fetch('https://dolarapi.com/v1/dolares/blue');
        const json = await response.json();
        dispatch(setDolarBlue(json));
      } catch (error) {}
    };
    fetchData();
  }, []);

  // ads
  const [loaded, setLoaded] = React.useState(false);

  React.useEffect(() => {
    const unsubscribe = interstitial.addAdEventListener(
      AdEventType.LOADED,
      () => {
        setLoaded(true);
      },
    );
    interstitial.load();
    return unsubscribe;
  }, []);

  if (!loaded) {
    return null;
  }

  return (
    <View style={styles.container}>
      <LinearGradient
        colors={['#0072ff', '#00c6ff']}
        start={{x: 0, y: 0}}
        end={{x: 1, y: 0}}
        style={styles.gradient}>
        <Header />
        <Transformer
          usdTransform={usdTransform}
          setUsdTransform={setUsdTransform}
          isDolar={true}
        />
        <Transformer
          usdTransform={arsTransform}
          setUsdTransform={setArsTransform}
          isDolar={false}
        />
        <View style={styles.center}>
          <CarouselComponent data={coins?.map((item: CurrencyData) => item)} />
        </View>
        <View style={styles.containerBanner}>
          <BannerAd
            unitId={adUnitId}
            size={BannerAdSize.ANCHORED_ADAPTIVE_BANNER}
            requestOptions={{
              requestNonPersonalizedAdsOnly: true,
            }}
          />
        </View>
      </LinearGradient>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  containerBanner: {
    position: 'absolute',
    bottom: 0,
    justifyContent: 'center',
    alignItems: 'center',
  },
  gradient: {
    padding: 10,
    borderBottomEndRadius: 10,
    borderBottomStartRadius: 10,
    height: '100%',
  },
  center: {
    justifyContent: 'center',
    alignItems: 'center',
  },
});
