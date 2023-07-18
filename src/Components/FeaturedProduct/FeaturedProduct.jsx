import React, { useContext, useEffect, useState } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'
import { cartcontext } from '../Context/Context'
import toast from 'react-hot-toast';

export default function FeaturedProduct() {
    let {addToCart ,setnumOfCartItems} = useContext(cartcontext)
    const [products, setProducts] = useState([])
    async function productsApi(){
        let {data} = await axios.get(`https://ecommerce.routemisr.com/api/v1/products`)
        setProducts(data.data)
    }
    async function addProudctToCart(id){
        let res = await addToCart(id)
        const myPromise = addToCart();

        toast.promise(myPromise, {
        loading: 'Loading',
        success: res.data.message,
        error: 'Error ,Please Try again',
    });
    setnumOfCartItems(res.data.numOfCartItems);
        // if(res.data.status === 'success'){
        //     toast.success(res.data.message , {duration: 2000})
        // }
        // else{
        //     toast.error(`Error Please Try again` , {duration : 2000})
        // }
    }
    useEffect(()=>{
        productsApi()
    },[])
    return <>
        <div className='row py-5'>
            {products.map((product)=>
                <div key={product._id} className='col-md-2'>
                    <div className='product px-2 py-3 cursor-pointer'>
                        <Link className='text-decoration-none' to={`productDetails/${product.id}`}>
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
                        </Link>
                        <button onClick={()=>addProudctToCart(product._id)} className='btn bg-main text-white w-100 mt-3'>Add to cart</button>
                    </div>
                </div>
            )}
        </div>
    </>
}
