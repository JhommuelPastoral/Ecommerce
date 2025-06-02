import { ShoppingBag, Search,Smartphone, Store, Ticket} from 'lucide-react';
import { useQueryClient, useMutation } from '@tanstack/react-query';
import { useState, useEffect, useRef } from 'react';
import FlashSale from '../components/FlashSale';
import Categories from '../components/Categories';
import JustForYou from '../components/JustForYou';
import { logout } from '../lib/api.js';
export default function Dashboard() {

  const [carousel, setCarousel] = useState(0);
  const [ishovered, setIsHovered] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const intervalRef = useRef(null);
  const queryClient = useQueryClient();

  const images = [
    '1.avif',
    '2.avif',
    '3.avif',
    '4.avif',
    '5.avif',
    '6.avif',
  ]

  const modCard = [
    {icon: <Smartphone/>, title: 'Topup', description: 'Top up & pay bills'},
    {icon: <Store/>, title: 'Mall', description: 'Shop best brands'},
    {icon: <Ticket/>, title: 'Vouchers', description: 'Collect vouchers and redeem!'},
  ]

  const{mutate: logOutMutatation} = useMutation({
    mutationFn: logout,
    onSuccess: () => {
      queryClient.invalidateQueries(['authUser']);
      toast.success('Logout successful');
    },
    onError: (error) => {
      toast.error(error.response.data.message);
    }
  });


  useEffect(()=>{
    if(!isPaused){
      intervalRef.current = setInterval(() => {
        setCarousel((prev) =>(prev === 5 ? 0 : prev + 1));
      }, 5000);
      
    }
    return () => clearInterval(intervalRef.current);

  },[isPaused])

  return (
    <>
      <header className="fixed top-0 left-0 right-0 z-50 bg-white h-15 font-Poppins">
        <div className="flex items-center justify-between max-w-6xl gap-4 mx-auto h-15 ">
          {/* Left side */}
          <div className="">
            <img src="logo.png" className="w-24 h-auto" alt='logo'/>
          </div>
          {/* Search */}
          <div className="flex items-center gap-2.5 max-w-3xl  w-full ">
            <label className="w-full input">
              <svg className="h-[1em] opacity-50" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                <g
                  strokeLinejoin="round"
                  strokeLinecap="round"
                  strokeWidth="2.5"
                  fill="none"
                  stroke="currentColor"
                >
                  <circle cx="11" cy="11" r="8"></circle>
                  <path d="m21 21-4.3-4.3"></path>
                </g>
              </svg>
              <input type="search" className="grow" placeholder="Search" />
            </label>
            <button className="btn btn-primary" arial-label="Search" > <Search size={18}/> </button>
          </div>
          <div className='flex items-center gap-3'>
            <ShoppingBag className="w-6 h-6" />
            <div className="dropdown dropdown-bottom dropdown-end">
              <div tabIndex={0} role="button" className="w-10 h-10 m-1 rounded-full btn">JP</div>
              <ul tabIndex={0} className="p-2 shadow-sm dropdown-content menu bg-base-100 rounded-box z-1 w-52">
                <li> <a href='/profile'> Profile </a></li>
                <li> <button onClick={() => logOutMutatation()}>Logout</button> </li>
              </ul>
            </div>
          </div>
        </div>
      </header>
      <main className='pb-10 space-y-5 pt-15 bg-base-300 font-Poppins'>
        {/* Carousel */}
        <div className='max-w-6xl mx-auto bg-base-100'>
          <div className="relative w-full"  onMouseEnter={() => {setIsHovered(true); setIsPaused(true);}} onMouseLeave={() => {setIsHovered(false); setIsPaused(false);}}>
            <img src={images[carousel]} alt="" />

            {/*Left Arrow Button */}
            <div className={`absolute z-10 -translate-y-1/2 top-1/2 left-2 ${ishovered ? 'block' : 'hidden'}`}>
              <button className='btn btn-circle btn-primary' onClick={() => setCarousel((prev) => (prev === 0 ? images.length - 1 : prev - 1))}>❮</button>
            </div>
            {/* Right Arrow Button */}
            <div className={`absolute z-10 -translate-y-1/2 top-1/2 right-2 ${ishovered ? 'block' : 'hidden'}`}>
              <button className='btn btn-circle btn-primary' onClick={() => setCarousel((prev) => (prev === 5 ? 0 : prev + 1))}> ❯ </button>
            </div>
            {/* Radio Buttons */}
            <div className='absolute bottom-2 translate-x-1/2 right-1/2 space-x-2.5'>
              {images.map((_, index) => (
                <input 
                  key={index}
                  type="radio" 
                  name="radio-2" 
                  className="radio radio-xs" 
                  aria-label={`Slide ${index + 1}`}
                  onChange={() => setCarousel(index)}
                  checked={index === carousel}
                />
              ))}

            </div>

          </div>
        </div>
        {/* Mod Card */}
        <div className='max-w-6xl p-4 mx-auto bg-base-100 rounded-2xl'>
          <div className='flex items-center w-full '>
            {modCard.map((card, index) => (
              <div className='flex flex-col flex-1 px-2.5' key={index}>
                <div className={`flex gap-2.5 items-center ${index !== modCard.length - 1 ? 'border-r-2 border-base-300 ' :''}`}>
                  <div className={`bg-base-200 p-2.5 rounded-full `}>{card.icon}</div>
                  <p className='font-bold'>{card.title}</p>
                </div>
                <p className='text-sm font-light '>{card.description}</p>
              </div>
            ))}

          </div> 

        </div>
        
        {/* Flash Sale */}
        <div className='max-w-6xl p-4 mx-auto bg-base-100 rounded-2xl'>
          <FlashSale />
        </div>
        {/* Categories */}
        <div className='max-w-6xl p-4 mx-auto bg-base-100 rounded-2xl'>
          <Categories />
        </div>
        {/* Just For You */}
        <div className='max-w-6xl p-4 mx-auto bg-base-100 rounded-2xl'>
          <JustForYou />
        </div>
      </main>
    
    
    </>
  )
}
