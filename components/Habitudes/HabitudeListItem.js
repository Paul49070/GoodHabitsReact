import { View, StyleSheet, TouchableOpacity } from "react-native";
import { ProgressBar } from "../Graphs/ProgressBar";
import { SubText, SubTitleText } from "../StyledText";
import shadowStyle from "../StyledShadow";
import { useThemeColor } from "../Themed";
import { useState } from "react";

import { useNavigation } from "@react-navigation/native";
import HabitCheckButton from "../Buttons/HabitCompleted.Button";

import CalendarCustomWeek from "../Calendars/CalendarCustomWeek";
import Animated, { useAnimatedStyle, withTiming } from "react-native-reanimated";

export const HabitudeListItem = ({habits, viewableItems}) => {

    const secondary = useThemeColor({}, "Secondary")
    const shadowColor = useThemeColor({}, "ShadowColor")
    const navigation = useNavigation();
    const stylesShadow = shadowStyle(shadowColor);

    const [isChecked, setIsChecked] = useState(false)

    const handlePress = () =>
    {
        navigation.navigate("HabitudeScreen", {titre: habits.titre, couleur: habits.color, pourcentage: habits.pourcentage});
    }

    const rStyle = useAnimatedStyle(() => {

        const isVisible = viewableItems.value.some((viewableItem) => viewableItem.item.titre === habits.titre && viewableItem.isViewable);

        return{
            opacity: withTiming(isVisible ? 1 : 0),
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
                backgroundColor: secondary
            },
            rStyle
        ]}>
            <View style={{flex: 1}}>
                <SubTitleText text={habits.titre}/>
                <View style={{margin: -5, marginBottom: 0}}>
                    <CalendarCustomWeek colorHabit={habits.color} habitude={habits.titre}/>
                </View>
            </View>

            <View style={{alignItems: "center", display:"flex", marginLeft: 40, justifyContent:"center"}}>
                <HabitCheckButton onPress={() => {setIsChecked(!isChecked)}} isChecked={isChecked} couleur={habits.color}/>
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
        }
    }
)