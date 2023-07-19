import { View, StyleSheet } from "react-native"

export default Badge = ({fillColor, bgColor}) =>
{

    const styles = StyleSheet.create(
        {
            backgroundBadgeStyle: {
                position: "absolute", 
                marginTop: -5, 
                marginRight: -5,
                height: 18, 
                width: 18,
                right: 0, 
                top: 0, 
                borderRadius: 20, 
                display: "flex", 
                alignItems: "center", 
                justifyContent: "center"
            },

            badgeStyle: {
                height: 10,
                width: 10,
                borderRadius: 20
            }
        }
    )

    return(

        <View style={[styles.backgroundBadgeStyle, {backgroundColor: bgColor}]}>
          <View style={[styles.badgeStyle, {backgroundColor: fillColor}]}/>
        </View>

    )
}