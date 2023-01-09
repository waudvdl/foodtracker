import { StyleSheet } from "react-native";

export default StyleSheet.create({
    foodpageContainer:{
        display: "flex",
        flexDirection:"column",
        alignItems:"center"
    },
    graph:{
        display: "flex",
        justifyContent:"center",
        alignItems: "center",
        width: "100%",
        height: 200,
        backgroundColor: "#A35"
    },
    scanBtn:{
        display: "flex",
        alignItems: "center",
        width: "90%",
        marginVertical: 30,
        marginHorizontal: 20,
        paddingVertical: 20,
        backgroundColor: "#1DC763",
        borderRadius: 50,
        elevation: 10
    },
    btnText:{
        fontSize: 16,
        textTransform: "uppercase",
        fontWeight:"bold",
        letterSpacing: 1.5,
        color: "#FEF"
    },
    statsContainer:{

    }
})
