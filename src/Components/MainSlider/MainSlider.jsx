import React from 'react'
import Slider from "react-slick";

import img2 from '../../images/slider-image-2.jpeg'
import img1 from '../../images/slider-image-1.jpeg'

export default function MainSlider() {
    var settings = {
            dots: true,
            infinite: true,
            speed: 500,
            slidesToShow: 1,
            slidesToScroll: 1
        };
    return <>
        <div className='row my-3 mainSlid'>
            <div className='col-md-8 p-0'>
                <Slider {...settings}>
                    <img className='w-100' src={img1} alt="img1" />
                    <img className='w-100' src={img2} alt="img1" />
                    <img className='w-100' src={img2} alt="img1" />
                </Slider>
            </div>
            <div className='col-md-4 p-0'>
                <img className='w-100' src={img1} alt="img1" />
                <img className='w-100' src={img2} alt="img2" />
            </div>
        </div>
    </>
}
