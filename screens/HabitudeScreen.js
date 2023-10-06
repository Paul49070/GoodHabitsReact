import { View, SafeAreaView, StyleSheet, FlatList, Image, Text } from "react-native"
import { HugeText, NormalText, SubTitleText, TitleText } from "../styles/StyledText"
import { useThemeColor } from "../components/Themed"
import React, { Fragment } from "react";
import { SimpleIconButton } from "../components/Buttons/IconButton";

import { AntDesign, Feather, Ionicons } from '@expo/vector-icons'; 

import cardStyle from "../styles/StyledCard";
import { useNavigation, useRoute } from "@react-navigation/native";

import { useState, useRef, useCallback, useMemo } from "react";

import { BottomSheetModalProvider } from "@gorhom/bottom-sheet"

import ContributorsHabitsScreen from "./BottomScreens/ContributorsHabitsScreen";
import { StepCircularBar } from "../components/Habitudes/StepCircularBar";
import { BackgroundView, MainView, TopScreenView } from "../components/View/Views";

import AchievementsScreen from "./BottomScreens/AchievementsScreen";
import Achievements from "../data/Achievements";
import { SubText } from "../styles/StyledText";
import AchievementBox from "../components/Achievements/AchievementBox";
import generateRandomFeeling from "../data/Feelings";
import { FeelingDay } from "../components/Calendars/FeelingDay";
import { CircleBorderButton, GoBackButton, RoundBorderButton, SimpleButton, SimpleButtonBackground, SimpleSquareButtonBackground } from "../components/Buttons/UsualButton";

import { MaterialCommunityIcons } from '@expo/vector-icons'; 
import { EtapeItem } from "../components/Habitudes/EtapeItem";

import { Dimensions } from "react-native";
import { ContributorsHabits } from "../data/habitudes";
import { AddCircularBarProfil, CircularBarProfil } from "../components/Profil/CircularBarProfil";
import { AddProfilCircularButton, StepCircularBarProfil } from "../components/Habitudes/StepCircularBarProfil";

import Swiper from "react-native-swiper";
import { ShareAndFriendsBottomScreen } from "./BottomScreens/ShareAndFriendsBottomScreen";
import { useContext } from "react";
import { HabitsContext } from "../data/HabitContext";

