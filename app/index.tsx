import { useState } from 'react';

import {
  View,
  Text,
  StyleSheet,
  Image,
  TextInput,
  ScrollView,
} from 'react-native';

import Svg, {
  Line,
  Circle,
  Text as SvgText,
} from 'react-native-svg';

import { salas } from '../data/salas';
import { rutas } from '../data/rutasPersonalizadas';

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
      ? rutas[
          salaEncontrada.nombre as keyof typeof rutas
        ]
      : null;

  return (

    <ScrollView
      contentContainerStyle={styles.container}
    >

      {/* TITULO */}
      <Text style={styles.title}>
        Indoor GIS IPST
      </Text>

      <Text style={styles.subtitle}>
        Sistema de orientación de salas
      </Text>

      {/* BUSCADOR */}
      <TextInput
        placeholder="Buscar sala"
        style={styles.input}
        value={busqueda}
        onChangeText={setBusqueda}
      />

      {/* MAPA */}
      <View style={styles.mapWrapper}>

        <View style={styles.mapContainer}>

          {/* IMAGEN */}
          <Image
            source={require('../assets/maps/piso1.png')}
            style={styles.map}
            resizeMode="contain"
          />

          {/* SVG */}
          <Svg
            width="100%"
            height="100%"
            style={styles.svgOverlay}
          >

            {/* RUTA */}
            {ruta &&
              ruta.slice(0, -1).map(
                (punto, index) => {

                  const siguiente =
                    ruta[index + 1];

                  return (
                    <Line
                      key={index}
                      x1={punto.x}
                      y1={punto.y}
                      x2={siguiente.x}
                      y2={siguiente.y}
                      stroke="#0066ff"
                      strokeWidth="6"
                      strokeLinecap="round"
                    />
                  );
                }
              )}

            {/* PUNTOS */}
            {ruta &&
              ruta.map(
                (punto, index) => (

                  <Circle
                    key={index}
                    cx={punto.x}
                    cy={punto.y}
                    r="8"
                    fill="#ff3333"
                  />

                )
              )}

            {/* USTED ESTA AQUI */}
            <Circle
              cx="500"
              cy="470"
              r="12"
              fill="#00cc44"
            />

            <SvgText
              x="440"
              y="450"
              fontSize="20"
              fill="#00cc44"
              fontWeight="bold"
            >
              Usted está aquí
            </SvgText>

          </Svg>

        </View>

      </View>

      {/* TEXTO */}
      <Text style={styles.routeText}>

        {busqueda.length === 0
          ? 'Busca ejemplo: "101", "DAE", "Biblioteca"'
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
    color: '#666',
    marginBottom: 25,
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

  mapWrapper: {
    width: '95%',
    alignItems: 'center',
  },

  mapContainer: {

    width: '100%',

    aspectRatio: 1.7,

    maxWidth: 1400,

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
    textAlign: 'center',
  },

});