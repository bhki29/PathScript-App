import { useEffect, useRef, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  Modal,
  Alert,
  ActivityIndicator,
  Animated,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import colors from "../theme/colors";
import { useAuth } from "../context/AuthContext";
import {
  exchangeHeart,
  InsufficientPointsError,
} from "../services/quizServices";

const EXCHANGE_OPTIONS = [
  { id: "small", hearts: 2, cost: 20 },
  { id: "medium", hearts: 5, cost: 50 },
  { id: "large", hearts: 10, cost: 100 },
];

const SUCCESS_TOAST_DURATION = 2200;

export default function PointScreen() {
  const { user, profile } = useAuth();
  const points = profile?.points || 0;
  const lives = typeof profile?.lives === "number" ? profile.lives : 5;

  const [selectedOption, setSelectedOption] = useState(null);
  const [confirmVisible, setConfirmVisible] = useState(false);
  const [exchanging, setExchanging] = useState(false);
  const [toast, setToast] = useState(null);

  const toastTimerRef = useRef(null);
  const toastOpacity = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    return () => {
      if (toastTimerRef.current) clearTimeout(toastTimerRef.current);
    };
  }, []);

  const handlePressOption = (option) => {
    if (points < option.cost) {
      Alert.alert(
        "Poin tidak cukup",
        `Kamu butuh ${option.cost} poin untuk penukaran ini. Poin kamu saat ini: ${points}.`,
      );
      return;
    }
    setSelectedOption(option);
    setConfirmVisible(true);
  };

  const showSuccessToast = (hearts) => {
    setToast({ hearts });
    Animated.timing(toastOpacity, {
      toValue: 1,
      duration: 200,
      useNativeDriver: true,
    }).start();

    toastTimerRef.current = setTimeout(() => {
      Animated.timing(toastOpacity, {
        toValue: 0,
        duration: 300,
        useNativeDriver: true,
      }).start(() => setToast(null));
    }, SUCCESS_TOAST_DURATION);
  };

  const handleConfirmExchange = async () => {
    if (!selectedOption || !user) return;
    setExchanging(true);
    try {
      await exchangeHeart(user.uid, selectedOption.hearts, selectedOption.cost);
      setConfirmVisible(false);
      showSuccessToast(selectedOption.hearts);
    } catch (err) {
      if (err instanceof InsufficientPointsError) {
        Alert.alert("Poin tidak cukup", "Poin kamu berubah, coba lagi.");
      } else {
        console.error("Gagal menukar poin:", err);
        Alert.alert("Gagal", "Penukaran gagal, coba lagi.");
      }
    } finally {
      setExchanging(false);
      setSelectedOption(null);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.summaryRow}>
        <View style={styles.summaryBadge}>
          <Image
            source={require("../../assets/point.png")}
            style={styles.summaryIcon}
            resizeMode="contain"
          />
          <Text style={styles.summaryText}>{points} Point</Text>
        </View>
        <View style={styles.summaryBadge}>
          <Image
            source={require("../../assets/heart.png")}
            style={styles.summaryIcon}
            resizeMode="contain"
          />
          <Text style={styles.summaryText}>{lives} nyawa</Text>
        </View>
      </View>

      <Text style={styles.sectionTitle}>points ready to be exchanged</Text>

      <View style={styles.optionsRow}>
        {EXCHANGE_OPTIONS.map((option) => (
          <TouchableOpacity
            key={option.id}
            style={styles.optionCard}
            onPress={() => handlePressOption(option)}
          >
            <Image
              source={require("../../assets/heart.png")}
              style={styles.optionIcon}
              resizeMode="contain"
            />
            <Text style={styles.optionTitle}>
              +{option.hearts} extra hearts
            </Text>
            <Text style={styles.optionCost}>{option.cost} point</Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* Confirmation Popup */}
      <Modal
        visible={confirmVisible}
        transparent
        animationType="fade"
        onRequestClose={() => setConfirmVisible(false)}
      >
        <View style={styles.overlay}>
          <View style={styles.confirmCard}>
            <TouchableOpacity
              style={styles.closeBtn}
              onPress={() => setConfirmVisible(false)}
              disabled={exchanging}
            >
              <Ionicons name="close" size={25} color="#1A1A2E" />
            </TouchableOpacity>

            <Image
              source={require("../../assets/heart.png")}
              style={styles.confirmIcon}
              resizeMode="contain"
            />

            <Text style={styles.confirmText}>
              Kamu akan mendapatkan tambahan{"\n"}
              {selectedOption?.hearts} nyawa
            </Text>

            <TouchableOpacity
              style={styles.confirmBtn}
              onPress={handleConfirmExchange}
              disabled={exchanging}
            >
              {exchanging ? (
                <ActivityIndicator color="#fff" />
              ) : (
                <Text style={styles.confirmBtnText}>Tukar Sekarang</Text>
              )}
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      {/* Toast messagge */}
      {toast && (
        <View style={styles.toastContainer} pointerEvents="none">
          <Animated.View style={[styles.toast, { opacity: toastOpacity }]}>
            <Image
              source={require("../../assets/heart.png")}
              style={styles.toastIcon}
              resizeMode="contain"
            />
            <Text style={styles.toastText}>
              nyawa anda sudah bertambah +{toast.hearts}
            </Text>
          </Animated.View>
        </View>
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
  summaryRow: {
    flexDirection: "row",
    backgroundColor: "#2D3449",
    borderRadius: 13,
    padding: 16,
    justifyContent: "center",
    marginBottom: 24,
  },
  summaryBadge: {
    flexDirection: "row",
    alignItems: "center",
    marginRight: 30,
  },
  summaryIcon: { width: 30, height: 30, marginRight: 5 },
  summaryText: {
    color: colors.text,
    fontWeight: "700",
    fontSize: 16,
    fontFamily: "HankenGrotesk-ExtraBold",
  },
  sectionTitle: {
    color: colors.text,
    fontSize: 15,
    marginBottom: 12,
    fontFamily: "HankenGrotesk",
  },
  optionsRow: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  optionCard: {
    flex: 1,
    backgroundColor: colors.card,
    borderColor: "#5C5C5C",
    borderWidth: 1,
    borderRadius: 16,
    paddingVertical: 16,
    paddingHorizontal: 8,
    alignItems: "center",
    marginHorizontal: 4,
  },
  optionIcon: { width: 26, height: 26, marginBottom: 8 },
  optionTitle: {
    color: colors.text,
    fontSize: 12,
    textAlign: "center",
    fontFamily: "HankenGrotesk-ExtraBold",
  },
  optionCost: {
    color: colors.textMuted,
    fontSize: 10,
    marginTop: 6,
    fontFamily: "HankenGrotesk",
  },
  overlay: {
    flex: 1,
    backgroundColor: "rgba(11, 19, 38, 0.75)",
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 32,
  },
  confirmCard: {
    width: "100%",
    backgroundColor: "#E9E9EF",
    borderRadius: 24,
    paddingTop: 20,
    paddingBottom: 20,
    paddingHorizontal: 40,
    alignItems: "center",
  },
  closeBtn: {
    position: "absolute",
    top: 16,
    right: 16,
  },
  confirmIcon: { width: 60, height: 60, marginBottom: 8 },
  confirmText: {
    color: "#1A1A2E",
    fontSize: 16,
    textAlign: "center",
    marginBottom: 20,
    lineHeight: 22,
    fontFamily: "HankenGrotesk-ExtraBold",
  },
  confirmBtn: {
    width: "100%",
    borderRadius: 12,
    paddingVertical: 14,
    alignItems: "center",
    backgroundColor: colors.background,
  },
  confirmBtnText: { color: "#fff", fontWeight: "700", fontSize: 14 },
  toastContainer: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: "center",
    alignItems: "center",
    zIndex: 999,
    elevation: 999,
  },
  toast: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#3A3F58",
    borderRadius: 14,
    paddingVertical: 16,
    paddingHorizontal: 16,
  },
  toastIcon: { width: 20, height: 20, marginRight: 10 },
  toastText: { color: colors.text, fontWeight: "600", fontSize: 13 },
});
