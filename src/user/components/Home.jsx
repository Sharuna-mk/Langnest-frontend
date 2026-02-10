import React, { useContext, useRef, useState } from 'react'
import { IoIosMore } from "react-icons/io";
import { AiFillLike } from "react-icons/ai";
import { BiCommentDetail } from "react-icons/bi";
import { FaRegShareSquare } from "react-icons/fa";
import { useEffect } from 'react';
import { getFeedAPI, likePostAPI, reportPostAPI, unLikePostAPI } from '../../services/allAPI';
import Search from './Search';
import Zoom from "react-medium-image-zoom";
import "react-medium-image-zoom/dist/styles.css";
import { Button, Modal, ModalBody, ModalFooter, ModalHeader } from "flowbite-react";
import userlogo from '../../assets/user.webp';
import { shareContext } from '../../context/SearchContextShare';
import premiumbadge from '../../assets/premiumuser.png'

function Home() {
  //context
  const { searchKey } = useContext(shareContext)

  const[postUrl,setPostUrl]= useState("")

  const [likedPosts, setLikedPosts] = useState({})
  const [postShare, setPostShare] = useState({})

  const [token, setToken] = useState('')
  const [userDetails, setUserDetails] = useState({})
  const [feedData, setFeedData] = useState([])

  const [menuDrop, setMenuDrop] = useState({})
  const [openModal, setOpenModal] = useState(true);
  const [countModal, setCountModal] = useState(0)


  const report = [{ Fraud: 'Deceptive or misleading activity intended to scam users, obtain money, personal data, or gain unauthorized benefits through false claims or impersonation.' },
  { Spam: 'Irrelevant, repetitive, or automated content intended to artificially increase engagement, promote products, links, or services without genuine user interaction.' },
  { Harassment: 'Abusive, threatening, or bullying behavior directed at an individual or group, including hate speech, intimidation, or repeated unwanted interactions.' },
  { Misinformation: 'False, inaccurate, or misleading content presented as fact, which may cause confusion, harm, or mislead users about real-world events or information.' },
  { "Sexual content": 'Explicit, pornographic, or sexually suggestive material that violates platform guidelines, including unwanted sexual advances or exploitation.' },
  { "Fake Account": 'Accounts created using false identities, impersonation, or automated behavior intended to deceive users or manipulate platform interactions.' },
  { Infringement: 'Unauthorized use, reproduction, or distribution of copyrighted, trademarked, or protected content without proper ownership or permission.' },
  { Violence: 'Content that promotes, glorifies, or threatens physical harm or illegal activities.' },
  {
    'Hate Speech': 'Content that promotes violence, discrimination, or hatred against individuals or groups based on protected characteristics.'
  }]
  const [reportPost, setReportPost] = useState({
    key: '',
    value: ''
  })

  const getFeed = async (searchKey) => {

    const reqHeader = {
      Authorization: `Bearer ${token}`
    }
    try {
      const response = await getFeedAPI(searchKey, reqHeader)
      console.log(response);
      setFeedData(response.data);


    } catch (error) {
      console.log("ERROR" + error);

    }
  }
const handleLikeToggle = async (postId) => {
  const reqHeader = {
    Authorization: `Bearer ${token}`
  };

  try {
    const res = await likePostAPI({ postId }, reqHeader);

    const { isLiked, likesCount } = res.data;

    // update icon state
    setLikedPosts(prev => ({
      ...prev,
      [postId]: isLiked
    }));

    // update likes count in feed
    setFeedData(prev =>
      prev.map(post =>
        post._id === postId
          ? { ...post, likes: Array(likesCount).fill("x") }
          : post
      )
    );

  } catch (err) {
    console.error(err);
  }
};



  const handleShare = (postId,title,text,imgurl,createdAt) => {

    const url = `${window.location.origin}/posts/${postId}`;
    setPostUrl(url)
    setPostShare(prev => ({
      ...prev,
      [postId]: !prev[postId]
    }))
       navigator.share({
        title,
        text,createdAt,
        url,})
  }

  const handleCopy = (postId) => {

    const url = `${window.location.origin}/posts/${postId}`;
    setPostUrl(url)
    navigator.clipboard.writeText(url);
     alert("Link copied!");
  }
  console.log(postUrl);
  
  //menu
  const handlemenuDrop = (postId) => {
    setMenuDrop(prev => (prev === postId ? null : postId))
  }



  //report
  const handleReport = async (postId, reportedUserId) => {
    setOpenModal(false)
    const reqHeader = {
      Authorization: `Bearer ${token}`
    }

    const reqBody = {
      postId,
      reportedUserId,
      reason: reportPost.key
    }

    try {
      const response = await reportPostAPI(reqBody, reqHeader)
      console.log(response);
      if (response.status == 200) {
        alert(response.data.message)
      }
      else {
        alert(response.response.data)
      }

    } catch (error) {
      console.log('Error' + error);

    }
  }

  useEffect(() => {
    setToken(sessionStorage.getItem("token"))
    const userData = sessionStorage.getItem("userDetails")
     if (token) {
      setUserDetails(JSON.parse(userData))
    }

  }, [token])
  useEffect(()=>{
     if (token) {
       getFeed(searchKey)
    }
  },[token,searchKey])

  return (
    <div>
      <div className='fixed top-0 z-150  ms-20'>
        <Search />
      </div>
      <div className='flex-block  justify-center mt-30 text-black  dark:text-white'>
        {feedData ?
          feedData?.map((item, index) => (
            <div key={index} className="feature  bg-white dark:bg-[#111928BF]  w-200 mb-18"  >
              <div className="flex justify-between px-10 mt-10">
                <div className="flex gap-5 items-center">

                  <img src={item.userid?.profile ? item.userid.profile : userlogo} alt="" className='w-10 h-10 rounded-full' />

                      <div className="flex items-center gap-1">
                         <p className="font-semibold text-2xl">{item.userid?.username}</p>
                         {item.userid?.isPremium &&
                         <img src={premiumbadge} className="w-5 h-5" />
                         }
                         
                       </div>

                </div>
                {/* menu button */}
                <div>

                  <IoIosMore onClick={() => { handlemenuDrop(item._id) }} className='relative' />

                  {menuDrop === item._id && (
                    <div className="absolute right-0 z-10 mt-5 w-56 me-5 rounded-md dark:bg-gray-800 bg-gray-100 shadow ">
                      <div className="py-1">
                        {
                          userDetails._id != item.userid._id &&
                          <button className="block px-4 py-2 text-sm text-red-500" onClick={() => { setOpenModal(true), setCountModal(1) }} >Report</button>}

                        {/* report */}

                        {countModal == 1 &&
                          <>
                            <Modal dismissible show={openModal} onClose={() => setOpenModal(false)}>
                              <ModalHeader>Report this post</ModalHeader>
                              <ModalBody>
                                <div className="grid grid-cols-4 gap-3  text-white font-semibold">

                                  {report.map((item) =>
                                    Object.entries(item).map(([key, value]) => (
                                      <label key={key} className="cursor-pointer block">
                                        <input
                                          type="radio"
                                          name="reportReason"
                                          value={key}
                                          checked={reportPost.key === key}
                                          onChange={() => setReportPost({ key, value })}
                                          className="hidden"
                                        />


                                        <div
                                          className={`border-2  p-3 rounded-xl mt-5 text-center
          ${reportPost.key === key
                                              ? " text-white border-blue-600"
                                              : "border-gray-500"}
        `}
                                        >
                                          {key}
                                        </div>
                                      </label>
                                    ))
                                  )}


                                </div>
                              </ModalBody>
                              <ModalFooter>
                                <Button color="alternative" onClick={() => setOpenModal(false)}>
                                  Decline
                                </Button>
                                <Button onClick={() => {
                                  setCountModal(2)
                                }}>Next</Button>
                              </ModalFooter>
                            </Modal>
                          </>
                        }
                        {countModal == 2 &&
                          <>
                            <Modal dismissible show={openModal} onClose={() => setOpenModal(false)}>
                              <ModalHeader>Report this post</ModalHeader>
                              <ModalBody>
                                <div className="space-y-5 space-x-5 text-white">
                                  <h3 className='font-semibold'>You've selected the following reason</h3>

                                  <h4 className='font-bold'>{reportPost.key}</h4>
                                  <p>
                                    {reportPost.value}

                                  </p>
                                </div>
                              </ModalBody>
                              <ModalFooter>
                                <Button color="alternative" onClick={() => setCountModal(1)}>
                                  Back
                                </Button>
                                <Button onClick={() => handleReport(item._id, item.userid._id)}>Submit report</Button>
                              </ModalFooter>
                            </Modal>
                          </>
                        }




                        <button className="block px-4 py-2 text-sm text-gray-600 dark:text-gray-300" 
                        onClick={()=>handleShare(item._id)}
                        >Share to</button>
                        <button className="block px-4 py-2 text-sm text-gray-600 dark:text-gray-300"
                        onClick={()=>handleCopy(item._id)}>Copy link</button>
                        <button
                          onClick={() => setMenuDrop(null)}
                          className="block w-full px-4 py-2 text-left text-sm text-gray-600 dark:text-gray-300"
                        >
                          Cancel
                        </button>
                      </div>
                    </div>
                  )}
                </div>

              </div>
              <div className="mt-5 px-10">
                <p><span className='text-md font-semibold '>Title :  {item.title}</span></p>
                <p className='mt-5 whitespace-pre-line'>{item.text}</p>
              </div>
              <div className="flex gap-5 mt-5 px-5">
                {
                  item.imageUrl.map((url, index) => (
                    <Zoom>
                      <img key={index} src={url} alt="" className='w-50 ' />
                    </Zoom>
                  ))
                }
              </div>
              <div className="border-t border-gray-700 shadow mt-10 flex items-center justify-between  px-40 pt-3 pb-3">
                <div className="flex gap-1 cursor-pointer">
                <button type="button" onClick={() => handleLikeToggle(item._id)}>
  <AiFillLike
    className={`text-2xl transition-colors ${
     item.likes.some((like) => like.toString() === userDetails._id) || likedPosts[item._id]? 'text-blue-500' : 'text-gray-100'
    }`}
  />
</button>



                  <span>{item.likes.length}</span>
                </div>
                <div className="flex gap-1">

                  <BiCommentDetail className='text-2xl' />
                  Comment
                </div>
                <div className="flex gap-1" onClick={() => handleShare(item._id,item.title,item.text,item.imageUrl,item.createdAt)}>
                  <FaRegShareSquare className='text-2xl' />
                  <p>Share</p>

                </div>


              </div>

            </div>
          ))
          :
          ''
        }
      </div>
    </div>
  )
}

export default Home
