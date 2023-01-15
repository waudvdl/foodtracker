import {StyleSheet} from "react-native";

export default StyleSheet.create({
    foodCard:{
        display: "flex",
        flexDirection: "column",
        alignSelf: "center",
        width: "75%",
        //backgroundColor: "#3AA",
        paddingHorizontal: 20,
        paddingVertical: 20,
        borderStyle: "solid",
        borderWidth: 2,
        borderColor: "#D3D3D3",
        borderRadius: 15,
        marginBottom: 15,

    },
    row:{
        display: "flex",
        width: "100%",
        flexDirection: "row",
        justifyContent:"space-between",
        fontSize: 12,
        textTransform: "uppercase"
    },
    foodName:{
        fontSize: 16,
        fontWeight: "bold",
        textTransform: "uppercase",
        letterSpacing: 0.5,
        marginBottom: 6
    },
    time:{
        fontSize: 14,
        opacity: 0.2
    }
});
