import {Pressable, Text, View} from "react-native";
import styles from "./styles.submenuCard.component";
import * as Progress from 'react-native-progress';

export default function SubmenuCard(props){
    let value = props.item.value
    if(props.item.goal !== undefined){
        value = value+"/"+props.item.goal
        if(props.item.metric !== undefined){
            value += " "+props.item.metric
        }
    }

    function GetContentRight(){
        const type =props.item.type
        switch(type){
            case "LOADING_BAR":
                return (
                    <View style={styles.progressBar}>
                        <Progress.Bar borderWidth={2} color={"#1DC763"} progress={props.item.value/props.item.goal} width={160} height={8}/>
                    </View>
                );
                break;
            case "BUTTON":
                return(
                    <View style={styles.moreInfoButtonContainer}>
                        <Pressable onPress={() => {props.navigation.navigate("Food tracking")}} style={styles.moreInfoButton}><Text>More info</Text></Pressable>
                    </View>
                );
                break;
            case "SLEEP":
                return(<Text></Text>)
                break;
            case "TEST":
                break;

        }
    }

    return(
        <View style={styles.submenuCard}>
            <Pressable onPress={props.navigation}>
                <View style={styles.contentContainer}>
                    <View>
                        <Text style={styles.cardTitle}>{props.item.title}</Text>
                        <Text style={styles.cardSubtitle}>{value}</Text>
                    </View>
                    <View style={styles.cardInfo}>
                        {GetContentRight()}
                    </View>
                </View>
            </Pressable>
        </View>
    )
}
