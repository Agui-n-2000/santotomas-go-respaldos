import { useState } from 'react';

import {
  View,
  Text,
  StyleSheet,
  Image,
  TextInput,
  ScrollView,
} from 'react-native';

import Svg, { Line } from 'react-native-svg';

import { salas } from '../data/salas';
import { grafo } from '../data/grafo';
import { bfs } from '../algorithms/bfs';
import { nodos } from '../data/nodos';

export default function HomeScreen() {

  const [busqueda, setBusqueda] = useState('');

  const salasFiltradas = salas.filter((sala) =>
    sala.nombre
      .toLowerCase()
      .includes(busqueda.toLowerCase())
  );

  // Ruta fija inicial
  const ruta = bfs(grafo, 'entrada', 'A101');

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

      <View style={styles.mapContainer}>

        <Image
          source={require('../assets/maps/piso1.png')}
          style={styles.map}
          resizeMode="contain"
        />

        {/* RUTA SVG */}
        <Svg
          height="400"
          width="100%"
          style={StyleSheet.absoluteFill}
        >

          {ruta &&
            ruta.slice(0, -1).map((nodo: string, index: number) => {

              const siguienteNodo: string = ruta[index + 1];

              return (
                <Line
                  key={index}
                  x1={nodos[nodo as keyof typeof nodos].x}
                  y1={nodos[nodo as keyof typeof nodos].y}
                  x2={nodos[siguienteNodo as keyof typeof nodos].x}
                  y2={nodos[siguienteNodo as keyof typeof nodos].y}
                  stroke="red"
                  strokeWidth="4"
                />
              );
            })}

        </Svg>

        {/* MARCADORES */}
        {salasFiltradas.map((sala) => (

          <View
            key={sala.id}
            style={[
              styles.marker,
              {
                left: sala.x,
                top: sala.y,
              },
            ]}
          >

            <Text style={styles.markerText}>
              📍
            </Text>

            <Text style={styles.markerLabel}>
              {sala.nombre}
            </Text>

          </View>

        ))}

      </View>

      <Text style={styles.routeText}>
        Ruta: {ruta?.join(' → ')}
      </Text>

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

  mapContainer: {
    width: '100%',
    height: 400,
    position: 'relative',
  },

  map: {
    width: '100%',
    height: '100%',
  },

  marker: {
    position: 'absolute',
    alignItems: 'center',
  },

  markerText: {
    fontSize: 24,
  },

  markerLabel: {
    fontSize: 12,
    fontWeight: 'bold',
    backgroundColor: 'white',
    paddingHorizontal: 4,
    borderRadius: 4,
  },

  routeText: {
    marginTop: 20,
    fontSize: 16,
    fontWeight: 'bold',
  },

});