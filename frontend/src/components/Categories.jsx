import React from 'react'
import {Smartphone, Shirt, Headphones,SmartphoneCharging, CandyCane, Cable, CircuitBoard, Speaker, Cctv, CookingPot } from 'lucide-react'

export default function Categories() {
  const categories = [
    {icon: <Smartphone/>, title: 'Mobiles'},
    {icon: <Shirt/>, title: 'Clothing'},
    {icon: <Headphones/>, title: 'Headphones'},
    {icon: <SmartphoneCharging/>, title: 'Power Banks'},
    {icon: <CandyCane/>, title: 'Christmas Decoration'},
    {icon: <Cable/>, title: 'Cables'},
    {icon: <CircuitBoard/>, title: 'Circuit Boards'},
    {icon: <Speaker/>, title: 'Speakers'},
    {icon: <Cctv/>, title: 'CCTV'},
    {icon: <CookingPot/>, title: 'Kitchen Appliances'},

  ]

  return (
    <div className='flex flex-col gap-4'>
      <h1 className='text-xl '>Categories</h1>
      <div className='grid grid-cols-[repeat(auto-fit,minmax(150px,1fr))] gap-3 cursor-pointer '>
        {categories.map((category, index) => (
          <div className='flex flex-col items-center w-full gap-2 p-2 duration-300 delay-150 hover:shadow-xl hover:scale-105 hover:-translate-y-1' key={index}>
              {category.icon}
              <p className='w-full text-sm text-center truncate'>{category.title} </p>
          </div>
        ))}
      </div>

    </div>
  )
}
