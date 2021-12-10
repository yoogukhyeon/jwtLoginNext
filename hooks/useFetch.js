import axios from "axios"
import useSWR from "swr"


export const fetcher = function(url){
    return axios.get(url).then( res => res.data)
}

export default function useFetch(url){
    return useSWR(url , fetcher)
}