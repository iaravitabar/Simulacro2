import React, { useState, useEffect } from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';

const PlanetDetails = ({ route, navigation }) => {
  const { id } = route.params;
  const [planet, setPlanet] = useState(null);

  const fetchPlanetDetails = async () => {
    try {
      const response = await fetch(`http://192.168.1.26:3001/planets/${id}`);
      const data = await response.json();
      setPlanet(data);
    } catch (error) {
      console.error('Error fetching planet details:', error);
    }
  };

  const deletePlanet = async () => {
    try {
      await fetch(`http://192.168.1.26:3001/planets/${id}`, { method: 'DELETE' });
      navigation.goBack();
    } catch (error) {
      console.error('Error deleting planet:', error);
    }
  };

  useEffect(() => {
    fetchPlanetDetails();
  }, [id]);

  if (!planet) {
    return <Text>Cargando...</Text>;
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{planet.name} Details</Text>
      <Image source={{ uri: planet.image }} style={styles.image} />
      <Text style={styles.description}>Descripción: {planet.description}</Text>
      <Text style={styles.moons}>Lunas: {planet.moons}</Text>
      <Text style={styles.moonNames}>
        Nombres de lunas: {planet.moon_names.join(', ')}
      </Text>
      <View style={styles.actions}>
        <TouchableOpacity style={styles.deleteButton} onPress={deletePlanet}>
          <Text style={styles.buttonText}>Eliminar</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.editButton}
          onPress={() => console.log('Edit Planet')}
        >
          <Text style={styles.buttonText}>Editar</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
    textAlign: 'center',
  },
  image: {
    width: '100%',
    height: 200,
    borderRadius: 8,
    marginBottom: 20,
  },
  description: {
    fontSize: 16,
    marginBottom: 10,
  },
  moons: {
    fontSize: 16,
    marginBottom: 10,
  },
  moonNames: {
    fontSize: 14,
    fontStyle: 'italic',
    marginBottom: 20,
  },
  actions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  deleteButton: {
    backgroundColor: '#dc3545',
    padding: 10,
    borderRadius: 5,
    flex: 0.45,
    alignItems: 'center',
  },
  editButton: {
    backgroundColor: '#007BFF',
    padding: 10,
    borderRadius: 5,
    flex: 0.45,
    alignItems: 'center',
  },
  buttonText: {
    color: '#ffffff',
    fontSize: 16,
  },
});

export default PlanetDetails;
