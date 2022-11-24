import {  useRef, useState } from 'react';
import MapView, { Region } from 'react-native-maps';
import * as Location from 'expo-location'
import MapCard from './src/components/MapCard';
import SearchCard from './src/components/SearchCard';
import MyLocation from './src/components/MyLocation'; 
import MapTypeCard from './src/components/MapTypeCard';
import MapType from './src/components/MapType';
import {
  StyleSheet,
  View,
  Dimensions,
  LayoutChangeEvent
} from 'react-native';



export default function App() {
  const [showcard, setShowCard] = useState<'search' | 'mapType'>('search')
  const [mapType, setMapType] = useState<'standard' | 'satellite' | 'terrain'>('standard')
  const [cardHeight, setCardHeight] = useState(0)
  const mapRef = useRef<MapView>(null)


  const getMyLocation = async():Promise<Region | undefined>=>{
    const { status } = await Location.requestForegroundPermissionsAsync()

      if(status !== 'granted'){
        alert('A app não tem permissão para usar localização')
      }

      const { latitude, longitude } = (await Location.getCurrentPositionAsync({})).coords
      const region = {
        latitude,
        longitude,
        latitudeDelta: 0.05,
        longitudeDelta: 0.05
      }

      return region
  }


  const goToMyLocation = async()=>{
    const region = await getMyLocation()
    region && mapRef.current?.animateToRegion(region, 1000)
  }


  const handleLayoutChange = (event: LayoutChangeEvent)=>{
    const { height } = event.nativeEvent.layout
    setCardHeight(height)
  }


  return (
    <View style={styles.container}>
      <MapView style={styles.map}
        ref={mapRef}
        mapType={mapType}
        onMapReady={()=> goToMyLocation()} 
        showsUserLocation
        showsMyLocationButton={false}/>        
        {
          showcard === 'search' ? (
            <SearchCard handleLayoutChange={handleLayoutChange}/>
          ) : (
            <MapTypeCard handleLayoutChange={handleLayoutChange}
              closeModal={()=> setShowCard('search')} changeMapType={(mapType)=> setMapType(mapType)} />
            )          
          }        
        <MapType mBottom={cardHeight + 50} onPress={()=> setShowCard('mapType')}/>
        <MyLocation mBottom={cardHeight}
          onPress={goToMyLocation}/>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  map: {
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
  },
});