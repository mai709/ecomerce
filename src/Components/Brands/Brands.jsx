import React, { useEffect, useState } from 'react'
import styles from './Brands.module.css'
import { Link } from 'react-router-dom'
import axios from 'axios'

export default function Brands() {

    const [brands, setBrands] = useState([])
    async function brandsApi(){
        let {data} = await axios.get(`https://route-ecommerce.onrender.com/api/v1/brands`)
        setBrands(data.data)
    }
    useEffect(()=>{
        brandsApi()
    },[])


    return <>
        <div className='container'>
            <div className='row'>
                {brands.map((brand)=><div key={brand._id} className='col-md-2'>
                    <img className='w-100' src={brand.image} alt={brand.slug} />
                </div>)}
            </div>
        </div>
    </>
}
