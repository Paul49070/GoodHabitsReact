import { StyleSheet, TouchableOpacity } from "react-native"
import { Image } from "react-native"
import { useThemeColor } from "../Themed"


import ProgressCircle from "react-native-progress-circle"
import { Text, View } from "react-native"
import { SubText } from "../StyledText"

import SkeletonPlaceholder from 'react-native-skeleton-placeholder';

import { useState } from "react"
import { Feather } from "@expo/vector-icons"

export const CircularBarProfil = ({nom, pourcentage, couleur, image}) =>
{
    const primary = useThemeColor({}, "Primary")
    const secondary = useThemeColor({}, "Secondary")
    const [isLoading, setIsLoading] = useState(true)

    const handleStopLoad = () => {
        setIsLoading(false)
    }

    return(

        <View style={styles.container}>
            <TouchableOpacity accessibilityLabel={nom}>
                <ProgressCircle
                    percent={pourcentage}
                    radius={40}
                    borderWidth={4}
                    color={couleur}
                    shadowColor="transparent"
                    bgColor={secondary}>

                        <Image 
                        onLoadEnd={handleStopLoad}
                        style={[
                            styles.imageStyle, 
                            {
                                backgroundColor: isLoading ? secondary : "transparent"
                            }]} source={image}></Image>    
                        
                </ProgressCircle>
            </TouchableOpacity>

        <SubText text={nom}/>

        </View>

    )
}

export const AddCircularBarProfil = ({nom}) =>
{
    const fontGray = useThemeColor({}, "FontGray")
    const secondary = useThemeColor({}, "Secondary")

    return(

        <View style={styles.container}>
            <TouchableOpacity accessibilityLabel={nom}>
                <ProgressCircle
                    percent={0}
                    radius={40}
                    borderWidth={4}
                    color="transparent"
                    shadowColor="transparent"
                    bgColor={secondary}>
                    
                    <Feather name="plus" size={25} color={fontGray} />                    
                        
                </ProgressCircle>
            </TouchableOpacity>

        <SubText text={nom}/>

        </View>

    )
}

const styles = StyleSheet.create(
    {  
        imageStyle: {
            alignSelf: 'center',
            justifyContent: 'center',
            resizeMode: 'contain',
            aspectRatio: 1,
            width: "90%", height: "90%",
            borderRadius: 15,
        },

        container: {
            display: "flex", 
            flexDirection:"column", 
            justifyContent:"center", 
            alignItems: "center", 
            gap: 10
        }
    }
)