import { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  FlatList,
  ActivityIndicator,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import colors from "../theme/colors";
import { getQuestions } from "../services/quizServices";

export default function QuizPathScreen({ route, navigation }) {
  const { pathId, title } = route.params;
  const [questions, setQuestions] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getQuestions(pathId)
      .then(setQuestions)
      .catch(() => {})
      .finally(() => setLoading(false));
  }, [pathId]);

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={22} color={colors.text} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>{title}</Text>
        <View style={{ width: 22 }} />
      </View>

      {loading ? (
        <ActivityIndicator color={colors.primary} style={{ marginTop: 20 }} />
      ) : (
        <FlatList
          data={questions}
          keyExtractor={(item) => item.id}
          numColumns={5}
          contentContainerStyle={{ paddingBottom: 24 }}
          columnWrapperStyle={{
            justifyContent: "space-between",
            marginBottom: 14,
          }}
          ListEmptyComponent={
            <Text style={styles.emptyText}>
              Belum ada soal untuk path ini. Tambahkan dokumen di{"\n"}
              learningPaths/{pathId}/questions
            </Text>
          }
          renderItem={({ item, index }) => (
            <TouchableOpacity
              style={styles.cell}
              onPress={() =>
                navigation.navigate("QuizQuestion", {
                  pathId,
                  title,
                  questionId: item.id,
                  order: item.order ?? index + 1,
                })
              }
            >
              <Text style={styles.cellText}>{item.order ?? index + 1}</Text>
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
    justifyContent: "space-between",
    marginBottom: 24,
  },
  headerTitle: { color: colors.text, fontSize: 16, fontWeight: "700" },
  emptyText: { color: colors.textMuted, fontSize: 12, lineHeight: 18 },
  cell: {
    width: "18%",
    aspectRatio: 1,
    borderRadius: 12,
    backgroundColor: colors.card,
    alignItems: "center",
    justifyContent: "center",
  },
  cellText: { color: colors.text, fontWeight: "700" },
});
