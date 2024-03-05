'use client'
import {AnimatePresence, motion} from 'framer-motion'
import { useEffect, useState } from 'react'

const expand = {
    initial: {
        top: 0
    },
    enter: (i) => ({    
        top: "100vh",
        transition: {
            duration: 0.4,
            delay: 0.05 * i,
            ease: [0.215, 0.61, 0.355, 1],
        },
        transitionEnd: { height: "0", top: "0" }
    }),

    exit: (i) => ({
        height: "100vh",
        transition: {
            duration: 0.4,
            delay: 0.05 * i,
            ease: [0.215, 0.61, 0.355, 1]
        }
    })
}


const opacity = {
    initial: {
        opacity: 0.5
    },
    enter: {
        opacity: 0
    },
    exit: {
        opacity: 0.5,
    }
}

export default function Stairs({children, backgroundColor}) {
    const [logoVisible, setLogoVisible] = useState(true);

    const anim = (variants, custom=null) => {
        return {
            initial: "initial",
            animate: "enter",
            exit: "exit",
            custom,
            variants
        }
    }
    const nbOfColumns = 5

    useEffect(() => {
        // Initially, logo is visible
        setLogoVisible(true);
        // Set up a delay that matches the total duration of the expand animation
        const totalAnimationTime = 0.4 + 0.05 * nbOfColumns; // Adjust based on your actual timing
        const timer = setTimeout(() => {
            setLogoVisible(false);
        }, totalAnimationTime * 1000); // Convert seconds to milliseconds

        // Clean up the timer if the component unmounts
        return () => clearTimeout(timer);
    }, []); 

    const logo = {
        initial: {
            opacity: 1, 
            transition: {
                duration: 0.5 * nbOfColumns,
                ease: [0.215, 0.61, 0.355, 1]
            }
        },
        enter: {
            opacity: 0
        },
        exit: {
            opacity: 1, 
            transition: {
                duration: 0.5 * nbOfColumns,
                ease: [0.215, 0.61, 0.355, 1]
            }
        }
    }
    return (
        <div className='page stairs' style={{backgroundColor}}>
            <motion.div {...anim(logo)}  className="fixed pointer-events-none top-2 left-3 font-monument uppercase z-30 text-white">
                Dialect Labs
            </motion.div>
            <motion.div {...anim(opacity)} className='fixed w-full h-[100vh] bg-black z-10 pointer-events-none top-0 left-0'/>
            <div className='fixed w-[100vw] h-[100vh] flex left-0 top-0 pointer-events-none z-20'>
                {
                    [...Array(nbOfColumns)].map( (_, i) => {
                        return (
                            <motion.div className='relative w-full h-full bg-black' key={i} {...anim(expand, nbOfColumns - i)}/>
                        ) 
                    })
                }
            </div>
            <div className='h-[100vh]'>
            {children}
            </div>
        </div>
    )
}
