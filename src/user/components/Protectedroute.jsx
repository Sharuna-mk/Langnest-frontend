import React from 'react'
import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

function Protectedroute({ children }) {
    const navigate = useNavigate()

    const token = sessionStorage.getItem("token");
    return token ? children : navigate("/login")

}

export default Protectedroute
