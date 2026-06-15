import { ImageBackground, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { useRouter } from "expo-router";

export default function InicioScreen() {
  const router = useRouter();

  return (
    <View style={styles.container}>
      <ImageBackground
        source={require("../assets/images/santotomas.png")}
        style={styles.background}
        resizeMode="cover"
      >
        <View style={styles.overlay}>
          <View style={styles.header}>
            <View style={styles.logoRow}>
              <Text style={styles.title}>Santo{"\n"}Tomás</Text>
              <Text style={styles.go}>GO</Text>
            </View>

            <Text style={styles.subtitle}>
              Explora tu sede{"\n"}de forma interactiva
            </Text>
          </View>

          <View style={styles.buttons}>
            <TouchableOpacity
              style={styles.primaryButton}
              onPress={() => router.push("/mapa?recorrido=true")}
            >
              <Text style={styles.primaryText}>Comenzar recorrido</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.secondaryButton}
              onPress={() => router.push("/mapa?recorrido=false")}
            >
              <Text style={styles.secondaryText}>Explorar libremente</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ImageBackground>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#000",
  },

  background: {
    flex: 1,
    width: "100%",
    height: "100%",
  },

  overlay: {
    flex: 1,
    justifyContent: "space-between",
    paddingHorizontal: 16,
    paddingTop: 55,
    paddingBottom: 28,
    backgroundColor: "rgba(0,0,0,0.18)",
  },

  header: {
    marginTop: 100,
  },

  logoRow: {
    flexDirection: "row",
    alignItems: "center",
  },

  title: {
    color: "#fff",
    fontSize: 48,
    fontWeight: "800",
    lineHeight: 40,
    textShadowColor: "rgba(0,0,0,0.45)",
    textShadowOffset: { width: 1, height: 2 },
    textShadowRadius: 3,
  },

  go: {
    backgroundColor: "#007A3D",
    color: "#fff",
    fontSize: 32,
    fontWeight: "800",
    paddingHorizontal: 9,
    paddingVertical: 3,
    borderRadius: 7,
    marginLeft: 10,
    marginTop: 25,
    transform: [{ rotate: "-10deg" }],
  },

  subtitle: {
    color: "#fff",
    fontSize: 20,
    fontWeight: "700",
    marginTop: 8,
    lineHeight: 20,
    textShadowColor: "rgba(0,0,0,0.45)",
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 3,
  },

  buttons: {
    gap: 14,
  },

  primaryButton: {
    backgroundColor: "#00843D",
    paddingVertical: 15,
    borderRadius: 30,
    alignItems: "center",
  },

  primaryText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "800",
  },

  secondaryButton: {
    backgroundColor: "#fff",
    paddingVertical: 15,
    borderRadius: 30,
    alignItems: "center",
  },

  secondaryText: {
    color: "#007A3D",
    fontSize: 16,
    fontWeight: "800",
  },
});