import { Platform } from "react-native";
import {SafeAreaView, StyleSheet, TextInput} from 'react-native';
import { useThemeColor } from "./Themed";
import { Text } from "./Themed";


export function SubText(props) {

  const fontGray = useThemeColor({}, "FontGray")

  return (
    <Text
      {...props}
      style=
      {
        [
          props.style,
          styles.subText,
          {
            color: fontGray
          }
        ]
      }>  
      {props.text}
    </Text>
  )
}
 
export function TitleText(props) {

  const fontColor = useThemeColor({}, "Font")

  return (
    <Text
      {...props}
      style=
      {
        [
          props.style,
          styles.titleText,
          {
            color: fontColor
          }
        ]
      }> 
      {props.text} 
    </Text>
  )
}

export function SubTitleText(props) {

  const fontColor = useThemeColor({}, "Font")

  return (
    <Text
      {...props}
      style=
      {
        [
          props.style,
          styles.subTitleText,
          {
            color: fontColor
          }
        ]
      }> 
      {props.text} 
    </Text>
  )
}

export function SubTitleGrayText(props) {

  const fontGray = useThemeColor({}, "FontGray")

  return (
    <Text
      {...props}
      style=
      {
        [
          props.style,
          styles.subTitleText,
          {
            color: fontGray
          }
        ]
      }> 
      {props.text} 
    </Text>
  )
}

export function NormalText(props) {

  const fontColor = useThemeColor({}, "Font")

  return (
    <Text
      {...props}
      style=
      {
        [
          props.style,
          styles.normalText,
          {
            color: fontColor
          }
        ]
      }> 
      {props.text} 
    </Text>
  )
} 

export function LittleNormalText(props) {

  const fontColor = useThemeColor({}, "Font")

  return (
    <Text
      {...props}
      style=
      {
        [
          props.style,
          styles.littleNormalText,
          {
            color: fontColor
          }
        ]
      }> 
      {props.text} 
    </Text>
  )
} 

export function HugeText(props) {

  const fontColor = useThemeColor({}, "Font")

  return (
    <Text
      {...props}
      style=
      {
        [
          props.style,
          styles.hugeText,
          {
            color: fontColor
          }
        ]
      }> 
      {props.text} 
    </Text>
  )
} 



const styles = StyleSheet.create({

  normalText: {
    fontSize: 16,
    fontFamily: "poppinsLight"
  },

  littleNormalText: {
    fontSize: 14,
    fontFamily: "poppinsLight"
  },

  titleText: {
    fontSize: 24,
    fontWeight: "bold",
    fontFamily: "poppinsSemiBold"
  },

  hugeText: {
    fontSize: 30,
    fontWeight: "bold",
    fontFamily: "poppinsBold"
  },

  subTitleText: {
    fontSize: 18,
    fontWeight: "bold",
    fontFamily: "poppinsMedium"
  },

  subText: {
    fontFamily: "poppinsLight"
  },
});