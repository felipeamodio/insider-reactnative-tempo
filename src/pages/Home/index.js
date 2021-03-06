import React, {useState, useEffect} from 'react'
import {SafeAreaView, Text, StyleSheet, FlatList, View} from 'react-native';
import Menu from '../../components/Menu';
import Header from '../../components/Header';
import Conditions from '../../components/Conditions';
import Forecast from '../../components/Forecast';
import * as Location from 'expo-location';
import api, {key} from '../../services/api'



/**const mylist = [
    {
      "date": "12/03",
      "weekday": "Sex",
      "max": 26,
      "min": 17,
      "description": "Tempestades",
      "condition": "storm"
    },
    {
      "date": "13/03",
      "weekday": "Sáb",
      "max": 26,
      "min": 18,
      "description": "Tempestades",
      "condition": "storm"
    },
    {
      "date": "14/03",
      "weekday": "Dom",
      "max": 27,
      "min": 17,
      "description": "Tempestades",
      "condition": "storm"
    },
    {
      "date": "15/03",
      "weekday": "Seg",
      "max": 26,
      "min": 17,
      "description": "Tempestades",
      "condition": "storm"
    },
    {
      "date": "16/03",
      "weekday": "Ter",
      "max": 26,
      "min": 17,
      "description": "Tempestades",
      "condition": "storm"
    },
    {
      "date": "17/03",
      "weekday": "Qua",
      "max": 27,
      "min": 17,
      "description": "Tempestades",
      "condition": "storm"
    },
    {
      "date": "18/03",
      "weekday": "Qui",
      "max": 23,
      "min": 18,
      "description": "Tempestades",
      "condition": "storm"
    },
    {
      "date": "19/03",
      "weekday": "Sex",
      "max": 24,
      "min": 18,
      "description": "Tempestades isoladas",
      "condition": "storm"
    },
    {
      "date": "20/03",
      "weekday": "Sáb",
      "max": 26,
      "min": 19,
      "description": "Tempestades",
      "condition": "storm"
    },
    {
      "date": "21/03",
      "weekday": "Dom",
      "max": 25,
      "min": 18,
      "description": "Tempestades",
      "condition": "storm"
    }
  ]; */


export default function Home(){
  const [errorMsg, setErrorMsg] = useState(null)
  const [loading, setLoading] = useState(true)
  const [weather, setWeather] = useState([])
  const [icon, setIcon] = useState({name: 'cloud', color: '#FFFFFF'})
  const [background, setBackground] = useState(['#1ED6FF', '#97C1FF'])


  useEffect(() => {
    (async () => {
      let {status} = await Location.requestPermissionsAsync();

      if(status !== 'granted'){
        setErrorMsg('Permissão negada');
        setLoading(false)
        return;
      }
      let location = await Location.getCurrentPositionAsync({});
      //console.log(location.coords)

      const response = await api.get(`/weather?key=${key}&lat=${location.coords.latitude}&lon=${location.coords.longitude}`)
      
      
      setWeather(response.data);

      if(response.data.results.currently === 'noite'){
        setBackground(['#0C3741', '#0F2F61'])
      }

      switch(response.data.results.condition_slug){
        case 'clear_day':
          setIcon({name: 'partly_sunny', color: '#FFB300'});
          break;

        case 'rain':
          setIcon({name: 'rainy', color: '#FFFFFF'});
          break;

        case 'storm':
          setIcon({name: 'rainy', color: '#FFFFFF'});
          break;
      }

      setLoading(false)

    })();
  }, []);



  //depois vou por animação
  if(loading){
    return(
      <View style={styles.container}>
        <Text style={{fontSize: 17, fontStyle: 'italic'}}>Carregando dados</Text>
      </View>
    )
  }

    return(
        <SafeAreaView style={styles.container}>
            <Menu />
            <Header background={background} weather={weather} icon={icon} />
            <Conditions weather={weather} />
            <FlatList
                showsHorizontalScrollIndicator={false}
                horizontal={true} 
                contentContainerStyle={{paddingBottom: '5%'}}
                style={styles.list}
                data={weather.results.forecast}
                keyExtractor={item => item.date}
                renderItem={({item}) => <Forecast data={item} />}
            />
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#E8F0FF',
        paddingTop: '5%'
    },
    list: {
        marginTop: 10,
        marginLeft: 10
    }
})