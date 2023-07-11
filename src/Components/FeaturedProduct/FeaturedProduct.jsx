import React, { useContext, useEffect, useState } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'
import { cartcontext } from '../Context/Context'

export default function FeaturedProduct() {
    let {changeCounter} = useContext(cartcontext)
    const [products, setProducts] = useState([])
    async function productsApi(){
        let {data} = await axios.get(`https://ecommerce.routemisr.com/api/v1/products`)
        setProducts(data.data)
    }
    useEffect(()=>{
        productsApi()
    },[])
    return <>
        <div className='row py-5'>
            <button onClick={changeCounter} className='btn btn-info'>+</button>
            {products.map((product)=>
                <div key={product._id} className='col-md-2'>
                    <Link className='text-decoration-none' to={`productDetails/${product.id}`}>
                        <div className='product px-2 py-3 cursor-pointer'>
                            <img className='w-100' src={product.imageCover} alt="" />
                            <span className='text-main fw-bold font-sm'>{product.category.name}</span>
                            <h3 className='h6 fw-bolder text-black'>{product.title.split(' ').slice(0,2).join(' ')}</h3>
                            <div className='d-flex justify-content-between'>
                                <span className='text-muted'>{product.price} EGP</span>
                                <span>
                                    <i className='fas fa-star rating-color'></i>
                                {product.ratingsAverage}
                                </span>
                            </div>
                            <button className='btn bg-main text-white w-100 mt-3'>Add to cart</button>
                        </div>
                    </Link>
                    </div>
            )}
        </div>
    </>
}
