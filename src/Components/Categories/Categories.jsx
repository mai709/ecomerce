import axios from 'axios';
import React, { useEffect, useState } from 'react'
import Slider from "react-slick";

export default function Categories() {
    const [Categories, setCategories] = useState([])
    async function productsApi(){
        let {data} = await axios.get(`https://ecommerce.routemisr.com/api/v1/categories`)
        setCategories(data.data)
    }
    useEffect(()=>{
        productsApi()
    },[])
    var settings = {
            dots: true,
            infinite: true,
            speed: 500,
            slidesToShow: 7,
            slidesToScroll: 2
        };
    return <>
    <Slider {...settings}>
        {Categories.map((Category)=><div key={Category._id} className='mx-3'>
            <img className='w-100' height={200} src={Category.image} />
            <h3 className='h6 text-center'>{Category.name}</h3>
        </div>)}
        </Slider>
    </>
}
