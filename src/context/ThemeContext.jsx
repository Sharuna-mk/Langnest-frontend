import React, { createContext, useEffect, useState } from 'react'

export const ThemeContextShare = createContext();
function ThemeContext({children}) {

    const [theme,setTheme]= useState(
        () => {
    return localStorage.getItem("theme") || "light";
  }
    );

    

    const toggleTheme = ()=>{
      setTheme(prev => {
      const newTheme = prev === "light" ? "dark" : "light";
      localStorage.setItem("theme", newTheme);
      return newTheme;
    })
    }
    useEffect(()=>{
        document.documentElement.classList.toggle("dark",theme === "dark")
    },[theme])
  return (
    <ThemeContextShare.Provider  value={{ theme, toggleTheme }}>
      {
        children
      }
    </ThemeContextShare.Provider>
  )
}

export default ThemeContext
