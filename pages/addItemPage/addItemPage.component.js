import styles from "./styles.addItemPage.component"
import {Pressable, Text, TextInput, View} from "react-native";
import {useEffect, useState} from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function AddItemPage({route, navigation}) {
    const [amount, setAmount] = useState(route.params.foodItem.quantity);
    const [kcal, setKcal] = useState(route.params.foodItem.nutrion_values.total_kcal_serving);
    const [carbs, setCarbs] = useState(route.params.foodItem.nutrion_values.total_carbs_serving);
    const [protein, setProtein] = useState(route.params.foodItem.nutrion_values.total_protein_serving);
    const [fat, setFat] = useState(route.params.foodItem.nutrion_values.total_fat_serving);
    const [sugar, setSugar] = useState(route.params.foodItem.nutrion_values.total_sugar_serving);
    const [salt, setSalt] = useState(route.params.foodItem.nutrion_values.total_salt_serving);
    //const [consumedList, setConsumedList] = useState([])
    const foodName = route.params.foodItem.name;
    const serving_amount = route.params.foodItem.serving_amount;
    const metric = route.params.foodItem.metric;

    let now = new Date();
    let startOfDay = new Date(now.getFullYear(), now.getMonth(), now.getDate());
    let timestamp = startOfDay / 1000;


    useEffect(() =>{

        let mult_factor=amount/serving_amount;
        setKcal(kcal*mult_factor)
        setCarbs(carbs*mult_factor)
        setProtein(protein*mult_factor)
        setFat(fat*mult_factor)
        setSugar(sugar*mult_factor)
        setSalt(salt*mult_factor)
    }, [amount])

    function addToDailyConsumedItems(){
        getDailyFoodInfo().then(d => {
            //console.log(d)
            let consumedList = d.data.consumedFoodList;
            let now = new Date();
            let startOfDay = new Date(now.getFullYear(), now.getMonth(), now.getDate(), now.getHours(),now.getMinutes());
            let add_timestamp = startOfDay/1000;
            //console.log(add_timestamp)
            let foodItem = {
                foodName: foodName,
                consumedAmount: amount+metric,
                kcals: kcal,
                carbs: carbs,
                proteins: protein,
                fat: fat,
                sugar: sugar,
                specific_timestamp: add_timestamp
            }
            consumedList.push(foodItem)
            d.data.consumedFoodList = consumedList
            d.data.consumedKcal = d.data.consumedKcal +kcal;
            d.data.fat = d.data.fat +fat;
            d.data.sugar = d.data.sugar +sugar;
            d.data.salt = d.data.salt +salt;
            d.data.proteins = d.data.proteins +protein;
            d.data.carbohydrates = d.data.carbohydrates +carbs;
            const jsonValue = JSON.stringify(d);
            AsyncStorage.setItem(timestamp + '', jsonValue);
        })
        navigation.navigate("Food tracking")
    }

    async function getDailyFoodInfo(){
        try {
            if(timestamp !== null){
                const jsonValue = await AsyncStorage.getItem(timestamp + "");
                if (jsonValue !== null){
                    //console.log(jsonValue)
                    return JSON.parse(jsonValue);
                }
            }
        }catch (e) {
            console.log(e)
            alert("something went wrong with adding the food to today's food list")
        }
    }


    return(
        <View style={styles.contWrapper}>
            <View style={styles.infoContainer}>
                <View style={styles.row}>
                    <Text style={styles.infoText}>Item:</Text>
                    <Text style={styles.foodName}>{foodName}</Text>
                </View>
                <View style={styles.row}>
                    <Text style={styles.infoText}>Consumed amount in {metric}:</Text>
                    <TextInput
                        style={styles.inputField}
                        //value={amount + ''}
                        onChangeText={setAmount}
                        keyboardType={"numeric"}
                        defaultValue={amount+""}
                    ></TextInput>
                </View>
                <View style={styles.col}>
                    <Text style={styles.summary}>Summary</Text>
                    <View style={styles.summaryCont}>
                        <View style={styles.sumRow}>
                            <Text>Calories</Text>
                            <Text>{kcal} Kcal</Text>
                        </View>
                        <View style={styles.sumRow}>
                            <Text>Proteins</Text>
                            <Text>{protein} gr</Text>
                        </View>
                        <View style={styles.sumRow}>
                            <Text>Carbs</Text>
                            <Text>{carbs} gr</Text>
                        </View>
                        <View style={styles.sumRow}>
                            <Text>Sugar</Text>
                            <Text>{sugar} gr</Text>
                        </View>
                        <View style={styles.sumRow}>
                            <Text>Fat</Text>
                            <Text>{fat} gr</Text>
                        </View>
                        <View style={styles.sumRow}>
                            <Text>Salt</Text>
                            <Text>{salt} gr</Text>
                        </View>
                    </View>
                </View>
            </View>
            <View style={styles.col}>
                <Pressable style={[styles.addBtn, styles.btn]} onPress={addToDailyConsumedItems}>
                    <Text style={styles.btnText}>Add to daily consumables</Text>
                </Pressable>
                {/*<Pressable style={[styles.goBackBtn, styles.btn]} onPress={() => navigation.navigate("Food scanner")}>
                        <Text style={styles.btnText}>Go back</Text>
                    </Pressable>*/}
            </View>
        </View>
    )
}
