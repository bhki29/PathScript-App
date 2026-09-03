import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { View, Text, Image, TouchableOpacity, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import HomeScreen from "../screens/HomeScreen";
import QuizPathScreen from "../screens/QuizPathScreen";
import QuizQuestionScreen from "../screens/QuizQuestionScreen";
import PointScreen from "../screens/PointScreen";
import ProfileScreen from "../screens/ProfileScreen";

const HomeStack = createNativeStackNavigator();
function HomeStackNavigator() {
  return (
    <HomeStack.Navigator screenOptions={{ headerShown: false }}>
      <HomeStack.Screen name="HomeMain" component={HomeScreen} />
      <HomeStack.Screen name="QuizPath" component={QuizPathScreen} />
      <HomeStack.Screen name="QuizQuestion" component={QuizQuestionScreen} />
    </HomeStack.Navigator>
  );
}

const Tab = createBottomTabNavigator();

const ACTIVE_COLOR = "#fff";
const INACTIVE_COLOR = "#858484";
const ICON_SIZE = 20;

const ROUTE_ICONS = {
  Home: ({ color }) => <Ionicons name="home" color={color} size={ICON_SIZE} />,
  Point: ({ color }) => (
    <Image
      source={require("../../assets/star.png")}
      style={{ width: ICON_SIZE, height: ICON_SIZE, tintColor: color }}
      resizeMode="contain"
    />
  ),
  Profile: ({ color }) => (
    <Ionicons name="person" color={color} size={ICON_SIZE} />
  ),
};

// Tab bar custom SEPENUHNYA -- container, tinggi, lebar box icon+label,
// semuanya dikontrol manual di sini (bukan lewat tabBarStyle/tabBarItemStyle
// bawaan React Navigation yang suka nambahin padding safe-area otomatis).
function CustomTabBar({ state, descriptors, navigation }) {
  return (
    <View style={styles.barContainer}>
      {state.routes.map((route, index) => {
        const isFocused = state.index === index;
        const renderIcon = ROUTE_ICONS[route.name];
        const color = isFocused ? ACTIVE_COLOR : INACTIVE_COLOR;

        const onPress = () => {
          const event = navigation.emit({
            type: "tabPress",
            target: route.key,
            canPreventDefault: true,
          });
          if (!isFocused && !event.defaultPrevented) {
            navigation.navigate(route.name);
          }
        };

        return (
          <TouchableOpacity
            key={route.key}
            onPress={onPress}
            activeOpacity={0.8}
            style={styles.tabButton}
          >
            <View style={styles.pill}>
              {renderIcon && renderIcon({ color })}
              <Text style={[styles.label, { color }]}>{route.name}</Text>
            </View>
          </TouchableOpacity>
        );
      })}
    </View>
  );
}

export default function MainTabs() {
  return (
    <Tab.Navigator tabBar={CustomTabBar} screenOptions={{ headerShown: false }}>
      <Tab.Screen name="Home" component={HomeStackNavigator} />
      <Tab.Screen name="Point" component={PointScreen} />
      <Tab.Screen name="Profile" component={ProfileScreen} />
    </Tab.Navigator>
  );
}

const styles = StyleSheet.create({
  barContainer: {
    position: "absolute",
    left: 30,
    right: 30,
    bottom: 25,
    height: 60,
    borderRadius: 40,
    backgroundColor: "#2D3449",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-around",
    overflow: "hidden",
    elevation: 8,
    shadowColor: "#000",
    shadowOpacity: 0.25,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 4 },
  },
  tabButton: {
    flex: 1,
    height: "100%",
    alignItems: "center",
    justifyContent: "center",
  },
  pill: {
    width: 76,
    height: 54,
    borderRadius: 16,
    alignItems: "center",
    justifyContent: "center",
  },
  label: {
    fontSize: 11,
    fontWeight: "700",
    marginTop: 4,
  },
});
