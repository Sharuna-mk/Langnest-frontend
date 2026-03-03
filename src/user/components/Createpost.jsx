import React, { useEffect, useRef, useState } from 'react'
import { toast, Toaster } from 'sonner';
import { IoMdAddCircleOutline } from "react-icons/io";
import { FaTrash } from "react-icons/fa";
import { addPost, userFeed } from '../../services/allAPI';
import { useNavigate, useParams } from 'react-router-dom';




function Createpost() {

    const { selectedLanguage } = useParams();
    const user = sessionStorage.getItem("userDetails")
    const userData = JSON.parse(user)
    const userLanguage = userData.selectedLanguage
    const language = selectedLanguage || userLanguage

    //post
    const [postCount, setPostCount] = useState(0)

    const [postDetails, setPostDetails] = useState({
        language,
        title: "",
        text: "",
        uploadImages: []
    })
    const [token, setToken] = useState('')
    const [userDetails, setUserDetails] = useState({})


    const [preview, setPreview] = useState("")
    const [previewList, setPreviewList] = useState([])

    const navigate = useNavigate()

    //post-limit

    const getUserfeed = async () => {
        //setLoading(true)
        try {

            const reqheaders = {
                authorization: `Bearer ${token}`
            }

            const response = await userFeed(reqheaders)
            console.log(response);
            // setLoading(false)
            setPostCount(response.data.length);
            console.log(response.data.length);
            console.log(postCount);



            console.log(postCount);



        } catch (error) {
            console.log(error);

        }


    }


    useEffect(() => {
        // fetch user posts
        if (token) {
            getUserfeed()
        }
    }, [token]);

    //   image upload
    const handleUpload = (e) => {
        //convert to url

        //check file getting

        console.log(e.target.files[0]);

        // 1. ADD FILE TO ARRAY
        let imagearr = postDetails.uploadImages
        imagearr.push(e.target.files[0])
        setPostDetails({ ...postDetails, uploadImages: imagearr })

        // 2. URL

        const url = URL.createObjectURL(e.target.files[0])
        console.log(url);

        // set url to preview
        setPreview(url)

        // 3. array to hold all images

        let imageList = previewList
        imageList.push(url)
        setPreviewList(imageList)
        console.log(previewList);


    }
    // image delete
  const handleDelete = () => {
    setPreviewList((prev) => {
        const updatedPreviewList = prev.slice(0, -1);

        if (updatedPreviewList.length === 0) {
            setPreview("");
        }

        return updatedPreviewList;
    });

    setPostDetails((prev) => ({
        ...prev,
        uploadImages: prev.uploadImages.slice(0, -1)
    }));
};


    // add post
    const handlePost = async () => {

        console.log(postDetails);
        const { title, text, } = postDetails

        if (!title || !text) {
            toast.error("Please enter all fields", {
                duration: 2000,
            });
        }
        else {

            //api call

            // request header
            const reqHeader = {
                Authorization: `Bearer ${token}`
            }
            // request body

            const reqBody = new FormData()

            for (let key in postDetails) {

                if (key !== 'uploadImages') {
                    reqBody.append(key, postDetails[key])
                }
                else {
                    postDetails.uploadImages.forEach(item =>
                        reqBody.append("uploadImages", item)
                    )
                }
            }
            //axios call

            try {

                await toast.promise(
                    addPost(reqBody, reqHeader),
                    {
                        loading: "Creating post...",
                        success: (res) => {
                            setTimeout(() => {
                                navigate(`/user/${language}/feed`);
                            }, 1500);
                            return res.data.message || "Post created successfully!";
                        },
                        error: (err) =>
                            err.response?.data?.message || "Failed to create post",
                    }
                );


            } catch (error) {
                alert("Error" + error)
            }


        }
    }

    //premium
    const isPremium = userDetails?.isPremium;
    const Max_Uploads = isPremium ? 20 : 3;

    useEffect(() => {
        const userToken = sessionStorage.getItem("token")
        const userDetails = sessionStorage.getItem("userDetails")

        if (userToken) {
            setToken(userToken)
            setUserDetails(JSON.parse(userDetails))

        }

    }, [])


    return (
        <div className='min-h-screen'>
            <div className='flex justify-center text-black dark:text-white'>
                <div className="feature  w-200 h-auto bg-white dark:bg-[#111928BF]  p-10 mt-10">

                    <h3 className='text-xl font-bold'>Create Content</h3>
                    {/* profile image and name */}
                    <div className="flex gap-5 items-center mt-5 justify-between">
                        <div className='flex items-center gap-5 '>
                            {userDetails.profile ?
                                <img src={userDetails.profile} alt="" className='w-10 h-10 rounded-full' />
                                :
                                <img src="https://static.vecteezy.com/system/resources/previews/028/189/913/non_2x/user-profile-icon-set-set-of-flat-style-avatar-person-icons-for-user-profile-or-login-buttons-free-vector.jpg" alt="" className='w-10 h-10 rounded-full' />
                            }

                            <h3 className='font-semibold text-xl '>{userDetails.username}</h3>

                        </div>
                    </div>


                    {/* Title */}
                    <div className='mt-10'>
                        <input type="text" placeholder='Title' className='w-full border-b  border-gray-400 focus:outline-none'
                            onChange={(e) => { setPostDetails({ ...postDetails, title: e.target.value }) }} />
                    </div>
                    <div className='mt-5'>
                        <textarea
                            value={postDetails.text}
                            onChange={(e) => {
                                const formattedText = e.target.value.replace(/\r\n/g, "\n");
                                setPostDetails({
                                    ...postDetails,
                                    text: formattedText
                                });
                            }}
                            placeholder="Description"
                            className="w-full h-20 border-b border-gray-400 focus:outline-none resize-none"
                        />

                    </div>
                    {preview ?
                        <div>
                            <div className='flex items-center justify-start flex-wrap gap-4' >
                                {/* display selected files */}
                                {
                                    previewList && previewList.map((item, index) => (
                                        <img key={index} src={item} className="w-[150px] h-[150px] " />
                                    ))
                                }
                            </div>
                            {!isPremium && (
                                <p className="text-sm text-red-500 mt-4">
                                    *Free users can upload up to 3 files. Upgrade for unlimited uploads.
                                </p>
                            )}
                            <div className='flex items-center justify-center mt-20'>
                                <FaTrash className='text-2xl' onClick={(e) => handleDelete(e)} />

                                <label htmlFor="imgFile">
                                    {/* select upto 3 images */}
                                    <input id='imgFile' type="file" hidden onChange={(e) => handleUpload(e)} />
                                    {

                                        previewList.length < Max_Uploads && <IoMdAddCircleOutline className='text-3xl ms-5' />}
                                </label>

                            </div>

                        </div>


                        :

                        <div>
                            <div className="flex justify-center items-center mt-5">
                                <div className="flex-col  text-center">
                                    <div className="flex justify-center">
                                        <img src="https://cdn-icons-png.flaticon.com/512/8103/8103783.png" width={'60px'} alt=""
                                        />
                                    </div>
                                    <h3 className='text-2xl mt-8 font-semibold'>Drop your media here</h3>
                                    <p className='text-sm mt-2 mb-10'>Upload images for your post.</p>
                                    <label htmlFor="imgFile" className=
                                        {`rounded-3xl px-5 p-2 font-semibold
                                                      ${!isPremium && postCount >= 3
                                                ? "bg-gray-400 cursor-not-allowed"
                                                : "bg-blue-600"}
                                                                   `}>
                                        Select media to upload
                                        <input id='imgFile' type="file" accept='image/,video/'
                                            disabled={!isPremium && postCount >= 3}
                                            onChange={(e) => handleUpload(e)}
                                            hidden />
                                    </label>
                                    {!isPremium && postCount >= 3 && (
                                        <p className="text-red-500 text-sm mt-4">
                                            * You’ve reached the 3 post limit. Upgrade to premium for unlimited posts.
                                        </p>
                                    )}


                                </div>

                            </div>
                        </div>
                    }

                    <div className="flex justify-end items-center mt-20 me-8 text-white">
                        <button className=' bg-blue-600  rounded-2xl font-semibold px-4 p-1 '
                            onClick={handlePost}
                            type='button'
                        >Post</button>
                    </div>

                    <Toaster position="top-center" richColors />


                </div>

            </div>

        </div>
    )
}

export default Createpost
