import { View, StyleSheet, TouchableOpacity, TextInput } from "react-native";
import { ProgressBar } from "../Graphs/ProgressBar";
import { SubText, SubTitleGrayText, SubTitleText, TitleGrayText, TitleText } from "../../styles/StyledText";
import shadowStyle from "../../styles/StyledShadow";
import { useThemeColor } from "../Themed";
import { useState } from "react";
import { Feather } from "@expo/vector-icons";

import { useNavigation } from "@react-navigation/native";
import HabitCheckButton from "../Buttons/HabitCompleted.Button";

import CalendarCustomWeek from "../Calendars/CalendarCustomWeek";
import Animated, { useAnimatedStyle, withTiming } from "react-native-reanimated";
import Clock from "./Clock";
import { StepCircularBar } from "./StepCircularBar";
import HabitState from "./HabitState";
import { CircularBarProfil } from "../Profil/CircularBarProfil";
import { ContributorsHabits } from "../../data/habitudes";

import cardStyle from "../../styles/StyledCard";
import { IconButton } from "../Buttons/IconButton";

export const HabitudeListItem = ({habit, viewableItems}) => {

    const secondary = useThemeColor({}, "Secondary")
    const navigation = useNavigation();
    const stylesCard = cardStyle()

    const [doneSteps, setDoneSteps] = useState(habit.doneSteps)

    const [isChecked, setIsChecked] = useState(false)

    const isFinished = habit.doneSteps >= habit.totalSteps

    const handlePress = () =>
    {
        navigation.navigate("HabitudeScreen", {titre: habit.titre, couleur: habit.color, pourcentage: habit.pourcentage});
    }

    const rStyle = useAnimatedStyle(() => {

        const isVisible = viewableItems.value.some((viewableItem) => viewableItem.item.titre === habit.titre && viewableItem.isViewable);

        return{
            opacity: withTiming(isVisible ? (isFinished ? 0.5 : 1) : 0),
            transform: [{
                scale: withTiming(isVisible ? 1 : 0.6)
            }]
        }
    })

    const handleAddStep = () => {
        setDoneSteps(doneSteps + 1)
    }

    const handleRemoveStep = () => {
        setDoneSteps(doneSteps - 1)
    }

    return(

    <TouchableOpacity style={styles.TouchableScreen} onPress={handlePress} accessibilityLabel={habit.titre}>
        <Animated.View 
        style={
        [
            stylesCard.card,
            styles.habit,
            {
                opacity: isFinished ? 0.75 : 1
            },
            rStyle
        ]}>


            <View style={styles.habitTitleStateContainer}>
                {isFinished ? <SubTitleGrayText text={habit.titre}/> : <SubTitleText text={habit.titre}/>}
                <SubText text={30 + " min"}/>
            </View>

            <View style={styles.timeContainer}>
                <SubText text="18h30"/>
                <StepCircularBar habit={habit} doneSteps={doneSteps} isFinished={isFinished}/>
            </View>

        </Animated.View>
    </TouchableOpacity>)
};

const styles = StyleSheet.create(
    {    
        habit: {
            flex: 1,
            margin: 10,
            gap: 20,
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
        },

        timeContainer: {
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "flex-end",
        },

        TouchableScreen: {
            flex: 1,
        },

        footerhabit: {
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems:"center"
        },
        habitTitleStateContainer: {
            flex:1,
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-around"
        }
    }
)