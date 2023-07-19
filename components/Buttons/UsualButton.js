import { Pressable, StyleSheet, TouchableOpacity } from "react-native"

export const SimpleButton = (props) =>
{
    return(
        <TouchableOpacity 
        onPress={props.onClick}>

                {props.children}

        </TouchableOpacity>);
}

export const SimpleButtonBackground = (props) =>
{
    const {onPress, backgroundColor} = props
    return(
        <TouchableOpacity style={[styles.usualBackgroundButton, {backgroundColor: backgroundColor}]}
        onPress={props.onPress}>

                {props.children}

        </TouchableOpacity>);
}

const styles = StyleSheet.create(
    {
        usualBackgroundButton: {
            alignItems: "center",
            justifyContent: "center",
            borderRadius: 25,
            aspectRatio: 1, marginVertical: 10
        }
    }
)