import { BottomSheetBackdrop, BottomSheetModal, BottomSheetModalProvider } from "@gorhom/bottom-sheet"
import { View, StyleSheet, FlatList, Image } from "react-native"

import { useRef, useMemo, useCallback, useState } from "react"
import { Feather } from "@expo/vector-icons"
import { useThemeColor } from "../components/Themed"
import { CircularBarProfil, AddCircularBarProfil } from "../components/Profil/CircularBarProfil"
import { ContributorsHabits } from "../data/habitudes"
import Achievements from "../data/Achievements"
import { AchievementBox } from "../components/Achievements/AchievementBox"
import { SafeAreaView } from "react-native"

import { SimpleIconButton } from "../components/Buttons/IconButton"
import AchievementsScreen from "./BottomScreens/AchievementsScreen"
import { useNavigation } from "@react-navigation/native"
 

const MultipleAchievementScreen = () => {

    const fontGray = useThemeColor({}, "FontGray")
    const primary = useThemeColor({}, "Primary")
    const secondary = useThemeColor({}, "Secondary")

    const [clickedAchievement, setClickedAchievement] = useState({})

    const navigation = useNavigation()

    const handleBack = () => {
      navigation.goBack()
    }

    const bottomSheetModalRef = useRef(null);
    const snapPoints = useMemo(() => ['50%'], []);

    const handleOpenAchievements = useCallback(() => {
        bottomSheetModalRef.current?.present();
      }, []);

    const handleSheetChanges = useCallback((index) => {
        console.log("handleSheetChange", index)
    }, []);

    const renderContributors = ({item}) => {
      return(
        <View style={{width: "33%", padding: 10}}>
          
          <AchievementBox titre={item.nom} description={item.description} image={item.image} isAchieved={item.isAchieved} 
          onPress={() => 
          {
            setClickedAchievement(
              {
                titre: item.nom,
                description: item.description,
                image: item.image,
                isAchieved: item.isAchieved
              });
              
              handleOpenAchievements(item);
          }}/>        
        </View>
      )
    }

  
    // renders
    return(
      <BottomSheetModalProvider>
        <SafeAreaView style={{ flex: 1}}>
            <View style={{backgroundColor: primary, display:"flex", flex:1, padding: 15}}>
                <View style={{display: "flex", flexDirection: "row", alignItems:"center"}}>

                    <SimpleIconButton onClick={() => handleBack()}>
                      <Feather name="chevron-left" size={20} color={fontGray} />                
                    </SimpleIconButton>

                          {/*<SimpleIconButton onClick={() => handleOpenShareBottomSheet()}>
                              <Feather name="settings" size={20} color={fontGray} />                    
                            </SimpleIconButton>*/}

                </View>

                <View style={{ gap: 20, flex:1, alignItems: "center", }}>
                  <FlatList 
                      renderItem={renderContributors}
                      style={styles.HabitsList} key={2}
                      data={Achievements} numColumns={3} 
                      keyExtractor={item => item.description}
                    />
                </View>

                <AchievementsScreen
                    bottomSheetModalRef={bottomSheetModalRef} 
                    snapPoints={snapPoints} 
                    handleSheetChanges={handleSheetChanges}
                    achievement={clickedAchievement}
                    />
            </View>

        </SafeAreaView>
      </BottomSheetModalProvider>
    );
  };
  
  const styles = StyleSheet.create({
    imageStyle: {
        alignSelf: 'center',
        justifyContent: 'center',
        resizeMode: 'contain',
        aspectRatio: 1,
        width: 125,
        maxHeight: 125,
        borderRadius: 100,
      },

      contentContainer: {
        flex: 1,
        alignItems: 'center',
      },

    HabitsList:{
      flex:1,
      flexGrow: 1,
      display: "flex",
      width: "100%",
    },
});
  
  export default MultipleAchievementScreen;