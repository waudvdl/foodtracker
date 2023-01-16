import {Dimensions, PermissionsAndroid, Text, View} from "react-native";
import {useEffect, useState} from "react";
//import {Pedometer} from "expo-sensors";
import {BarCodeScanner} from "expo-barcode-scanner";
import styles from "../pedometerPage/styles.pedometer.component";
import {LineChart} from "react-native-chart-kit";
import * as Progress from 'react-native-progress';
import { Accelerometer } from 'expo-sensors';



export default function PedometerPage({navigation}){
    const [steps, setSteps] = useState(0);
    const [subscription, setSubscription] = useState(null);
    const [isAvailable, setAvailability] = useState(false);
    const threshold = 1.0;
    let listener = null;

    useEffect(() => {
        Accelerometer.isAvailableAsync()
            .then(result => {
                setAvailability(result);
                if (result) {
                    Accelerometer.setUpdateInterval(50);
                    listener = Accelerometer.addListener(accelerometerData => {
                        const { x, y, z } = accelerometerData;
                        const magnitude = Math.sqrt(x * x + y * y + z * z);
                        //console.log(magnitude)
                        if (magnitude > threshold) {
                            setSteps(steps + 1);
                        }
                    });
                }
            })
            .catch(error => console.log(error));

        return () => {
            if(listener) listener.remove();
        };
    }, []);

    useEffect(()=>{
        //console.log(steps)
    },[steps])

    return(
        <View style={styles.pageWrapper}>
            <View style={styles.graph}>
                    <LineChart
                        data={{
                            labels: ["1/10","1/11","1/12","1/13","1/14","1/15","1/16"],
                            datasets: [
                                {
                                    data: [3200,4000,2100,6000,3500,4400,1400]
                                }
                            ]
                        }}
                        width={Dimensions.get("window").width}
                        height={300}
                        verticalLabelRotation={30}
                        chartConfig={{
                            backgroundColorFrom: "#1A1A1A",
                            backgroundGradientFrom: "#1A1A1A",
                            backgroundGradientTo: "#1A1A1A",
                            backgroundGradientFromOpacity: 0,
                            backgroundGradientToOpacity: 0,
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
            </View>
            <View style={styles.progressBarWrapper}>
                <Text style={styles.progressbarText}>1454/6000 stappen</Text>
                <Progress.Bar style={styles.progressBar} borderRadius={25} borderWidth={3} color={"#1DC763"} progress={1454/6000} width={300} height={40}/>
                {/*<Text>{steps}</Text>*/}
            </View>
        </View>
    )
};
