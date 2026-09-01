import { useCallback, useMemo, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  ActivityIndicator,
  Image,
  TextInput,
} from "react-native";
import { useFocusEffect } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";
import colors from "../theme/colors";
import { useAuth } from "../context/AuthContext";
import { getLearningPathsWithProgress } from "../services/quizServices";

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
  const [search, setSearch] = useState("");

  const loadData = useCallback(() => {
    getLearningPathsWithProgress(user?.uid)
      .then(setPaths)
      .catch(() => {})
      .finally(() => setLoading(false));
  }, [user]);

  useFocusEffect(
    useCallback(() => {
      loadData();
    }, [loadData]),
  );

  const filteredPaths = useMemo(() => {
    const q = search.trim().toLowerCase();
    if (!q) return paths;
    return paths.filter((p) => (p.title || "").toLowerCase().includes(q));
  }, [paths, search]);

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

      <View style={styles.searchBar}>
        <TextInput
          style={styles.searchInput}
          placeholder="Search"
          placeholderTextColor={colors.textMuted}
          value={search}
          onChangeText={setSearch}
        />
        <Image
          source={require("../../assets/search.png")}
          style={styles.searchIcon}
          resizeMode="contain"
        />
      </View>

      <Text style={styles.sectionTitle}>Learning Paths</Text>

      {loading ? (
        <ActivityIndicator color={colors.primary} style={{ marginTop: 20 }} />
      ) : (
        <FlatList
          data={filteredPaths}
          keyExtractor={(item) => item.id}
          contentContainerStyle={{ paddingBottom: 24 }}
          ListEmptyComponent={
            <Text style={styles.emptyText}>
              {search
                ? `Tidak ada learning path dengan nama "${search}".`
                : 'Belum ada learning path. Tambahkan dokumen di koleksi "learningPaths" pada Firestore.'}
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
              <View style={styles.topRow}>
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
                </View>
                <Ionicons
                  name="chevron-forward"
                  size={18}
                  color={colors.textMuted}
                />
              </View>

              <View style={styles.progressRow}>
                <Text style={styles.progressLabel}>Progress</Text>
                <Text style={styles.progressPercent}>{item.percent}%</Text>
              </View>
              <View style={styles.progressTrack}>
                <View
                  style={[
                    styles.progressFill,
                    { width: `${item.percent || 0}%` },
                  ]}
                />
              </View>
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
  header: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 16,
    backgroundColor: "#272A43",
    borderRadius: 16,
    padding: 18,
    marginTop: 10,
  },
  avatar: {
    width: 50,
    height: 50,
    borderRadius: 50,
    backgroundColor: colors.primary,
    alignItems: "center",
    justifyContent: "center",
  },
  welcome: {
    color: colors.textMuted,
    fontSize: 11,
    fontWeight: "600",
    letterSpacing: 0.5,
  },
  name: { color: colors.text, fontSize: 16, fontWeight: "700", marginTop: 2 },
  searchBar: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: colors.card,
    borderColor: "#5C5C5C",
    borderWidth: 1,
    borderRadius: 14,
    paddingHorizontal: 16,
    marginBottom: 10,
  },
  searchInput: {
    flex: 1,
    color: colors.text,
    paddingVertical: 12,
    fontSize: 14,
  },
  searchIcon: { width: 18, height: 18, tintColor: colors.textMuted },
  sectionTitle: {
    color: colors.text,
    fontSize: 15,
    fontWeight: "700",
    marginBottom: 12,
  },
  emptyText: { color: colors.textMuted, fontSize: 12, lineHeight: 18 },
  pathCard: {
    backgroundColor: colors.card,
    borderColor: "#5C5C5C",
    borderWidth: 1,
    borderRadius: 16,
    padding: 16,
    marginBottom: 14,
  },
  topRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 14,
  },
  pathIcon: {
    width: 56,
    height: 56,
    borderRadius: 12,
    alignItems: "center",
    justifyContent: "center",
  },
  pathIconImage: {
    width: 48,
    height: 48,
  },
  pathTitle: { color: colors.text, fontWeight: "700", fontSize: 15 },
  pathDesc: {
    color: colors.textMuted,
    fontSize: 11,
    marginTop: 2,
  },
  progressRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 6,
  },
  progressLabel: { color: colors.textMuted, fontSize: 12 },
  progressPercent: { color: colors.textMuted, fontSize: 12 },
  progressTrack: {
    height: 5,
    borderRadius: 5,
    backgroundColor: "#2D3449",
    overflow: "hidden",
  },
  progressFill: { height: 5, borderRadius: 4, backgroundColor: "#fff" },
});
