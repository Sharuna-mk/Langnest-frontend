import React from 'react'
import banner from '../../assets/Banner.jpg'
import { Link } from 'react-router-dom'

function Banner() {
  return (
    <div>
      <div className="text-white bg-black">
      <h1  className='anim text-center lg:text-center text-3xl md:text-4xl font-bold
      pt-30'>Unlock Your Developer Potential </h1>
      <div className="flex items-center justify-center mt-10">
        <div class="input-group">
    <input type="email" class="emailinput" id="Email" name="Email" placeholder="email" autocomplete="off"/>
    <Link to='/register'>
    <input class="emailbutton" value="Subscribe" type="button"/>
    </Link>
</div>
       
      </div>
      <img src={banner} alt="Banner" className='mt-5' />
                     </div>
     
       
    </div>
  )
}

export default Banner
