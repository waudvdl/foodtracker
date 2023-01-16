import React, {useEffect, useState} from "react";
import {Alert, Button, Pressable, Text, View} from "react-native";
import { BarCodeScanner } from 'expo-barcode-scanner';
import styles from "./styles.barcodePage.component";
import GetBarCodeInfo from "../../repositories/foodtrackingRepo";
import FetchBarcodeInfo from "../../repositories/FetchBarcodeInfo"
import AddItemPage from "../addItemPage/addItemPage.component";


export default function ScanBarcodePage ({navigation}){
    const [scanned, setScanned] = useState(false);
    const [barcode, setBarcode] = useState(null);
    const [hasPermission, setHasPermission] = useState(null);
    const [scannedItemData, setScannedItemData] = useState(null)
    //const [foodData,setFoodData] = useState(null;)

    useEffect(() => {
        const getBarCodeScannerPermissions = async () => {
            const { status } = await BarCodeScanner.requestPermissionsAsync();
            setHasPermission(status === 'granted');
        };

        getBarCodeScannerPermissions();
    }, [])

    useEffect(() => {
        if(scanned === true && barcode !== null){

            FetchBarcodeInfoFromOpenFoodFacts().then(d => {
                let keyOnlyArr = Object.keys(d);
                if(keyOnlyArr.includes("products") && d.count !== 0){
                    let metric = d.products[0].serving_size.substring(d.products[0].serving_quantity.length)
                    if(d.products[0].serving_size.includes("ml")){
                        metric= "ml"
                    }else if(d.products[0].serving_size.includes("g")){
                        metric= "gr"
                    }
                    else if(d.products[0].serving_size.includes("l")){
                        metric= "l"
                    }
                    console.log(metric)
                    let nutrions = d.products[0].nutriments
                    let temp = {
                        name: d.products[0].brands,
                        quantity: d.products[0].product_quantity,
                        serving_amount : d.products[0].serving_quantity,
                        serving_size: d.products[0].serving_size,
                        nutrion_values: {
                            total_kcal_serving: (nutrions["energy-kcal_serving"] !== undefined) ? nutrions["energy-kcal_serving"] : 0,
                            total_carbs_serving: (nutrions["carbohydrates_serving"] !== undefined) ? nutrions["carbohydrates_serving"] : 0,
                            total_fat_serving: (nutrions["fat_serving"] !== undefined) ? nutrions["fat_serving"] : 0,
                            total_protein_serving: (nutrions["protein_serving"] !== undefined) ? nutrions["protein_serving"] : 0,
                            total_salt_serving: (nutrions["salt_serving"] !== undefined) ? nutrions["salt_serving"] : 0,
                            total_sugar_serving: (nutrions["sugars_serving"] !== undefined) ? nutrions["sugars_serving"] : 0,
                        },
                        metric: metric,
                    }
                    //console.log(temp)
                    setScannedItemData(temp)
                }else if(d.count !== 0){
                    alert("Could not find your scanned product sorry.")
                }
                else{
                    alert("Something went wrong try again later")
                }
            }).catch(()=>{return null});
        }
    }, [barcode, scanned])

    useEffect(()=>{
        if(scannedItemData !== null)
            createYesNoPopup(scannedItemData);
    }, [scannedItemData])

    function addItemToConsumedList(){
        navigation.navigate("Add food item", {
            foodItem : scannedItemData,
        })
    }
    
    function createYesNoPopup(foodData) {
        Alert.alert("Add item", `Do you want to add a ${foodData.name} to your daily consumables?`,[
        //Alert.alert("Add item",`Do you want to add a ${d.foods[0].food_name} ${d.foods[0].brand_name} to your consumed list of today`,[
            {
                text: "NO",
                style: "noBtn",
                onPress: ()=> {
                    setTimeout(()=>{
                        setScannedItemData(null)
                        setScanned(false);
                        setBarcode(null);
                        setScannedItemData(null);
                    }, 1000)
                    console.log("cancelled food item")
                }
            },
            {
                text: "YES",
                style: "yesBtn",
                onPress: () => {
                    setTimeout(()=>{
                        setScannedItemData(null)
                        setScanned(false);
                        setBarcode(null);
                        setScannedItemData(null);
                    }, 1000)
                    addItemToConsumedList()
                }
            }
        ])
    }

    const handleBarCodeScanned = ({ type, data }) => {
        setScanned(true);
        setBarcode(data)
    };

    async function FetchBarcodeInfoFromNutrionix() {
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
    
    async function FetchBarcodeInfoFromOpenFoodFacts(){
        if(barcode !== null){
            const foodData = await FetchBarcodeInfo(barcode)
            return foodData;
        }
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
            <Pressable style={styles.scanAgainBtn} onPress={() => {setScannedItemData(null);setScanned(false); setBarcode(null); setScannedItemData(null);}}><Text>Tap to Scan Again</Text></Pressable>
        </View>
    )
}
