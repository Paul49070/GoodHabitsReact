import React from 'react'
import { View, StyleSheet } from 'react-native'
import { Feather } from '@expo/vector-icons'
import { LittleNormalText, NormalText, SubText, SubTitleText, TitleText } from '../../styles/StyledText'
import { useThemeColor } from '../Themed'

const Clock = ({minutes, isFinished}) => {

    const fontGray = useThemeColor({}, "FontGray")

    if(isFinished)
    {
        return (
            <View style={styles.clockContainer}>
                <Feather name="clock" size={24} color={fontGray} />
                <SubText text={minutes + "min"} />
            </View>
        )
    }

    else
    {
        return (
            <View style={styles.clockContainer}>
                <Feather name="clock" size={24} color={"white"} />
                <LittleNormalText text={minutes + "min"} />
            </View>
        )
    }
}

const styles = StyleSheet.create({
    clockContainer: {
        alignItems: "center",
        display: "flex",
        flexDirection: "column",
        gap: 5
    }
})

export default Clock