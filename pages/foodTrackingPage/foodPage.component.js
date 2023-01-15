import {
    Button,
    Dimensions,
    FlatList,
    Pressable,
    SafeAreaView,
    ScrollView,
    Text,
    View,
    VirtualizedList
} from "react-native"
import styles from "./styles.foodPage.component"
import {useEffect, useState} from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import ProgressCircle from "../../components/progressCircle/progressCircle.component";
import FoodItemCard from "../../components/foodItemCard/foodItemCard.component";
import {LineChart} from "react-native-chart-kit";
import {setDisabled} from "react-native/Libraries/LogBox/Data/LogBoxData";

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
    const [labels,setLabels] = useState([])
    const [labelData,setLabelData] = useState([])
    const [showChart, setShowChart] = useState(false)
    //const [chartData, setChartData] = useState({labels:[],datasets:[{data:[]}]})


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

    async function getTimestampFoodRecords(timestamp){
        try{
            const jsonValue = await AsyncStorage.getItem(timestamp + "");
            if (jsonValue !== null){
                return JSON.parse(jsonValue);
            }else{
                return null
            }
        }catch (e) {
            console.log(e)
        }
    }

    async function getWeekInfo(){
        let labels =[]
        let data = []
        /*for(let i = 6; i>0; i--){
            console.log(i)
        }*/
        for(let i=6; i > -1; i--){
            let now = new Date();
            now.setDate(now.getDate()-i)
            let date = new Date(now.getFullYear(), now.getMonth(), now.getDate());
            //console.log(date)
            //console.log(date.getMonth())
            let timestamp = date / 1000;

            let res = await getTimestampFoodRecords(timestamp);
            if(res !==null){
                data.push(parseInt(res.data.consumedKcal))
            }else{
                data.push(0)
            }
            labels.push((date.getMonth()+1)+"/"+date.getDate())
        }

        //console.log(data)
        //console.log(labels)
        setLabels(labels)
        setLabelData(data)
        setShowChart(true);
        /*let chart_data = chartData;
        chart_data.labels = labels;
        chart_data.datasets[0].data = data;
        setChartData(chart_data)*/
        //console.log(labels.)
        //console.log(data)
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

        getWeekInfo();

    }, [])




    return (
        <SafeAreaView>
                <FlatList
                    ListHeaderComponent={
                        <ScrollView style={styles.pageWrapper}>
                            <View style={styles.graph}>
                                { showChart ?
                                <LineChart
                                    data={{
                                        labels: labels,
                                        datasets: [
                                            {
                                                data: labelData
                                            }
                                        ]
                                    }}
                                    /*data={{
                                        labels: ["January", "February", "March", "April", "May", "June"],
                                        datasets: [
                                            {
                                                data: [
                                                    Math.random() * 100,
                                                    Math.random() * 100,
                                                    Math.random() * 100,
                                                    Math.random() * 100,
                                                    Math.random() * 100,
                                                    Math.random() * 100
                                                ]
                                            }
                                        ]
                                    }}*/
                                    /*data={{
                                        labels: [],
                                        datasets: [
                                            {
                                                data: []
                                            }
                                        ]
                                    }}*/
                                    width={Dimensions.get("window").width}
                                    height={300}
                                    verticalLabelRotation={30}
                                    chartConfig={{
                                        //backgroundGradientFromOpacity: 0,
                                        //backgroundGradientToOpacity: 0,
                                        decimalPlaces: 0,
                                        color: (opacity = 1) => `rgba(26, 255, 146, ${opacity})`,
                                        strokeWidth: 3, // optional, default 3
                                        barPercentage: 0.5,
                                        useShadowColorFromDataset: false, // optional
                                        propsForBackgroundLines: {
                                            display: "none"
                                        },
                                        style: {
                                            paddingVertical: 30,
                                            marginTop: 20
                                        },
                                    }}
                                    style={{
                                        paddingVertical: 20,
                                        backgroundColor: "#1A1A1A",
                                    }}
                                />
                                    : <View style={styles.chartPlaceholder}></View>}
                            </View>
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
                            {/*<View style={styles.listTitle}>
                                <Text style={styles.listTitle}>Today's consumables</Text>
                            </View>*/}
                        </ScrollView>
                    }
                    contentContainerStyle={styles.foodList}
                    style={styles.listItem}
                    data={consumedFoodList}
                    renderItem={FoodItemCard}
                    keyExtractor={(item, index) => index.toString()}
                >
                </FlatList>
        </SafeAreaView>
    );
}
