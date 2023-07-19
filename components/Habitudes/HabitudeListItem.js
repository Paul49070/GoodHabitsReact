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

    const renderRightActions = (dragX) => {
        const trans = dragX.interpolate({
            inputRange: [0, 50, 100, 101],
            outputRange: [-20, 0, 0, 1],
          });

        return(
            <View style={{marginVertical: 10, marginRight:15, display: "flex", flexDirection:"row", gap:10}}>
                <SimpleButtonBackground onPress={() => {}} backgroundColor={"#2494ea"}>
                <Feather name="trending-up" size={24} color="white" />                
                </SimpleButtonBackground>
                <SimpleButtonBackground onPress={() => {}} backgroundColor={"#fe4d5f"}>
                    <Feather name="trash-2" size={24} color="white" />                
                </SimpleButtonBackground>
            </View>
        )
    }

    return(
    <Swipeable overshootRight={false} rightThreshold={0}
        renderRightActions={(progess, dragX) => renderRightActions(dragX)}>
            <TouchableOpacity accessibilityLabel={habit.id} onPress={handlePress}>
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

                    <View>
                        <StepCircularBar habit={habit} doneSteps={doneSteps} isFinished={isFinished}/>
                    </View>

                    <View style={styles.habitTitleStateContainer}>
                        {isFinished ? <SubTitleGrayText text={habit.titre}/> : <SubTitleText text={habit.titre}/>}
                        <SubText text={"Tout les 3 jours"}/>
                    </View>

                    <View style={styles.timeContainer}>
                        <Clock minutes={"18h30"} isFinished={true}/>
                    </View>

                </Animated.View>
            </TouchableOpacity>
    </Swipeable>
)};

const styles = StyleSheet.create(
    {    
        habit: {
            flex: 1,
            margin: 10, marginLeft: 40,
            gap: 20,
            display: "flex",
            flexDirection: "row",
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