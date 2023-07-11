import React, { useState } from 'react'
import { useFormik } from 'formik'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

export default function Login({saveUserData}) {
    let navigate = useNavigate();
    let [errorApi , setErrorApi] = useState('')
    const [loading, setloading] = useState(false)
    async function handleLogin(values){
        setloading(true)
        let {data} = await axios.post(`https://ecommerce.routemisr.com/api/v1/auth/signin` , values).catch((error)=>{
            setErrorApi(`${error.response.data.message}`)
            setloading(false)
        })
        
        if(data.message === 'success'){
            localStorage.setItem('userToken',data.token)
            saveUserData();
            setloading(false);
            navigate('/')
        }
    }
    function validation(values){
        let errors = {}
        if(!values.email){
            errors.email = 'Please Enter your Email';
        }
        else if(!/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(values.email) ){
            errors.email = 'Email is invalid';
        }
        if(!values.password){
            errors.password = 'Please Enter your Email';
        }
        else if(!/^[A-Z][a-z0-9]{5,10}$/.test(values.password)){
            errors.password = 'Email is invalid';
        }
        return errors;
    }
    let formik = useFormik({
        initialValues:{
            email:'',
            password:'',
        },
        validate : validation,
        onSubmit: handleLogin
        ,
        
    })
    return <>
        <div className='container my-4'>
            <h3 className='text-capitalize'>Login now</h3>
            {errorApi?<div className='alert alert-danger'>{errorApi}</div>:''}
            <form onSubmit={formik.handleSubmit}>
                
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

                {loading?<button  className='btn bg-main text-white text-' type='button'><i className='fas fa-spinner fa-spin'></i></button>:                
                <button disabled={! (formik.isValid && formik.dirty)} className='btn bg-main text-white text-capitalize' type='submit'>login</button>
}
            </form>
        </div>
    </>
}
