import { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  ActivityIndicator,
  Image,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import colors from "../theme/colors";
import { useAuth } from "../context/AuthContext";
import { getLearningPaths } from "../services/quizServices";

const PATH_ICONS = {
  "javascript.png": require("../../assets/javascript.png"),
  "nodeJs.png": require("../../assets/nodeJs.png"),
  "typescript.png": require("../../assets/typescript.png"),
  "reactJs.png": require("../../assets/reactJs.png"),
  "reactNative.png": require("../../assets/reactNative.png"),
};

export default function HomeScreen({ navigation }) {
  const { user } = useAuth();
  const [paths, setPaths] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getLearningPaths()
      .then(setPaths)
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View style={styles.avatar}>
          <Ionicons name="person" size={22} color="#fff" />
        </View>
        <View style={{ marginLeft: 12 }}>
          <Text style={styles.welcome}>WELCOME BACK</Text>
          <Text style={styles.name}>{user?.displayName || "Coder"}</Text>
        </View>
      </View>

      <Text style={styles.sectionTitle}>Learning Paths</Text>

      {loading ? (
        <ActivityIndicator color={colors.primary} style={{ marginTop: 20 }} />
      ) : (
        <FlatList
          data={paths}
          keyExtractor={(item) => item.id}
          contentContainerStyle={{ paddingBottom: 24 }}
          ListEmptyComponent={
            <Text style={styles.emptyText}>
              Belum ada learning path. Tambahkan dokumen di koleksi{" "}
              "learningPaths" pada Firestore.
            </Text>
          }
          renderItem={({ item }) => (
            <TouchableOpacity
              style={styles.pathCard}
              onPress={() =>
                navigation.navigate("QuizPath", {
                  pathId: item.id,
                  title: item.title,
                })
              }
            >
              <View style={styles.pathIcon}>
                {PATH_ICONS[item.icon] ? (
                  <Image
                    source={PATH_ICONS[item.icon]}
                    style={styles.pathIconImage}
                    resizeMode="contain"
                  />
                ) : (
                  <Ionicons
                    name="code-slash"
                    size={22}
                    color={colors.textMuted}
                  />
                )}
              </View>
              <View style={{ flex: 1, marginLeft: 12 }}>
                <Text style={styles.pathTitle}>{item.title}</Text>
                <Text style={styles.pathDesc} numberOfLines={1}>
                  {item.description || "Lorem ipsum dolor sit amet"}
                </Text>
                <View style={styles.progressTrack}>
                  <View
                    style={[
                      styles.progressFill,
                      { width: `${item.percent || 0}%` },
                    ]}
                  />
                </View>
              </View>
              <Ionicons
                name="chevron-forward"
                size={18}
                color={colors.textMuted}
              />
            </TouchableOpacity>
          )}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
    paddingHorizontal: 20,
    paddingTop: 60,
  },
  header: { flexDirection: "row", alignItems: "center", marginBottom: 28 },
  avatar: {
    width: 80,
    height: 80,
    borderRadius: 50,
    backgroundColor: colors.primary,
    alignItems: "center",
    justifyContent: "center",
  },
  welcome: { color: colors.textMuted, fontSize: 20, fontWeight: "600" },
  name: { color: colors.text, fontSize: 18, fontWeight: "700" },
  sectionTitle: {
    color: colors.text,
    fontSize: 15,
    fontWeight: "700",
    marginBottom: 12,
  },
  emptyText: { color: colors.textMuted, fontSize: 12, lineHeight: 18 },
  pathCard: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: colors.card,
    borderRadius: 16,
    padding: 14,
    marginBottom: 14,
  },
  pathIcon: {
    width: 90,
    height: 90,
    borderRadius: 12,
    backgroundColor: colors.background,
    alignItems: "center",
    justifyContent: "center",
  },
  pathIconImage: {
    width: 70,
    height: 70,
  },
  pathTitle: { color: colors.text, fontWeight: "700", fontSize: 14 },
  pathDesc: {
    color: colors.textMuted,
    fontSize: 11,
    marginTop: 2,
    marginBottom: 8,
  },
  progressTrack: {
    height: 5,
    borderRadius: 4,
    backgroundColor: colors.border,
    overflow: "hidden",
  },
  progressFill: { height: 5, borderRadius: 4, backgroundColor: colors.primary },
});
