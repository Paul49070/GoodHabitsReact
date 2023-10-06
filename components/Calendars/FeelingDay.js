import { Image, StyleSheet, View } from "react-native"
import { StepCircularBar } from "../Habitudes/StepCircularBar"
import { NormalText } from "../../styles/StyledText"
import { useThemeColor } from "../Themed"
import { TouchableOpacity } from "react-native-gesture-handler"

export const FeelingDay = ({feelingDay, onPress}) => {

    let {habit} = feelingDay
    habit.doneSteps = feelingDay.doneSteps

    const today = new Date()

    let isToday = false
    if (feelingDay.date.getDate() === today.getDate() && feelingDay.date.getMonth() === today.getMonth() && feelingDay.date.getFullYear() === today.getFullYear())    
    {
        isToday = true
    }

    const dayNumber = feelingDay.date.getDate()
    const secondary = useThemeColor({}, "Secondary")
    const contrast = useThemeColor({}, "Contrast")

    console.log(feelingDay.id)

    return(
        <TouchableOpacity onPress={onPress} style={[styles.container, {borderColor: isToday ? habit.color : secondary}]}>            
                <NormalText text={dayNumber} style={{fontFamily: "poppinsSemiBold"}}/>

                <StepCircularBar habit={habit} otherImage={feelingDay.image} secondaryInactiveColor={true}/>
                <Image/>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    container: {
        display: "flex", 
        flexDirection:"column", 
        justifyContent: "space-between", 
        alignItems: "center", 
        gap: 10, 
        borderRadius: 32, 
        borderWidth: 2, 
        paddingHorizontal: 7.5,
        paddingTop: 10,
    }
})