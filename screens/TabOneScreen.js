
import React, { useState, useRef, useMemo, useCallback } from 'react';
import {SafeAreaView, StyleSheet, View} from 'react-native';
import { useThemeColor } from '../components/Themed';

import { FlatList } from 'react-native';
import { SubTitleText, HugeText } from '../components/StyledText';
import { Habitudes } from '../data/habitudes';

import shadowStyle from '../components/StyledShadow';

import { BottomSheetModalProvider } from "@gorhom/bottom-sheet"
import { ProfilButton } from '../components/Profil/ProfilButton';

import { useNavigation } from "@react-navigation/native";
import { HabitudeListItem } from '../components/Habitudes/HabitudeListItem';
import { useSharedValue } from 'react-native-reanimated';

const TabOneScreen = () => {

  const primary = useThemeColor({}, "Primary")
  const secondary = useThemeColor({}, "Secondary")

  const navigation = useNavigation()
  const handleOpenProfilDetails = useCallback(() => {
    navigation.navigate("ProfilDetailsScreen");
  }, []);

  const viewableItems = useSharedValue([]);

  const onViewableItemsChanged = ({viewableItems: vItems}) => {
    viewableItems.value = vItems
  }

  const viewabilityConfigCallbackPairs = useRef([
    { onViewableItemsChanged },
  ]);

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <BottomSheetModalProvider>
        <View style={[styles.container, {backgroundColor: primary}]}>
            <View style={
                [
                  shadowStyle,
                  styles.headerContainer,
                
                ]
                }>

                  <HugeText text="Salut Paul !"/>

                  <ProfilButton onPress={handleOpenProfilDetails}/>

            </View>

            
            <View style={[styles.coreContainer]}>

              <View style={{display: "flex", flexDirection: "row", alignItems:"center", justifyContent: "space-between"}}>
                <SubTitleText text="Aujourd'hui :"/>
              </View>


            <FlatList 

            viewabilityConfigCallbackPairs={
              viewabilityConfigCallbackPairs.current
            }

            renderItem={({item}) => {
              return <HabitudeListItem habits={item} viewableItems={viewableItems}/>
                }
              }

            showsVerticalScrollIndicator={false}
            style={styles.HabitsList} key={1}
            data={Habitudes} numColumns={1} 
            keyExtractor={item => item.id}/>

          </View>
        </View>

        </BottomSheetModalProvider>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({

  headerContainer: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between"
  },

  HabitsList:{
    flex:1,
    flexGrow: 1,
    display: "flex",
    margin: -15,
    marginTop: 0,
  },

  coreContainer: {
    gap: 5,
    flex:1,
    flexGrow:1,
  },

  storiesContainer: {
    borderTopColor: "#69738c",
    borderTopWidth: 0,
    justifyContent: "center",
    alignItems: "center",
    display: "flex",
    marginHorizontal: -20,
  }, 

  container: {
    padding: 20,
    paddingBottom: 0,
    flex:1,
    gap: "20px",
    display: "flex"
  },
});

export default TabOneScreen;