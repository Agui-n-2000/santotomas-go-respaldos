import { useState } from "react";

import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  useWindowDimensions,
  View,
} from "react-native";

import { ResumableZoom } from "react-native-zoom-toolkit";

import Svg, { Circle, Line, Text as SvgText } from "react-native-svg";

import { rutas } from "../data/rutasPersonalizadas";
import { salas } from "../data/salas";

export default function HomeScreen() {
  const [busqueda, setBusqueda] = useState("");

  const [pisoActual, setPisoActual] = useState(1);

  const { width } = useWindowDimensions();

  /*
    TAMAÑO ORIGINAL DEL PLANO
  */
  const MAP_WIDTH = 1800;
  const MAP_HEIGHT = 2500;

  /*
    TAMAÑO RESPONSIVE
  */
  const viewportHeight = Math.min(width * 1.1, 450);

  const mapHeight = viewportHeight;

  const mapWidth = mapHeight * (MAP_WIDTH / MAP_HEIGHT);

  /*
    ESCALA
  */
  const scaleX = mapWidth / MAP_WIDTH;

  const scaleY = mapHeight / MAP_HEIGHT;

  /*
    BUSQUEDA
  */
  const busquedaNormalizada = busqueda.trim().toLowerCase();

  const salaEncontrada = salas.find(
    (sala) => sala.nombre.toLowerCase() === busquedaNormalizada,
  );

  const ruta = salaEncontrada
    ? rutas[salaEncontrada.nombre as keyof typeof rutas]
    : null;

  const imagenPiso =
    pisoActual === 1
      ? require("../assets/maps/piso1.png")
      : require("../assets/maps/piso2.png");

  return (
    <ScrollView
      contentContainerStyle={styles.container}
      nestedScrollEnabled={true}
    >
      <Text style={styles.title}>Indoor GIS IPST</Text>

      <Text style={styles.subtitle}>
        Sistema de orientación de salas, laboratorios y servicios del IPST
      </Text>

      <TextInput
        placeholder="Buscar sala"
        style={styles.input}
        value={busqueda}
        onChangeText={setBusqueda}
      />
      <View style={styles.floorContainer}>
        <Text
          style={[
            styles.floorButton,
            pisoActual === 1 && styles.floorButtonActive,
          ]}
          onPress={() => setPisoActual(1)}
        >
          Piso 1
        </Text>

        <Text
          style={[
            styles.floorButton,
            pisoActual === 2 && styles.floorButtonActive,
          ]}
          onPress={() => setPisoActual(2)}
        >
          Piso 2
        </Text>
      </View>
      {/* MAPA */}
      <View style={styles.mapViewport}>
        <ResumableZoom
          maxScale={4}
          minScale={1}          
        >
          <View
            style={[
              styles.mapContainer,
              {
                width: mapWidth,
                height: mapHeight,
              },
            ]}
          >
          {/* Plano */}
          {
            <Image
              source={imagenPiso}
              style={styles.map}
              resizeMode="contain"
            />
          }

          {/* Capa SVG */}
          <Svg width={mapWidth} height={mapHeight} style={styles.svgOverlay}>
            {/* RUTA */}
            {ruta &&
              ruta.slice(0, -1).map((punto, index) => {
                const siguiente = ruta[index + 1];

                return (
                  <Line
                    key={index}
                    x1={punto.x * scaleX}
                    y1={punto.y * scaleY}
                    x2={siguiente.x * scaleX}
                    y2={siguiente.y * scaleY}
                    stroke="#0066ff"
                    strokeWidth="5"
                    strokeLinecap="round"
                  />
                );
              })}

            {/* PUNTOS DE LA RUTA */}
            {ruta &&
              ruta.map((punto, index) => (
                <Circle
                  key={index}
                  cx={punto.x * scaleX}
                  cy={punto.y * scaleY}
                  r="10"
                  fill="#ff3333"
                />
              ))}

            {/* USTED ESTÁ AQUÍ */}
            <Circle
              cx={550 * scaleX}
              cy={2000 * scaleY}
              r="20"
              fill="#00cc44"
            />

            <SvgText
              x={475 * scaleX}
              y={2040 * scaleY}
              fontSize={(25 * (scaleX + scaleY)) / 2}
              fill="#00cc44"
              fontWeight="bold"
            >
              Usted está aquí
            </SvgText>
          </Svg>
          </View>
        </ResumableZoom>
      </View>
      

      {/* TEXTO */}
      {/* <Text style={styles.routeText}>
        {busqueda.length === 0
          ? "Busca ejemplo: 103, DAE o Biblioteca"
          : salaEncontrada
            ? `Destino: ${salaEncontrada.nombre}`
            : "Sala no encontrada"}
      </Text> */}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    alignItems: "center",
    backgroundColor: "#f5f5f5",
    paddingTop: 40,
    paddingBottom: 50,
  },

  title: {
    fontSize: 30,
    fontWeight: "bold",
    textAlign: "center",
  },

  subtitle: {
    fontSize: 16,
    color: "#666",
    marginBottom: 25,
  },

  input: {
    width: "90%",
    backgroundColor: "#fff",
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 15,
    padding: 15,
    marginBottom: 25,
    fontSize: 16,
  },

 mapViewport: {
  width: "95%",
  height: 450,
  backgroundColor: "#fff",
  borderRadius: 20,
  overflow: "hidden",
  marginVertical: 20,
},

mapContainer: {
  position: "relative",
},
map: {
  width: "100%",
  height: "100%",
  position: "absolute",
},

  svgOverlay: {
    position: "absolute",
    top: 0,
    left: 0,
  },

  routeText: {
    marginTop: 25,
    fontSize: 22,
    fontWeight: "bold",
    textAlign: "center",
  },
  floorContainer: {
    flexDirection: "row",
    gap: 10,
    marginBottom: 15,
  },

  floorButton: {
    backgroundColor: "#ddd",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 10,
    fontWeight: "bold",
  },

  floorButtonActive: {
    backgroundColor: "#0066ff",
    color: "#fff",
  },

  zoomContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 15,
    marginBottom: 20,
  },

  zoomButton: {
    backgroundColor: "#0066ff",
    color: "#fff",
    width: 45,
    height: 45,
    textAlign: "center",
    lineHeight: 45,
    borderRadius: 25,
    fontSize: 24,
    fontWeight: "bold",
  },

  zoomText: {
    fontSize: 18,
    fontWeight: "bold",
  },
});
