import styles from "./styles.foodItemCard.component"
import {useEffect, useState} from "react";
import {Text, View} from "react-native";

export default function FoodItemCard({item}){
    let added_time= new Date(item.specific_timestamp*1000);
    let min= added_time.getMinutes();
    if(added_time.getMinutes().toString().length === 1)
        min = "0"+added_time.getMinutes().toString();
    let time = added_time.getHours()+":"+min;

    return(
        <View style={styles.foodCard}>
            <View style={styles.row}>
                <Text style={styles.foodName}>{item.foodName+" "+item.consumedAmount}</Text>
                <Text style={styles.time}>{time}</Text>
            </View>
            <View style={styles.row}>
                <Text>Calories</Text>
                <Text>{item.kcals} kcal</Text>
            </View>
            <View style={styles.row}>
                <Text>Proteins</Text>
                <Text>{item.proteins} gr</Text>
            </View>
            <View style={styles.row}>
                <Text>Fat</Text>
                <Text>{item.fat} gr</Text>
            </View>
            <View style={styles.row}>
                <Text>Carbohydrates</Text>
                <Text>{item.carbs} gr</Text>
            </View>
            <View style={styles.row}>
                <Text>Sugar</Text>
                <Text>{item.sugar} gr</Text>
            </View>
            <View style={styles.row}>
                <Text>Salt</Text>
                <Text>{item.salt} gr</Text>
            </View>
        </View>
    )
}
