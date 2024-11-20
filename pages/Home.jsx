import React, { useState, useEffect } from 'react';
import {
  View,
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  Button,
} from 'react-native';
import Card from '../components/Card';

const Home = ({ navigation }) => {
  const [planets, setPlanets] = useState([]);
  const [sorted, setSorted] = useState(false);

  const fetchPlanets = async () => {
    try {
      const response = await fetch('http://192.168.1.26:3001/planets');
      const data = await response.json();
      setPlanets(data);
    } catch (error) {
      console.error('Error fetching planets:', error);
    }
  };

  const sortPlanets = () => {
    const sortedPlanets = [...planets].sort((a, b) => b.moons - a.moons);
    setPlanets(sortedPlanets);
    setSorted(true);
  };

  const resetOrder = () => {
    fetchPlanets();
    setSorted(false);
  };

  useEffect(() => {
    fetchPlanets();
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Planetario UCU</Text>
      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={styles.addButton}
          onPress={() => navigation.navigate('AddPlanet')}
        >
          <Text style={styles.buttonText}>Agregar Planeta</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.sortButton}
          onPress={sorted ? resetOrder : sortPlanets}
        >
          <Text style={styles.buttonText}>
            {sorted ? 'Restablecer' : 'Ordenar Planeta'}
          </Text>
        </TouchableOpacity>
      </View>
      <FlatList
        data={planets}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <Card
            planet={item}
            onDetails={() => navigation.navigate('PlanetDetails', { id: item.id })}
          />
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    backgroundColor: '#f5f5f5',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  addButton: {
    backgroundColor: '#007BFF',
    padding: 10,
    borderRadius: 5,
    flex: 0.45,
    alignItems: 'center',
  },
  sortButton: {
    backgroundColor: '#28a745',
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

export default Home;
