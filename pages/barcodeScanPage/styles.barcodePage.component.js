import { StyleSheet } from "react-native";

export default StyleSheet.create({

    barcodeScannerContainer:{
        display:"flex",
        alignItems: "center",
        width : '100%',
        height: '100%',
        //backgroundColor: '#A0A'
    },
    absoluteFillObject:{
        width: '80%',
        height: '80%',


    },
    scanAgainBtn:{
        marginTop: 15,
        fontSize: 16,
        fontWeight: "600",
        borderRadius: 50,
        borderStyle: "solid",
        borderWidth: 1,
        paddingHorizontal: 15,
        paddingVertical: 10
    }
})
