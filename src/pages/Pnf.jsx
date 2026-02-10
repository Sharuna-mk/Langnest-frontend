import React from "react";
import { Link } from "react-router-dom";

function Pnf() {
  return (
   <div className="flex flex-col justify-center items-center min-h-screen">
    <img width={'300px'} src="https://cdn.dribbble.com/users/2382015/screenshots/6065978/no_result.gif" alt="" />
   <h1 className="text-xl font-bold mt-2"> Page Not Found</h1>
    <h5 className="text-lg font-semibold mt-3">Sorry,we couldn't find the page.</h5>
    <Link to='/'>
       <button className="bg-blue-600 text-white px-5 p-3 rounded-lg text-md font-semibold mt-5">Back to Home</button>
    </Link>
 
   </div>
  );
}

export default Pnf;
