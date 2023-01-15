import {Button, FlatList, Pressable, ScrollView, Text, View} from "react-native"
import styles from "./styles.foodPage.component"
import {useEffect, useState} from "react";
import { useFocusEffect } from '@react-navigation/native';
import AsyncStorage from "@react-native-async-storage/async-storage";
import ProgressCircle from "../../components/progressCircle/progressCircle.component";

export default function Foodpage({navigation, route}) {
    const [proteins, setProteins] = useState(0);
    const [kcal, setKcal] = useState(0);
    const [fat, setFat] = useState(0);
    const [carbohydrates, setCarbohydrates] = useState(0);
    const [sugar, setSugar] = useState(0);
    const [salt, setSalt] = useState(0);
    const [consumedFoodList, setConsumedFoodList] = useState([]);
    const [kcalGoal, setKcalGoal] = useState(0)
    const [weight, setWeight] = useState(0)

    useEffect(()=>{
        const unsubscribe = navigation.addListener('focus', () => {
            setTimeout(()=>{
                getDailyFoodInfo().then(i =>{
                    setProteins(parseInt(i.data.proteins));
                    setKcal(parseInt(i.data.consumedKcal))
                    setFat(parseInt(i.data.fat))
                    setCarbohydrates(parseInt(i.data.carbohydrates));
                    setSugar(parseInt(i.data.sugar));
                    setSalt(parseInt(i.data.salt));
                    setConsumedFoodList(i.data.consumedFoodList);
                    //console.log("foccused")
                })
            }, 2000)
        });

        // Return the function to unsubscribe from the event so it gets removed on unmount
        return unsubscribe;
    },[navigation])

    async function getDailyFoodInfo(){
        let now = new Date();
        let startOfDay = new Date(now.getFullYear(), now.getMonth(), now.getDate());
        let timestamp = startOfDay / 1000;

        try {
            if(timestamp !== null){
                const jsonValue = await AsyncStorage.getItem(timestamp + "");
                if (jsonValue !== null){
                    return JSON.parse(jsonValue);
                }else{
                    return null
                }
            }
        }catch (e) {
            console.log(e)
            alert("something went wrong with getting today's food values")
            return null
        }
    }

    useEffect(()=>{
        AsyncStorage.getItem("kcalGoal").then(s => {
            setKcalGoal(parseInt(s))
        })

        AsyncStorage.getItem("weight").then(w => {
            setWeight(parseInt(w))
        })

        getDailyFoodInfo().then(i => {
            try{
                setProteins(parseInt(i.data.proteins));
                setKcal(parseInt(i.data.consumedKcal))
                setFat(parseInt(i.data.fat))
                setCarbohydrates(parseInt(i.data.carbohydrates));
                setSugar(parseInt(i.data.sugar));
                setSalt(parseInt(i.data.salt));
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
                <ProgressCircle curValue={kcal} goal={kcalGoal} text={"kcal"}/>
                <ProgressCircle curValue={proteins} goal={Math.floor(weight*0.8)} text={"grams of proteins"}/>
                <ProgressCircle curValue={fat} goal={Math.floor((kcalGoal*0.3)/9)} text={"grams of fat"}/>
                <ProgressCircle curValue={carbohydrates} goal={Math.floor(0.525*kcalGoal/4)} text={"grams of carbohydrates"}/>
                <ProgressCircle curValue={sugar} goal={Math.floor(kcalGoal/40)} text={"grams of sugar"}/>
                <ProgressCircle curValue={salt} goal={6} text={"grams of salt"}/>
            </View>
            {/*<FlatList data={consumedFoodList} renderItem={(foodItem)=> <Text>{foodItem.foodName}</Text>
            }>
            </FlatList>*/}
        </ScrollView>
    );
}
