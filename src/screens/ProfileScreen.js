import { useEffect, useMemo, useState } from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  Alert,
  ActivityIndicator,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import colors from "../theme/colors";
import { useAuth } from "../context/AuthContext";
import { logout } from "../services/authService";
import {
  updateProfilePhoto,
  ImageTooLargeError,
  PermissionDeniedError,
} from "../services/profileService";
import { getCurrentWeekDates, getLocalDateKey } from "../utils/date";

const WEEK_DAYS = ["M", "T", "W", "T", "F", "S", "S"];
const MIN_BAR_HEIGHT = 6;
const MAX_BAR_HEIGHT = 90;

export default function ProfileScreen() {
  const { user, profile } = useAuth();
  const [uploading, setUploading] = useState(false);

  const points = profile?.points || 0;
  const photoBase64 = profile?.photoBase64 || null;
  const activity = profile?.activity || {};

  const weekly = useMemo(() => {
    const weekDates = getCurrentWeekDates();
    const values = weekDates.map((d) => activity[getLocalDateKey(d)] || 0);
    const maxValue = Math.max(...values, 1);

    return values.map((value) => ({
      value,
      height:
        value === 0
          ? MIN_BAR_HEIGHT
          : Math.max(
              MIN_BAR_HEIGHT + 12,
              Math.round((value / maxValue) * MAX_BAR_HEIGHT),
            ),
    }));
  }, [activity]);

  const handleLogout = () => {
    Alert.alert("Logout", "Yakin ingin keluar?", [
      { text: "Batal", style: "cancel" },
      { text: "Logout", style: "destructive", onPress: logout },
    ]);
  };

  const handleEditPhoto = async () => {
    if (!user || uploading) return;
    try {
      setUploading(true);
      await updateProfilePhoto(user.uid);
    } catch (err) {
      if (err instanceof PermissionDeniedError) {
        Alert.alert(
          "Izin dibutuhkan",
          "Aktifkan izin akses galeri untuk mengganti foto profil.",
        );
      } else if (err instanceof ImageTooLargeError) {
        Alert.alert(
          "Gambar terlalu besar",
          "Coba pilih foto lain dengan ukuran yang lebih kecil.",
        );
      } else {
        console.error(err);
        Alert.alert("Gagal", "Gagal memperbarui foto profil. Coba lagi.");
      }
    } finally {
      setUploading(false);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.avatarWrap}>
        {photoBase64 ? (
          <Image source={{ uri: photoBase64 }} style={styles.avatarImage} />
        ) : (
          <Ionicons name="person" size={40} color="#fff" />
        )}

        {uploading && (
          <View style={styles.avatarOverlay}>
            <ActivityIndicator color="#fff" />
          </View>
        )}

        <TouchableOpacity
          style={styles.editBadge}
          onPress={handleEditPhoto}
          disabled={uploading}
        >
          <Image
            source={require("../../assets/edit-profile.png")}
            style={styles.editIcon}
          />
        </TouchableOpacity>
      </View>

      <Text style={styles.name}>{user?.displayName || "Coder"}</Text>

      <View style={styles.pointsBadge}>
        <Image
          source={require("../../assets/point.png")}
          style={styles.pointIcon}
        />
        <Text style={styles.pointsText}>{points} Point</Text>
      </View>

      <View style={styles.card}>
        <Text style={styles.cardTitle}>Weekly Progress</Text>
        <View style={styles.chartRow}>
          {weekly.map((day, i) => (
            <View key={i} style={styles.barCol}>
              <View style={[styles.bar, { height: day.height }]} />
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
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: colors.card,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 12,
  },
  avatarImage: {
    width: 120,
    height: 120,
    borderRadius: 60,
  },
  avatarOverlay: {
    ...StyleSheet.absoluteFillObject,
    borderRadius: 60,
    backgroundColor: "rgba(11, 19, 38, 0.6)",
    alignItems: "center",
    justifyContent: "center",
  },
  editBadge: {
    position: "absolute",
    right: 2,
    bottom: 2,
    width: 32,
    height: 32,
    borderColor: colors.background,
    alignItems: "center",
    justifyContent: "center",
  },
  editIcon: {
    width: 35,
    height: 35,
    resizeMode: "contain",
  },
  name: { color: colors.text, fontSize: 18, fontWeight: "700" },
  pointsBadge: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#2D3449",
    borderRadius: 10,
    paddingHorizontal: 14,
    paddingVertical: 6,
    marginTop: 10,
    marginBottom: 28,
  },
  pointIcon: {
    width: 25,
    height: 25,
    resizeMode: "contain",
  },
  pointsText: {
    color: colors.text,
    marginLeft: 6,
    fontWeight: "600",
    fontSize: 15,
  },
  card: {
    width: "100%",
    backgroundColor: "#2D3449",
    borderRadius: 16,
    padding: 20,
    marginBottom: 32,
  },
  cardTitle: {
    color: colors.text,
    fontSize: 15,
    fontFamily: "Hanken Grotesk",
    marginBottom: 35,
  },
  chartRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-end",
    height: 100,
  },
  barCol: { alignItems: "center", flex: 1 },
  bar: {
    width: 40,
    borderRadius: 1,
    backgroundColor: colors.success || "#1DBC8F",
  },
  barLabel: {
    color: colors.textMuted,
    fontFamily: "Hanken Grotesk",
    fontSize: 10,
    marginTop: 10,
  },
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
