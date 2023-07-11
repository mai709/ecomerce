import React, { useState } from 'react'
import { useFormik } from 'formik'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

export default function Register() {
    let navigate = useNavigate();
    let [errorApi , setErrorApi] = useState('')
    const [loading, setloading] = useState(false)
    async function handleRegister(values){
        setloading(true)
        let {data} = await axios.post(`https://ecommerce.routemisr.com/api/v1/auth/signup` , values).catch((error)=>{
            setErrorApi(`${error.response.data.message}`)
            setloading(false)
        })
        
        if(data.message === 'success'){
            setloading(false);
            navigate('/login')
        }
    }
    function validation(values){
        let errors = {}
        if(!values.name){
            errors.name = 'Please Enter your name';
        }
        else if(values.name.length <3 ){
            errors.name = 'min name 3 latters';
        }
        if(!values.email){
            errors.email = 'Please Enter your Email';
        }
        else if(!/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(values.email) ){
            errors.email = 'Email is invalid';
        }
        if(!values.password){
            errors.password = 'Please Enter your Email';
        }
        else if(!/^[A-Z][a-z0-9]{5,10}$/.test(values.password) ){
            errors.password = 'Email is invalid';
        }
        if(!values.rePassword){
            errors.rePassword = 'Please Enter your rePassword';
        }
        else if(values.rePassword !== values.password){
            errors.rePassword = 'Password and rePassword does not match';
        }
        if(!/^01[0125][0-9]{8}/.test(values.phone)){
            errors.phone = 'Please Enter your rePassword';
        }
        else if(!values.phone){
            errors.phone = 'Please Enter your Phone';
        }
        return errors;
    }
    let formik = useFormik({
        initialValues:{
            name:'',
            email:'',
            password:'',
            rePassword:'',
            phone:''
        },
        validate : validation,
        onSubmit: handleRegister
        ,
        
    })
    return <>
        <div className='container my-4'>
            <h3 className='text-capitalize'>register now</h3>
            {errorApi?<div className='alert alert-danger'>{errorApi}</div>:''}
            <form onSubmit={formik.handleSubmit}>
                <label htmlFor="name" className="form-label">name :</label>
                <input type="text" className="form-control mb-3" id="name" name='name' placeholder="Enter Your Name"
                value={formik.values.name} onChange={formik.handleChange} onBlur={formik.handleBlur}></input>
                {formik.errors.name && formik.touched.name ? <div className='alert alert-danger'>
                    {formik.errors.name}
                </div>:""}
                
                
                <label htmlFor="email" className="form-label">email :</label>
                <input type="email" className="form-control mb-3" id="email" name='email' placeholder="Enter Your email" 
                value={formik.values.email} onChange={formik.handleChange} onBlur={formik.handleBlur}></input>
                {formik.errors.email && formik.touched.email ? <div className='alert alert-danger'>
                    {formik.errors.email}
                </div>:""}

                <label htmlFor="password" className="form-label">password :</label>
                <input type="password" className="form-control mb-3" id="password" name='password' 
                placeholder="Enter Your password" value={formik.values.password} onChange={formik.handleChange} onBlur={formik.handleBlur}></input>
                {formik.errors.password && formik.touched.password ? <div className='alert alert-danger'>
                    {formik.errors.password}
                </div>:""}

                <label htmlFor="rePassword" className="form-label">Repassword :</label>
                <input type="password" className="form-control mb-3" id="rePassword" name='rePassword' 
                placeholder="EPlease Confirm Password" value={formik.values.rePassword} onChange={formik.handleChange} onBlur={formik.handleBlur}></input>
                {formik.errors.rePassword && formik.touched.rePassword ? <div className='alert alert-danger'>
                    {formik.errors.rePassword}
                </div>:""}

                <label htmlFor="phone" className="form-label">phone :</label>
                <input type="tel" className="form-control mb-3" id="phone" name='phone' placeholder="Enter Your phone Number" 
                value={formik.values.phone} onChange={formik.handleChange} onBlur={formik.handleBlur}></input>
                {formik.errors.phone && formik.touched.phone ? <div className='alert alert-danger'>
                    {formik.errors.phone}
                </div>:""}
                {loading?<button  className='btn bg-main text-white text-' type='button'><i className='fas fa-spinner fa-spin'></i></button>:                
                <button disabled={! (formik.isValid && formik.dirty)} className='btn bg-main text-white text-capitalize' type='submit'>register</button>
}
            </form>
        </div>
    </>
}
