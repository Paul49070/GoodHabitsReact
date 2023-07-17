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

                <Badge fillColor={contrast} bgColor={primary}/>

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
        width: 60,
        maxHeight: 60,
        borderRadius: 15,
      },

    imageContainerStyle: {
        borderRadius: 15,
        width: 50, 
        height: 50
    }
});