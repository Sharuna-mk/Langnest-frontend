import React, { useEffect, useState } from 'react'
import { IoIosMore } from "react-icons/io";
import { AiFillLike } from "react-icons/ai";
import { BiCommentDetail } from "react-icons/bi";
import { FaRegShareSquare } from "react-icons/fa";
import { deletePostAPI, EditPostAPI, likePostAPI, userAPI, userFeed, userUpdateAPI, viewPostAPI } from '../../services/allAPI';
import userlogo from '../../assets/user.webp';
import { formatDistanceToNow } from "date-fns";
import Zoom from "react-medium-image-zoom";
import "react-medium-image-zoom/dist/styles.css";
import { Button, Modal, ModalBody, ModalFooter, ModalHeader } from "flowbite-react";
import { IoMdAddCircleOutline } from "react-icons/io";
import { FaTrash } from "react-icons/fa";
import { toast, Toaster } from 'sonner';
import { BiEdit } from "react-icons/bi";
import premiumbadge from '../../assets/premiumuser.png'
import premium from '../../assets/premium.png'
import noPost from '../../assets/noPost.png'
import { Link, useParams } from 'react-router-dom';



function Profile() {

  const [likedPosts, setLikedPosts] = useState({})
  const [postShare, setPostShare] = useState({})
  const [postUrl, setPostUrl] = useState("")



  const [userData, setUserData] = useState({
    username: '',
    email: '',
    password: '',
    bio: '',
    profile: ''
  })
  //const [loading, setLoading] = useState(false);

  const [refreshFeed, setRefreshFeed] = useState(false);

  const [active, setActive] = useState(false)
  const [token, setToken] = useState('')
  const [userDetails, setUserDetails] = useState({})
  const [postData, setPostData] = useState([])
  const [singlePost, setSinglePost] = useState({
    title: "",
    text: "",
    imageUrl: [],
    newImage: [],
    removedImage: []
  });



  const [menuDrop, setMenuDrop] = useState({})
  const [openModal, setOpenModal] = useState(true);
  const [countModal, setCountModal] = useState(0)
  const [editModal, setEditModal] = useState(false);

  const [deletePost, setDeletePost] = useState(false)


  
  const [preview, setPreview] = useState([])

  const { selectedLanguage } = useParams();
  const userLanguage = userDetails.selectedLanguage
  const language = selectedLanguage || userLanguage

  /// post

  //user feed
  const getUserfeed = async () => {
    //setLoading(true)
    try {

      const reqheaders = {
        authorization: `Bearer ${token}`
      }

      const response = await userFeed(reqheaders)
      console.log(response);
      // setLoading(false)
      setPostData(response.data)



    } catch (error) {
      console.log(error);

    }


  }

  //handle Like
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
      setPostData(prev =>
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
  // handle share
  const handleShare = (postId) => {

    const url = `${window.location.origin}/posts/${postId}`;
    setPostUrl(url)
    setPostShare(prev => ({
      ...prev,
      [postId]: !prev[postId]
    }))
    navigator.share({
      url
    })
  }
  //menu
  const handlemenuDrop = (postId) => {
    setMenuDrop(prev => (prev === postId ? null : postId))
  }

  // handlecopy
  const handleCopy = (postId) => {

    const url = `${window.location.origin}/posts/${postId}`;
    setPostUrl(url)
    navigator.clipboard.writeText(url);
    toast.success("Link copied!", {
      duration: 2000,
    });
  }
  //view
  const handleView = async (id) => {
    try {
      const res = await viewPostAPI(id);
      console.log(res);

      setSinglePost(res.data);
    } catch (err) {
      console.log(err);
    }
  };



  //handle update -post
  const handleUpdate = async (postId) => {
    //api call

    // request header
    const reqHeader = {
      Authorization: `Bearer ${token}`
    }
    // request body

    const reqBody = new FormData()

    for (let key in singlePost) {

      if (key !== 'uploadImages') {
        reqBody.append(key, singlePost[key])
      }
      else {
        singlePost.uploadImages.forEach(item =>
          reqBody.append("uploadImages", item)
        )
      }
    }
    try {
      const result = await EditPostAPI(postId, reqBody, reqHeader);
      console.log(result);



      if (result.status == 200) {
        toast.success(result.data.message, {
          duration: 2000,
        });
        setRefreshFeed(prev => !prev);

        setTimeout(() => {
          setMenuDrop(null)
        }, 2000)

      }
      else {
        toast.error("server Error", {
          duration: 2000,
        })
      }

    } catch (error) {
      console.log(error);

    }
  }


  //confirm delete
  const confirmDelete = (id) => {
    toast('Are you absolutely sure?', {
      description: 'This action cannot be undone.',
      action: {
        label: 'Delete',
        onClick: () => handleDelete(id),
      },
      cancel: {
        label: 'Cancel',
        onClick: () => console.log('Cancelled'),
      },
    })
  }

  //handle Delete

  const handleDelete = async (postId) => {
    const reqHeader = {
      Authorization: `Bearer ${token}`
    }
    try {
      const response = await deletePostAPI(postId, reqHeader)
      console.log(response);
      setPostData(prev => prev.filter(item => item._id !== postId))
    } catch (error) {
      console.log(error);

    }
  }
  //---------------------------------------------------------------------------------------------------------------------//
  //user//

  //user data

  const getUserData = async () => {
    const reqHeader = {
      Authorization: `Bearer ${token}`
    }
    try {
      const response = await userAPI(reqHeader);
      console.log(response);
      setUserData(response.data)

    } catch (error) {
      console.log(error);

    }
  }


  //image upload
  const handleUpload = async (e) => {

    console.log(e.target.files[0]);

    // convert to url

    const url = URL.createObjectURL(e.target.files[0])
    console.log(url);

    setPreview(url)
    setUserData({ ...userData, profile: e.target.files[0] })

  }

  //update user

  const handleUpdateUser = async () => {
     const prevUserData = { ...userData };
    const reqHeader = {
      Authorization: `Bearer ${token}`
    }
    const reqBody = new FormData()
    reqBody.append("username", userData.username);
    reqBody.append("email", userData.email);
    reqBody.append("bio", userData.bio);
    reqBody.append("selectedLanguage", userData.selectedLanguage);

    if (userData.profile instanceof File) {
      reqBody.append("profile", userData.profile);
    }
    const toastId = toast.loading("Saving changes...");
    try {
    const res = await userUpdateAPI(reqBody, reqHeader);
    console.log(res);
    

    toast.success(res.data.message, { id: toastId });
    setEditModal(false);

     
    } catch (error) {
      
    toast.error(
      error.res?.data?.message || "User already existing ",
      { id: toastId }
    );

    setUserData(prevUserData);

    }
  }

  useEffect(() => {
    const userToken = sessionStorage.getItem("token")
    const userDetails = sessionStorage.getItem("userDetails")

    if (userToken) {
      setToken(userToken)
      setUserDetails(JSON.parse(userDetails))

    }

  }, [])
  useEffect(() => {
    if (token) {
      getUserData()
      getUserfeed()
    }
  }, [token, refreshFeed])

  return (
    <div>

      {/* user Porfile */}

      {/* posts */}
      <div className="feature mt-10 p-5 -ms-5 bg-gray-300 shadow dark:bg-cardPrimary-dark text-black  dark:text-white">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <img
              src={userData.profile || userlogo}
              className="w-20 h-20 rounded-full ring-2 ring-gray-300"
              alt=""
            />
            <div>
              <div className="flex items-center gap-2">
                <p className="font-bold text-2xl">{userData.username}</p>
                {userDetails?.isPremium &&
                  <img src={premiumbadge} className="w-5 h-5" />
                }

              </div>
              <p className="text-sm text-gray-500">
                {userData.selectedLanguage}
              </p>
            </div>
          </div>

          <button className="text-xl opacity-70 hover:opacity-100" onClick={() => setEditModal(true)}>
            <BiEdit />
          </button>


          {/* edit profile */}
          <Modal show={editModal} onClose={() => setEditModal(false)} className="bg-transparent backdrop-blur-xl">
            <div className="fixed inset-0 bg-transparent">
              <ModalBody className="max-w-md mx-auto bg-white dark:bg-gray-900 rounded-2xl shadow-2xl p-6 mt-30 shadow border border-gray-600">
                <div >
                  {/* Header */}
                  <h2 className="text-xl font-semibold text-gray-800 dark:text-white mb-6 text-center">
                    Edit Profile
                  </h2>

                  {/* Profile Image */}
                  <div className="flex flex-col items-center mb-6">
                    <div className="relative">
                      <img
                        src={preview || userData.profile || userlogo}
                        alt="Profile"
                        className="w-24 h-24 rounded-full object-cover border-2 border-gray-300 dark:border-gray-700"
                      />
                      <label className="absolute bottom-0 right-0 bg-blue-600 text-white p-1.5 rounded-full cursor-pointer hover:bg-blue-700">
                        <input type="file" className="hidden" onChange={(e) => handleUpload(e)} />
                        ✎
                      </label>
                    </div>
                    <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">
                      Change profile photo
                    </p>
                  </div>

                  {/* Form */}
                  <form className="space-y-4">
                    {/* Username */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                        Username
                      </label>
                      <input
                        type="text"
                        placeholder="Enter username"
                        value={userData.username}
                        onChange={(e) => { setUserData({ ...userData, username: e.target.value }) }}
                        className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-700 bg-transparent text-gray-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    </div>

                    {/* Email */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                        Email
                      </label>
                      <input
                        type="email"
                        value={userData.email}
                        onChange={(e) => { setUserData({ ...userData, email: e.target.value }) }}
                        placeholder="Enter email"
                        className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-700 bg-transparent text-gray-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    </div>
                 
                    {/* bio */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                        Bio
                      </label>
                      <textarea name="" id=""
                        onChange={(e) => { setUserData({ ...userData, bio: e.target.value }) }}
                        value={userData.bio}
                        className='w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-700 bg-transparent text-gray-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500'></textarea>
                    </div>

                    {/* Actions */}
                    <div className="flex justify-end gap-3 pt-4">
                      <button
                        type="button"
                        onClick={() => setEditModal(false)}
                        color="alternative"
                        className="px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800"
                      >
                        Cancel
                      </button>
                      <button
                        type="button"
                        onClick={() => { handleUpdateUser() }}
                        className="px-5 py-2 rounded-lg bg-blue-600 text-white hover:bg-blue-700 transition"
                      >
                        Save Changes
                      </button>
                    </div>
                  </form>
                </div>
              </ModalBody>
            </div>

          </Modal>
        </div>

        <div className="flex justify-between px-10 mt-10">
          <div className="flex gap-3 ">

            <h3 className='text-black dark:text-white font-semibold text-xl '>ALL ACTIVITY</h3>
          </div>


        </div>

        {postData.length > 0 ? postData.map((item) => {
          const timeAgo = formatDistanceToNow(
            new Date(item.createdAt),
            { addSuffix: true }
          );
          return <div className='mt-8'>
            <div className="feature w-200 bg-white dark:bg-[#111928BF]  text-black dark:text-white  ">
              <div className="flex justify-between px-10 mt-10">
                <div className="flex gap-5 items-center">
                  <img src={item.userid.profile ? item.userid.profile : userlogo} alt="" className='w-10 h-10 rounded-full' />
                  <div className="flex-col">
                    <h3 className=' font-semibold text-xl'>{item.userid.username}</h3>
                    <p className='text-xs'>{timeAgo}</p>
                  </div>

                </div>
                {/* menu buttin */}
                <div>

                  <IoIosMore onClick={() => { handlemenuDrop(item._id) }} className='relative' />

                  {menuDrop === item._id && (
                    <div className="absolute right-0 z-10 mt-5 w-56 me-5 rounded-md dark:bg-gray-800 bg-gray-100 shadow">
                      <div className="py-1">
                        {

                          <button className="block px-4 py-2 text-sm text-blue-500" onClick={() => { setOpenModal(true), setCountModal(1), handleView(item._id) }} >Edit Post</button>}

                        {/* report */}

                        {countModal == 1 &&
                          <>
                            <Modal dismissible show={openModal} onClose={() => setOpenModal(false)}>
                              <ModalHeader>Edit Post</ModalHeader>
                              <ModalBody>


                                {
                                  singlePost &&
                                  <div>
                                    <div className="mt-5 px-10 text-black">
                                      <div className='mt-10'>
                                        <input type="text" placeholder='Title' className='w-full border-b  border-gray-400 focus:outline-none'
                                          value={singlePost.title}
                                          onChange={(e) => { setSinglePost({ ...singlePost, title: e.target.value }) }} />
                                      </div>
                                      <div className='mt-5'>
                                        <textarea
                                          value={singlePost.text}
                                          onChange={(e) => { setSinglePost({ ...singlePost, text: e.target.value }) }}
                                          type="text" placeholder='Description' className='w-full h-20 border-b border-gray-400 focus:outline-none resize-none' >
                                        </textarea>
                                      </div>
                                      <div className="mt-5 px-5">
                                        <div className="flex gap-5 mt-5 px-5">
                                          {
                                            singlePost.imageUrl.map((url, index) => (
                                              <div>
                                                <Zoom>
                                                  <img key={index} src={url} alt="" className='w-50 ' />
                                                </Zoom>

                                              </div>
                                            ))
                                          }
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                }


                              </ModalBody>
                              <ModalFooter className='flex justify-between'>
                                <Button color="alternative" onClick={() => setOpenModal(false)}>
                                  Cancel
                                </Button>
                                <Button onClick={() => {
                                  handleUpdate(item._id)
                                }}>Save</Button>
                              </ModalFooter>
                            </Modal>
                          </>
                        }





                        <button className="block px-4 py-2 text-sm text-red-500"
                          onClick={() => confirmDelete(item._id)}
                        >Delete Post</button>

                        <button className="block px-4 py-2 text-sm text-gray-600 dark:text-gray-300"
                          onClick={() => handleShare(item._id)}
                        >Share to</button>
                        <button className="block px-4 py-2 text-sm text-gray-600 dark:text-gray-300"
                          onClick={() => handleCopy(item._id)}>Copy link</button>
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
                <p className='font-semibold'><span>Title : {item.title}</span></p>
                <p className='mt-5'>{item.text} </p></div>
              <div className="mt-5 px-5">
                <div className="flex gap-5 mt-5 px-5">
                  {
                    item.imageUrl.map((url, index) => (
                      <Zoom>
                        <img key={index} src={url} alt="" className='w-50 ' />
                      </Zoom>
                    ))
                  }
                </div>
              </div>
              <div className="border-t border-gray-700 shadow mt-10 flex items-center justify-between  px-40 pt-3 pb-3">
                <div className="flex gap-1 cursor-pointer">
                  <button type="button" onClick={() => handleLikeToggle(item._id)}>
                    <AiFillLike
                      className={`text-2xl transition-colors ${item.likes.some((like) => like.toString() === userDetails._id)
                        | likedPosts[item._id]

                        ? 'text-blue-500' : 'text-gray-100'
                        }`}
                    />
                  </button>



                  <span>{item.likes.length}</span>
                </div>
                <div className="flex gap-1">

                  <BiCommentDetail className='text-2xl' />
                  Comment
                </div>
                <div className="flex gap-1" onClick={() => handleShare(item._id)}>
                  <FaRegShareSquare className='text-2xl' />
                  <p>Share</p>

                </div>

              </div>
            </div>
          </div>
        }) :
          <div>

            <img src={noPost}
              className='w-120 mt-5 p-5'
              alt="" />
            <div className="flex justify-center">
              <Link to={`/user/${language}/create-post`}>
                <button className='bg-blue-600 text-white font-semibold px-3 p-1 rounded-md'>Create Post</button>
              </Link>
            </div>
          </div>
        }
      </div>



      <Toaster position="top-center" richColors />
    </div>
  )
}

export default Profile
