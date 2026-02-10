import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { FaReact } from "react-icons/fa";
import { IoLogoJavascript } from "react-icons/io5";
import { MdOutlineNavigateNext } from "react-icons/md";
import { useState } from 'react';
import { useEffect } from 'react';
import { IoIosArrowBack } from "react-icons/io";
import html from '../../assets/htmlcss.png'
import { FaJava } from "react-icons/fa6";
import { addLanguage } from '../../services/allAPI';


function Language() {

  const [steps, setSteps] = useState(1)
  const [selected, setSelected] = useState('')
  const [selectedLanguage, setSelectedLanguage] = useState('')
  const [userDetails, setUserDetails] = useState()

  const navigate = useNavigate()

  //handle language selection
  useEffect(() => {
    const storedUser = sessionStorage.getItem("userDetails");

    if (!storedUser) return;

    const userDetails = JSON.parse(storedUser);

    if (userDetails?.selectedLanguage) {
      navigate(`/user/${userDetails.selectedLanguage}/feed`);
    }
  }, [navigate]);



  const handleSave = async (language) => {
    if (!language) return;

    else {
      sessionStorage.setItem("selectedLanguage", language)
      const token = sessionStorage.getItem("token")
      const reqHeader = {
        Authorization: `Bearer ${token}`
      }

      try {
        if (token) {

          const response = await addLanguage({ selectedLanguage: language }, reqHeader)
          console.log(response);
          const updatedUser = { ...userDetails, selectedLanguage: language }
          setUserDetails(updatedUser)
          sessionStorage.setItem("userDetails", JSON.stringify(updatedUser))

          navigate(`/user/${language}/feed`)
        }

      } catch (error) {
        console.log(error);
      }
    }
  }

  useEffect(() => {
    const userData = sessionStorage.getItem("userDeatils")
    if (userData) {
      setUserDetails(JSON.parse(userData))
    }
  })
  return (
    <div>

      <div className='bg-[#010336] min-h-screen pt-10'>

        <div className="flex items-center justify-center">
          <div
            className="feature w-[450px]  px-8 py-5 bg-gray-800 rounded-lg shadow-[0px_0px_20px_rgba(0,0,0,0.3)]"
          >
            {steps == 1 &&
              <div className='flex flex-col gap-5'>
                <h2 className="text-xl font-semibold mb-2 text-white select-none">🚀 Explore Development Paths</h2>
                <h4 className="text-md font-semibold mb-2 text-white select-none ">
                  Choose a direction and discover content, projects, and discussions tailored to your tech stack.
                </h4>
                <div className="flex justify-center">
                  <img src="https://i.pinimg.com/736x/4d/88/30/4d8830645a1f2ad3b463c8156884c491.jpg" width={'330px'} className='rounded-md' alt="" />
                </div>
                <label
                  for="frontend"
                  name="status"
                  className="font-medium h-16 relative hover:bg-gray-700 transition-all duration-300 flex items-center px-5 gap-3 rounded-lg has-[:checked]:text-blue-400 has-[:checked]:bg-gray-700 has-[:checked]:ring-blue-500 has-[:checked]:ring-2 select-none cursor-pointer"
                >
                  <div className="w-5 fill-current text-blue-400">
                    <img src="https://cdn-icons-png.flaticon.com/512/11544/11544532.png" alt="" />
                  </div>
                  <span className="text-white">Frontend</span>
                  <input
                    type="radio"
                    name="status"
                    className="peer/react w-4 h-4 absolute accent-blue-400 right-5 transition-all duration-300"
                    id="frontend"
                    value='frontend'
                    onChange={(e) => { setSelected(e.target.value) }}
                  />
                  <span
                    className="absolute right-5 w-4 h-4 rounded-full border-2 border-gray-400 peer-checked/react:border-blue-400 peer-checked/react:bg-blue-400 transition-all duration-300"
                  ></span>
                </label>
                <label
                  for="backend"
                  className="font-medium h-16 relative hover:bg-gray-700 transition-all duration-300 flex items-center px-5 gap-3 rounded-lg has-[:checked]:text-blue-400 has-[:checked]:bg-gray-700 has-[:checked]:ring-blue-500 has-[:checked]:ring-2 select-none cursor-pointer"
                >
                  <div className="w-5">

                    <img src="https://cdn-icons-png.flaticon.com/512/8099/8099229.png" alt="" />
                  </div>
                  <span className="text-white">Backend</span>
                  <input
                    type="radio"
                    name="status"
                    className="peer/css w-4 h-4 absolute accent-blue-400 right-5 transition-all duration-300"
                    id="backend"
                    value='backend'
                    onChange={(e) => { setSelected(e.target.value) }}
                  />
                  <span
                    className="absolute right-5 w-4 h-4 rounded-full border-2 border-gray-400 peer-checked/css:border-blue-400 peer-checked/css:bg-blue-400 transition-all duration-300"
                  ></span>
                </label>
                <label
                  for="fullstack"
                  name="status"
                  className="font-medium h-16 relative hover:bg-gray-700 transition-all duration-300 flex items-center px-5 gap-3 rounded-lg has-[:checked]:text-blue-400 has-[:checked]:bg-gray-700 has-[:checked]:ring-blue-500 has-[:checked]:ring-2 select-none cursor-pointer"
                >
                  <div className="w-5 ">
                    <img src="https://cdn-icons-png.flaticon.com/512/10329/10329676.png" alt="" />
                  </div>
                  <span className="text-white">Full Stack</span>
                  <input
                    type="radio"
                    name="status"
                    class="peer/js w-4 h-4 absolute accent-blue-400 right-5 transition-all duration-300"
                    id="fullstack"
                    value='fullstack'
                    onChange={(e) => { setSelected(e.target.value) }}
                  />
                  <span
                    className="absolute right-5 w-4 h-4 rounded-full border-2 border-gray-400 peer-checked/js:border-blue-400 peer-checked/js:bg-blue-400 transition-all duration-300"
                  ></span>
                </label>
                <div className="flex justify-end me-5">
                  <button className={`mt-4 px-4 py-2 text-white rounded flex items-center font-bold
              ${selected ? "bg-blue-600 hover:bg-blue-700" : "bg-gray-400 cursor-not-allowed"}
            `}
                    disabled={!selected}
                    onClick={() => { setSteps(2) }}>Next <MdOutlineNavigateNext /></button>
                </div>
              </div>
            }
            {steps == 2 &&
              (
                <>
                  {selected == 'frontend' && (
                    <>
                      <button className="flex justify-start items-center text-white rounded  font-bold"
                        onClick={() => setSteps(1)}><IoIosArrowBack className='text-2xl' /></button>
                      <div className="flex flex-col gap-3 px-5">
                        <h2 className="text-xl font-bold mb-2 text-white select-none mt-5">Choose One</h2>

                        <label
                          for="htmlcss"
                          name="status"
                          className="font-medium h-16 relative hover:bg-gray-700 transition-all duration-300 flex items-center px-5 gap-3 rounded-lg has-[:checked]:text-blue-400 has-[:checked]:bg-gray-700 has-[:checked]:ring-blue-500 has-[:checked]:ring-2 select-none cursor-pointer"
                        >
                          <div className="w-6 ">
                            <img src={html} alt="" />
                          </div>
                          <span className="text-white">HTML & CSS</span>
                          <input
                            type="radio"
                            name="status"
                            className="peer/react w-4 h-4 absolute accent-blue-400 right-5 transition-all duration-300"
                            id="htmlcss"
                            value='htmlcss'
                            onChange={(e) => { setSelectedLanguage(e.target.value) }}
                          />
                          <span
                            className="absolute right-5 w-4 h-4 rounded-full border-2 border-gray-400 peer-checked/react:border-blue-400 peer-checked/react:bg-blue-400 transition-all duration-300"
                          ></span>
                        </label>
                        <label
                          for="javascript"
                          className="font-medium h-16 relative hover:bg-gray-700 transition-all duration-300 flex items-center px-5 gap-3 rounded-lg has-[:checked]:text-blue-400 has-[:checked]:bg-gray-700 has-[:checked]:ring-blue-500 has-[:checked]:ring-2 select-none cursor-pointer"
                        >
                          <div className="w-6">
                            <IoLogoJavascript className='text-yellow-300' />
                          </div>
                          <span className="text-white">JavaScript</span>
                          <input
                            type="radio"
                            name="status"
                            className="peer/css w-4 h-4 absolute accent-blue-400 right-5 transition-all duration-300"
                            id="javascript"
                            value='javascript'
                            onChange={(e) => { setSelectedLanguage(e.target.value) }}
                          />
                          <span
                            className="absolute right-5 w-4 h-4 rounded-full border-2 border-gray-400 peer-checked/css:border-blue-400 peer-checked/css:bg-blue-400 transition-all duration-300"
                          ></span>
                        </label>
                        <label
                          for="react"
                          name="status"
                          className="font-medium h-16 relative hover:bg-gray-700 transition-all duration-300 flex items-center px-5 gap-3 rounded-lg has-[:checked]:text-blue-400 has-[:checked]:bg-gray-700 has-[:checked]:ring-blue-500 has-[:checked]:ring-2 select-none cursor-pointer"
                        >
                          <div className="w-6 ">
                            <FaReact className='text-blue-400' />
                          </div>
                          <span className="text-white">React</span>
                          <input
                            type="radio"
                            name="status"
                            class="peer/js w-4 h-4 absolute accent-blue-400 right-5 transition-all duration-300"
                            id="react"
                            value='react'
                            onChange={(e) => { setSelectedLanguage(e.target.value) }}
                          />
                          <span
                            className="absolute right-5 w-4 h-4 rounded-full border-2 border-gray-400 peer-checked/js:border-blue-400 peer-checked/js:bg-blue-400 transition-all duration-300"
                          ></span>
                        </label>
                        <div className="flex justify-end m-5">
                          <button className={`mt-4 px-4 py-2 text-white rounded flex items-center font-bold
              ${selectedLanguage ? "bg-blue-600 hover:bg-blue-700" : "bg-gray-400 cursor-not-allowed"}
            `}
                            disabled={!selectedLanguage}
                            onClick={() => handleSave(selectedLanguage)}>Save</button>
                        </div>
                      </div>

                    </>
                  )}
                  {selected == 'backend' && (
                    <>
                      <button className="flex justify-start items-center text-white rounded  font-bold"
                        onClick={() => setSteps(1)}><IoIosArrowBack className='text-2xl' /></button>
                      <div className="flex flex-col gap-3 px-5">
                        <h2 className="text-xl font-bold mb-2 text-white select-none mt-5">Choose One</h2>

                        <label
                          for="java"
                          name="status"
                          className="font-medium h-16 relative hover:bg-gray-700 transition-all duration-300 flex items-center px-5 gap-3 rounded-lg has-[:checked]:text-blue-400 has-[:checked]:bg-gray-700 has-[:checked]:ring-blue-500 has-[:checked]:ring-2 select-none cursor-pointer"
                        >
                          <div className="w-7">
                            <img src="https://image2url.com/r2/default/images/1770647354447-ec167760-c88c-45d2-9d59-c6344077bff1.png"  alt="" />
                          </div>
                          <span className="text-white">Java</span>
                          <input
                            type="radio"
                            name="status"
                            className="peer/react w-4 h-4 absolute accent-blue-400 right-5 transition-all duration-300"
                            id="java"
                            value='java'
                            onChange={(e) => { setSelectedLanguage(e.target.value) }}
                          />
                          <span
                            className="absolute right-5 w-4 h-4 rounded-full border-2 border-gray-400 peer-checked/react:border-blue-400 peer-checked/react:bg-blue-400 transition-all duration-300"
                          ></span>
                        </label>
                        <label
                          for="java"
                          className="font-medium h-16 relative hover:bg-gray-700 transition-all duration-300 flex items-center px-5 gap-3 rounded-lg has-[:checked]:text-blue-400 has-[:checked]:bg-gray-700 has-[:checked]:ring-blue-500 has-[:checked]:ring-2 select-none cursor-pointer"
                        >
                          <div className="w-7">
                            <img src="https://image2url.com/r2/default/images/1770647456762-59a84992-d3a8-4d81-96e0-2f81c47bd0d8.png" alt="" />
                          </div>
                          <span className="text-white">Python</span>
                          <input
                            type="radio"
                            name="status"
                            className="peer/css w-4 h-4 absolute accent-blue-400 right-5 transition-all duration-300"
                            id="python"
                            value='python'
                            onChange={(e) => { setSelectedLanguage(e.target.value) }}
                          />
                          <span
                            className="absolute right-5 w-4 h-4 rounded-full border-2 border-gray-400 peer-checked/css:border-blue-400 peer-checked/css:bg-blue-400 transition-all duration-300"
                          ></span>
                        </label>
                        <label
                          for="node.js"
                          name="status"
                          className="font-medium h-16 relative hover:bg-gray-700 transition-all duration-300 flex items-center px-5 gap-3 rounded-lg has-[:checked]:text-blue-400 has-[:checked]:bg-gray-700 has-[:checked]:ring-blue-500 has-[:checked]:ring-2 select-none cursor-pointer"
                        >
                          <div className="w-7 ">
                           <img src="https://image2url.com/r2/default/images/1770647567403-2442ec1b-c8b1-4519-abc6-a29822f0baa9.png" alt="" />
                          </div>
                          <span className="text-white">Node.js</span>
                          <input
                            type="radio"
                            name="status"
                            class="peer/js w-4 h-4 absolute accent-blue-400 right-5 transition-all duration-300"
                            id="node.js"
                            value='node.js'
                            onChange={(e) => { setSelectedLanguage(e.target.value) }}
                          />
                          <span
                            className="absolute right-5 w-4 h-4 rounded-full border-2 border-gray-400 peer-checked/js:border-blue-400 peer-checked/js:bg-blue-400 transition-all duration-300"
                          ></span>
                        </label>
                        <div className="flex justify-end m-5">
                          <button className={`mt-4 px-4 py-2 text-white rounded flex items-center font-bold
              ${selectedLanguage ? "bg-blue-600 hover:bg-blue-700" : "bg-gray-400 cursor-not-allowed"}
            `}
                            disabled={!selectedLanguage}
                            onClick={() => handleSave(selectedLanguage)}>Save</button>
                        </div>
                      </div>

                    </>
                  )}
                  {
                    selected == 'fullstack' && <>
                      <button className="flex justify-start items-center text-white rounded  font-bold"
                        onClick={() => setSteps(1)}><IoIosArrowBack className='text-2xl' /></button>
                      <div className="flex flex-col gap-3 px-5">
                        <h2 className="text-xl font-bold mb-2 text-white select-none mt-5">Choose One</h2>

                        <label
                          for="mern"
                          name="status"
                          className="font-medium h-16 relative hover:bg-gray-700 transition-all duration-300 flex items-center px-5 gap-3 rounded-lg has-[:checked]:text-blue-400 has-[:checked]:bg-gray-700 has-[:checked]:ring-blue-500 has-[:checked]:ring-2 select-none cursor-pointer"
                        >
                          <div className="w-6 ">
                            <img src="https://image2url.com/r2/default/images/1770647810936-cb18c5b3-cfb9-4696-a894-8925e4f2e0d7.png" alt="" />
                          </div>
                          <span className="text-white">MERN</span>
                          <input
                            type="radio"
                            name="status"
                            className="peer/react w-4 h-4 absolute accent-blue-400 right-5 transition-all duration-300"
                            id="mern"
                            value='MERN'
                            onChange={(e) => { setSelectedLanguage(e.target.value) }}
                          />
                          <span
                            className="absolute right-5 w-4 h-4 rounded-full border-2 border-gray-400 peer-checked/react:border-blue-400 peer-checked/react:bg-blue-400 transition-all duration-300"
                          ></span>
                        </label>

                        <div className="flex justify-end m-5">
                          <button className={`mt-4 px-4 py-2 text-white rounded flex items-center font-bold
              ${selectedLanguage ? "bg-blue-600 hover:bg-blue-700" : "bg-gray-400 cursor-not-allowed"}
            `}
                            disabled={!selectedLanguage}
                            onClick={() => handleSave(selectedLanguage)}>Save</button>
                        </div>
                      </div>

                    </>
                  }
                </>
              )

            }


          </div>
        </div>


      </div>


    </div>
  )
}

export default Language
