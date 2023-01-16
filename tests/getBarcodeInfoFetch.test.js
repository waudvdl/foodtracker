import fetchBarcodeInfo from "../repositories/FetchBarcodeInfo";


global.fetch = jest.fn(() =>
    Promise.resolve({
        status : 200,
        //json: () => Promise.resolve({users: [{name: 'Bob'}]})
        json: () => Promise.resolve({count:1, products:[{nutriments:{}}]})
    })
);

it("fetchInfo", async  ()=>{
    const data = await fetchBarcodeInfo(88890009);
    expect(data).toEqual({count:1, products:[{nutriments:{}}]})
    expect(fetch).toHaveBeenCalledTimes(1);
})

it("fetchInfoFail" , async ()=>{
    fetch.mockImplementationOnce(() => Promise.resolve({
        status : 500,
        json : () => Promise.resolve({message : "API failure"})
    }))
    const data = await fetchBarcodeInfo();
    expect(data).toEqual(null)
    expect(fetch).toHaveBeenCalledTimes(1);
})
