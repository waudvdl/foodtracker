
export default async function fetchBarcodeInfo(barcode){
    let data;
    let url = "https://world.openfoodfacts.org/api/v2/search?code="+barcode
    console.log(url)
    let res = await fetch(url, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        }
    })
    .then(response => response.json())
    .then(json => {
            //data = json.foods[0];
            //console.log(json)
            data = json;
            return data;
        }
    )
    return data;
}
