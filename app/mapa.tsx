import { useState } from "react";

import {
  Image,
  StyleSheet,
  Text,
  TextInput,
  View,
  Dimensions,
  TouchableOpacity,
} from "react-native";

import { useLocalSearchParams } from "expo-router";
import { ResumableZoom } from "react-native-zoom-toolkit";
import Svg, { Circle, Line, Text as SvgText } from "react-native-svg";
import { Ionicons } from "@expo/vector-icons";

import { rutas } from "../data/rutasPersonalizadas";
import { salas } from "../data/salas";

export default function MapaScreen() {
  const { recorrido } = useLocalSearchParams();

  const recorridoActivo = recorrido === "true";
  const [pasoRecorrido, setPasoRecorrido] = useState(0);

  const [busqueda, setBusqueda] = useState("");
  const [pisoActual, setPisoActual] = useState(1);

  const [menuVisible, setMenuVisible] = useState(false);
  const [floorVisible, setFloorVisible] = useState(false);

  const MAP_WIDTH = 1800;
  const MAP_HEIGHT = 2500;

  const screenHeight = Dimensions.get("window").height;
  const viewportHeight = screenHeight;
  const mapHeight = viewportHeight;
  const mapWidth = mapHeight * (MAP_WIDTH / MAP_HEIGHT);

  const scaleX = mapWidth / MAP_WIDTH;
  const scaleY = mapHeight / MAP_HEIGHT;

  const busquedaNormalizada = busqueda.trim().toLowerCase();

  const salaEncontrada = salas.find(
    (sala) => sala.nombre.toLowerCase() === busquedaNormalizada
  );

  const ruta = salaEncontrada
    ? rutas[salaEncontrada.nombre as keyof typeof rutas]
    : null;

  const rutaPisoActual = ruta
    ? ruta.filter((punto) => punto.piso === pisoActual)
    : null;

  const pisosRuta = ruta ? [...new Set(ruta.map((punto) => punto.piso))] : [];

  const rutaTieneCambioPiso = pisosRuta.length > 1;

  const imagenesPisos = {
    0: require("../assets/maps/zocalo.png"),
    1: require("../assets/maps/piso1.png"),
    2: require("../assets/maps/piso2.png"),
    3: require("../assets/maps/piso3.png"),
    4: require("../assets/maps/piso4.png"),
  };

  const nombresPisos = ["Zócalo", "Piso 1", "Piso 2", "Piso 3", "Piso 4"];

  const imagenPiso = imagenesPisos[pisoActual as keyof typeof imagenesPisos];

  return (
    <View style={styles.container}>
      <View style={styles.mapViewport}>
        {recorridoActivo && pasoRecorrido === 0 && (
          <View style={styles.tutorialBoxWelcome}>
            <Text style={styles.tutorialTitle}>
              👋 ¡Bienvenido a Santo Tomás Go!
            </Text>

            <Text style={styles.tutorialText}>
              Te guiaremos para que conozcas tu sede de forma fácil e interactiva
            </Text>

            <TouchableOpacity
              style={styles.nextButton}
              onPress={() => setPasoRecorrido(1)}
            >
              <Text style={styles.nextButtonText}>Siguiente</Text>
            </TouchableOpacity>
          </View>
        )}

        {recorridoActivo && pasoRecorrido === 1 && (
          <View style={styles.tutorialBoxSearch}>
            <Text style={styles.tutorialTitle}>🔍 Buscar una sala</Text>

            <Text style={styles.tutorialText}>
              Escribe el nombre o número de la sala que necesitas
            </Text>

            <TouchableOpacity
              style={styles.nextButton}
              onPress={() => setPasoRecorrido(2)}
            >
              <Text style={styles.nextButtonText}>Siguiente</Text>
            </TouchableOpacity>
          </View>
        )}

        {recorridoActivo && pasoRecorrido === 2 && (
          <View style={styles.tutorialBoxFloors}>
            <Text style={styles.tutorialTitle}>🏢 Explora los Pisos</Text>

            <Text style={styles.tutorialText}>
              Usa este botón para ver el mapa de otro piso
            </Text>

            <TouchableOpacity
              style={styles.nextButton}
              onPress={() => setPasoRecorrido(3)}
            >
              <Text style={styles.nextButtonText}>Siguiente</Text>
            </TouchableOpacity>
          </View>
        )}

        {recorridoActivo && pasoRecorrido === 3 && (
          <View style={styles.tutorialBoxEnd}>
            <Text style={styles.tutorialTitle}>
              Espero te haya gustado el recorrido, ahora usa la app y diviértete explorando
            </Text>

            <TouchableOpacity
              style={styles.closeButton}
              onPress={() => setPasoRecorrido(4)}
            >
              <Text style={styles.closeButtonText}>Empezar a usar la app</Text>
            </TouchableOpacity>
          </View>
        )}

        <View style={styles.topButtons}>
          <TouchableOpacity
            style={styles.iconButton}
            onPress={() => setMenuVisible(!menuVisible)}
          >
            <Ionicons name="menu" size={35} color="#f5a000" />
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.iconButton}
            onPress={() => setFloorVisible(!floorVisible)}
          >
            <Ionicons name="swap-horizontal" size={35} color="#007bff" />
          </TouchableOpacity>
        </View>

        {rutaTieneCambioPiso && (
          <View style={styles.changeFloorBox}>
            <Text style={styles.changeFloorText}>
              Esta ruta pasa por: {pisosRuta.map((piso) => nombresPisos[piso]).join(" → ")}
            </Text>
          </View>
        )}

        {menuVisible && (
          <View style={styles.drawerMenu}>
            <TextInput
              placeholder="Buscar sala"
              style={styles.drawerInput}
              value={busqueda}
              onChangeText={setBusqueda}
            />

            <Text style={styles.drawerTitle}>Puntos de interés</Text>

            <TouchableOpacity
                onPress={() => {
                    setBusqueda("Casino");
                    setMenuVisible(false);
                    setPisoActual(1);
                }}
            >
                <Text style={styles.drawerItem}>Casino</Text>
            </TouchableOpacity>

            <Text style={styles.drawerItem}>Baños</Text>
            <Text style={styles.drawerItem}>Información</Text>
            <Text style={styles.drawerItem}>Biblioteca</Text>
            <Text style={styles.drawerItem}>Enfermería</Text>
            <Text style={styles.drawerItem}>DAE</Text>
          </View>
        )}

        {floorVisible && (
          <View style={styles.floorDrawer}>
            {nombresPisos.map((piso, index) => (
              <TouchableOpacity
                key={index}
                onPress={() => {
                  setPisoActual(index);
                  setFloorVisible(false);
                }}
              >
                <Text
                  style={[
                    styles.floorItem,
                    pisoActual === index && styles.floorItemActive,
                  ]}
                >
                  {piso}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        )}

        <ResumableZoom maxScale={4} minScale={1}>
          <View
            style={[
              styles.mapContainer,
              {
                width: mapWidth,
                height: mapHeight,
              },
            ]}
          >
            <Image source={imagenPiso} style={styles.map} resizeMode="contain" />

            <Svg width={mapWidth} height={mapHeight} style={styles.svgOverlay}>
              {rutaPisoActual &&
                rutaPisoActual.slice(0, -1).map((punto, index) => {
                  const siguiente = rutaPisoActual[index + 1];

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

              {rutaPisoActual &&
                rutaPisoActual.map((punto, index) => (
                  <Circle
                    key={index}
                    cx={punto.x * scaleX}
                    cy={punto.y * scaleY}
                    r="10"
                    fill="#ff3333"
                  />
                ))}

              <Circle
                cx={550 * scaleX}
                cy={2000 * scaleY}
                r="8"
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
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    backgroundColor: "#f5f5f5",
    paddingTop: 40,
    paddingBottom: 50,
  },

  mapViewport: {
    width: "100%",
    flex: 1,
    position: "relative",
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

  topButtons: {
    position: "absolute",
    top: 50,
    left: 20,
    right: 20,
    flexDirection: "row",
    justifyContent: "space-between",
    zIndex: 100,
  },

  iconButton: {
    backgroundColor: "#fff",
    padding: 10,
    borderRadius: 30,
    elevation: 5,
  },

  drawerMenu: {
    position: "absolute",
    top: 110,
    left: 0,
    width: 260,
    height: "100%",
    backgroundColor: "#ffffff",
    padding: 20,
    zIndex: 99,
    elevation: 10,
  },

  drawerInput: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 10,
    padding: 12,
    marginBottom: 20,
  },

  drawerTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 15,
  },

  drawerItem: {
    fontSize: 16,
    paddingVertical: 12,
  },

  floorDrawer: {
    position: "absolute",
    top: 110,
    right: 20,
    width: 150,
    backgroundColor: "#fff",
    borderRadius: 15,
    padding: 10,
    zIndex: 99,
    elevation: 10,
  },

  floorItem: {
    fontSize: 16,
    textAlign: "center",
    paddingVertical: 12,
  },

  floorItemActive: {
    fontWeight: "bold",
    color: "#007bff",
  },

  changeFloorBox: {
    position: "absolute",
    bottom: 25,
    left: 20,
    right: 20,
    backgroundColor: "#007bff",
    borderRadius: 15,
    padding: 12,
    zIndex: 150,
  },

  changeFloorText: {
    color: "#fff",
    fontWeight: "bold",
    textAlign: "center",
  },

  tutorialBoxWelcome: {
    position: "absolute",
    top: 250,
    left: 25,
    right: 25,
    backgroundColor: "#fff",
    borderRadius: 18,
    padding: 20,
    zIndex: 200,
    elevation: 10,
    alignItems: "center",
  },

  tutorialBoxSearch: {
    position: "absolute",
    top: 260,
    right: 25,
    width: 210,
    backgroundColor: "#F5A400",
    borderRadius: 16,
    padding: 18,
    zIndex: 200,
    elevation: 10,
  },

  tutorialBoxFloors: {
    position: "absolute",
    top: 270,
    left: 25,
    right: 25,
    backgroundColor: "#0B9EFF",
    borderRadius: 16,
    padding: 20,
    zIndex: 200,
    elevation: 10,
  },

  tutorialBoxEnd: {
    position: "absolute",
    top: 260,
    left: 30,
    right: 30,
    backgroundColor: "#24A69A",
    borderRadius: 18,
    padding: 25,
    zIndex: 200,
    elevation: 10,
    alignItems: "center",
  },

  tutorialTitle: {
    fontSize: 18,
    fontWeight: "800",
    textAlign: "center",
    marginBottom: 10,
  },

  tutorialText: {
    fontSize: 14,
    fontWeight: "600",
    textAlign: "center",
  },

  nextButton: {
    marginTop: 15,
    backgroundColor: "#007A3D",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 20,
  },

  nextButtonText: {
    color: "#fff",
    fontWeight: "800",
  },

  closeButton: {
    marginTop: 20,
    backgroundColor: "#ffffff",
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 20,
  },

  closeButtonText: {
    color: "#24A69A",
    fontWeight: "bold",
    fontSize: 16,
  },
});