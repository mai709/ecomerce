import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import Slider from "react-slick";
export default function ProductDetails() {
    const [productDetails, setProductDetails] = useState(null)
    let params = useParams();
    async function getDetails(id){
        let {data } = await axios.get(`https://ecommerce.routemisr.com/api/v1/products/${id}`)
        setProductDetails(data.data)
    }
    useEffect(()=>{
        getDetails(params.id)
    },[])
     var settings = {
            dots: true,
            infinite: true,
            speed: 500,
            slidesToShow: 1,
            slidesToScroll: 1
        };
    return <>
    
        <div className='row py-3 align-items-center'>
            <div className='col-md-4'>
                <Slider {...settings}>
                    {productDetails?.images.map((img , index)=><img key={index} src={img} />)}
                </Slider>
            </div>
            <div className='col-md-8'>
                <span className='text-main'>{productDetails?.category.name}</span>
                <h3>{productDetails?.title}</h3>
                <p>{productDetails?.description}</p>
                <div className='d-flex justify-content-between mb-3'>
                    <span className='text-muted'>{productDetails?.price} EGP</span>
                    <span>
                        <i className='fas fa-star rating-color'></i>
                    {productDetails?.ratingsAverage}
                    </span>
                </div>
                <button className='btn bg-main text-white w-100'>Add to cart</button>
            </div>
        </div>
    </>
}
