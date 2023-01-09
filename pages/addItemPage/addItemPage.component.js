import styles from "./styles.addItemPage.component"
import {Pressable, Text, TextInput, View} from "react-native";
import {useEffect, useState} from "react";

export default function AddItemPage({route, navigation}) {
    const [amount, setAmount] = useState(route.params.amount);
    const itemName = route.params.itemName;
    const metric = route.params.metric;
    /*useEffect(() =>{

    }, [amount])*/

    //alert(itemName)
    return(
        <View style={styles.contWrapper}>
            <View style={styles.infoContainer}>
                <View style={styles.row}>
                    <Text style={styles.infoText}>Item:</Text>
                    <Text >{itemName}</Text>
                </View>
                <View style={styles.row}>
                    <Text style={styles.infoText}>Amount in {metric}:</Text>
                        <TextInput
                            style={styles.inputField}
                            //value={amount + ''}
                            onChangeText={setAmount}
                            keyboardType={"numeric"}
                            defaultValue={amount+""}
                        ></TextInput>
                </View>
            </View>
            <View style={styles.col}>
                <Pressable style={[styles.addBtn, styles.btn]} onPress={() => navigation.navigate("Food tracking")}>
                    <Text style={styles.btnText}>Add to daily consumables</Text>
                </Pressable>
                {/*<Pressable style={[styles.goBackBtn, styles.btn]} onPress={() => navigation.navigate("Food scanner")}>
                        <Text style={styles.btnText}>Go back</Text>
                    </Pressable>*/}
            </View>
        </View>
    )
}
