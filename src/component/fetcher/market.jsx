import axios from "axios"

export const fetchMarkets = async () =>{
    const {data} = await axios.get('http://localhost:8080/api/market')
    return data;
}