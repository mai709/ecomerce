import React from 'react'
import FeaturedProduct from '../FeaturedProduct/FeaturedProduct'
import Categories from '../Categories/Categories'
import MainSlider from '../MainSlider/MainSlider'

export default function Home() {
    return <>
        <MainSlider />
        <Categories/>
        <FeaturedProduct />
    </>
}
