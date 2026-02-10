import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { viewPostAPI } from "../../services/allAPI";
import userlogo from '../../assets/user.webp';
import { IoIosMore } from "react-icons/io";
import Zoom from "react-medium-image-zoom";
import "react-medium-image-zoom/dist/styles.css";
function SinglePost() {
  const { id } = useParams();
  const [postData, setPostData] = useState(null);
  const [menuDrop, setMenuDrop] = useState({})

  useEffect(() => {
    const viewPost = async () => {
      try {
        const res = await viewPostAPI(id);
        console.log(res);
        
        setPostData(res.data);
      } catch (err) {
        console.log(err);
      }
    };

    viewPost();
  }, [id]);

    // const timeAgo = formatDistanceToNow(
    //      new Date(postData.createdAt),
    //      { addSuffix: true })

  if (!postData) return <p className="text-white">Loading...</p>;

  return (
   
   <div className="flex items-center justify-center bg-white min-h-screen">

   
            <div className="feature w-200 !bg-gray-200 ">
             <div className="flex justify-between px-10 mt-10">
             <div className="flex gap-5 items-center">
              <img src={postData.userid.profile ? postData.userid.profile : userlogo } alt=""  className='w-10 h-10 rounded-full'/> 
         <div className="flex-col">
             <h3 className='text-black font-bold text-xl'>{postData.userid.username}</h3>
            {/*<p className='text-xs'>{timeAgo}</p>*/}
         </div>
              
            </div>
            {/* menu buttin */}
            <div>
              
            <IoIosMore onClick={() =>{ handlemenuDrop(postData._id)}} className='relative' />
        {
           menuDrop === postData._id && (
              
             <div>
             <item
                transition
             className="absolute right-0 z-10 mt-5 w-56 origin-top-right rounded-md bg-gray-800 outline-1 -outline-offset-1 outline-white/10 transition data-closed:scale-95 data-closed:transform data-closed:opacity-0 data-enter:duration-100 data-enter:ease-out data-leave:duration-75 data-leave:ease-in"
             >
        <div className="py-1">
           
         
          
            <form action="#" method="POST">
            <item>
            <button
            type="button"
            className="block w-full px-4 py-2 text-left text-sm text-gray-300 data-focus:bg-white/5 data-focus:text-white data-focus:outline-hidden"
            onClick={()=>{setMenuDrop(!menuDrop)}} >
             Cancel
            </button>
            </item>
            </form>
            </div>
            </item>
            </div>
             )
              
            }
            </div>
              
            </div>
     <div className="mt-5 px-10">
      <p className='font-semibold text-xl'><span>Title : {postData.title}</span></p>
      <p className='mt-5 font-md text-md'>{postData.text} </p></div>
        <div className="mt-5 px-5">
        <div className="flex gap-5 mt-5 px-5">
                    {
                      postData.imageUrl.map((url, index) => (
                        <Zoom>
                          <img key={index} src={url} alt="" className='w-50 ' />
                        </Zoom>
                      ))
                    }
                  </div>
        </div>
    {/*<div className="border border-gray-800 shadow mt-10 flex items-center justify-between  px-40 pt-3 pb-3">
      <div className="flex gap-1 cursor-pointer">
                       <button onClick={() => handleLike(postData._id)} >
     
                         <AiFillLike className={`transition-none text-2xl cursor-pointer ${likedPosts[item._id] ? 'text-blue-500' : 'text-gray-100'
                           }`} />
                       </button>
                       <span>Like</span>
                     </div>
      <div className="flex gap-1">
    
                      <BiCommentDetail className='text-2xl' />
                      Comment
                    </div>
                    <div className="flex gap-1" onClick={() => handleShare(item._id)}>
                      <FaRegShareSquare className='text-2xl' />
                      <p>Share</p>
    
                    </div>
              
          </div>*/}
    </div>
            </div>
           

    //<div className="max-w-3xl mx-auto mt-10 text-black">
    //  <div className="flex gap-4 items-center">
    //    <img
    //      src={postData.userid.profile}
    //      className="w-10 h-10 rounded-full"
    //    />
    //    <h3 className="font-semibold text-xl">
    //      {postData.userid.username}
    //    </h3>
    //  </div>

    //  <h2 className="mt-5 text-2xl font-bold">
    //    {postData.title}
    //  </h2>

    //  <p className="mt-4">{postData.text}</p>

    //  <div className="flex gap-4 mt-5">
    //    {postData.imageUrl.map((img, i) => (
    //      <img key={i} src={img} className="w-56 rounded-lg" />
    //    ))}
    //  </div>

    //</div>
  );
}

export default SinglePost;
