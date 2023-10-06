// Learn more about createBottomTabNavigator:
// https://reactnavigation.org/docs/bottom-tab-navigator
import Ionicons from "@expo/vector-icons/Ionicons";
import { AntDesign, Entypo, Feather, Octicons, MaterialCommunityIcons } from '@expo/vector-icons'; 

import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createStackNavigator } from "@react-navigation/stack";
import { TouchableOpacity, View, useColorScheme } from "react-native";

import Colors from "../constants/Colors";
import HabitudeScreen from "../screens/HabitudeScreen";
import TabTwoScreen from "../screens/TabTwoScreen";
import {BottomNavigationButtonAdd, ContrastRoundButton, IconButton} from "../components/Buttons/IconButton";

import { useThemeColor } from "../components/Themed";
import DayDetailScreen from "../screens/DayDetailScreen";
import ProfilDetailsScreen from "../screens/ProfilScreens/ProfilDetailsScreen";
import MultipleAchievementScreen from "../screens/MultipleAchievementScreen";
import { getFocusedRouteNameFromRoute, useNavigation } from "@react-navigation/native";
import NewsScreen from "../screens/NewsScreen";
import HomeScreen from "../screens/HomeScreen";
import { StatProfilScreen } from "../screens/ProfilScreens/StatsProfilScreen";
import { AddScreen } from "../screens/AddScreen/AddScreen";
import CreateHabitDetails from "../screens/AddScreen/CreateHabitDetails";
import { ChooseIconScreen } from "../screens/AddScreen/ChooseIconScreen";
import ValidationScreenHabit from "../screens/AddScreen/ValidationScreenHabit";
import { ChooseColorScreen } from "../screens/AddScreen/ChooseColorScreen";

const BottomTab = createBottomTabNavigator();

export default function BottomTabNavigator() {
  const colorScheme = useColorScheme();
  const primary = useThemeColor({}, "Primary")
  const secondary = useThemeColor({}, "Secondary")
  const contrast = useThemeColor({}, "Contrast")

  const navigation = useNavigation()

  const handleNavigateToAdd = () => {
    navigation.navigate("AddScreen")
  }


  return (

    
    <BottomTab.Navigator
      initialRouteName="HomeScreen"
      screenOptions={{

        tabBarActiveTintColor: contrast,
        headerShown: false,
        tabBarStyle: {
          backgroundColor: secondary,
          borderWidth: 0,
          paddingHorizontal: 15,
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        },
        // Use the getTabBarVisible function here within the screenOptions
        tabBarHideOnKeyboard: false,

      }}
    >

        <BottomTab.Screen
            name="Home"
            component={HomeNavigator}


            options={({ route }) => ({
              headerShown: false,
              tabBarIcon: ({ color }) => (
                <AntDesignIcon name="user" color={color} />
              ),
              tabBarLabel: () => null,
              tabBarStyle: ((route) => {
                const routeName = getFocusedRouteNameFromRoute(route) ?? "HomeScreen"

                console.log(routeName + " route")

                if (routeName !== 'HomeScreen') {
                  return { display: "none" }
                }
                return {
                  backgroundColor: secondary,
                  borderWidth: 0,
                  paddingHorizontal: 15,
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }
              })(route),
            })}
          />
      
        <BottomTab.Screen
          name="Add"
          component={AddScreenNavigator}
          options={{

            tabBarLabel: () => null,
            tabBarButton: AddButton
            
          }}
        />

      <BottomTab.Screen
        name="Notifs"
        component={NewsScreenNavigator}
        options={{
          headerShown: false,
          tabBarIcon: ({ color }) => (
            <FeatherIcon name="users" color={color} />          
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
  return <MaterialCommunityIcons size={24} {...props} />;
}

function AddButton(props) {

  const contrast = useThemeColor({}, "Contrast")

  return(
    <TouchableOpacity style={{position: "absolute"}} {...props}>
      <View onPress={() => {}} style={{ backgroundColor: contrast, position: "absolute", padding: 20, borderRadius: 50}}>
          <Feather name="plus" size={24} color="white"/>             
      </View>
    </TouchableOpacity>
  )
}

function AntDesignIcon(props) {
  return <AntDesign size={24} {...props} />;
}

function FeatherIcon(props) {
  return <Feather size={24} {...props} />;
}

// Each tab has its own navigation stack, you can read more about this pattern here:
// https://reactnavigation.org/docs/tab-based-navigation#a-stack-navigator-for-each-tab
const HomeStack = createStackNavigator();

function HomeNavigator() {
  return (
    <HomeStack.Navigator screenOptions={{ headerShown: false }}>
      <HomeStack.Screen
        name="HomeScreen"
        component={HomeScreen}
        options={{ headerShown: false, tabBarVisible: true }}
      />

      <HomeStack.Screen
        name="HabitudeScreen"
        component={HabitudeScreen} 
        options={({ route }) => ({
          habit: route.params.habit,
          tabBarVisible: false, // Hide the bottom navigation bar on this screen
        })}
      />

      <HomeStack.Screen
        name="DayDetailScreen"
        component={DayDetailScreen}
        options={({ route }) => ({ 
          habitude: route.params.habitude,
          date: route.params.date,
          tabBarVisible: false, // Show the bottom navigation bar on this screen
        })}
      />

      <HomeStack.Screen
        name="ProfilDetailsScreen"
        component={ProfilDetailsScreen}
        options={{ headerTitle: "Profil Details", tabBarVisible: true }} // Show the bottom navigation bar on this screen
      />

      <HomeStack.Screen
        name="MultipleAchievementScreen"
        component={MultipleAchievementScreen}
        options={{ headerTitle: "AllAchievementScreen", tabBarVisible: true }} // Show the bottom navigation bar on this screen
      />

      <HomeStack.Screen
        name="StatProfilScreen"
        component={StatProfilScreen}
        options={{ headerTitle: "StatProfilScreen", tabBarVisible: true }} // Show the bottom navigation bar on this screen
      />
    </HomeStack.Navigator>
  );
}



const AddScreenStack = createStackNavigator();

function AddScreenNavigator() {
  return (
    <AddScreenStack.Navigator screenOptions={{ headerShown: false }}>
        <AddScreenStack.Screen
          name="AddScreen"
          component={AddScreen}
          options={{ headerTitle: "AddScreen" }}
        />   

        <AddScreenStack.Screen
          name="CreateHabitDetails"
          component={CreateHabitDetails}
          options={{ headerTitle: "CreateHabitDetails" }}
        />   

        <AddScreenStack.Screen
          name="ChooseIconScreen"
          component={ChooseIconScreen}
          options={{ headerTitle: "ChooseIconScreen" }}
        />   

      <AddScreenStack.Screen
          name="ChooseColorScreen"
          component={ChooseColorScreen}
          options={{ headerTitle: "ChooseColorScreen" }}
        />   

      <AddScreenStack.Screen
          name="ValidationScreenHabit"
          component={ValidationScreenHabit}
          options={{ headerTitle: "ValidationScreenHabit" }}
        />   

    </AddScreenStack.Navigator>

    
  );
}

const NewsScreenStack = createStackNavigator();

function NewsScreenNavigator() {
  return (
    <NewsScreenStack.Navigator screenOptions={{ headerShown: false }}>
      <NewsScreenStack.Screen
        name="NewsScreen"
        component={NewsScreen}
        options={{ headerTitle: "News" }}
      />   
    </NewsScreenStack.Navigator>
  );
}
