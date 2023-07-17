import { View, StyleSheet, TouchableOpacity } from "react-native";
import { ProgressBar } from "../Graphs/ProgressBar";
import { SubText, SubTitleGrayText, SubTitleText } from "../StyledText";
import shadowStyle from "../StyledShadow";
import { useThemeColor } from "../Themed";
import { useState } from "react";

import { useNavigation } from "@react-navigation/native";
import HabitCheckButton from "../Buttons/HabitCompleted.Button";

import CalendarCustomWeek from "../Calendars/CalendarCustomWeek";
import Animated, { useAnimatedStyle, withTiming } from "react-native-reanimated";
import Clock from "./Clock";
import HabitState from "./HabitState";

export const HabitudeListItem = ({habits, viewableItems}) => {

    const secondary = useThemeColor({}, "Secondary")
    const shadowColor = useThemeColor({}, "ShadowColor")
    const navigation = useNavigation();
    const stylesShadow = shadowStyle(shadowColor);

    const [isChecked, setIsChecked] = useState(false)

    const isFinished = (habits.state === "done" || habits.state === "skip" || habits.state === "cancel")

    const handlePress = () =>
    {
        navigation.navigate("HabitudeScreen", {titre: habits.titre, couleur: habits.color, pourcentage: habits.pourcentage});
    }

    const rStyle = useAnimatedStyle(() => {

        const isVisible = viewableItems.value.some((viewableItem) => viewableItem.item.titre === habits.titre && viewableItem.isViewable);

        return{
            opacity: withTiming(isVisible ? (isFinished ? 0.5 : 1) : 0),
            transform: [{
                scale: withTiming(isVisible ? 1 : 0.6)
            }]
        }
    })

    return(

    <TouchableOpacity style={[styles.TouchableScreen, stylesShadow.shadow]} onPress={handlePress} accessibilityLabel={habits.titre}>
        <Animated.View 
        style={
        [
            styles.Habits,
            {
                backgroundColor: secondary,
                opacity: isFinished ? 0.75 : 1
            },
            rStyle
        ]}>
            <View style={styles.habitsTitleStateContainer}>
                {isFinished ? <SubTitleGrayText text={habits.titre}/> : <SubTitleText text={habits.titre}/>}
                <HabitState state={habits.state}/>
            </View>
            <View style={styles.footerHabits}>
                <Clock minutes={habits.duree} isFinished={isFinished}/>
            </View>

        </Animated.View>
    </TouchableOpacity>)
};

const styles = StyleSheet.create(
    {    
        Habits: {
            flex: 1,
            margin: 10,
            padding: 20,
            borderRadius: 10,
            gap: 10,
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
        },

        TouchableScreen: {
            flex: 1,
        },

        footerHabits: {
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems:"center"
        },
        habitsTitleStateContainer: {
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
        }
    }
)