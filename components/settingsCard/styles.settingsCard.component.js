import { StyleSheet } from "react-native";

export default StyleSheet.create({
    card:{
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
        width: "80%",
        paddingVertical: 20,
        paddingHorizontal: 10,
        //borderBottomWidth: 1
    },
    title:{
        fontSize: 16,
    },
    inputField: {
        display: "flex",
        //borderBottomWidth : 1,
        borderColor: "#D3D3D3",
        borderBottomWidth: 2,
        width: 40,
        textAlign:"right",
        paddingRight: 5
    },

    dropdown: {
        height: 50,
        borderColor: 'gray',
        borderWidth: 0.5,
        borderRadius: 8,
        paddingHorizontal: 8,
    },

    label: {
        //position: 'absolute',
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: 'white',
        //left: 22,
        //top: 8,
        zIndex: 999,
        //paddingHorizontal: 8,
        fontSize: 14,
    },
    placeholderStyle: {
        fontSize: 16,
    },
    selectedTextStyle: {
        fontSize: 16,
    },
    inputSearchStyle: {
        height: 40,
        fontSize: 16,
    },
})
