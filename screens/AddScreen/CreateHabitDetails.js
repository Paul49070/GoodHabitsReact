import { Feather } from "@expo/vector-icons"
import { CircleBorderButton, GoBackButton, GoNextButton, SimpleButton } from "../../components/Buttons/UsualButton"
import { BackgroundView, MainView, TopScreenView } from "../../components/View/Views"
import { NormalText, SubText, SubTitleGrayText, SubTitleText, TitleText } from "../../styles/StyledText"
import { useThemeColor } from "../../components/Themed"
import { View, TouchableOpacity, StyleSheet } from "react-native"
import { FlatList, ScrollView } from "react-native-gesture-handler"
import { useState } from "react"
import { DaySelection, MonthSelection, WeekSelection } from "../../components/AddHabits/FrequencySelection"
import { IncrementButtons, IncrementHours, IncrementMinutes } from "../../components/Buttons/IncrementButtons"
import { Switch } from "react-native"
import { roundToNearestMinutes } from "date-fns/esm"
import { TextInput } from "react-native"
import { RadioButton } from "../../components/RadioButtons/RadioButton"
import { useNavigation, useRoute } from "@react-navigation/native"

const CreateHabitDetails = () => {

    const route = useRoute()
    const {habit} = route.params
    console.log(habit)


    const font = useThemeColor({}, "Font")
    const secondary = useThemeColor({}, "Secondary") 
    const contrast = useThemeColor({}, "Contrast") 

    const [selectedDays, setSelectedDays] = useState(new Array(7).fill(false));
    const [isAllDaySelected, setAllDaySelected] = useState(true);

    const [selectedFrequency, setSelectedFrequency] = useState("Quotidien")

    const [occurences, setOccurences] = useState(1)
    const [reccurence, setReccurence] = useState(1)

    const [notificationEnabled, setNotificationEnabled] = useState(true)

    const [alertMinutes, setAlertMinutes] = useState(30)
    const [alertHour, setAlertHour] = useState(12)

    const navigation = useNavigation()

    const handleGoNext = () => {

        const daysOfWeek = []

        if(selectedDays[7])
            daysOfWeek.push(0,1,2,3,4,5,6)
        
        else {
            selectedDays.map((isSelectedDay, index) => {
                if(isSelectedDay)
                    daysOfWeek.push(index)
            })
        }

        const detailledHabit = {
            ...habit, // Copy existing properties from the original habit object
            frequency: selectedFrequency,
            occurence: occurences,
            reccurence: reccurence,
            daysOfWeek: daysOfWeek,
            notificationEnabled: notificationEnabled,
            alertTime: notificationEnabled ? new Date(2003, 7, 16, alertHour, alertMinutes, 0).toString() : ""
          };

        navigation.navigate("ChooseColorScreen", {detailledHabit})
    }

    const handleSelectDay = (dayIndex) => {

        setAllDaySelected(false)
        setSelectedDays((prevSelectedDays) => {
            const tempSelectedDays = [...prevSelectedDays];
            tempSelectedDays[dayIndex] = !tempSelectedDays[dayIndex];

            if(tempSelectedDays.filter((day) => day === true).length === 7)
                handleSelectAllDay()

            return tempSelectedDays;
        });

        console.log(dayIndex)
      };

    const handleSelectAllDay = () => {
        setSelectedDays(new Array(7).fill(false));    
        setAllDaySelected(!isAllDaySelected)
    }

    const handleChangeFrequency = (frequency) => {
        setSelectedFrequency(frequency)
    }

    const allDaySelected = selectedDays.filter((day) => day === true).length === 7

    const frequencies = [
        "Quotidien",
        "Hebdo",
        "Mensuel",
    ]

    const [isTitleFieldFocus, setIsTitleFieldFocus] = useState(false)

    return(
        <MainView>
            <TopScreenView>

                <View style={{display: "flex", flexDirection: "row", alignItems:"center", justifyContent: "space-between", marginBottom: 15, marginTop: -10}}>

                    <GoBackButton/>

                    <View style={{flex: 1, alignItems: "center", justifyContent: "center", display: "flex", flexDirection: "column", gap: 10}}>
                        <TitleText text="Détails" style={{textAlign: "center"}}/>
                    </View>

                    <GoNextButton handleGoNext={handleGoNext}/>

                </View>

            </TopScreenView>

            <BackgroundView>
                <ScrollView style={{marginHorizontal: -20, paddingHorizontal: 20, marginBottom:10}} showsVerticalScrollIndicator={false}>

                    {/*<View style={styles.groupContainer}>
                        <TextInput placeholder="Titre" onFocus={() => setIsTitleFieldFocus(true)} onBlur={() => setIsTitleFieldFocus(false)}
                        style={{
                            borderWidth: 2,
                            borderColor: isTitleFieldFocus ? contrast : secondary,
                            backgroundColor: secondary, 
                            fontFamily: "poppinsLight", 
                            borderRadius: 10, 
                            color: font, flex: 1, fontSize: 14, padding: 10, paddingHorizontal: 20}}/>
                    </View>*/}

                    <View style={styles.groupContainer}>
                        <View style={styles.subTitleHeaderContainer}>
                            <SubTitleText text="Fréquence :"/>
                            <SimpleButton onClick={() => {}}>
                                <SubText text="Plus d'options"/>
                            </SimpleButton>
                        </View>

                        <View style={styles.listContainer}>
                            {frequencies.map((frequency) => {

                                const isSelected = selectedFrequency === frequency

                                return(
                                    <RadioButton handleOnClick={() => handleChangeFrequency(frequency)} isHighlight={isSelected} key={frequency}>
                                        <NormalText text={frequency} />
                                    </RadioButton> 
                                )
                            })}
                        </View>

                        {selectedFrequency === "Quotidien" && (
                            <DaySelection
                                selectedDays={selectedDays}
                                handleSelectDay={handleSelectDay}
                                isAllDaySelected={isAllDaySelected}
                                handleSelectAllDay={handleSelectAllDay}
                            />
                            )}

                        {selectedFrequency === "Hebdo" && (
                            <WeekSelection
                                reccurence={reccurence}
                                setReccurence={setReccurence}
                            />
                        )}

                        {selectedFrequency === "Mensuel" && (
                            <MonthSelection
                                reccurence={reccurence}
                                setReccurence={setReccurence}
                            />
                        )}
                    </View>


                    <View style={styles.groupContainer}>
                        <View style={styles.subTitleHeaderContainer}>
                            <SubTitleText text="Occurences :"/>
                        </View>

                        <View style={styles.listContainer}>
                            <View style={{flex: 1}}>
                                <NormalText text="Occurences par période :"/>
                            </View>
                            <View>
                                <IncrementButtons value={occurences} setValue={setOccurences}/>
                            </View>
                        </View>

                        <View style={{marginTop: -5}}>
                            <SubText text="Exemple : aller courir 5 fois par semaine"/>
                        </View>
                    </View>

                    <View style={styles.groupContainer}>
                        <View style={styles.subTitleHeaderContainer}>
                            <SubTitleText text="Notifications :"/>
                        </View>

                        <View style={styles.listContainer}>
                            <View style={{flex: 1}}>
                                <NormalText text="Activer les notifications :"/>
                            </View>
                            <View>
                                <Switch 
                                value={notificationEnabled} 
                                onValueChange={() => setNotificationEnabled(!notificationEnabled)}
                                trackColor={{false: secondary, true: contrast}}/>
                            </View>
                        </View>
                    </View>

                    <View style={styles.groupContainer}>
                        <View style={styles.subTitleHeaderContainer}>
                            {notificationEnabled ? <SubTitleText text="Heure :"/> : <SubTitleGrayText text="Heure :"/>}
                        </View>

                        <View style={styles.listContainer}>
                            <IncrementHours value={alertHour} setValue={setAlertHour} isDisabled={!notificationEnabled}/>
                            <IncrementMinutes value={alertMinutes} setValue={setAlertMinutes} isDisabled={!notificationEnabled}/>
                        </View>
                    </View>
                </ScrollView>
            </BackgroundView>
        </MainView>
    )
}

const styles = StyleSheet.create({
    dayContainer: {
        padding: 10, 
        borderRadius: 10, 
        flex: 1, 
        borderWidth: 2, 
        justifyContent: "center", 
        alignItems: "center"
    },

    listContainer: {
        display: "flex",
        flexDirection: "row", 
        width: "100%", 
        justifyContent: "space-between",
        gap: 10,
    },

    subTitleHeaderContainer: {
        display: "flex", 
        flexDirection: "row", 
        justifyContent: "space-between", 
        alignItems: "center",
    },

    groupContainer: {
        display: 'flex', 
        flexDirection: "column", 
        gap: 20,
        marginVertical: 10,
    }
})

export default CreateHabitDetails