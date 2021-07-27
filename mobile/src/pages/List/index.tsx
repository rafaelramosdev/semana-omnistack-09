import React, { useState, useEffect } from 'react';

import { SafeAreaView, Image, ScrollView, Alert } from 'react-native';

import AsyncStorage from '@react-native-async-storage/async-storage';

import socketio from 'socket.io-client';

import { SpotList } from '../../components/SpotList';

import logoImg from '../../assets/logo.png';

import styles from './styles';

export function List() {
  const [techs, setTechs] = useState<string[]>([]);

  useEffect(() => {
    AsyncStorage.getItem('user').then(user_id => {
      let socket;

      if (user_id) {
        socket = socketio('http://localhost:3333', {
          query: { 
            user_id,
          }
        });
      }

      if (socket) {
        socket.on('booking_response', booking => {
          Alert.alert(`Sua reserva em ${booking.spot.company} em ${booking.date} foi ${booking.approved ? 'APROVADA' : 'REJEITADA'}`);
        });
      }
    });
  }, []);

  useEffect(() => {
    AsyncStorage.getItem('techs').then(storagedTech => {
      const techsArray = storagedTech?.split(',').map(tech => tech.trim());

      if (techsArray)
        setTechs(techsArray);
    })
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <Image style={styles.logo} source={logoImg} />

      <ScrollView>
        { techs.map(tech => <SpotList key={tech} tech={tech} />) }
      </ScrollView>
    </SafeAreaView>
  );
}