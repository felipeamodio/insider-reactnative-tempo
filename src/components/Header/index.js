import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {LinearGradient} from 'expo-linear-gradient';
import {Ionicons} from '@expo/vector-icons';


export default function Header({background, weather, icon}){
    return(
        <LinearGradient style={styles.header} 
                        colors={background}
        >
            <Text style={styles.date}>{weather.results.date}</Text>
            <Text style={styles.city}>{weather.results.city}</Text>
            
            <Ionicons 
                name={icon.name}
                color={icon.color}
                size={150}
            />

            <Text style={styles.temp}>{weather.results.temp}°</Text>

        </LinearGradient>
    )
}


const styles = StyleSheet.create({
    header: {
        width: '95%',
        height: '55%',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 8
    },
    date: {
        color: '#FFFFFF',
        fontSize: 17
    },
    city:{
        color: '#FFFFFF',
        fontSize: 20,
        fontWeight: 'bold',
        marginTop: 10
    },
    temp: {
        color: '#FFFFFF',
        fontSize: 80,
        fontWeight: 'bold'
    }
})