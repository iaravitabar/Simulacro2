import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
} from 'react-native';

const AddPlanet = ({ navigation }) => {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [moons, setMoons] = useState('');
  const [moonNames, setMoonNames] = useState('');
  const [image, setImage] = useState('');

  const handleAddPlanet = async () => {
    if (!name || !description || !moons || !image) {
      Alert.alert('Error', 'Por favor, completa todos los campos obligatorios.');
      return;
    }

    const newPlanet = {
      name,
      description,
      moons: parseInt(moons, 10),
      moon_names: moonNames.split(',').map((moon) => moon.trim()),
      image,
    };

    try {
      const response = await fetch('http://192.168.1.26:3001/planets', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newPlanet),
      });

      if (response.ok) {
        Alert.alert('Éxito', '¡Planeta agregado exitosamente!');
        navigation.goBack();
      } else {
        Alert.alert('Error', 'Hubo un problema al agregar el planeta.');
      }
    } catch (error) {
      console.error('Error al agregar el planeta:', error);
      Alert.alert('Error', 'No se pudo conectar con el servidor.');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Nuevo Planeta</Text>

      <TextInput
        style={styles.input}
        placeholder="Nombre del planeta"
        value={name}
        onChangeText={setName}
      />
      <TextInput
        style={styles.input}
        placeholder="Descripción"
        value={description}
        onChangeText={setDescription}
      />
      <TextInput
        style={styles.input}
        placeholder="Cantidad de lunas"
        value={moons}
        onChangeText={setMoons}
        keyboardType="numeric"
      />
      <TextInput
        style={styles.input}
        placeholder="Nombres de lunas (separados por comas)"
        value={moonNames}
        onChangeText={setMoonNames}
      />
      <TextInput
        style={styles.input}
        placeholder="URL de la imagen"
        value={image}
        onChangeText={setImage}
      />

      <TouchableOpacity style={styles.button} onPress={handleAddPlanet}>
        <Text style={styles.buttonText}>Agregar Planeta</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f5f5f5',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    padding: 10,
    marginBottom: 15,
    backgroundColor: '#ffffff',
  },
  button: {
    backgroundColor: '#28a745',
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 10,
  },
  buttonText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default AddPlanet;
