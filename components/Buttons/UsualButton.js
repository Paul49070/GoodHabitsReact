import { Pressable, StyleSheet, TouchableOpacity } from "react-native"

export const SimpleButton = (props) =>
{
    return(
        <TouchableOpacity 
        onPress={props.onClick}>

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