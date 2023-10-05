import "react-native-gesture-handler";

import { StatusBar } from "expo-status-bar";
import { SafeAreaProvider } from "react-native-safe-area-context";

import { useLoadedAssets } from "./hooks/useLoadedAssets";
import Navigation from "./navigation";
import { useColorScheme } from "react-native";
import { useFonts } from "expo-font";
import * as SplashScreen from 'expo-splash-screen';
import { useCallback } from "react";
import { BottomSheetModalProvider } from "@gorhom/bottom-sheet"
import { useEffect } from "react";
import { HabitsContext, HabitsProvider } from "./data/HabitContext";
import { useContext } from "react";


SplashScreen.preventAutoHideAsync();

export default function App() {
  const colorScheme = useColorScheme();

  const [isLoaded] = useFonts({
    "poppinsLight": require("./assets/fonts/Poppins-Light.ttf"),
    "poppinsMedium": require("./assets/fonts/Poppins-Medium.ttf"),
    "poppinsSemiBold": require("./assets/fonts/Poppins-SemiBold.ttf"),
    "poppinsBold": require("./assets/fonts/Poppins-Bold.ttf"),
  });

  const handleOnLayout = useCallback(async () => {
    if (isLoaded) {
      await SplashScreen.hideAsync(); //hide the splashscreen
    }
  }, [isLoaded]);

  if (!isLoaded) {
    return null;
  }

  return (
    <HabitsProvider>
        <BottomSheetModalProvider>
            <SafeAreaProvider onLayout={handleOnLayout}>
              <Navigation colorScheme={colorScheme} />
              <StatusBar />
            </SafeAreaProvider>
        </BottomSheetModalProvider>
    </HabitsProvider>
    );
}
