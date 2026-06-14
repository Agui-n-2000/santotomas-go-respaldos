import { useState } from "react";

import {
  Image,
  StyleSheet,
  Text,
  TextInput,
  useWindowDimensions,
  View,
} from "react-native";

import { ResumableZoom } from "react-native-zoom-toolkit";

import Svg, { Circle, Line, Text as SvgText } from "react-native-svg";

import { Dimensions } from "react-native";

import { TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";

import { rutas } from "../data/rutasPersonalizadas";
import { salas } from "../data/salas";

export default function HomeScreen() {
  const [busqueda, setBusqueda] = useState("");

  const [pisoActual, setPisoActual] = useState(1);

  //const { width } = useWindowDimensions();

  /*
    TAMAÑO ORIGINAL DEL PLANO
  */
  const MAP_WIDTH = 1800;
  const MAP_HEIGHT = 2500;

  /*
    TAMAÑO RESPONSIVE
  */
  // const viewportHeight = Math.min(width * 1.1, 450);
  

  const screenHeight = Dimensions.get("window").height;

  const viewportHeight = screenHeight;

  const mapHeight = viewportHeight;

  const mapWidth = mapHeight * (MAP_WIDTH / MAP_HEIGHT);

  /*
    ESCALA
  */
  const scaleX = mapWidth / MAP_WIDTH;

  const scaleY = mapHeight / MAP_HEIGHT;

  /* 
    Drawer Izquierdo
  */
  const [menuVisible, setMenuVisible] = useState(false);
  const [floorVisible, setFloorVisible] = useState(false);

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
    <View style={styles.container}>

      <View style={styles.mapViewport}>

        {/* BOTONES FLOTANTES */}
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
            <Ionicons
              name="swap-horizontal"
              size={35}
              color="#007bff"
            />
          </TouchableOpacity>

        </View>

        {/* MENÚ IZQUIERDO */}
        {menuVisible && (
          <View style={styles.drawerMenu}>

            <TextInput
              placeholder="Buscar sala"
              style={styles.drawerInput}
              value={busqueda}
              onChangeText={setBusqueda}
            />

            <Text style={styles.drawerTitle}>
              Puntos de interés
            </Text>

            <Text style={styles.drawerItem}>Casino</Text>

            <Text style={styles.drawerItem}>Baños</Text>

            <Text style={styles.drawerItem}>Información</Text>

            <Text style={styles.drawerItem}>Biblioteca</Text>

            <Text style={styles.drawerItem}>Enfermería</Text>

            <Text style={styles.drawerItem}>DAE</Text>

          </View>
        )}

        {/* MENÚ DE PISOS */}
        {floorVisible && (
          <View style={styles.floorDrawer}>

            {[
              "Zócalo",
              "Piso 1",
              "Piso 2",
              "Piso 3",
              "Piso 4",
            ].map((piso, index) => (
              <TouchableOpacity
                key={index}
                onPress={() => {
                  setPisoActual(index);
                  setFloorVisible(false);
                }}
              >
                <Text style={styles.floorItem}>
                  {piso}
                </Text>
              </TouchableOpacity>
            ))}

          </View>
        )}

        {/* MAPA CON ZOOM */}
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

            {/* PLANO */}
            <Image
              source={imagenPiso}
              style={styles.map}
              resizeMode="contain"
            />

            {/* CAPA SVG */}
            <Svg
              width={mapWidth}
              height={mapHeight}
              style={styles.svgOverlay}
            >

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

              {/* PUNTOS */}
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
    width: "100%",
    //height: 740,
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

  floorItem: {
    fontSize: 16,
    textAlign: "center",
    paddingVertical: 12,
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
