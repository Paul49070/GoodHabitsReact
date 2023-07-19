import { View, StyleSheet, TouchableOpacity} from "react-native";
import { NormalText, SubText, SubTitleGrayText, SubTitleText} from "../../styles/StyledText";
import { useThemeColor } from "../Themed";
import { useState } from "react";

import { useNavigation } from "@react-navigation/native";

import Animated, { useAnimatedStyle, withTiming } from "react-native-reanimated";
import Clock from "./Clock";
import { StepCircularBar } from "./StepCircularBar";

import { Feather } from "@expo/vector-icons";
 
import cardStyle from "../../styles/StyledCard";


import Swipeable from 'react-native-gesture-handler/Swipeable';
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { SimpleButtonBackground } from "../Buttons/UsualButton";
import { TouchableHighlight } from "react-native";
import HabitState from "./HabitState";


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

    return(

            <TouchableOpacity accessibilityLabel={habit.id} onPress={handlePress} style={{flex: 1}}>
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
                        <SubText text={"500ml"}/>
                    </View>

                    <View style={{display: "flex", flexDirection:"row", justifyContent: "space-between", alignItems: "flex-end"}}>
                        
                        <HabitState state={habit.state}/>
                        <StepCircularBar habit={habit} doneSteps={doneSteps} isFinished={isFinished}/>
                    </View>

                </Animated.View>
            </TouchableOpacity>
)};

const styles = StyleSheet.create(
    {    
        habit: {
            flex: 1,
            margin: 10,
            gap: 20,
            display: "flex",
            flexDirection: "column",
            justifyContent: "center"
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