'use client'
import {AnimatePresence, motion} from 'framer-motion'

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

    return (

        <div className='page stairs' style={{backgroundColor}}>

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
