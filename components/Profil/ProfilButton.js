import { Image, View, StyleSheet, TouchableOpacity } from "react-native"
import Badge from "../Other/Badge"
import { useThemeColor } from "../Themed"

export const ProfilButton = ({onPress}) => {

    const primary = useThemeColor({}, "Primary")
    const contrast = useThemeColor({}, "Contrast")
    const secondary = useThemeColor({}, "Secondary")

    return(
        <TouchableOpacity onPress={onPress} accessibilityLabel={"profilPictureBtn"}>
            <View style={{
                borderRadius: 15,width: 50, height: 50}}>

                <Image style={
                    [
                        styles.imageStyle,
                        {
                            backgroundColor: primary
                        }]} 
                        source={require("../../img/ProfilPicture/Memoji-07.png")}>

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
        width: 60,
        maxHeight: 60,
        borderRadius: 15,
      },
});