import React, { useState } from 'react';

import { useNavigation, useRoute } from '@react-navigation/native';

import { SafeAreaView, Text, TextInput, Alert, TouchableOpacity } from 'react-native';

import AsyncStorage from '@react-native-async-storage/async-storage';

import api from '../../services/api';

import styles from './styles';

type BookRouteParams = {
  id: string;
}

export function Book() {
  const { navigate } = useNavigation();
  const route = useRoute();

  const [date, setDate] = useState('');

  const params = route.params as BookRouteParams;

  const id = params.id;

  async function handleSubmit() {
    if (!date)
      return;

    const user_id = await AsyncStorage.getItem('user');

    await api.post(`/spots/${id}/bookings`, {
      date
    }, {
      headers: { user_id }
    })

    Alert.alert('Solicitação de reserva enviada.');

    navigate('List');
  }

  function handleCancel() {
    navigate('List');
  }

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.label}>DATA DE INTERESSE *</Text>
      <TextInput
        style={styles.input}
        placeholder="Qual data você quer reservar?"
        placeholderTextColor="#999"
        autoCapitalize="words"
        autoCorrect={false}
        value={date}
        onChangeText={setDate}
      />

      <TouchableOpacity onPress={handleSubmit} style={styles.button}>
        <Text style={styles.buttonText}>Solicitar reserva</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={handleCancel} style={[styles.button, styles.cancelButton]}>
        <Text style={styles.buttonText}>Cancelar</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
}