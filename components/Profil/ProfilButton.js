import { Image, View, StyleSheet, TouchableOpacity } from "react-native"
import Badge from "../Other/Badge"
import { useThemeColor } from "../Themed"

export const ProfilButton = ({onPress}) => {

    const primary = useThemeColor({}, "Primary")
    const contrast = useThemeColor({}, "Contrast")
    const secondary = useThemeColor({}, "Secondary")

    return(
        <TouchableOpacity onPress={onPress} accessibilityLabel={"profilPictureBtn"}>
            <View style={styles.imageContainerStyle}>
                <Image 
                style={
                    [
                        styles.imageStyle, { backgroundColor: secondary }
                    ]
                } 

                    source={require("../../img/TestVrai.png")}>

                </Image>    

                <Badge fillColor={contrast} bgColor={secondary}/>

            </View>
          </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    imageStyle: {
        alignSelf: 'center',
        justifyContent: 'center',
        resizeMode: 'contain',
        aspectRatio: 1,
        width: "100%",
        maxHeight: "100%",
        borderRadius: 15,
      },

    imageContainerStyle: {
        borderRadius: 15,
        width: 60, 
        height: 60,
        alignItems: 'center',
        justifyContent: 'center',
        
    }
});