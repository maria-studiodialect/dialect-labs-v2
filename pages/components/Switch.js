import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { GrSun } from "react-icons/gr";
import { FiMoon } from "react-icons/fi";



const Switch = ({isOn, setIsOn}) => {

    // Conditional classes
    const containerClasses = `flex items-center box-border px-[5px] py-1 cursor-pointer transition-all duration-300 rounded-full drop-shadow ${isOn ? 'bg-[#52527a]' : 'bg-black'}`;
    const handleClasses = "h-[20px] w-[20px] rounded-full grid items-center justify-items-center bg-white overflow-hidden";
    const iconClasses = `far ${isOn ? 'text-[#501a96]' : 'text-[#C69D91ff]'}`;

    return (

        <div 
        className={containerClasses} 
        data-darkmode={isOn}
        onClick={(e) => (  e.preventDefault, setIsOn(!isOn))}
        style={{ justifyContent: isOn ? 'flex-end' : 'flex-start', ...(isOn ? {backgroundImage: "linear-gradient(109.8deg, rgba(239, 230, 227, 1) -5.2%, rgba(9, 1, 38, 1) -5.2%, rgba(198, 177, 173, 1) 103.3%)"} : {backgroundImage: "linear-gradient(109.8deg, rgba(140, 123, 114, 1) -5.2%, rgba(231,229,228,1) -5.2%, rgba(184, 144, 132, 1) 103.3%)"}) }}
        >
        <motion.div layout className={handleClasses}>
            <AnimatePresence mode='wait' initial={false}>
            <motion.i
                className={iconClasses}
                key={isOn ? 'moon' : 'sun'}
                initial={{ y: -30, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: 30, opacity: 0 }} 
                transition={{ duration: .2 }}
            >
                {isOn ? <FiMoon /> : <GrSun/> }
            </motion.i>
            </AnimatePresence>
        </motion.div>
        </div>
    );
}

export default Switch;