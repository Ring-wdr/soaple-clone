// import { useState } from "react"
import { useQuery } from "react-query"
import { fetchMarkets } from "../fetcher/market"

function MarketPage (){
    // const [markets, setMarkets] = useState([]);
    const {isLoading, isError, data, error} = useQuery('market', fetchMarkets,{
        refetchOnWindowFocus: false,
        retry: 0,
        onSuccess: data =>{
            console.log('장터글 잘 가져옴')
            // setMarkets(data)
        },
        onError: e =>{
            console.error(e)
        }

    })
    if (isLoading) return <span>Loading</span>
    if (isError) return <span>Error: {error.message}</span>

    return(
        <ul>
            {data.map( market =><li>{market.stageName}</li>)}
        </ul>
    )
}

export default MarketPage