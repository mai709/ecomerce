import React, { useContext, useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { cartcontext } from '../Context/Context'
import { toast } from 'react-hot-toast';

export default function Cart() {
    let {getLoggedUserCart ,deleteItem ,updateProduct ,deleteAllProuducts} = useContext(cartcontext);
    const [cartDetails, setCartDetails] = useState(null)
    async function getLogged(){
        let response = await getLoggedUserCart()
        if(response.status == 200){
            setCartDetails(response.data.data)
        }
    }
    async function removeItem(id){
        let res = await deleteItem(id)
        setCartDetails(res.data.data)
        const myPromise = deleteItem();
        toast.promise(myPromise, {
        loading: 'Loading',
        success: res.statusText,
        error: 'Error ,Please Try again',
        });
    }
    async function updateProductQuantity(id ,count){
        let res = await updateProduct(id , count)
        setCartDetails(res.data.data)
        console.log(res)
        const myPromise = updateProduct();
        toast.promise(myPromise, {
        loading: 'Loading',
        success: 'done successfully',
        error: 'Error ,Please Try again',
        });
    }
    async function deleteAll(){
        let res = await deleteAllProuducts()
        setCartDetails(res.data.data)
        const myPromise = deleteAllProuducts();
        console.log(res.data.data)
        toast.promise(myPromise, {
        loading: 'Loading',
        success: 'done successfully',
        error: 'Error ,Please Try again',
        });
    }
    useEffect(()=>{
        getLogged()
    },[])
    return <>
    {
        cartDetails?<>
            <div className='bg-main-light p-3 my-4'>
                <h3 className='text-capitalize'>Shop cart</h3>
                <h6 className='text-main'>total cart price : {cartDetails.totalCartPrice} EGP</h6>
                {cartDetails.products.map((product ,index)=><div key={index} className='row align-items-center py-2 border-bottom'>
                    <div className='col-md-1'>
                        <img className='w-100' src={product.product.imageCover} alt="img" />
                    </div>
                    <div className='col-md-11 d-flex justify-content-between'>
                        <div>
                            <h6>{product.product.title}</h6>
                            <h6 className='text-main'>Price : {product.price} EGP</h6>
                            <button onClick={()=> removeItem(product.product._id)} className='btn p-0 m-0'><i className='text-danger fa-trash-can fa-regular'></i> Remove</button>
                        </div>
                        <div>
                            <div className="btn-group" role="group" aria-label="Basic example">
                                <button onClick={()=>updateProductQuantity(product.product._id , product.count+1)} type="button" className="btn btn-outline-success">+</button>
                                <span type="button" className="btn">{product.count}</span>
                                <button onClick={()=>updateProductQuantity(product.product._id , product.count-1)} type="button" className="btn btn-outline-danger">-</button>
                                {/* <p>{product.product._id}</p> */}
                            </div>
                        </div>
                    </div>
                </div>)}
                <div className='d-flex justify-content-end'>
                    <button onClick={deleteAll} className='btn btn-outline-danger text-capitalize mt-3 me-3'>clear all</button>
                    <Link className='btn bg-main text-white text-capitalize mt-3' to={'/checkout'}>checkout</Link>
                </div>
            </div>
        </>:<div><i className='fa-spin fa-spinner'></i></div>
    }
    </>
}
