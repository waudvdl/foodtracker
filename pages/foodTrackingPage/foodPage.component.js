import {Button, Pressable, Text, View} from "react-native"
import repo from  "./../../repositories/foodtrackingRepo"
import GetBarCodeInfo from "./../../repositories/foodtrackingRepo";
import styles from "./styles.foodPage.component"
import {useEffect, useState} from "react";
//import {RNCamera} from 'react-native-camera';

export default function Foodpage({navigation, props}) {
    const [proteins, setProteins] = useState(0);
    const [fat, setFat] = useState(0);
    const [carbohydrates, setCarbohydrates] = useState(0);
    const [sugar, setSugar] = useState(0);
    const [salt, setSalt] = useState(0);
    const [consumedFoodList, setConsumedFoodList] = useState([]);

    return (
        <View style={styles.foodpageContainer}>
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

            </View>
        </View>
    );
}
