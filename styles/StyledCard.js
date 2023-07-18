import { StyleSheet } from "react-native";
import { useThemeColor } from "../components/Themed";

const cardStyle = () => {

  const shadowColor = useThemeColor({}, "ShadowColor")
  const secondary = useThemeColor({}, "Secondary")

  return StyleSheet.create({
    card: {
      borderRadius: 35,
      backgroundColor: secondary,
      padding: 20,

      shadowColor: shadowColor,
      shadowOffset: { width: -2, height: 4 },
      shadowOpacity: 0.4,
      shadowRadius: 3,
    },
  });
};

export default cardStyle;