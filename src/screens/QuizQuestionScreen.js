import { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ActivityIndicator,
  Alert,
  Platform,
  Modal,
  Image,
} from "react-native";
import { doc, getDoc } from "firebase/firestore";
import { Ionicons } from "@expo/vector-icons";
import colors from "../theme/colors";
import { db } from "../config/firebase";
import { useAuth } from "../context/AuthContext";
import { submitAnswer } from "../services/quizServices";

export default function QuizQuestionScreen({ route, navigation }) {
  const { pathId, questionId, title } = route.params;
  const { user } = useAuth();
  const [question, setQuestion] = useState(null);
  const [selected, setSelected] = useState(null);
  const [loading, setLoading] = useState(true);
  const [resultVisible, setResultVisible] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);

  useEffect(() => {
    const ref = doc(db, "learningPaths", pathId, "questions", questionId);
    getDoc(ref)
      .then((snap) =>
        setQuestion(snap.exists() ? { id: snap.id, ...snap.data() } : null),
      )
      .catch(() => {})
      .finally(() => setLoading(false));
  }, [pathId, questionId]);

  const handleSubmit = async () => {
    if (!selected) {
      Alert.alert("Pilih jawaban", "Pilih salah satu opsi dulu.");
      return;
    }
    const correct = selected === question.correctOptionId;

    if (correct && user) {
      try {
        await submitAnswer(user.uid, question.points || 5);
      } catch (err) {
        console.error("Gagal menyimpan poin:", err);
      }
    }

    setIsCorrect(correct);
    setResultVisible(true);
  };

  const handleResultClose = () => {
    setResultVisible(false);
    navigation.goBack();
  };

  if (loading) {
    return (
      <View style={[styles.container, { justifyContent: "center" }]}>
        <ActivityIndicator color={colors.primary} />
      </View>
    );
  }

  if (!question) {
    return (
      <View style={[styles.container, { justifyContent: "center" }]}>
        <Text style={styles.emptyText}>Soal tidak ditemukan.</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={22} color={colors.text} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>{title}</Text>
        <View style={styles.heartsBadge}>
          <Ionicons name="heart" size={14} color="#fff" />
          <Text style={styles.heartsText}>5</Text>
        </View>
      </View>

      <Text style={styles.question}>{question.prompt}</Text>

      {question.code ? (
        <View style={styles.codeBox}>
          <Text style={styles.codeText}>{question.code}</Text>
        </View>
      ) : null}

      {(question.options || []).map((opt) => {
        const active = selected === opt.id;
        return (
          <TouchableOpacity
            key={opt.id}
            style={[styles.option, active && styles.optionActive]}
            onPress={() => setSelected(opt.id)}
          >
            <View
              style={[styles.optionBadge, active && styles.optionBadgeActive]}
            >
              <Text
                style={[styles.optionBadgeText, active && { color: "#fff" }]}
              >
                {opt.id.toUpperCase()}
              </Text>
            </View>
            <Text style={styles.optionText}>{opt.text}</Text>
          </TouchableOpacity>
        );
      })}

      <TouchableOpacity style={styles.submitBtn} onPress={handleSubmit}>
        <Text style={styles.submitBtnText}>Submit</Text>
      </TouchableOpacity>

      <Modal
        visible={resultVisible}
        transparent
        animationType="fade"
        onRequestClose={handleResultClose}
      >
        <View style={styles.overlay}>
          <View style={styles.resultCard}>
            <Image
              source={
                isCorrect
                  ? require("../../assets/great-job.png")
                  : require("../../assets/okay.png")
              }
              style={styles.resultImage}
              resizeMode="contain"
            />
            <Text style={styles.resultTitle}>
              {isCorrect
                ? "Jawabanmu Tepat Sekali!"
                : "Tidak apa-apa, yuk belajar lagi!"}
            </Text>
            <TouchableOpacity
              style={[
                styles.resultBtn,
                isCorrect ? styles.resultBtnCorrect : styles.resultBtnWrong,
              ]}
              onPress={handleResultClose}
            >
              <Text style={styles.resultBtnText}>
                {isCorrect ? "Gas Terus!" : "Coba Lagi"}
              </Text>
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
  heartsBadge: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: colors.danger,
    borderRadius: 20,
    paddingHorizontal: 10,
    paddingVertical: 4,
  },
  heartsText: { color: "#fff", fontWeight: "700", marginLeft: 4, fontSize: 12 },
  question: {
    color: colors.text,
    fontSize: 20,
    fontWeight: "700",
    marginBottom: 16,
  },
  codeBox: {
    backgroundColor: "#131B2E",
    borderRadius: 12,
    borderWidth: 0.5,
    borderColor: "#C7C7CC",
    padding: 14,
    marginBottom: 30,
  },
  codeText: {
    color: colors.text,
    fontFamily: Platform.OS === "ios" ? "Menlo" : "monospace",
    fontSize: 13,
  },
  option: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#2D3449",
    borderRadius: 12,
    padding: 14,
    marginBottom: 12,
  },
  optionActive: {
    borderColor: colors.primary,
    backgroundColor: colors.cardAlt || colors.card,
  },
  optionBadge: {
    width: 26,
    height: 26,
    borderRadius: 13,
    backgroundColor: "#222A3D",
    alignItems: "center",
    justifyContent: "center",
    marginRight: 12,
  },
  optionBadgeActive: { backgroundColor: colors.primary },
  optionBadgeText: {
    color: colors.textMuted,
    fontWeight: "700",
    fontSize: 12,
    fontFamily: "JetBrainsMono",
  },
  optionText: {
    color: colors.text,
    fontSize: 13,
    flex: 1,
    fontFamily: "JetBrainsMono",
  },
  submitBtn: {
    backgroundColor: "#C0C1FF",
    borderRadius: 12,
    paddingVertical: 15,
    alignItems: "center",
    marginTop: 12,
  },
  submitBtnText: {
    color: "#1000AA",
    fontSize: 15,
    fontFamily: "HankenGrotesk-ExtraBold",
  },
  emptyText: { color: colors.textMuted, textAlign: "center" },
  overlay: {
    flex: 1,
    backgroundColor: "rgba(11, 19, 38, 0.75)",
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 32,
  },
  resultCard: {
    width: "100%",
    backgroundColor: "#E9E9EF",
    borderRadius: 24,
    paddingTop: 170,
    paddingBottom: 30,
    paddingHorizontal: 24,
    alignItems: "center",
  },
  resultImage: {
    width: 150,
    height: 150,
    position: "absolute",
    top: 15,
  },
  resultTitle: {
    color: "#1A1A2E",
    fontSize: 16,
    fontWeight: "700",
    textAlign: "center",
    marginBottom: 20,
  },
  resultBtn: {
    width: "100%",
    borderRadius: 12,
    paddingVertical: 14,
    alignItems: "center",
  },
  resultBtnCorrect: { backgroundColor: colors.background },
  resultBtnWrong: { backgroundColor: colors.background },
  resultBtnText: { color: "#fff", fontWeight: "700", fontSize: 14 },
});
