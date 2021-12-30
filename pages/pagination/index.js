import React , {useState , useEffect} from 'react'
import Header from "../../components/header";
import PaginationList from "../../components/pagination/PaginationList";
export default function Patination(){

    return(
        <Header>
            <PaginationList title="페이징API" />
        </Header>
    )
}