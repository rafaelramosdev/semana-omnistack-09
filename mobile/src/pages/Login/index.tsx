import React, { useState, useEffect } from 'react';

import { KeyboardAvoidingView, View, Text, TextInput, Image, TouchableOpacity, Platform } from 'react-native';

import { useNavigation } from '@react-navigation/native';

import AsyncStorage from '@react-native-async-storage/async-storage';

import api from '../../services/api';

import logoImg from '../../assets/logo.png';

import styles from './styles';

export function Login() {
  const { navigate } = useNavigation();

  const [email, setEmail] = useState('');
  const [techs, setTechs] = useState('');

  useEffect(() => {
    AsyncStorage.getItem('user').then(user => {
      if (user)
        navigate('List');
    })
  }, []);

  async function handleSubmit() {
    if (!email || !techs)
      return;

    const response = await api.post('/sessions', {
      email
    });

    const { _id } = response.data;

    await AsyncStorage.setItem('user', _id);

    await AsyncStorage.setItem('techs', techs);

    navigate('List');
  };

  return (
    <KeyboardAvoidingView enabled={Platform.OS === 'ios'} behavior="padding" style={styles.container}>
      <Image source={logoImg} />

      <View style={styles.form}>
        <Text style={styles.label}>SEU E-MAIL *</Text>
        <TextInput
          style={styles.input}
          placeholder="Seu e-mail"
          placeholderTextColor="#999"
          keyboardType="email-address"
          autoCapitalize="none"
          autoCorrect={false}
          value={email}
          onChangeText={setEmail}
        />

        <Text style={styles.label}>TECNOLOGIAS *</Text>
        <TextInput
          style={styles.input}
          placeholder="Tecnologias de interesse"
          placeholderTextColor="#999"
          autoCapitalize="words"
          autoCorrect={false}
          value={techs}
          onChangeText={setTechs}
        />

        <TouchableOpacity onPress={handleSubmit} style={styles.button}>
          <Text style={styles.buttonText}>Encontrar spots</Text>
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
}