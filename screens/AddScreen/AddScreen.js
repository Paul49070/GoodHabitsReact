import { View } from "react-native"
import { BackgroundView, MainView, TopScreenView } from "../../components/View/Views"
import { GoBackButton, GoNextButton } from "../../components/Buttons/UsualButton"
import { NormalText, SubTitleText, TitleText } from "../../styles/StyledText"
import { RadioButton } from "../../components/RadioButtons/RadioButton"
import { useState } from "react"
import { StyleSheet } from "react-native"
import { TextInput } from "react-native-gesture-handler"
import { TextInputCustom } from "../../components/TextFields/TextInput"
import { ScrollView } from "react-native"
import { AddStepCustomCarousel, CustomCarousel } from "../../components/Carousel/CustomCarousel"
import AddStepBottomScreen from "../BottomScreens/AddStepBottomScreen"
import { useMemo } from "react"
import { useRef } from "react"
import { useCallback } from "react"
import { useNavigation, useRoute } from "@react-navigation/native"

export const AddScreen = () => {

    const navigation = useNavigation();

    const [selectedItem, setSelectedItem] = useState("Hab")
    const [isForCreate, setIsForCreate] = useState(true)
    const [steps, setSteps] = useState([{title: "Test titre", description: "Test description", duration: 60}, {addStepItem: true}])

    const [title, setTitle] = useState("")
    const [isTitleWrong, setIsTitleWrong] = useState(false)

    const [description, setDescription] = useState("")
    const [isDescriptionWrong, setIsDescriptionWrong] = useState(false)

    const bottomSheetModalRefAddStep = useRef(null);
    const snapPointsAddStep = useMemo(() => ['80%'], [])

    const handleOpenAddStep = useCallback(() => {
        bottomSheetModalRefAddStep.current?.present();
      }, []);

    const clearAll = () => {
        setSelectedItem("Hab")
        setIsForCreate(true)
        setSteps([{addStepItem: true}])
    }

    const handleGoNext = () => {

        let canGoNext = true

        if(title.length <= 0) 
        {
            canGoNext = false
            setIsTitleWrong(true)
        }

        else setIsTitleWrong(false)

        if(description.length <= 0) 
        {
            canGoNext = false
            setIsDescriptionWrong(true)
        }

        else setIsDescriptionWrong(false)

        if(canGoNext) 
        {
            const habit = {
                titre: title,
                description: description,
                steps: steps.filter((step) => step.addStepItem !== true), //to filter at the end
            }

            navigation.navigate("CreateHabitDetails", {habit})
        }
    }

    return(
        <MainView>
            <TopScreenView>
                <View style={{display: "flex", flexDirection: "row", alignItems:"center", justifyContent: "space-between", marginBottom: 15, marginTop: -10}}>

                    <GoBackButton isCloseButton={true} additionalMethod={clearAll}/>

                    <TitleText text="Nouveau" style={{textAlign: "center"}}/>

                    <GoNextButton handleGoNext={handleGoNext}/>

                </View>

                <View style={{display: "flex", flexDirection: "row", alignItems:"center", justifyContent: "space-between", marginVertical: 10, gap: 10}}>

                    <RadioButton handleOnClick={() => setSelectedItem("Hab")} isHighlight={selectedItem === "Hab"} isColorReverse={true}>
                        <NormalText text="Habitude"/>
                    </RadioButton>
                    
                    <RadioButton handleOnClick={() => setSelectedItem("Obj")} isHighlight={selectedItem === "Obj"} isColorReverse={true}>
                        <NormalText text="Objectif"/>
                    </RadioButton>
                    
                    <RadioButton handleOnClick={() => setSelectedItem("Defi")} isHighlight={selectedItem === "Defi"} isColorReverse={true}>
                        <NormalText text="Défi"/>
                    </RadioButton>

                </View>

            </TopScreenView>

            <BackgroundView>
                <View style={{display: "flex", flexDirection: "column", gap: 20, flex: 1, marginBottom: 15}}>
                    <View style={{display: "flex", flexDirection: "row", alignItems:"center", justifyContent: "space-between", marginVertical: 10, gap: 10}}>

                        <RadioButton handleOnClick={() => setIsForCreate(true)} isHighlight={isForCreate}>
                            <NormalText text="Créer"/>
                        </RadioButton>

                        <RadioButton handleOnClick={() => setIsForCreate(false)} isHighlight={!isForCreate}>
                            <NormalText text="Importer"/>
                        </RadioButton>

                    </View>

                    <View style={styles.groupContainer}>

                        <SubTitleText text="Titre :"/>
                        <TextInputCustom placeholder={"Entrez un titre"} value={title} onChangeText={setTitle} isWrong={isTitleWrong}/>

                    </View>

                    <View style={styles.groupContainer}>

                        <SubTitleText text="Description :"/>
                        <TextInputCustom placeholder={"Entrez une courte description"} value={description} onChangeText={setDescription} isWrong={isDescriptionWrong}/>

                    </View>

                    <View style={[styles.groupContainer, {flex:1, marginBottom: 15, gap: 15}]}>
                        <SubTitleText text="Etapes :"/>

                        <View style={{flex: 1, marginBottom: 20}}>
                            <AddStepCustomCarousel data={steps} setData={setSteps} handleOpenAddStep={handleOpenAddStep}/>                        
                        </View>
                    </View>
                </View>
            </BackgroundView>

            <AddStepBottomScreen
            snapPoints={snapPointsAddStep}
            bottomSheetModalRef={bottomSheetModalRefAddStep}
            setSteps={setSteps}/>

        </MainView>
    )
}

const styles = StyleSheet.create({
    
    listContainer: {
        display: "flex",
        flexDirection: "row", 
        width: "100%", 
        justifyContent: "space-between",
        gap: 10,
    },

    groupContainer: {
        display: 'flex', 
        flexDirection: "column",
    }
})