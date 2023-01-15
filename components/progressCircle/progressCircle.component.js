import * as Progress from 'react-native-progress';
import styles from "./styles.progressCircle.component"
import {Text, View} from "react-native";
import {useEffect, useState} from "react";

export default function ProgressCircle(props) {
    const [indeterminate, setIndeterminate] = useState(true)
    const [progress, setProgress] = useState(0.0)
    const [color, setColor] =useState([0,0,0])

    useEffect(() =>{
        if(props.curValue !== 0 && props.goal !== 0){
            setProgress(parseFloat(props.curValue)/parseFloat(props.goal));
        }else{
            setProgress(0)
        }
        setTimeout(()=>{
            setIndeterminate(false);
        }, 2000)

    },[props])

    useEffect(() =>{
        if(progress > 1){
            setProgress(1);
        }else{

            let minCol = {r:240, g:0,b:0};
            let maxCol = {r:29, g:199,b:99};
            let redCol = Math.floor(240-Math.abs(Math.floor((minCol.r-maxCol.r)*progress)))
            let greenCol = Math.floor(Math.abs(Math.floor(minCol.g-maxCol.g)*progress))
            let blueCol = Math.floor(Math.abs(Math.floor(minCol.b-maxCol.b)*progress))
            setColor([redCol,greenCol, blueCol])
        }
    },[progress])

    return(
        <View style={styles.progressCircleContainer}>
            <Progress.Circle indeterminate={indeterminate} indeterminateAnimationDuration={2000} size={150} progress={progress} thickness={7} showsText={true} formatText={()=>{return Math.floor(progress*100)+"%";}} color={'rgb('+color[0]+","+color[1]+","+color[2]+", 1.0)"}/>
            <Text style={styles.label}>{props.text}<Text style={{color: `rgba(${color[0]},${color[1]},${color[2]}, 1)`}}> {props.curValue}/{+props.goal}</Text></Text>
        </View>
    )
}
