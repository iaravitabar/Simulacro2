import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import React from 'react';
import AddPlanet from './pages/AddPlanet.jsx'; // Pantalla para agregar un planeta
import Home from './pages/Home.jsx'; // Pantalla de lista de planetas
import PlanetDetails from './pages/PlanetDetails.jsx'; // Detalles del planeta

const Stack = createStackNavigator(); // Crea un stack de navegación

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        {/* Ruta para la pantalla principal */}
        <Stack.Screen
          name="Home"
          component={Home}
          options={{
            title: 'Lista de Planetas',
            headerStyle: { backgroundColor: '#007BFF' },
            headerTintColor: '#fff',
            headerTitleStyle: { fontWeight: 'bold' },
          }}
        />
        {/* Ruta para los detalles de un planeta */}
        <Stack.Screen
          name="PlanetDetails"
          component={PlanetDetails}
          options={{
            title: 'Detalles del Planeta',
            headerStyle: { backgroundColor: '#6C757D' },
            headerTintColor: '#fff',
            headerTitleStyle: { fontWeight: 'bold' },
          }}
        />
        {/* Ruta para agregar un nuevo planeta */}
        <Stack.Screen
          name="AddPlanet"
          component={AddPlanet}
          options={{
            title: 'Agregar Planeta',
            headerStyle: { backgroundColor: '#28A745' },
            headerTintColor: '#fff',
            headerTitleStyle: { fontWeight: 'bold' },
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
