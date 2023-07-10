import { Pressable, StyleSheet, TouchableOpacity } from "react-native"
import { useThemeColor } from "../Themed"

export const IconButton = (props) =>
{
    const secondary = useThemeColor({}, "Secondary");



    return(
        <TouchableOpacity onPress={props.onClick}
            style={[
                {
                    backgroundColor: secondary
                }, 
                styles.IconButton]}>
                {props.children}
        </TouchableOpacity>);
}

export const SimpleIconButton = (props) =>
{
    return(
    <TouchableOpacity onPress={props.onClick} style={styles.IconButton}>
        {props.children}
    </TouchableOpacity>);
}

export const ContrastRoundButton = (props) =>
{
    const contrast = useThemeColor({}, "Contrast")
    const primary = useThemeColor({}, "Primary")

    return(
    <TouchableOpacity onPress={props.onClick}
    style={[
        {
            backgroundColor: contrast,
        }, 
        styles.ContrastRoundButton]}>
        {props.children}
    </TouchableOpacity>);
}

const styles = StyleSheet.create(
    {
        IconButton: {
            borderRadius: 10,
            padding: 8,
        },

        ContrastRoundButton: {
            borderRadius: 50,
            padding: 15,
            position: "absolute",
            bottom: 5,
        }
    }
)
