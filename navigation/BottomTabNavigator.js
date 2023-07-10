// Learn more about createBottomTabNavigator:
// https://reactnavigation.org/docs/bottom-tab-navigator
import Ionicons from "@expo/vector-icons/Ionicons";
import { AntDesign, Entypo, Feather, Octicons, MaterialCommunityIcons } from '@expo/vector-icons'; 

import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createStackNavigator } from "@react-navigation/stack";
import { useColorScheme } from "react-native";

import Colors from "../constants/Colors";
import TabOneScreen from "../screens/TabOneScreen";
import HabitudeScreen from "../screens/HabitudeScreen";
import TabTwoScreen from "../screens/TabTwoScreen";
import {ContrastRoundButton, IconButton} from "../components/Buttons/IconButton";

import { useThemeColor } from "../components/Themed";
import DayDetailScreen from "../screens/DayDetailScreen";
import ProfilDetailsScreen from "../screens/ProfilDetailsScreen";
import MultipleAchievementScreen from "../screens/MultipleAchievementScreen";
import { useNavigation } from "@react-navigation/native";

const BottomTab = createBottomTabNavigator();

export default function BottomTabNavigator() {
  const colorScheme = useColorScheme();
  const primary = useThemeColor({}, "Primary")
  const contrast = useThemeColor({}, "Contrast")

  const navigation = useNavigation()

  const handleNavigateToAdd = () => {
    navigation.navigate("")
  }

  return (

    
    <BottomTab.Navigator
      initialRouteName="Accueil"
      screenOptions={{ tabBarActiveTintColor: contrast, 
      headerShown: false,
      tabBarStyle: {
        backgroundColor: primary,
        display: "flex",
        justifyContent: "center",
        alignItems:"center",
      } }}>

    <BottomTab.Screen
            name="Profil"
            component={TabOneNavigator}
            options={{
              headerShown: false,
              tabBarIcon: ({ color }) => (
                <AntDesignIcon name="user" color={color} />
              ),
              tabBarLabel: () => null

            }}
          />

      <BottomTab.Screen
        name="Accueil"
        component={TabTwoNavigator}
        options={{
          headerShown: false,
          tabBarIcon: ({ color }) => (
                <MaterialIcon name="sticker-text-outline" color={color}/>
          ),

          tabBarLabel: () => null

        }}
      />

      {/*}
        <BottomTab.Screen
          name="Add"
          component={TabTwoNavigator}
          options={{
            tabBarIcon: ({ color }) => (
              <ContrastRoundButton onClick={handleNavigateToAdd}>
                <Feather name="plus" size={24} color="white"/>             
              </ContrastRoundButton>
            ),
            tabBarLabel: () => null
          }}
        />*/}

      <BottomTab.Screen
        name="Stats"
        component={TabTwoNavigator}
        options={{
          headerShown: false,
          tabBarIcon: ({ color }) => (
            <Feather name="pie-chart" size={20} color={color} />          
          ),
          tabBarLabel: () => null


        }}
      />

      <BottomTab.Screen
        name="Notifs"
        component={TabTwoNavigator}
        options={{
          headerShown: false,
          tabBarIcon: ({ color }) => (
            <AntDesignIcon name="staro" color={color} />          
          ),

          tabBarLabel: () => null

        }}
      />

    </BottomTab.Navigator>
  );
}

// You can explore the built-in icon families and icons on the web at:
// https://icons.expo.fyi/
function MaterialIcon(props) {
  return <MaterialCommunityIcons size={20} {...props} />;
}

function AntDesignIcon(props) {
  return <AntDesign size={20} {...props} />;
}

function FeatherIcon(props) {
  return <Feather size={20} {...props} />;
}

function OcticonsIcon(props) {
  return <Octicons size={20} {...props} />;
}

// Each tab has its own navigation stack, you can read more about this pattern here:
// https://reactnavigation.org/docs/tab-based-navigation#a-stack-navigator-for-each-tab
const TabOneStack = createStackNavigator();

function TabOneNavigator() {
  return (
    <TabOneStack.Navigator screenOptions={{ headerShown: false }}>
      <TabOneStack.Screen
        name="TabOneScreen"
        component={TabOneScreen}
        options={{ headerTitle: "Accueil" }}
      />

      <TabOneStack.Screen
        name="HabitudeScreen"
        component={HabitudeScreen}
        options={
          ({ route }) => ({ 
            title: route.params.titre,
            color: route.params.couleur,
            percent: route.params.pourcentage,
          })
          }
      />

      <TabOneStack.Screen
        name="DayDetailScreen"
        component={DayDetailScreen}
        options={
          ({ route }) => ({ 
            habitude: route.params.habitude,
            date: route.params.date,
          })
          }
      />

      <TabOneStack.Screen
        name="ProfilDetailsScreen"
        component={ProfilDetailsScreen}
        options={{ headerTitle: "Profil Details" }}

      />

      <TabOneStack.Screen
        name="MultipleAchievementScreen"
        component={MultipleAchievementScreen}
        options={{ headerTitle: "AllAchievementScreen" }}

      />
    </TabOneStack.Navigator>
  );
}

const TabTwoStack = createStackNavigator();

function TabTwoNavigator() {
  return (
    <TabTwoStack.Navigator screenOptions={{ headerShown: false }}>
      <TabTwoStack.Screen
        name="TabTwoScreen"
        component={TabTwoScreen}
        options={{ headerTitle: "Menu" }}
      />   
    </TabTwoStack.Navigator>
  );
}
