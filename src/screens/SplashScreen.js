import { useCallback, useEffect } from "react";
import { View, Text, StyleSheet, Image, StatusBar } from "react-native";
import { useFonts } from "expo-font";
import * as SplashScreenNative from "expo-splash-screen";
import colors from "../theme/colors";

SplashScreenNative.preventAutoHideAsync();

export default function SplashScreen() {
  const [fontsLoaded, fontError] = useFonts({
    "HankenGrotesk-ExtraBold": require("../../assets/font/HankenGrotesk-ExtraBold.ttf"),
    "JetBrainsMono-Bold": require("../../assets/font/JetBrainsMono-Bold.ttf"),
  });

  useEffect(() => {
    if (fontError) {
      console.log("Font loading error:", fontError);
    }
  }, [fontError]);

  const isReady = fontsLoaded || fontError;

  const onLayoutRootView = useCallback(async () => {
    if (isReady) {
      await SplashScreenNative.hideAsync();
    }
  }, [isReady]);

  if (!isReady) {
    return null;
  }

  return (
    <View style={styles.container} onLayout={onLayoutRootView}>
      <StatusBar barStyle={"light-content"} />
      <View style={styles.logoBox}>
        <Image
          source={require("../../assets/logo.png")}
          style={styles.logo}
          resizeMode="contain"
        />
      </View>
      <Text style={styles.title}>PathScript</Text>
      <Text style={styles.subtitle}>Learn to Code. Build the Future.</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
    alignItems: "center",
    justifyContent: "center",
  },
  logo: {
    width: 100,
    height: 100,
  },
  title: {
    marginTop: 15,
    color: colors.text,
    fontSize: 40,
    fontFamily: "HankenGrotesk-ExtraBold",
  },
  subtitle: {
    color: colors.textMuted,
    fontSize: 13,
    fontFamily: "JetBrainsMono-Bold",
    marginTop: 6,
  },
});
