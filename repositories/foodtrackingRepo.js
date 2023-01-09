import {API_KEY, APP_ID} from '@env'

export default async function GetBarCodeInfo(barcode){
    let data;
    //barcode = "54491472" //later remove
    let url = "https://trackapi.nutritionix.com/v2/search/item?upc="+barcode
    const ApiKey = 'c5e67c8fea11222fadc8ef6a495cdb79' //remove later security issue
    const AppID = 'e7c767b8'
    console.log(url)
    //console.log(API_KEY)
    //console.log(APP_ID)
    let res = await fetch(url, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            //'x-app-key': ''+process.env.API_KEY+'',
            //'x-app-id': ''+process.env.APP_ID+'',
            'x-app-key': API_KEY,
            'x-app-id': APP_ID,
        }
    })
    .then(response => response.json())
    .then(json => {
        //data = json.foods[0];
        //console.log(json.foods[0].food_name+" "+json.foods[0].brand_name)
        data = json;
        return data;
        }
    )
    return data;
    //res = await res.json()
    //console.log(res);
    //return await res.json();
}

//GetBarCodeInfo("099482434182").then(r => console.log(r.body.foods[0].food_name))
