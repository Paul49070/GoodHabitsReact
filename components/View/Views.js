import { useThemeColor } from "../Themed";
import { View, StyleSheet, SafeAreaView, TouchableWithoutFeedback } from "react-native";
import { Fragment } from "react";
import { Keyboard } from "react-native";

export const MainView = (props) => {
    const primary = useThemeColor({}, "Primary")
    const secondary = useThemeColor({}, "Secondary")

    return(
        <Fragment>
            <SafeAreaView style={[styles.container, { flex: 0, backgroundColor: secondary }]}/>
            <SafeAreaView style={{ flex: 1, backgroundColor: primary }}>
                    <View style={[styles.container]}>
                    {props.children}
                    </View>
            </SafeAreaView>
        </Fragment>
    );
}

export const TopScreenView = (props) => {

    const primary = useThemeColor({}, "Primary")
    const secondary = useThemeColor({}, "Secondary")

    return(
        <View style={[styles.headerParentContainer, {backgroundColor:primary}]}>
            <View style={[styles.headerContainer, {backgroundColor:secondary}]}>
                {props.children}
            </View>
        </View>
    );
}

export const UsualScreen = (props) => {

    const primary = useThemeColor({}, "Primary")

    return(
        <SafeAreaView style={{ flex: 1, backgroundColor: primary }}>
            <View style={[styles.container]}>
                {props.children}
            </View>
        </SafeAreaView>
    )
}

export const BackgroundView = (props) => {

    const primary = useThemeColor({}, "Primary")

    return(
    <View style={[styles.AltBackgroundView, {backgroundColor: primary}, props.style]}>
            {props.children}
    </View>
    );
}

const styles = StyleSheet.create({

    headerContainer: {
      margin: -30, 
      marginBottom:0, 
      paddingHorizontal: 30, 
      paddingVertical:15,
      borderBottomLeftRadius: 40, 
      borderBottomRightRadius: 40, 
    },
  
    headerParentContainer: {
      margin: -30, 
      marginBottom:0, 
      padding: 30, 
        
    },

    backgroundView: {
        gap: 5,
        flex:1,
        flexGrow:1,
        borderBottomLeftRadius: 50,
        borderBottomRightRadius: 50,
        margin:-30, 
        marginBottom:0, 
        padding:30, 
        paddingVertical: 15, 
    },

    AltBackgroundView: {
        gap: 5,
        flex:1,
        flexGrow:1,
        margin:-30, 
        marginBottom:0, 
        padding:30,  
        paddingVertical: 15, paddingBottom: 0
    },

    container: {
        padding: 30, 
        paddingBottom: 0,
        flex:1,
        gap: 0,
        display: "flex",           
    },
})