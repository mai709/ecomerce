import { useFormik } from 'formik'
import React, { useContext } from 'react'
import { cartcontext } from '../Context/Context';

export default function CheckOut() {
    let {onlinePayment , cartId} = useContext(cartcontext)
    async function handleSubmit(values){
        let response = await onlinePayment(cartId, values)
        if(response.data.status === "success")
            window.location.href = response.data.session.url
        }
    let formik = useFormik({
        initialValues:{
            phone:'',
            details:'',
            city:''
        },
        onSubmit:handleSubmit
    })
    return <>
        <form className='w-50 m-auto py-4 my-4' onSubmit={formik.handleSubmit}>
            <label htmlFor="details" className="form-label text-capitalize">details :</label>
            <input type="text" className="form-control mb-3" id="details" placeholder="Please ENter Your details"
                value={formik.values.details}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
            ></input>

            <label htmlFor="phone" className="form-label text-capitalize">phone :</label>
            <input type="tel" className="form-control mb-3" id="phone" placeholder="ENter Your Phone Number"
                value={formik.values.phone}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
            ></input>

            <label htmlFor="city" className="form-label text-capitalize">city :</label>
            <input type="text" className="form-control mb-3" id="city" placeholder="Enter Your city"
                value={formik.values.city}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
            ></input>

            <button type='submit' className='btn border-main text-main text-capitalize text-center w-100'>pay</button>
        </form>
    </>
}
