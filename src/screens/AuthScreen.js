import { useRef, useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
  ActivityIndicator,
  Alert,
  Animated,
  Easing,
  Image,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import colors from "../theme/colors";
import {
  loginWithEmail,
  registerWithEmail,
  mapAuthError,
} from "../services/authService";

const TAB_WIDTH_PERCENT = 0.5;

export default function AuthScreen() {
  const [mode, setMode] = useState("login"); // 'login' | 'register'
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const slideAnim = useRef(new Animated.Value(0)).current;
  const fadeAnim = useRef(new Animated.Value(1)).current;

  const switchMode = (nextMode) => {
    if (nextMode === mode) return;

    Animated.timing(slideAnim, {
      toValue: nextMode === "login" ? 0 : 1,
      duration: 220,
      easing: Easing.out(Easing.cubic),
      useNativeDriver: false,
    }).start();

    Animated.sequence([
      Animated.timing(fadeAnim, {
        toValue: 0,
        duration: 120,
        useNativeDriver: true,
      }),
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 160,
        useNativeDriver: true,
      }),
    ]).start();

    setTimeout(() => setMode(nextMode), 100);
  };

  const handleSubmit = async () => {
    if (mode === "login") {
      if (!email || !password) {
        Alert.alert("Lengkapi data", "Email dan password wajib diisi.");
        return;
      }
      try {
        setLoading(true);
        await loginWithEmail(email.trim(), password);
        // RootNavigator otomatis pindah ke Home lewat AuthContext
      } catch (err) {
        Alert.alert("Login gagal", mapAuthError(err));
      } finally {
        setLoading(false);
      }
    } else {
      if (!email || !username || !password) {
        Alert.alert("Lengkapi data", "Semua field wajib diisi.");
        return;
      }
      try {
        setLoading(true);
        await registerWithEmail(email.trim(), password, username.trim());
      } catch (err) {
        Alert.alert("Register gagal", mapAuthError(err));
      } finally {
        setLoading(false);
      }
    }
  };

  const indicatorLeft = slideAnim.interpolate({
    inputRange: [0, 1],
    outputRange: ["0%", `${TAB_WIDTH_PERCENT * 100}%`],
  });

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === "ios" ? "padding" : undefined}
    >
      <View style={styles.logoWrap}>
        <View style={styles.logoBox}>
          <Image
            source={require("../../assets/logo.png")}
            style={styles.logo}
            resizeMode="contain"
          />
        </View>
        <Text style={styles.title}>PathScript</Text>
        <Text style={styles.subtitle}>Code Your way to the top</Text>
      </View>

      {/* tab login & register */}
      <View style={styles.tabRow}>
        <Animated.View
          style={[
            styles.tabIndicator,
            { left: indicatorLeft, width: `${TAB_WIDTH_PERCENT * 100}%` },
          ]}
        />
        <TouchableOpacity
          style={styles.tabBtn}
          onPress={() => switchMode("login")}
        >
          <Text
            style={mode === "login" ? styles.tabTextActive : styles.tabText}
          >
            Login
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.tabBtn}
          onPress={() => switchMode("register")}
        >
          <Text
            style={mode === "register" ? styles.tabTextActive : styles.tabText}
          >
            Register
          </Text>
        </TouchableOpacity>
      </View>

      <Animated.View style={[styles.form, { opacity: fadeAnim }]}>
        <Text style={styles.label}>EMAIL</Text>
        <TextInput
          style={styles.input}
          placeholder="Masukkan email"
          placeholderTextColor={colors.textMuted}
          autoCapitalize="none"
          keyboardType="email-address"
          value={email}
          onChangeText={setEmail}
        />

        {mode === "register" && (
          <>
            <Text style={styles.label}>USERNAME</Text>
            <TextInput
              style={styles.input}
              placeholder="Masukkan username"
              placeholderTextColor={colors.textMuted}
              autoCapitalize="none"
              value={username}
              onChangeText={setUsername}
            />
          </>
        )}

        <Text style={styles.label}>PASSWORD</Text>
        <View style={styles.passwordRow}>
          <TextInput
            style={[styles.input, { flex: 1, marginBottom: 0 }]}
            placeholder={
              mode === "register" ? "Minimal 6 karakter" : "Masukkan password"
            }
            placeholderTextColor={colors.textMuted}
            secureTextEntry={!showPassword}
            value={password}
            onChangeText={setPassword}
          />
          <TouchableOpacity
            style={styles.eyeBtn}
            onPress={() => setShowPassword((v) => !v)}
          >
            <Ionicons
              name={showPassword ? "eye-off" : "eye"}
              size={20}
              color={colors.textMuted}
            />
          </TouchableOpacity>
        </View>

        <TouchableOpacity
          style={styles.submitBtn}
          onPress={handleSubmit}
          disabled={loading}
        >
          {loading ? (
            <ActivityIndicator color="#fff" />
          ) : (
            <Text style={styles.submitBtnText}>
              {mode === "login" ? "Login" : "REGISTER"}
            </Text>
          )}
        </TouchableOpacity>
      </Animated.View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
    paddingHorizontal: 24,
    paddingTop: 60,
  },
  logoWrap: { alignItems: "center", marginBottom: 24 },

  logo: {
    width: 80,
    height: 80,
    marginBottom: 5,
  },
  title: { color: colors.text, fontSize: 22, fontWeight: "700" },
  subtitle: { color: colors.textMuted, fontSize: 12, marginTop: 4 },
  tabRow: {
    flexDirection: "row",
    backgroundColor: colors.card,
    borderRadius: 14,
    padding: 4,
    marginBottom: 24,
    overflow: "hidden",
  },
  tabIndicator: {
    position: "absolute",
    top: 4,
    bottom: 4,
    borderRadius: 10,
    backgroundColor: colors.primary,
  },
  tabBtn: {
    flex: 1,
    paddingVertical: 10,
    borderRadius: 10,
    alignItems: "center",
    zIndex: 1,
  },
  tabText: { color: colors.textMuted, fontWeight: "600" },
  tabTextActive: { color: "#fff", fontWeight: "600" },
  form: {},
  label: {
    color: colors.textMuted,
    fontSize: 11,
    fontWeight: "600",
    marginBottom: 6,
    marginTop: 12,
  },
  input: {
    backgroundColor: colors.input || colors.card,
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 14,
    color: colors.text,
    borderWidth: 1,
    borderColor: colors.border,
    marginBottom: 4,
  },
  passwordRow: { flexDirection: "row", alignItems: "center" },
  eyeBtn: { position: "absolute", right: 14 },
  submitBtn: {
    backgroundColor: colors.primary,
    borderRadius: 12,
    paddingVertical: 15,
    alignItems: "center",
    marginTop: 24,
  },
  submitBtnText: { color: "#fff", fontWeight: "700", fontSize: 15 },
});
