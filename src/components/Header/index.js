import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {LinearGradient} from 'expo-linear-gradient';
import {Ionicons} from '@expo/vector-icons';


export default function Header(){
    return(
        <LinearGradient style={styles.header} 
                        colors={[
                            '#1ED6FF',
                            '#97C1FF'
                        ]}
        >
            <Text style={styles.date}>12/03/2021</Text>
            <Text style={styles.city}>Guarulhos</Text>
            
            <Ionicons 
                name="cloud"
                color="#FFFFFF"
                size={150}
            />

            <Text style={styles.temp}>30°</Text>

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