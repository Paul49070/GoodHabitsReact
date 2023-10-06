import { StyleSheet, TouchableOpacity, View } from "react-native"
import { SimpleButtonBackground, RoundBorderButton, SimpleSquareButtonBackground, CircleBorderButton, BigCircleBorderButton } from "../Buttons/UsualButton"
import cardStyle from "../../styles/StyledCard"
import { SubTitleText, SubText, NormalText, TitleText, SubTitleGrayText } from "../../styles/StyledText"
import { Feather, MaterialCommunityIcons } from "@expo/vector-icons"
import { useThemeColor } from "../Themed"
import { CheckBox } from "react-native-elements"
import { StepCircularBar } from "./StepCircularBar"
import { IconButton } from "../Buttons/IconButton"
import { useRef, useState } from "react"
import Clock, { CustomDurationIndicator } from "./Clock"
import { useContext } from "react"
import { HabitsContext } from "../../data/HabitContext"
import { CircleSimpleRadioButton } from "../RadioButtons/RadioButton"

export const EtapeItem = ({step, handleValidateStep, handlePassStep, index, habitID}) => { //a re-factoriser genre les styles et tout ça peut être simplifié je pense

    const {handleCheckStep} = useContext(HabitsContext)

    const cardStyles = cardStyle()
    const secondary = useThemeColor({}, "Secondary")
    const contrast = useThemeColor({}, "Contrast")
    const fontGray = useThemeColor({}, "FontGray")
    const font = useThemeColor({}, "Font")

    const [isPassSelected, setIsPassSelected] = useState(false)
    const [isValidateSelected, setIsValidateSelected] = useState(false)

    const handleSetValidateState = () => {

        if(!isValidateSelected) {
            setIsPassSelected(false)
            handleCheckStep(index, habitID, false) // false => isUnCheck

            //handleOpenBottomValidation => message attention, si vous cocher une étape, vous ne pouvez plus la décocher ensuite.
        }

        else {
            handleCheckStep(index, habitID, true) // true => isUnCheck
        }

        setIsValidateSelected(true)
    }

    const handleSetPassState = () => {

        if(!isPassSelected) setIsValidateSelected(false)
        setIsPassSelected(!isPassSelected)
    }

    return(
        <View style={[cardStyles.shadow, styles.container, {backgroundColor: secondary}]}>
            <View style={{display: "flex", flexDirection: "row", justifyContent: "space-between", alignItems:"center"}}>
                <View style={{display: "flex", flexDirection: "column"}}>
                    <TitleText text={step.title}/>
                </View>
            </View>

            <View style={{flex: 1}}>
                <SubText text={step.description} />
            </View>

            <View style={{display: "flex", flexDirection:"row", justifyContent:"space-between", alignItems: "flex-end", gap: 20}}>
                
                <CircleBorderButton>
                    <MaterialCommunityIcons name="message-text-outline" size={20} color={fontGray} />
                </CircleBorderButton>

                <View style={{display: "flex", flexDirection:"row", justifyContent:"flex-end", flex: 1,  gap: 30, paddingHorizontal: 0}}>

                    <View style={{display: "flex", flexDirection: "column", gap: 10, justifyContent: "center", alignItems: "center"}}>
                        <NormalText text="Passer"/>
                        <CircleSimpleRadioButton handleOnPress={handleSetPassState} isSelected={isPassSelected}>
                            <Feather name="x" size={24} color={font} />
                        </CircleSimpleRadioButton>
                    </View>


                    <View style={{display: "flex", flexDirection: "column", gap: 10, justifyContent: "center", alignItems: "center"}}>
                        <NormalText text="Valider"/>
                        <CircleSimpleRadioButton handleOnPress={handleSetValidateState} isSelected={isValidateSelected}>
                            <Feather name="check" size={24} color={font} />
                        </CircleSimpleRadioButton>
                    </View>

                </View>
            </View>
        </View>
    )
}

export const AddEtapeItem = ({handleOpenAddStep}) => {


    const cardStyles = cardStyle()
    const popup = useThemeColor({}, "Popup")
    const font = useThemeColor({}, "Font")
    const contrast = useThemeColor({}, "Contrast")

    return(
        <View style={[cardStyles.shadow, styles.addStepContainer, {backgroundColor: popup}]}>

            <SubTitleText text="Ajoutez une étape" />

            <BigCircleBorderButton onPress={handleOpenAddStep} borderColor={contrast}>
                <Feather name="plus" size={24} color={font} />
            </BigCircleBorderButton>

        </View>
    )
}


export const AddedEtapeItem = ({step, handleDelete, handleModification, index}) => {


    const cardStyles = cardStyle()
    const secondary = useThemeColor({}, "Secondary")
    const fontGray = useThemeColor({}, "FontGray")

    return(
        <TouchableOpacity style={[cardStyles.shadow, styles.addedContainer, {backgroundColor: secondary}]}>

            <View>
                <SubTitleText text={step.title}/>
                <SubText text={step.description} />
            </View>

            <View style={styles.addedFooterContainer}>
                
                <CustomDurationIndicator duration={step.duration} />

                <CircleBorderButton onPress={handleDelete}>
                    <Feather name="trash-2" size={20} color={fontGray} />
                </CircleBorderButton>
            </View>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    container: {
        borderRadius: 25, 
        padding:30, 
        paddingVertical: 25, 
        gap: 5, flex: 1
    },

    addStepContainer: {
        display: "flex", 
        flexDirection: "column", 
        gap: 10, 
        flex: 1, 
        justifyContent: "space-around", 
        alignItems: "center",
        borderRadius: 25, 
        padding:30, 
        paddingVertical: 25, 
    },

    addedContainer: {
        flex: 1, 
        borderRadius: 25, 
        padding:30, 
        paddingVertical: 25, 
        gap: 5,
        justifyContent: "space-between", 
        display: "flex", 
        flexDirection: "column"
    },

    addedFooterContainer: {
        display: "flex", 
        flexDirection:"row", 
        justifyContent:"space-between", 
        alignItems: "center", 
        gap: 20
    }
})