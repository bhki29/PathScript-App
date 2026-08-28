import { useAuth } from "../context/AuthContext";
import SplashScreen from "../screens/SplashScreen";
import AuthStack from "./AuthStack";
import MainTabs from "./MainTabs";

export default function RootNavigator() {
  const { user, loading } = useAuth();

  if (loading) return <SplashScreen />;

  return user ? <MainTabs /> : <AuthStack />;
}
