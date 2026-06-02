import { useState } from 'react';

import {
  View,
  Text,
  StyleSheet,
  Image,
  TextInput,
  ScrollView,
  useWindowDimensions,
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

  const { width } =
    useWindowDimensions();

  /*
    TAMAÑO ORIGINAL DEL PLANO
  */
  const MAP_WIDTH = 1400;
  const MAP_HEIGHT = 820;

  /*
    TAMAÑO RESPONSIVE
  */
  const mapWidth =
    width * 0.95;

  const mapHeight =
    mapWidth * (MAP_HEIGHT / MAP_WIDTH);

  /*
    ESCALA
  */
  const scaleX =
    mapWidth / MAP_WIDTH;

  const scaleY =
    mapHeight / MAP_HEIGHT;

  /*
    BUSQUEDA
  */
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

      <Text style={styles.title}>
        Indoor GIS IPST
      </Text>

      <Text style={styles.subtitle}>
        Sistema de orientación de salas
      </Text>

      <TextInput
        placeholder='Buscar sala'
        style={styles.input}
        value={busqueda}
        onChangeText={setBusqueda}
      />

      {/* MAPA */}
      <View
        style={[
          styles.mapContainer,
          {
            width: mapWidth,
            height: mapHeight,
          },
        ]}
      >

        {/* IMAGEN */}
        <Image
          source={require('../assets/maps/piso1.png')}
          style={styles.map}
          resizeMode='contain'
        />

        {/* SVG */}
        <Svg
          width={mapWidth}
          height={mapHeight}
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

                    x1={punto.x * scaleX}
                    y1={punto.y * scaleY}

                    x2={siguiente.x * scaleX}
                    y2={siguiente.y * scaleY}

                    stroke='#0066ff'
                    strokeWidth='5'
                    strokeLinecap='round'
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

                  cx={punto.x * scaleX}
                  cy={punto.y * scaleY}

                  r='7'
                  fill='#ff3333'
                />

              )
            )}

          {/* USTED ESTA AQUI */}
          <Circle
            cx={400 * scaleX}
            cy={300 * scaleY}
            r='10'
            fill='#00cc44'
          />

          <SvgText
            x={370 * scaleX}
            y={320 * scaleY}
            fontSize={10 * (scaleX + scaleY) / 2}
            fill='#00cc44'
            fontWeight='bold'
          >
            Usted está aquí
          </SvgText>

        </Svg>

      </View>

      {/* TEXTO */}
      <Text style={styles.routeText}>

        {busqueda.length === 0
          ? 'Busca ejemplo: 101, DAE o Biblioteca'
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

  mapContainer: {
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