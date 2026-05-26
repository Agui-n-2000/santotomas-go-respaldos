import { useState } from 'react';

import {
  View,
  Text,
  StyleSheet,
  Image,
  TextInput,
  ScrollView,
  Dimensions,
} from 'react-native';

import Svg, {
  Line,
  Circle,
} from 'react-native-svg';

import { salas } from '../data/salas';
import { grafo } from '../data/grafo';
import { bfs } from '../algorithms/bfs';
import { nodos } from '../data/nodos';

const screenWidth =
  Dimensions.get('window').width;

export default function HomeScreen() {

  const [busqueda, setBusqueda] =
    useState('');

  const busquedaNormalizada =
    busqueda.trim().toLowerCase();

  const salaEncontrada = salas.find(
    (sala) =>
      sala.nombre.toLowerCase() ===
      busquedaNormalizada
  );

  const ruta =
    salaEncontrada
      ? bfs(
          grafo,
          'entrada',
          salaEncontrada.nombre
        )
      : null;

  return (

    <ScrollView
      contentContainerStyle={styles.container}
    >

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

      {/* CONTENEDOR RESPONSIVE */}
      <View style={styles.mapWrapper}>

        <View style={styles.mapContainer}>

          {/* MAPA */}
          <Image
            source={require('../assets/maps/piso1.png')}
            style={styles.map}
            resizeMode="contain"
          />

          {/* RUTA */}
          <Svg
            width="100%"
            height="100%"
            style={styles.svgOverlay}
          >

            {ruta &&
              ruta.slice(0, -1).map(
                (
                  nodo: string,
                  index: number
                ) => {

                  const siguienteNodo =
                    ruta[index + 1];

                  return (
                    <Line
                      key={index}
                      x1={
                        nodos[
                          nodo as keyof typeof nodos
                        ].x
                      }
                      y1={
                        nodos[
                          nodo as keyof typeof nodos
                        ].y
                      }
                      x2={
                        nodos[
                          siguienteNodo as keyof typeof nodos
                        ].x
                      }
                      y2={
                        nodos[
                          siguienteNodo as keyof typeof nodos
                        ].y
                      }
                      stroke="red"
                      strokeWidth="6"
                      strokeLinecap="round"
                    />
                  );
                }
              )}

            {/* NODOS */}
            {ruta &&
              ruta.map(
                (
                  nodo: string,
                  index: number
                ) => (

                  <Circle
                    key={index}
                    cx={
                      nodos[
                        nodo as keyof typeof nodos
                      ].x
                    }
                    cy={
                      nodos[
                        nodo as keyof typeof nodos
                      ].y
                    }
                    r="8"
                    fill="red"
                  />

                )
              )}

          </Svg>

        </View>

      </View>

      <Text style={styles.routeText}>

        {busqueda.length === 0
          ? 'Busca una sala'
          : salaEncontrada
          ? `Destino: ${salaEncontrada.nombre}`
          : 'Sala no encontrada'}

      </Text>

    </ScrollView>

  );
}

const styles = StyleSheet.create({

  container: {
    flexGrow: 1,
    alignItems: 'center',
    backgroundColor: '#f5f5f5',
    paddingTop: 40,
    paddingBottom: 50,
  },

  title: {
    fontSize: 30,
    fontWeight: 'bold',
    textAlign: 'center',
  },

  subtitle: {
    fontSize: 16,
    marginBottom: 25,
    color: '#666',
  },

  input: {
    width: '90%',
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 15,
    padding: 15,
    marginBottom: 25,
    fontSize: 16,
  },

  /* NUEVO WRAPPER */
  mapWrapper: {
    width: '95%',
    alignItems: 'center',
  },

  /* RESPONSIVE REAL */
  mapContainer: {

    width: '100%',

    aspectRatio: 1.7,

    maxWidth: 1200,

    position: 'relative',

    backgroundColor: '#fff',

    borderRadius: 20,

    overflow: 'hidden',
  },

  map: {
    width: '100%',
    height: '100%',
    position: 'absolute',
  },

  svgOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
  },

  routeText: {
    marginTop: 25,
    fontSize: 22,
    fontWeight: 'bold',
  },

});