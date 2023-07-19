import { StyleSheet } from "react-native";
import { useThemeColor } from "../components/Themed";

const cardStyle = () => {

  const shadowColor = useThemeColor({}, "ShadowColor")
  const secondary = useThemeColor({}, "Secondary")

  return StyleSheet.create({
    card: {
      borderRadius: 25,
      backgroundColor: secondary,
      padding: 20,

      shadowColor: shadowColor,
      shadowOffset: {
        width: 0,
        height: 11,
      },
      shadowOpacity:  0.23,
      shadowRadius: 11.78,
      elevation: 15
    },

    shadow : {
      shadowColor: "red",
      shadowOffset: {
        width: 0,
        height: 5090,
      },
      shadowOpacity:  1,
      shadowRadius: 11.78,
      elevation: 150
    },
  });
};

export default cardStyle;