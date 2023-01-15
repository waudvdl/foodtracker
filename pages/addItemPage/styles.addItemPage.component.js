import { StyleSheet } from "react-native";

export default StyleSheet.create({

    infoText:{
        fontSize: 15,
        fontWeight: "bold",
        textTransform: "uppercase",
        color: "#343a40"
    },
    foodName:{
        fontSize: 16,
        color: "#343a40"
    },
    contWrapper:{
        alignItems: "center",
        justifyContent: "center",
    },
    infoContainer:{
        display: "flex",
        justifyContent: "center",
        width: "90%",
        alignItems: "center",
        marginTop: 40,
        alignSelf: "center",
        borderWidth: 1,
        borderStyle: "solid",
        borderColor: "#D3D3D3",
        borderRadius: 30,
        paddingVertical: 20,
        elevation: 5
    },
    qntyCont:{
        display: "flex",
        flexDirection: "row"
    },
    row:{
        display: "flex",
        width: "80%",
        justifyContent: "space-between",
        flexDirection: "row",
        marginVertical: 20,
    },
    sumRow:{
        display: "flex",
        width: "100%",
        flexDirection: "row",
        justifyContent: "space-between",
        marginBottom: 8
    },
    col:{
        marginTop: 10,
        display: "flex",
        width: "80%",
        justifyContent: "center",
    },
    inputField: {
        fontSize: 16,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        textAlign: "center",
        //borderColor: "#111",
        borderBottomWidth: 1,
        borderColor: "#747474",
        position: "relative",
        top: -2,
        color: "#343a40"
    },
    btn:{
        display: "flex",
        width: "100%",
        paddingVertical: 20,
        //borderWidth: 2,
        textAlign: "center",
        marginVertical: 10,
        elevation: 10,
        borderRadius: 50,
    },
    summary:{
        marginTop: 50,
        fontSize: 16,
        color: "#333533",
        opacity: 0.3,
        fontWeight: "bold",
        textTransform : "uppercase",
        paddingBottom: 5,
        borderBottomColor: "#333533",
        borderBottomWidth: 2,
        marginBottom: 20,
    },
    addBtn:{
        backgroundColor: "#1DC763",
    },
    goBackBtn:{
        backgroundColor: "#A35",
    },
    btnText:{
        textAlign: "center",
        color: "#FEF",
        fontWeight: "bold",
        textTransform: "uppercase",
        letterSpacing: 0.5
    }
})

