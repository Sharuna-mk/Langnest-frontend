import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import { googleUser, loginUser, registerUser } from '../services/allAPI';
import { toast, Toaster } from 'sonner';
import { GoogleLogin } from '@react-oauth/google';
import { jwtDecode } from "jwt-decode";
import { useFormik } from 'formik'
import { loginSchema, registerSchema } from './Validation';
import logo from '../assets/logobg.png'
function Auth({ register }) {

    const { values, handleChange, handleBlur, handleSubmit, errors, touched } = useFormik({
        initialValues: {
            username: "",
            email: "",
            password: "",
            confirmPassword: ""
        },

        validationSchema: register ? registerSchema : loginSchema,
        onSubmit: async (values) => {
            if (register) {
                try {
                    const { confirmPassword, ...userData } = values;
                    const response = await registerUser(userData);

                    if (response.status === 200) {
                        toast.success(response.data.message);
                        setTimeout(() => navigate("/login"), 1500);
                    }
                } catch (error) {
                    toast.error(error?.response?.data || "Registration failed");
                }
            } else {
                try {
                    const response = await loginUser({
                        email: values.email,
                        password: values.password,
                    });

                    if (response.status === 200) {

                        sessionStorage.setItem("token", response.data.token);
                        sessionStorage.setItem(
                            "userDetails",
                            JSON.stringify(response.data.existingUser)
                        );


                        if (response.data.existingUser.role == 'Admin') {
                             toast.success("Admin Login successful");
                            setTimeout(() => navigate("/admin"), 1000);
                        }
                        else {
                            toast.success(response.data.message);
                            setTimeout(() => navigate("/language"), 1000);

                        }
                    }
                    else {
                        toast.error(response?.error?.message);
                    }

                } catch (error) {
                    console.log(error);

                }
            }
        }
    })
    console.log(values);
    //const [userAuth, setUserAuth] = useState({

    //})
    //const [confirmPassword, setConfirmPassword] = useState("")
    const [token, setToken] = useState()
    const navigate = useNavigate()
    //register
    //const handleRegister = async () => {
    //    console.log(userAuth);

    //    if (!userAuth.username || !userAuth.email || !userAuth.password) {
    //        toast.error('Please enter all fields', {
    //            duration: 2000,
    //        });
    //    }
    //    else {
    //        if (userAuth.password === confirmPassword) {
    //            try {

    //                const response = await registerUser(userAuth)
    //                console.log(response);
    //                if (response.status == 200) {
    //                    toast.success(response.data.message, {
    //                        duration: 2000,
    //                    });
    //                    setTimeout(() => {
    //                        navigate("/login")
    //                    }, 2000)
    //                }
    //                else {
    //                    toast.error(response.response.data, {
    //                        duration: 2000
    //                    })
    //                }

    //            } catch (error) {
    //                console.log(error);

    //            }
    //        }
    //    }

    //}

    ////login
    //const handleLogin = async () => {
    //    const { email, password } = userAuth
    //    if (!email || !password) {
    //        toast.error('Please enter all fields', {
    //            duration: 2000,
    //        });
    //    }
    //    else {
    //        try {
    //            const response = await loginUser({ email, password })
    //            console.log(response);



    //            if (response.status == 200) {
    //                setToken(response.data.token)
    //                sessionStorage.setItem("token", response.data.token)
    //                sessionStorage.setItem("userDetails", JSON.stringify(response.data.existingUser))
    //                console.log("token set to session storage", token);
    //                toast.success(response.data.message, {
    //                    duration: 2000,
    //                });

    //                if (response.data.existingUser.role === 'Admin') {
    //                    setTimeout(() => {
    //                        navigate("/admin")
    //                    }, 1000)
    //                }
    //                else {
    //                    const selectedLanguage = response.data.existingUser.selectedLanguage;
    //                    if (selectedLanguage) {
    //                        sessionStorage.setItem("selectedLanguage", selectedLanguage)
    //                        setTimeout(() => {
    //                            navigate(`/user/${selectedLanguage}/feed`)
    //                        }, 1000)
    //                    }
    //                    else {
    //                        setTimeout(() => {
    //                            navigate("/language")
    //                        }, 1000)
    //                    }
    //                }

    //            }
    //            else {
    //                toast.error(response.response.data, {
    //                    duration: 2000
    //                })
    //            }
    //        }
    //        catch (error) {
    //            console.log(error);
    //        }


    //    }

    //}


    //google authentication   
    const handleGoogleLogin = async (credentialResponse) => {
        //decoding
        const decoded = jwtDecode(credentialResponse.credential);
        console.log(decoded);
        try {
            const response = await googleUser({ id: decoded.id, username: decoded.name, email: decoded.email, password: "googleUser", profile: decoded.picture })
            console.log(response);
            if (response.status == 200) {
                console.log(response.data);

                setToken(response.data.token)
                sessionStorage.setItem("token", response.data.token)
                sessionStorage.setItem("userDetails", JSON.stringify(response.data.existingUser))
                navigate('/language')
            }

        } catch (error) {
            console.log(error);

        }
    }
    return (
        <div className='overflow-hidden'>

            <div className="bg-black min-h-screen text-white flex justify-center overflow-hidden">
                <div className='feature md:mt-10 md:mb-25  p-10 '>
                    <form onSubmit={handleSubmit} className="w-full max-w-md space-y-4 ">
                        <div className="flex justify-center">
                            <img src={logo} alt="" className='w-25 h-25' />
                        </div>
                        <div>
                            {register ? <h3 className='text-center text-xl font-bold'>Sign Up to LearnNest</h3>
                                : <h3 className='text-center text-xl font-bold '>Sign In to LearnNest</h3>
                            }
                        </div>

                        {
                            register && (
                                <div>

                                    <label htmlFor="" className='font-bold  text-start '>Username</label>
                                    <input type="text"
                                        name='username'
                                        value={values.username}
                                        onBlur={handleBlur}
                                        onChange={handleChange}
                                        //onChange={(e) => { setUserAuth({ ...userAuth, username: e.target.value }) }}
                                        className='bg-gray-900 w-full mt-2 text-gray-200 border-0 rounded-md p-2  focus:outline-none focus:ring-1 focus:ring-blue-500 transition ease-in-out duration-150'
                                        placeholder='enter your username' />
                                    <div className="min-h-[5px]">
                                        {errors.username && touched.username && (
                                            <p className="text-red-500 text-sm">{errors.username}</p>
                                        )}
                                    </div>
                                </div>
                            )
                        }

                        <label htmlFor="" className='font-bold  text-start '>Email</label>
                        <input type="text"
                            name='email'
                            value={values.email}
                            onBlur={handleBlur}
                            onChange={handleChange}
                            //onChange={(e) => { setUserAuth({ ...userAuth, email: e.target.value }) }}
                            className='bg-gray-900 w-full mt-2 text-gray-200 border-0 rounded-md p-2  focus:outline-none focus:ring-1 focus:ring-blue-500 transition ease-in-out duration-150'
                            placeholder='enter your email' />
                        <div className="min-h-[5px]">
                            {errors.email && touched.email && (
                                <p className="text-red-500 text-sm">{errors.email}</p>
                            )}
                        </div>
                        <label htmlFor="" className='font-bold text-start '>Password</label>

                        <input type="password"
                            name='password'
                            value={values.password}
                            onBlur={handleBlur}
                            onChange={handleChange}
                            //onChange={(e) => { setUserAuth({ ...userAuth, password: e.target.value }) }}
                            className='bg-gray-900 w-full text-gray-200 border-0 rounded-md p-2   focus:outline-none focus:ring-1 focus:ring-blue-500 transition ease-in-out duration-150'
                            placeholder='enter your password' />
                        <div className="min-h-[5px]">
                            {errors.password && touched.password && (
                                <p className="text-red-500 text-sm">{errors.password}</p>
                            )}
                        </div>
                        {
                            register &&
                            <div>
                                <label htmlFor="" className='font-bold text-start -mt-5'>Confirm Password</label>

                                <input
                                    name='confirmPassword'
                                    value={values.confirmPassword}
                                    onBlur={handleBlur}
                                    onChange={handleChange}
                                    type="password" className='bg-gray-900 w-full text-gray-200 border-0 rounded-md p-2 focus:outline-none focus:ring-1 focus:ring-blue-500 transition ease-in-out duration-150'
                                    placeholder='Password should match'
                                //onChange={(e) => setConfirmPassword(e.target.value)}
                                />
                                <div className="min-h-[2px]">
                                    {errors.confirmPassword && touched.confirmPassword && (
                                        <p className="text-red-500 text-sm">{errors.confirmPassword}</p>
                                    )}
                                </div>
                            </div>
                        }
                        {register ? <button type='submit' className='toast-button bg-green-700 w-full text-white font-bold text-center hover:bg-green-600 border-none rounded-lg h-10' >Sign up</button>
                            :
                            <div>
                                <button className='bg-green-700 w-full mb-5 text-white font-bold text-center hover:bg-green-600 border-none rounded-lg h-10'
                                    type='submit'>Sign in</button>

                                <div className="flex items-center mb-5">
                                    <hr className='w-50' />
                                    <span className='ms-5 me-5'>or</span>
                                    <hr className='w-50' />
                                </div>

                                <GoogleLogin
                                    onSuccess={credentialResponse => {
                                        console.log(credentialResponse);
                                        handleGoogleLogin(credentialResponse)
                                    }}
                                    onError={() => {
                                        console.log('Login Failed');
                                    }}
                                />

                            </div>

                        }

                    </form>

                    {
                        register ?
                            <div>
                                <p className='text-center mt-5'>Already have an account?
                                    <Link to='/login'><span className='text-blue-400 ms-3'>

                                        Sign in</span></Link></p>
                            </div>
                            :
                            <div>
                                <p className='text-center mt-5'>New to LangNest?
                                    <Link to='/register'>
                                        <span className='text-blue-400 ms-3'>Create an account</span>
                                    </Link></p>
                            </div>
                    }
                </div>
                <Toaster position="top-center" richColors />
            </div>

        </div>
    )
}

export default Auth
