import React from 'react'
import styles from './Footer.module.css'

export default function Footer() {
    return <>
        <footer className='bg-light mb-0 p-2 '>
            <div className='container'>
                <div>
                    <h1 className='text-capitalize'>get the freshCart app</h1>
                    <p className='text-muted'>we will send you a link open it on your phone to download the app</p>
                </div>
                <div className='ms-3 mb-3'>
                    <input className='w-75 form-control d-inline-block' type="text" placeholder='Email'/>
                    <button className='text-capitalize btn bg-main text-white ms-3'>share app link</button>
                </div>
            </div>
        </footer>
    </>
}
