import {PhilippinePeso} from 'lucide-react'
export default function FlashSale() {
  const products = [
    {
      id: 1,
      name: "Wireless Headphones",
      image: "https://jblstore.com.ph/cdn/shop/files/Tune720BT_Black_1.png?v=1748425615",
      price: 99.99,
      discount: 80,
      discountedPrice: (99.99 * 0.8).toFixed(2),
    },
    {
      id: 2,
      name: "Smart Watch",
      image: "https://m.media-amazon.com/images/I/613vdOoh4oL._AC_SL1500_.jpg",
      price: 149.99,
      discount: 85,
      discountedPrice: (149.99 * 0.85).toFixed(2),
    },
    {
      id: 3,
      name: "Gaming Mouse",
      image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSsNeXy0UpPgRENMVowqlzLUEwelTJmer--pw&s",
      price: 49.99,
      discount: 20,
      discountedPrice: (49.99 * 0.2).toFixed(2),
    },
    {
      id: 4,
      name: "Bluetooth Speaker",
      image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR9cYWSaBNIhOPF2gguIun1olGtIYrHAlOO7w&s",
      price: 79.99,
      discount: 10,
      discountedPrice: (79.99 * 0.1).toFixed(2),
    },
    {
      id: 5,
      name: "4K Monitor",
      image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQv6PhzL3jNZp_62adV-FUAU2_dCowFxP0vwg&s",
      price: 299.99,
      discount: 25,
      discountedPrice: (299.99 * 0.25).toFixed(2),
    },
    {
      id: 6,
      name: "Mechanical Keyboard",
      image: "https://m.media-amazon.com/images/I/71fRP7KY9hL._AC_SL1500_.jpg",
      price: 89.99,
      discount: 50,
      discountedPrice: (89.99 * 0.5).toFixed(2),
    },
    {
      id: 7,
      name: "USB-C Hub",
      image: "https://ecommerce.datablitz.com.ph/cdn/shop/files/6957303874118.jpg?v=1689152146",
      price: 39.99,
      discount: 3,
      discountedPrice: (39.99 * 0.3).toFixed(2),
    },
    {
      id: 8,
      name: "Portable SSD 1TB",
      image: "https://jgsuperstore.com/cdn/shop/products/sandisk-usb-3-2-ssd-front.png.wdthumb.1280.1280.jpg?v=1735788630&width=1445",
      price: 129.99,
      discount: 30,
      discountedPrice: (129.99 * 0.3).toFixed(2),
    }
  ];
  return (
    <div>
      <h1 className='text-xl '>Flash Sale</h1>
      {/* Header */}
      <div className='flex justify-between '>
        {/* Left Side */}
        <div className='p-2.5 flex items-center gap-5'>
          <p className='font-semibold text-primary'> On Sale Now</p>
          <div className='flex items-center'>
            <p>Ending in: {new Date().toLocaleString()} </p>
          </div>
        </div>
        
        {/* Right Side */}
        <div>
          <button className='btn btn-primary'> SHOP ALL PRODUCTS</button>
        </div>

      </div>
      {/* Sale Products */}
      <div className='grid  md:grid-cols-[repeat(auto-fit,minmax(200px,1fr))] gap-3 mt-5 max-w-6xl overflow-y-hidden max-h-[900px] md:max-h-[300px] hide-Scrollba overflow-x-hidden' >
        {products.map((product, index) => (
          <div className='flex flex-col p-2.5 transition  cursor-pointer ease-in-out delay-150 hover:-translate-y-1 hover:scale-105 hover:shadow-2xl duration-300 ' key={index}>
            <img src={product.image} alt={product.name} className='items-start object-contain object-top w-full h-50' />
            <p className='truncate'>{product.name} </p>
            <p className='flex items-center font-semibold text-primary '> <PhilippinePeso size={18}/>  {product.discountedPrice}</p>
            <div className='flex gap-3'>
              <p className='flex items-center text-gray-400 line-through '> <PhilippinePeso size={18}/> {product.price}</p>
              <p>-{product.discount}%</p>
            </div>
          </div>
        ))}
      </div>
      
    </div>  
  )
}
