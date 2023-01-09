import React, {useEffect, useState} from "react";
import {Alert, Button, Pressable, Text, View} from "react-native";
import { BarCodeScanner } from 'expo-barcode-scanner';
import styles from "./styles.barcodePage.component";
import GetBarCodeInfo from "../../repositories/foodtrackingRepo";
import AddItemPage from "../addItemPage/addItemPage.component";


export default function ScanBarcodePage ({navigation}){
    const [scanned, setScanned] = useState(false);
    const [barcode, setBarcode] = useState(null);
    const [hasPermission, setHasPermission] = useState(null);
    const [scannedItemData, setScannedItemData] = useState(null)

    useEffect(() => {
        const getBarCodeScannerPermissions = async () => {
            const { status } = await BarCodeScanner.requestPermissionsAsync();
            setHasPermission(status === 'granted');
        };

        getBarCodeScannerPermissions();
    }, [])

    useEffect(() => {
        if(scanned === true && barcode !== null){
            FetchBarcodeInfo().then(d => {
                let keyOnlyArr = Object.keys(d);
                if(keyOnlyArr.includes("foods")){
                    setScannedItemData(d);
                }else{
                    alert("Could not find your scanned product sorry.")
                }
            })
        }
    }, [barcode, scanned])

    useEffect(()=>{
        if(scannedItemData !== null)
            createYesNoPopup(scannedItemData);
    }, [scannedItemData])

    function addItemToConsumedList(url){
        navigation.navigate("Add food item", {
            itemName: scannedItemData.foods[0].food_name+"",
            amount: scannedItemData.foods[0].serving_qty,
            metric: scannedItemData.foods[0].serving_unit+"",
            sugar: scannedItemData.foods[0].nf_sugars,
            calories: scannedItemData.foods[0].nf_calories,
            fat : scannedItemData.foods[0].nf_total_fat,
            carbohydrate: scannedItemData.foods[0].nf_total_carbohydrate
        })
    }
    
    function createYesNoPopup(d) {
        //console.log(d)
        //return null
        Alert.alert("Add item",`Do you want to add a ${d.foods[0].food_name} ${d.foods[0].brand_name} to your consumed list of today`,[
            {
                text: "NO",
                style: "noBtn",
                onPress: ()=> console.log("cancelled food item")
            },
            {
                text: "YES",
                style: "yesBtn",
                onPress: () => addItemToConsumedList()
            }
        ])
    }

    const handleBarCodeScanned = ({ type, data }) => {
        setScanned(true);
        //alert(`Bar code with type ${type} and data ${data} has been scanned!`);
        setBarcode(data)
        //alert({barcode})
        /*FetchBarcodeInfo().then(d => {
            setScannedItemData(d);
            //createYesNoPopup(d);
            //alert(`you scanned a ${d.foods[0].food_name+ " "+d.foods[0].brand_name}`);
        })*/
    };

    async function FetchBarcodeInfo() {
        if (barcode !== null) {
            //alert({barcode})
            const foodData = await GetBarCodeInfo(barcode);
            console.log(foodData)
            return foodData;
        }
        //if barcode null verwijder code nog
        alert("barcode === null")
        const foodData = await GetBarCodeInfo(barcode);
        console.log(foodData)
        return foodData;
        /*const foodData = GetBarCodeInfo(barcode).then(d => alert(`You scanned a ${d}`));
        alert(`You scanned a ${foodData}`);
        return foodData;*/
    }


    if (hasPermission === null) {
        return (<Text>Requesting for camera permission</Text>);
    }
    if (hasPermission === false) {
        return (<Text>No access to camera</Text>);
    }

    return (
        <View style={styles.barcodeScannerContainer}>
            <BarCodeScanner
                onBarCodeScanned= {scanned ? undefined : handleBarCodeScanned}
                style={styles.absoluteFillObject}
            />
            {/*{scanned && <Button style={styles.scanAgainBtn} title={'Tap to Scan Again'} onPress={() => setScanned(false)} />}*/}
            <Pressable style={styles.scanAgainBtn} onPress={() => {setScanned(false); setBarcode(null); setScannedItemData(null);}}><Text>Tap to Scan Again</Text></Pressable>
        </View>
    )
}
