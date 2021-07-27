import React, { useState, useEffect } from 'react';

import { View, Text, Image, TouchableOpacity, FlatList } from 'react-native';

import { useNavigation } from '@react-navigation/core';

import api from '../../services/api';

import styles from './styles';

type SpotListProps = {
  tech: string;
};

type Spot = {
  _id: string;
  company: string;
  thumbnail_url: string;
  price: number;
  user: string;
  techs: [string];
}

export function SpotList({ tech }: SpotListProps) {
  const { navigate } = useNavigation();

  const [spots, setSpots] = useState<Spot[]>([]);

  useEffect(() => {
    async function loadSpots() {
      const response = await api.get('/spots', {
        params: { tech }
      })

      setSpots(response.data);
    }

    loadSpots();
  }, []);

  function handleNavigate(id: string) {
    navigate('Book', { id });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Empresas que usam <Text style={styles.bold}>{tech}</Text></Text>

      <FlatList
        style={styles.list}
        data={spots}
        keyExtractor={spot => spot._id}
        horizontal
        showsHorizontalScrollIndicator={false}
        renderItem={({ item }) => (
          <View style={styles.listItem}>
            <Image style={styles.thumbnail} source={{ uri: item.thumbnail_url }} />
            <Text style={styles.company}>{item.company}</Text>
            <Text style={styles.price}>{item.price ? `R$ ${item.price}/dia` : 'GRATUITO'}</Text>
            <TouchableOpacity onPress={() => handleNavigate(item._id)} style={styles.button}>
              <Text style={styles.buttonText}>Solicitar reserva</Text>
            </TouchableOpacity>
          </View>
        )}
      />
    </View>
  );
}