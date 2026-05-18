/* import { StyleSheet, Text, View } from 'react-native';

export default function HomeScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>
        Indoor GIS IPST
      </Text>

      <Text style={styles.subtitle}>
        Sistema de orientación de salas
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },

  title: {
    fontSize: 28,
    fontWeight: 'bold',
  },

  subtitle: {
    fontSize: 16,
    marginTop: 10,
  },
}); */

/* import { View, Text, StyleSheet, Image } from 'react-native';
import { salas } from '../data/salas';
import { useState } from 'react';


export default function HomeScreen() {
  const [selectedSala, setSelectedSala] = useState(null);
  

  return (
    <View style={styles.container}>

      <Text style={styles.title}>
        Indoor GIS IPST
      </Text>

      <Image
        source={require('../assets/maps/piso1.png')}
        style={styles.map}
        resizeMode="contain"
      />
      {salas.map((sala) => (
        <Text key={sala.id}>
          {sala.nombre}
         </Text>
         
))}

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },

  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },

  map: {
    width: '100%',
    height: 500,
  },
}); */
import { useState } from 'react';

import {
  View,
  Text,
  StyleSheet,
  Image,
  TextInput,
  ScrollView,
} from 'react-native';

import { salas } from '../data/salas';

export default function HomeScreen() {

  const [busqueda, setBusqueda] = useState('');

  const salasFiltradas = salas.filter((sala) =>
    sala.nombre
      .toLowerCase()
      .includes(busqueda.toLowerCase())
  );

  return (
    <ScrollView contentContainerStyle={styles.container}>

      <Text style={styles.title}>
        Indoor GIS IPST
      </Text>

      <Text style={styles.subtitle}>
        Sistema de orientación de salas
      </Text>

      <TextInput
        placeholder="Buscar sala"
        style={styles.input}
        value={busqueda}
        onChangeText={setBusqueda}
      />

      <Image
        source={require('../assets/maps/piso1.png')}
        style={styles.map}
        resizeMode="contain"
      />

      <Text style={styles.sectionTitle}>
        Salas encontradas
      </Text>

      {salasFiltradas.map((sala) => (
        <View key={sala.id} style={styles.card}>
          <Text style={styles.roomName}>
            {sala.nombre}
          </Text>

          <Text>
            Piso: {sala.piso}
          </Text>

          <Text>
            Coordenadas: ({sala.x}, {sala.y})
          </Text>
        </View>
      ))}

    </ScrollView>
  );
}

const styles = StyleSheet.create({

  container: {
    padding: 20,
    alignItems: 'center',
  },

  title: {
    fontSize: 28,
    fontWeight: 'bold',
    marginTop: 40,
  },

  subtitle: {
    fontSize: 16,
    marginBottom: 20,
  },

  input: {
    width: '100%',
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 10,
    padding: 12,
    marginBottom: 20,
  },

  map: {
    width: '100%',
    height: 400,
    marginBottom: 20,
  },

  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    alignSelf: 'flex-start',
    marginBottom: 10,
  },

  card: {
    width: '100%',
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 10,
    padding: 15,
    marginBottom: 10,
  },

  roomName: {
    fontSize: 18,
    fontWeight: 'bold',
  },

});