import { View, SafeAreaView, StyleSheet } from "react-native"
import { HugeText, NormalText, TitleText } from "../styles/StyledText"
import { useThemeColor } from "../components/Themed"
import React from "react";
import { SimpleIconButton } from "../components/Buttons/IconButton";

import { Feather, Ionicons } from '@expo/vector-icons'; 

import { ProgressBar } from "../components/Graphs/ProgressBar";

import { useNavigation } from "@react-navigation/native";
import { Icon } from "react-native-elements";

import {Calendar, LocaleConfig} from 'react-native-calendars';
import { useState, useRef, useCallback, useMemo } from "react";

import { LayoutAnimation } from "react-native";

import { BottomSheetModal, BottomSheetModalProvider } from "@gorhom/bottom-sheet"

import CalendarCustom from "../components/Calendars/CalendarCustom";
import ContributorsHabitsScreen from "./BottomScreens/ContributorsHabitsScreen";
import DayDetailScreen from "./DayDetailScreen";
import HabitCheckButton from "../components/Buttons/HabitCompleted.Button";

const HabitudeScreen = ({route}) => {

    const [detailDate, setDetailDate] = useState(new Date());

    const todayDate = new Date()

    const fontGray = useThemeColor({}, "FontGray")
    const secondary = useThemeColor({}, "Secondary")
    const primary = useThemeColor({}, "Primary")

    const navigation = useNavigation()

    const handleBack = () =>
    {
        navigation.goBack();
    }

    const bottomSheetModalRef = useRef(null);
    const snapPoints = useMemo(() => ['50%'], []);

    const handleOpenShareBottomSheet = useCallback(() => {
        bottomSheetModalRef.current?.present();
      }, []);

    const handleSheetChanges = useCallback((index) => {
        console.log("handleSheetChange", index)
    }, []);


    const {titre} = route.params;
    const {couleur} = route.params;
    const {pourcentage} = route.params;
    const [currentDate, setCurrentDate] = useState('');

    const styles = StyleSheet.create({
        container: {
          flex: 1,
          padding: 24,
          justifyContent: 'center',
          backgroundColor: 'grey',
        },
        contentContainer: {
          flex: 1,
          alignItems: 'center',
        },
    })

    const [isHabitDoneToday, setIsHabitDoneToday] = useState(false)

    const handleHabitCheck = () => {
        // Perform actions when the habit check button is pressed
        setIsHabitDoneToday(!isHabitDoneToday)
      };

    return(
        <BottomSheetModalProvider>
        <SafeAreaView style={{ flex: 1 }}>
            <View style={{backgroundColor: primary, display:"flex", flex:1, padding: 15}}>

                <View style={{display: "flex", flexDirection: "row", alignItems:"center"}}>

                    <SimpleIconButton onClick={() => handleBack()}>
                        <Feather name="chevron-left" size={20} color={fontGray} />                
                    </SimpleIconButton>

                    <View style={{flex:1, padding: 5, display: "flex", flexDirection: "row", justifyContent: "center", borderRadius: 20 }}>
                            <TitleText text={titre}/>
                    </View>

                    <SimpleIconButton onClick={() => handleOpenShareBottomSheet()}>
                        <Feather name="users" size={20} color={fontGray} />                    
                    </SimpleIconButton>

                </View>

                <View style={{backgroundColor: secondary, 
                    padding:20,
                    marginTop:20,
                    borderRadius: 20,
                    display:"flex",
                    flexDirection: "row"}}>
                    <View >

                    <NormalText text={todayDate.toLocaleString('fr', {year: "numeric",month: "long", day: "numeric"})}/>
                    <HugeText text={isHabitDoneToday ? "Validé !" : "A faire !"}/>

                    </View>
                    <View style={{flex: 1,justifyContent:"center", alignItems:'flex-end'}}>
                        <HabitCheckButton onPress={handleHabitCheck} isChecked={isHabitDoneToday} couleur={couleur}/>
                    </View>

                </View>

                <View style={{flex: 1, marginTop: 10}}>
                    <CalendarCustom colorHabit={couleur} habitude={titre}/>

                </View>

                <ContributorsHabitsScreen 
                bottomSheetModalRef={bottomSheetModalRef} 
                snapPoints={snapPoints} 
                handleSheetChanges={handleSheetChanges} 
                habitude={titre} couleur={couleur}/>
                
            </View>
        </SafeAreaView>
        </BottomSheetModalProvider>)
};

export default HabitudeScreen