const HabitudeScreen = () => {

    const {handleCheckStep, Habits} = useContext(HabitsContext)
    const route = useRoute()

    const fontGray = useThemeColor({}, "FontGray")
    const font = useThemeColor({}, "Font")
    const secondary = useThemeColor({}, "Secondary")
    const primary = useThemeColor({}, "Primary")
    const contrast = useThemeColor({}, "Contrast")

    const {habitIndex} = route.params;

    const habit = Habits[habitIndex]


    const [clickedAchievement, setClickedAchievement] = useState({});

    const navigation = useNavigation()

    const handleBack = () =>
    {
        navigation.goBack();
    }

    const handleClickOnDate = (date) => {

        navigation.navigate("DayDetailScreen", {date: date, habitude: habit});
    }

    const handleClickOnViewMoreAchievements = () => {
        navigation.navigate("MultipleAchievementScreen")
    }

    const shareBottomSheetModalRef = useRef(null);
    const shareSnapPoints = useMemo(() => ['50%'], []);

    const handleOpenShareBottomSheet = useCallback(() => {
        shareBottomSheetModalRef.current?.present();
      }, []);


    const bottomSheetModalRefAchievement = useRef(null);
    const snapPointsAchievement = useMemo(() => ['50%'], []);



    const handleOpenDetailAchievement = useCallback(() => {
        bottomSheetModalRefAchievement.current?.present();
    }, []);

    const steps = []

    for(let i = 0; i<7; ++i)
    {
        steps.push(habit)
    }

    const renderFeelingDate = ({item}) => {

        const date = new Date(item.date); // Convert the date string to a Date object
        
        return(
            <FeelingDay feelingDay={item} onPress={() => handleClickOnDate(date)}/>
        )
    }

    const [selectedDate, setSelectedDate] = useState(new Date())

    const randomFeeling = generateRandomFeeling(habit, 10)
    const cardStyles = cardStyle()

    const renderStep = ({item, index}) => {

        const handleValidateStep = () => {
            handleCheckStep(index, habit.id)
        }

        const handlePassStep = () => {
            handleCheckStep(index, habit.id, true)
        }

        return (
            <EtapeItem step={item} handleValidateStep={handleValidateStep} handlePassStep={handlePassStep}/>
        );
    }


 

      const renderAchievements = ({item}) => {
        return(
          <View style={{padding: 10}}>
            
            <AchievementBox TitleHide={true} titre={item.nom} description={item.description} image={item.image} isAchieved={item.isAchieved} 
            onPress={() => 
            {
              setClickedAchievement(
                {
                  titre: item.nom,
                  description: item.description,
                  image: item.image,
                  isAchieved: item.isAchieved
                });
                
                handleOpenDetailAchievement(item);
            }}/>        
          </View>
        )
      }
    

    return(

            <MainView>
                <TopScreenView>
                    <View style={{ display:"flex", flexDirection: "column"}}>

                        <View style={{display: "flex", flexDirection: "row", alignItems:"center", justifyContent: "space-between"}}>

                            <GoBackButton/>

                                <View style={{justifyContent: "center", alignItems: "center"}}>

                                    <StepCircularBar habit={habit} tall={true}/>

                                </View>

                                <View style={{display: "flex", flexDirection: "row", gap: 10}}>

                                    <CircleBorderButton onPress={() => handleOpenShareBottomSheet()}>
                                        <Feather name="users" size={20} color={font} />                                
                                    </CircleBorderButton>

                                </View>

                            </View>

                            <View style={{justifyContent: "center", alignItems: "center", margin: 15, gap: 10}}>

                                <TitleText text={habit.titre}/>
                                <SubText text={habit.description} style={{textAlign: "center", fontFamily: "poppinsSemiBold"}}/>

                            </View>
                    
                        </View>
                    </TopScreenView>                    

                    <BackgroundView>
                    <View style={{display: "flex", flexDirection: "column", gap: 35, flex: 1, marginBottom: 15}}>

                        <View>
                            <FlatList 
                                horizontal={true} inverted={true}
                                renderItem={renderFeelingDate} key={1}
                                style={styles.FeelingList}
                                data={randomFeeling} 
                                showsHorizontalScrollIndicator={false}
                                contentContainerStyle={{gap: 15, paddingHorizontal: 30}}
                            />
                        </View>
                        
                        <View style={styles.achievementsView}>

                            <View style={{display: "flex", flexDirection: "row", justifyContent: "space-between", alignItems: "center"}}>
                                <SubTitleText text="Vos succès"/>

                                <SimpleButton onClick={handleClickOnViewMoreAchievements}>
                                    <SubText text="Voir tout"/>
                                </SimpleButton>
                            </View>

                            <FlatList 
                                horizontal={true}
                                renderItem={renderAchievements}
                                style={styles.succesList} key={2}
                                data={Achievements} 
                                showsHorizontalScrollIndicator={false}
                                contentContainerStyle={{gap: 10, paddingHorizontal: 20
                                }}
                            />

                        </View>
                        </View>
                    </BackgroundView>


            </MainView>
        )
};

const styles = StyleSheet.create({
    container: {
        padding: 30, 
        paddingBottom: 0,
        flex:1,
        gap: 0,
        display: "flex",           
    },
    contentContainer: {
      flex: 1,
      alignItems: 'center',
    },

    achievementsView: {
        gap: 20,
        marginHorizontal: -30, paddingHorizontal: 30
    },

    succesList: {
        marginHorizontal: -30,
    },

    FeelingList: {
        marginHorizontal: -30,
        marginTop: 15, 
    }
})

export default HabitudeScreen
