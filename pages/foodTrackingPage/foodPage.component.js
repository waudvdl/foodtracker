import {Button, Pressable, ScrollView, Text, View} from "react-native"
import styles from "./styles.foodPage.component"
import {useEffect, useState} from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import * as Progress from 'react-native-progress';
import ProgressCircle from "../../components/progressCircle/progressCircle.component";

export default function Foodpage({navigation, route}) {
    const [proteins, setProteins] = useState(0);
    const [kcal, setKcal] = useState(0);
    const [fat, setFat] = useState(0);
    const [carbohydrates, setCarbohydrates] = useState(0);
    const [sugar, setSugar] = useState(0);
    const [salt, setSalt] = useState(0);
    const [consumedFoodList, setConsumedFoodList] = useState([]);

    useEffect(()=>{
        const timestamp = route.params.timestamp;
        async function getDailyFoodInfo(){
            try {
                if(timestamp !== null){
                    const jsonValue = await AsyncStorage.getItem(timestamp + "");
                    if (jsonValue !== null){
                        return JSON.parse(jsonValue);
                    }
                }
            }catch (e) {
                console.log(e)
                alert("something went wrong with getting today's food values")
            }
        }

        getDailyFoodInfo().then(i => {
            try{
                setProteins(i.data.proteins);
                setKcal(i.data.consumedKcal)
                setFat(i.data.fat)
                setCarbohydrates(i.data.carbohydrates);
                setSugar(i.data.sugar);
                setSalt(i.data.salt);
                setConsumedFoodList(i.data.consumedFoodList);
            }catch (e) {
                return null
            }
        })



    }, [])

    return (
        <ScrollView style={styles.foodpageContainer}>
            <View style={styles.graph}>
                <Text>hier komt een graph die later nog wordt toegevoegd</Text>
            </View>
            {/*<Pressable onPress={() => {navigation.navigate("Food scanner")}}>
                <Text>Scan something</Text>
            </Pressable>*/}
            <Pressable style={styles.scanBtn} onPress={() => {navigation.navigate("Food scanner")}}>
                <Text style={styles.btnText}>Scan an item</Text>
            </Pressable>
            <View style={styles.statsContainer}>
                {/*<Progress.Circle size={150} progress={0.4} thickness={7} showsText={true} formatText={()=>{return "40%";}}/>*/}
                <ProgressCircle curValue={kcal} goal={route.params.kcalGoal} text={"Daily kcal "}/>
                <ProgressCircle curValue={proteins} goal={Math.floor(route.params.weight*0.8)} text={"Daily grams of protein "}/>
                <ProgressCircle curValue={fat} goal={Math.floor((route.params.kcalGoal*0.3)/9)} text={"Daily grams of fat"}/>
                <ProgressCircle curValue={carbohydrates} goal={Math.floor(0.525*route.params.kcalGoal/4)} text={"Daily grams of carbohydrates"}/>
                <ProgressCircle curValue={sugar} goal={Math.floor(route.params.kcalGoal/40)} text={"Daily grams of sugar"}/>
                <ProgressCircle curValue={salt} goal={6} text={"Daily grams of salt"}/>
            </View>
        </ScrollView>
    );
}
