import { StyleSheet, View, Image } from "react-native";
import { useThemeColor } from "../Themed";
import { AnimatedCircularProgress } from 'react-native-circular-progress';
import { useState } from "react";
import { CircularProgressBase } from 'react-native-circular-progress-indicator';
import { NormalText } from "../../styles/StyledText";

export const StepCircularBar = ({ habit }) => {
  const { color, doneSteps, totalSteps, id, icon } = habit;

  let pourcentage = (doneSteps * 100) / totalSteps;

  pourcentage = pourcentage < 100 ? pourcentage - 2 : pourcentage

  const primary = useThemeColor({}, "Primary");
  const [isLoading, setIsLoading] = useState(true);

  const handleStopLoad = () => {
    setIsLoading(false);
  };

  const radius = 32; // Rayon du cercle
  const angleTotal = 2 * Math.PI * radius; // Angle total en radians

  // Calcul du width maximal pour que le cercle soit rempli avec count=1
  const widthMaximal = angleTotal

  let gap;
    if(totalSteps === 1)
        gap = 0.5   
    else if(totalSteps === 2)
        gap = 0.925
    else if(totalSteps === 3)
        gap = 0.95
    else if(totalSteps === 4)
        gap = 0.975
    else gap = 1


  return (
    <View style={styles.container}>
      <CircularProgressBase
        value={pourcentage}
        radius={radius+2}
        activeStrokeWidth={5}
        inActiveStrokeWidth={5}
        activeStrokeColor={pourcentage === 0 ? primary : color}
        inActiveStrokeColor={primary}
        strokeLinecap="square"
        rotation={3}
        dashedStrokeConfig={{
          count: totalSteps,
          width: widthMaximal / (gap * totalSteps),
        }}
      >
        <View style={styles.imageContainer}>
        <Image 
            onLoadEnd={handleStopLoad}
            style={[
                styles.imageStyle, 
                {
                    backgroundColor: isLoading ? primary : "transparent"
                }]} source={icon}>

            </Image>
            </View>
      </CircularProgressBase>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    gap: 10,
  },

  imageContainer: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    flex: 1
  },

  imageStyle: {
    alignSelf: 'center',
    justifyContent: 'center',
    resizeMode: 'contain',
    aspectRatio: 1,
    width: "40%", height: "40%",
},
});