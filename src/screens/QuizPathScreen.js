import { useCallback, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  FlatList,
  ActivityIndicator,
  Image,
  Modal,
} from "react-native";
import { useFocusEffect } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";
import colors from "../theme/colors";
import { getQuestions, getUnlockedOrder } from "../services/quizServices";
import { useAuth } from "../context/AuthContext";

export default function QuizPathScreen({ route, navigation }) {
  const { pathId, title } = route.params;
  const { user } = useAuth();
  const [questions, setQuestions] = useState([]);
  const [unlockedOrder, setUnlockedOrder] = useState(1);
  const [loading, setLoading] = useState(true);
  const [lockedModalVisible, setLockedModalVisible] = useState(false);

  const loadData = useCallback(async () => {
    try {
      const [qs, unlocked] = await Promise.all([
        getQuestions(pathId),
        user ? getUnlockedOrder(user.uid, pathId) : Promise.resolve(1),
      ]);
      setQuestions(qs);
      setUnlockedOrder(unlocked);
    } catch (err) {
      console.error("Gagal load data quiz path:", err);
    } finally {
      setLoading(false);
    }
  }, [pathId, user]);

  useFocusEffect(
    useCallback(() => {
      loadData();
    }, [loadData]),
  );

  const handlePressCell = (item, index) => {
    const order = item.order ?? index + 1;
    const isLocked = order > unlockedOrder;

    if (isLocked) {
      setLockedModalVisible(true);
      return;
    }

    navigation.navigate("QuizQuestion", {
      pathId,
      title,
      questionId: item.id,
      order,
    });
  };

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
          renderItem={({ item, index }) => {
            const order = item.order ?? index + 1;
            const isLocked = order > unlockedOrder;

            return (
              <TouchableOpacity
                style={[styles.cell, isLocked && styles.cellLocked]}
                onPress={() => handlePressCell(item, index)}
              >
                {isLocked ? (
                  <Image
                    source={require("../../assets/lock.png")}
                    style={styles.lockIcon}
                    resizeMode="contain"
                  />
                ) : (
                  <Text style={styles.cellText}>{order}</Text>
                )}
              </TouchableOpacity>
            );
          }}
        />
      )}

      <Modal
        visible={lockedModalVisible}
        transparent
        animationType="fade"
        onRequestClose={() => setLockedModalVisible(false)}
      >
        <View style={styles.overlay}>
          <View style={styles.lockedCard}>
            <View style={styles.lockedIconWrap}>
              <Image
                source={require("../../assets/padlock.png")}
                style={styles.lockedIcon}
                resizeMode="contain"
              />
            </View>
            <Text style={styles.lockedTitle}>Ups, belum bisa dibuka!</Text>
            <Text style={styles.lockedSubtitle}>
              Anda harus menyelesaikan kuis sebelumnya untuk membuka akses ke
              kuis ini.
            </Text>
            <TouchableOpacity
              style={styles.lockedBtn}
              onPress={() => setLockedModalVisible(false)}
            >
              <Text style={styles.lockedBtnText}>Oke</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
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
    backgroundColor: "#293145",
    borderColor: "#5C5C5C",
    borderWidth: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  cellLocked: {
    opacity: 0.6,
  },
  cellText: { color: "#DAE2FD", fontWeight: "700", fontSize: 18 },
  lockIcon: { width: 50, height: 50 },
  overlay: {
    flex: 1,
    backgroundColor: "rgba(11, 19, 38, 0.75)",
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 32,
  },
  lockedCard: {
    width: "100%",
    backgroundColor: "#E9E9EF",
    borderRadius: 24,
    paddingTop: 24,
    paddingBottom: 24,
    paddingHorizontal: 24,
    alignItems: "center",
  },
  lockedIconWrap: {
    width: 64,
    height: 64,
    borderRadius: 32,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 16,
  },
  lockedIcon: { width: 80, height: 80 },
  lockedTitle: {
    color: "#1A1A2E",
    fontSize: 18,
    fontWeight: "700",
    textAlign: "center",
    marginBottom: 8,
  },
  lockedSubtitle: {
    color: "#57576B",
    fontSize: 12,
    textAlign: "center",
    marginBottom: 20,
    lineHeight: 18,
  },
  lockedBtn: {
    width: "100%",
    borderRadius: 12,
    paddingVertical: 14,
    alignItems: "center",
    backgroundColor: colors.background,
  },
  lockedBtnText: { color: "#fff", fontWeight: "700", fontSize: 14 },
});
