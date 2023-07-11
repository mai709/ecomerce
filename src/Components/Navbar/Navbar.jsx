import React, { useContext } from 'react'
import { Link } from 'react-router-dom'
import logo from '../../images/freshcart-logo.svg'
import { cartcontext } from '../Context/Context'

export default function Navbar({userData ,Logout}) {
    let {counter} = useContext(cartcontext)
    return <>
        <nav className="navbar navbar-expand-sm navbar-light bg-light position-sticky top-0">
            <div className="container">
                <Link className="navbar-brand" to={'/'}>
                    <img src={logo} alt="logo" />
                </Link>
                <button className="navbar-toggler d-lg-none" type="button" data-bs-toggle="collapse" data-bs-target="#collapsibleNavId" aria-controls="collapsibleNavId"
                    aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="collapsibleNavId">
                    {userData?<ul className="navbar-nav me-auto mt-2 mt-lg-0">
                        <li className="nav-item">
                            <Link className="nav-link active" to='/' aria-current="page">Home {counter}<span className="visually-hidden">(current)</span></Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" to={`/cart`}>Cart</Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" to='/products'>Products</Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" to='/categories'>Catagories</Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" to='/brands'>Brands</Link>
                        </li>
                    </ul>:null}
                    
                    <ul className="navbar-nav ms-auto mt-2 mt-lg-0">
                        <li className="nav-item">
                            <a className="nav-link text-capitalize" href="#">
                                <i className='fab mx-2 fa-facebook'></i>
                                <i className='fab mx-2 fa-twitter'></i>
                                <i className='fab mx-2 fa-instagram'></i>
                                <i className='fab mx-2 fa-tiktok'></i>
                                <i className='fab mx-2 fa-linkedin'></i>
                                <i className='fab mx-2 fa-youtube'></i>
                            </a>
                        </li>
                        {!userData?
                        <>
                            <li className="nav-item">
                            <Link className="nav-link text-capitalize" to='/login'>login</Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link text-capitalize" to='/register'>signup</Link>
                        </li>
                        </>:<li className="nav-item">
                            <span onClick={Logout} className="nav-link text-capitalize ">logout</span>
                        </li>}
                        
                    </ul>
                </div>
            </div>
        </nav>
    </>
}
