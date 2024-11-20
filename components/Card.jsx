import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';

const Card = ({ planet, onDetails }) => (
  <TouchableOpacity onPress={onDetails} style={styles.card}>
    <Image source={{ uri: planet.image }} style={styles.image} />
    <Text style={styles.name}>{planet.name}</Text>
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  card: {
    marginVertical: 10,
    padding: 10,
    backgroundColor: '#ffffff',
    borderRadius: 8,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
  },
  image: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginBottom: 10,
  },
  name: {
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default Card;
