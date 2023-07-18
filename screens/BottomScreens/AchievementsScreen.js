import { BottomSheetBackdrop, BottomSheetModal, BottomSheetModalProvider } from "@gorhom/bottom-sheet"
import { View, StyleSheet, FlatList, Image } from "react-native"

import { IconButton } from "../../components/Buttons/IconButton"
import { TitleText, NormalText, SubText } from "../../styles/StyledText"
import { useRef, useMemo, useCallback, useState } from "react"
import { Feather } from "@expo/vector-icons"
import { useThemeColor } from "../../components/Themed"
import { CircularBarProfil, AddCircularBarProfil } from "../../components/Profil/CircularBarProfil"
import { ContributorsHabits } from "../../data/habitudes"
import Achievements from "../../data/Achievements"
import { AchievementBox } from "../../components/Achievements/AchievementBox"

const AchievementsScreen = ({bottomSheetModalRef, snapPoints, handleSheetChanges, achievement}) => {
    
    const image = achievement.image
    const titre = achievement.titre
    const description = achievement.description
    const isAchieved = achievement.isAchieved

    const fontGray = useThemeColor({}, "FontGray")
    const popupColor = useThemeColor({}, "Popup")

    const primary = useThemeColor({}, "Primary")
    const contrast = useThemeColor({}, "Contrast")
    const secondary = useThemeColor({}, "Secondary")

    const [backdropPressBehavior, setBackdropPressBehavior] = useState('close');

    const renderBackdrop = useCallback(
      props => (
        <BottomSheetBackdrop {...props} appearsOnIndex={0} disappearsOnIndex={-1} pressBehavior={backdropPressBehavior} />
      ),
      [backdropPressBehavior]
    );

    const renderContributors = ({item}) => {
      return(
        <View style={{width: "33%", padding: 10}}>
          <AchievementBox titre={item.nom} description={item.description} image={item.image} isAchieved={item.isAchieved} onPress={() => {}}/>        
        </View>
      )
      }
  
    // renders
    return (
        <BottomSheetModal
            ref={bottomSheetModalRef}
            style={{flex: 1}}
            backgroundStyle={{backgroundColor: popupColor, borderRadius: 50}}
            handleIndicatorStyle={{backgroundColor: fontGray}}
            index={0}
            enablePanDownToClose={true}
            snapPoints={snapPoints}
            onChange={handleSheetChanges}
            backdropComponent={renderBackdrop}>

            <View style={{ marginTop: 20, gap: 20, padding:15, paddingHorizontal:30, flex:1, display:"flex",
                alignItems: "center" }}>

                <AchievementBox titre={titre} description={description} image={image} isAchieved={isAchieved} whiteText={true}/>
                <SubText text={description} style={{textAlign: "center"}} />

            </View>
      </BottomSheetModal>
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

      container: {
        marginTop: 20,
        gap: 20,
        flex: 1,
        alignItems: "center",
      },
      contentContainer: {
        alignItems: "center",
      },
    HabitsList:{
      flex:1,
      flexGrow: 1,
      display: "flex",
      width: "100%",
    },
});
  
  export default AchievementsScreen;