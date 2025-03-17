import React from 'react';
import Navbar from './Navbar';
import Slider from './Slider';
import { Link } from "react-router-dom";


const Homepage = () => {
  return (
  <div className="bg-blue-200 h-[400vh]">
    <Navbar />
    <Slider />
    <div className='min-h-[20vh] max-h-[40vh] max-w-[95vw] mx-auto my-8 flex justify-center items-center text-black text-4xl flex-col gap-10'>
    Your Perfect Meal, Anytime, Anywhere! Reserve a Table or Get It Delivered Fresh!
    <div className='h-[50%] w-full flex justify-center items-center gap-10 '>
    <Link className='w-[15%]' to="/Reserve">
      <button className='w-full bg-red-500 p-2 rounded-4xl text-2xl text-white'>Reserve Table
        </button>
      </Link>
      <Link className='w-[15%]' to="/menu">
      <button className='w-full bg-red-500 p-2 rounded-4xl text-2xl text-white'>Explore menu
        </button>
      </Link>
    </div>
    </div>

    <div className="bg-[#877657] h-[45vh] text-white max-w-[95vw] mx-auto p-4">
      <h1 className='h-[10%] mx-auto w-fit text-4xl'>Our Delight Menu</h1>
      <div className='h-[90%] grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 w-[99%] mx-auto my-7'>
        <div className='bg-blue-500 h-[90%] text-white text-2xl p-4'>Category 1</div>
        <div className='bg-green-500 h-[90%] text-white text-2xl p-4'>Category 2</div>
        <div className='bg-red-500 h-[90%] text-white text-2xl p-4'>Category 3</div>
        <div className='bg-yellow-500 h-[90%] text-white text-2xl p-4'>Category 4</div>
        </div>
    </div>

    {/* <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 w-[95vw] mx-auto my-7">
        <div class="bg-blue-500 h-[40vh] text-white text-2xl p-4">Category 1</div>
        <div class="bg-green-500 h-[40vh] text-white text-2xl p-4">Category 2</div>
        <div class="bg-red-500 h-[40vh] text-white text-2xl p-4">Category 3</div>
        <div class="bg-yellow-500 h-[40vh] text-white text-2xl p-4">Category 4</div>
    </div> */}

  </div>
  );
}

export default Homepage;