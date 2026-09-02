import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { Ionicons } from "@expo/vector-icons";
import { Image } from "react-native";
import colors from "../theme/colors";
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

export default function MainTabs() {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarStyle: {
          backgroundColor: "#272A43",
          borderTopColor: colors.border,
        },
        tabBarActiveTintColor: "#fff",
        tabBarInactiveTintColor: colors.textMuted,
      }}
    >
      <Tab.Screen
        name="Home"
        component={HomeStackNavigator}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="home" color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen
        name="Point"
        component={PointScreen}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Image
              source={require("../../assets/star.png")}
              style={{ width: size, height: size, tintColor: color }}
              resizeMode="contain"
            />
          ),
        }}
      />
      <Tab.Screen
        name="Profile"
        component={ProfileScreen}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="person" color={color} size={size} />
          ),
        }}
      />
    </Tab.Navigator>
  );
}
