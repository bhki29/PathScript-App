import { useEffect, useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity, Alert } from "react-native";
import { doc, onSnapshot } from "firebase/firestore";
import { Ionicons } from "@expo/vector-icons";
import colors from "../theme/colors";
import { db } from "../config/firebase";
import { useAuth } from "../context/AuthContext";
import { logout } from "../services/authService";

const WEEK_DAYS = ["S", "M", "T", "W", "T", "F", "S"];

export default function ProfileScreen() {
  const { user } = useAuth();
  const [points, setPoints] = useState(0);

  useEffect(() => {
    if (!user) return;
    const unsub = onSnapshot(doc(db, "users", user.uid), (snap) => {
      if (snap.exists()) setPoints(snap.data().points || 0);
    });
    return unsub;
  }, [user]);

  const handleLogout = () => {
    Alert.alert("Logout", "Yakin ingin keluar?", [
      { text: "Batal", style: "cancel" },
      { text: "Logout", style: "destructive", onPress: logout },
    ]);
  };

  // bar dummy
  const weekly = [40, 65, 30, 80, 55, 90, 70];

  return (
    <View style={styles.container}>
      <View style={styles.avatarWrap}>
        <Ionicons name="person" size={40} color="#fff" />
      </View>
      <Text style={styles.name}>{user?.displayName || "Coder"}</Text>

      <View style={styles.pointsBadge}>
        <Ionicons
          name="ribbon"
          size={16}
          color={colors.accentYellow || "#F2C94C"}
        />
        <Text style={styles.pointsText}>{points} Golden Points</Text>
      </View>

      <View style={styles.card}>
        <Text style={styles.cardTitle}>Weekly Progress</Text>
        <View style={styles.chartRow}>
          {weekly.map((h, i) => (
            <View key={i} style={styles.barCol}>
              <View style={[styles.bar, { height: h }]} />
              <Text style={styles.barLabel}>{WEEK_DAYS[i]}</Text>
            </View>
          ))}
        </View>
      </View>

      <TouchableOpacity style={styles.logoutBtn} onPress={handleLogout}>
        <Text style={styles.logoutText}>Logout</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
    alignItems: "center",
    paddingTop: 60,
    paddingHorizontal: 24,
  },
  avatarWrap: {
    width: 88,
    height: 88,
    borderRadius: 44,
    backgroundColor: colors.card,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 12,
  },
  name: { color: colors.text, fontSize: 18, fontWeight: "700" },
  pointsBadge: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: colors.card,
    borderRadius: 20,
    paddingHorizontal: 14,
    paddingVertical: 6,
    marginTop: 10,
    marginBottom: 28,
  },
  pointsText: {
    color: colors.text,
    marginLeft: 6,
    fontWeight: "600",
    fontSize: 12,
  },
  card: {
    width: "100%",
    backgroundColor: colors.card,
    borderRadius: 16,
    padding: 16,
    marginBottom: 32,
  },
  cardTitle: { color: colors.text, fontWeight: "700", marginBottom: 16 },
  chartRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-end",
    height: 100,
  },
  barCol: { alignItems: "center", flex: 1 },
  bar: {
    width: 14,
    borderRadius: 6,
    backgroundColor: colors.success || "#3DD68C",
  },
  barLabel: { color: colors.textMuted, fontSize: 10, marginTop: 6 },
  logoutBtn: {
    width: "100%",
    backgroundColor: colors.danger,
    borderRadius: 12,
    paddingVertical: 14,
    alignItems: "center",
    marginTop: "auto",
    marginBottom: 20,
  },
  logoutText: { color: "#fff", fontWeight: "700" },
});
