
import React, { useState, useRef, useMemo, useCallback } from 'react';
import {SafeAreaView, StyleSheet, Image, View} from 'react-native';
import { useThemeColor } from '../components/Themed';

import { FlatList } from 'react-native';
import { SubText, TitleText, SubTitleText, HugeText } from '../components/StyledText';
import {Habitudes} from '../data/habitudes';
import { HabitudeBlock } from '../components/Habitudes/HabitudeBlock';
import { ProgressBar } from '../components/Graphs/ProgressBar';
import shadowStyle from '../components/StyledShadow';

import {IconButton} from '../components/Buttons/IconButton';

import { Entypo, Ionicons } from '@expo/vector-icons'; 
import { MaterialCommunityIcons } from '@expo/vector-icons';

import Badge from '../components/Other/Badge';

import SearchBar from '../components/TextFields/SearchBar';
import { BottomSheetModal, BottomSheetModalProvider } from "@gorhom/bottom-sheet"
import { ProfilButton } from '../components/Profil/ProfilButton';
import ProfilDetailsScreen from './ProfilDetailsScreen';

import { useNavigation } from "@react-navigation/native";


const TabOneScreen = () => {

  const secondary = useThemeColor({}, "Secondary")
  const primary = useThemeColor({}, "Primary")
  const fontGray = useThemeColor({}, "FontGray")
  const contrast = useThemeColor({}, "Contrast")

  const navigation = useNavigation()

  const [nbColonnesHabits, setNbColhHabits] = useState(2)
  const [isSearchBarClicked, setIsSearchBarClicked] = useState(false)
  const [searchPhrase, setSearchPhrase] = useState("")

  const changeNbColHabits = (nbCol) =>
  {
    setNbColhHabits(nbCol)
  }

  const bottomDetailProfilSheet = useRef(null);

  const handleOpenProfilDetails = useCallback(() => {
    navigation.navigate("ProfilDetailsScreen");

  }, []);

  const handleSheetChanges = useCallback((index) => {
      console.log("handleSheetChange", index)
  }, []);

  const renderHabits = ({item}) =>
  {
    if(searchPhrase === "")
      return <HabitudeBlock titre={item.titre} pourcentage={item.pourcentage} couleur={item.color}/>
    
    if (item.titre.toUpperCase().includes(searchPhrase.toUpperCase().trim().replace(/\s/g, "")))
      return <HabitudeBlock titre={item.titre} pourcentage={item.pourcentage} couleur={item.color}/>
  }

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <BottomSheetModalProvider>
        <View style={[styles.container, {backgroundColor: primary}]}>

          <View>
            <View style={
              [
                shadowStyle,
                styles.headerContainer,
                {
                  backgroundColor: secondary
                }
              ]
              }>

              <View style={styles.profilContainer}>

                <View style={{flex: 1, display:"flex", height: 60, justifyContent: "space-between"}}>
                  <SubText text="04 jui."/>
                  <HugeText text="Salut Paul !"/>
                </View>

                <ProfilButton onPress={handleOpenProfilDetails}/>

              </View>

              <SearchBar clicked={isSearchBarClicked} setClicked={setIsSearchBarClicked} searchPhrase={searchPhrase} setSearchPhrase={setSearchPhrase}/>

            </View>
          </View>


          <View style={styles.coreContainer}>

            <View style={{display: "flex", flexDirection: "row", alignItems:"center", justifyContent: "space-between"}}>
              <SubTitleText text="Vos habitudes :"/>
              
              <View style={{display: "flex", flexDirection: "row", gap: 5, marginRight: 5}}>
                <IconButton onClick={() => changeNbColHabits(2)}>
                  <Entypo name="grid" size={20} color={fontGray} />                
                </IconButton>      

                <IconButton onClick={() => changeNbColHabits(1)}>
                  <Entypo name="list" size={20} color={fontGray} />
                </IconButton>        
              </View>
            </View>


            <FlatList 

            renderItem={renderHabits}
            key={nbColonnesHabits}
            style={styles.HabitsList}
            data={Habitudes} numColumns={nbColonnesHabits} 
            keyExtractor={item => item.id}/>

          </View>

        </View>

        </BottomSheetModalProvider>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({

  profilContainer: {
    padding: 20,
    paddingBottom: 10,
    gap: "12px",
    display: "flex",
    flexDirection: "row",
  },

  headerContainer: {
    borderRadius: 20,
    display: "flex",
    flexDirection: "column",
  },

  HabitsList:{
    flex:1,
    flexGrow: 1,
    display: "flex",
    margin: -15,
    marginTop: 0,
    paddingRight: 10,
  },

  coreContainer: {
    gap: 5,
    flex:1,
    flexGrow:1,
    paddingLeft: 20,
    paddingRight: 10,
  },

  container: {
    padding: 15,
    flex:1,
    gap: "20px"
  },
});

export default TabOneScreen;