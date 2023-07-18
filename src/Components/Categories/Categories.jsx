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
            slidesToScroll: 2,
            responsive: [
            {
            breakpoint: 1024,
            settings: {
                slidesToShow: 3,
                slidesToScroll: 3,
                infinite: true,
                dots: true
            }
            },
            {
            breakpoint: 600,
            settings: {
                slidesToShow: 5,
                slidesToScroll: 2,
                initialSlide: 2
            }
            },
            {
            breakpoint: 480,
            settings: {
                slidesToShow: 3,
                slidesToScroll: 1
            }
            }
        ]
    };;
    return <>
    <Slider {...settings}>
        {Categories.map((Category)=><div key={Category._id} className='mx-3'>
            <img className='w-100' height={200} src={Category.image} />
            <h3 className='h6 text-center'>{Category.name}</h3>
        </div>)}
        </Slider>
    </>
}
