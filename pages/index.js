'use client'
import { useMotion } from "@react-three/drei";
import { AnimatePresence, easeInOut, motion, useTransform, useMotionValue } from "framer-motion"
import NextImage from "next/image";
import { useState, useEffect, useRef } from "react";
import Loader from "./components/Loader";
import Link from "next/link";
import Inner from "./components/Layout/Inner";
import Logo from "./components/Logo";
import Stairs from "./components/Layout/Stairs";

const Demos = [
  { name: 'Ro', name2: 'cks', img: '/thumbnails/rocks.jpg',img2: '/thumbnails/rocks2.jpg', img3:'/thumbnails/rocks3.jpg' , link: '/rocks', info: 'Suspendisse at sem at metus.'},
  { name: 'Chame', name2: 'leon', img: '/thumbnails/cham.jpg', img2: '/thumbnails/cham2.jpg', img3:'/thumbnails/cham3.jpg' , link: '/glass', info: 'lacus sit amet urna sagittis.' },
  { name: 'Scroll ', name2: ' Portals', img: '/thumbnails/scroll1.jpg', img2: '/thumbnails/scroll2.jpg', img3:'/thumbnails/scroll3.jpg' , link: '/portalsScroll', info: 'lacus sit amet urna.' },
  { name: 'Port', name2: 'als', img: '/thumbnails/portals.jpg', img2: '/thumbnails/portals2.jpg', img3:'/thumbnails/portals3.jpg', link: '/portals', info: 'Sed vitae lacus non sem eleifend commodo.' },
  { name: 'Face ', name2: ' Controls', img: '/thumbnails/cham.jpg', img2: '/thumbnails/cham2.jpg', img3:'/thumbnails/cham3.jpg' , link: 'https://xn3z2w.csb.app/ ', info: 'Sed auctor tempor congue mauris.' },
]



export default function Home() {
  const [isLoaded, setIsLoaded] = useState(false)

    useEffect(() => {
    // Function to check the hash and update the loader state
    const checkHashAndLoad = () => {
      const hash = window.location.hash;
      // If the URL hash matches '#home', set the loader to loaded
      if (hash === '#home') {
        setIsLoaded(true);
      }
    };

    // Call the function on component mount and hash change
    checkHashAndLoad();
    window.addEventListener('hashchange', checkHashAndLoad, false);

    // Cleanup listener on component unmount
    return () => {
      window.removeEventListener('hashchange', checkHashAndLoad, false);
    };
  }, []);

  const containerVariants = {
    hidden: { }, // No initial state needed for the container in this case
    show: {
      transition: {
        staggerChildren: 0.1,
        delay: 0.2 // Adjust time to control the delay between each child animation
      },
    },
  };
  
  // Variants for the items
  const itemVariants = {
    hidden: { 
      y: 50, // Start 50px below the final position
      opacity: 0, // Start from transparent
    },
    show: {
      y: 0, // Move to final position
      opacity: 1, // Fade in to fully opaque
      transition: {
        type: "spring", // This is optional, adjust the animation type as needed
        duration: 0.5, // Duration of the animation
      },
    },
  };

  useEffect(() => {
    Demos.forEach(demo => {
      const img = new Image();
      img.src = demo.img;
    });
  }, []);

  setTimeout(() => {
    setIsLoaded(true);
  }, 1500);

    return (
      <>
      <Stairs>
      <Logo/>
      <div className="mx-[20%] flex flex-col items-center justify-center space-y-5 py-10 h-screen">
        <motion.ul
        initial="hidden" // Initial state before animation
        animate={isLoaded ? "show" : "hidden"} // State to animate to
        variants={containerVariants} // Applying the container variants
        >
        {Demos.map((demo, i) => (
          <motion.div variants={itemVariants} key={i} >
            <HoverableTextWithImage link={demo.link} info={demo.info} text={demo.name} text2={demo.name2} img1={demo.img} img2={demo.img2} img3={demo.img3} />
          </motion.div>
        ))}
        </motion.ul>
      </div>
      <AnimatePresence>
      <Loader isLoaded={isLoaded}/>
      </AnimatePresence>
      </Stairs>
      </>
      );
  
  
}

const RotatingImage = ({ src }) => {
  const [rotation, setRotation] = useState(0);

  const handleMouseMove = (e) => {
    const { clientX, clientY, currentTarget } = e;
    const { width, height, left, top } = currentTarget.getBoundingClientRect();
    const centerX = left + width / 2;
    const centerY = top + height / 2;
    const deltaX = clientX - centerX;
    const deltaY = clientY - centerY;
    const angle = Math.atan2(deltaY, deltaX) * (180 / Math.PI);
    setRotation(angle / 10);
  };

  console.log(rotation)
  return (
    <motion.div
      onMouseMove={handleMouseMove}
      onMouseLeave={() => setRotation(0)}
      style={{ display: 'inline-block' }}
      animate={{ rotate: rotation }}
      transition={{ type: 'spring', stiffness: 100 }}
    >
      <img src={src} alt="" style={{ width: '100%', height: 'auto' }} />
    </motion.div>
  );
};

function HoverableTextWithImage({ text, text2, img1, img2, img3, info, link}) {
  const [isHovered, setIsHovered] = useState(false);
  const [cursorPosition, setCursorPosition] = useState({ x: 0, y: 0 });
  const [mouseDirection, setMouseDirection] = useState('');
  const [xPos, setXPos] = useState(0);
  const [rotation, setRotation] = useState(0);
  const [isMoving, setIsMoving] = useState(0);


  useEffect(() => {
    let moveTimeout = null;


    const handleMouseMove = (event) => {
      clearTimeout(moveTimeout); // Clear any previous timeout to avoid resetting rotation too early

      const currentX = event.clientX;
      const currentY = event.clientY;
      // Update cursor position
      setCursorPosition({ x: currentX, y: currentY });

      // Determine mouse direction for horizontal movement
      if (currentX > cursorPosition.x) {
        setMouseDirection('right');
        setXPos(-100); // Assuming you want to adjust xPos based on direction, adjust values as needed
      } else {
        setMouseDirection('left');
        setXPos(100); // Adjust xPos based on direction
      }

      console.log(mouseDirection)

      // Calculate rotation based on mouse direction
      const rotationAngle = mouseDirection === 'right' ? 5 : -5;
      setRotation(rotationAngle);

      // Reset rotation after a delay of no movement
      moveTimeout = setTimeout(() => {
        setRotation(0);
      }, 100); // Adjust delay as needed

      // Update last known cursor position
      setCursorPosition({ x: currentX, y: currentY });
    };

    window.addEventListener('mousemove', handleMouseMove);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      if (moveTimeout) clearTimeout(moveTimeout);
    };
  }, [mouseDirection, cursorPosition]);

  console.log(cursorPosition)

  function getImage() {
    if (cursorPosition.x < 760) {
      return img1
    } else if (cursorPosition.x > 760 && cursorPosition.x < 950) {
      return img2
    } else {
      return img3
    }

  }
  return (
    <div>
      <Link
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        className={`${isHovered ? 'text-black' : 'text-gray-500'} text-8xl py-4 font-prophet uppercase hover:text-italic cursor-pointer z-0 hover:z-20 relative flex justify-center items-center`}
        href={link}
      >
        <motion.div>{text}</motion.div>
        <motion.div 
          initial={{ x: 0, opacity: 0 }}
          animate={{ x: isHovered ? 50 : 0, opacity: 1 }}
          transition={{ type: 'spring', ease: "easeInOut", duration: 0.3, bounce: 0.4}}
          className={`text-xs ${isHovered ? 'block' : 'hidden'} flex items-center space-x-2`}
        >
          {/*<div className="w-2 h-2 bg-black rounded-full mx-2"></div>*/}
          <div className="rounded-full border border-black px-2 pt-0.5 ">WebGL</div>
          <div className="rounded-full border border-black px-2 pt-0.5 ">Motion</div>
          <div className="rounded-full border border-black px-2 pt-0.5 ">Interactive</div>
        </motion.div>
        <motion.div
          initial={{ x: 0 }}
          animate={{ x: isHovered ? 130 : 0 }}
          transition={{ type: 'spring', ease: "easeInOut", duration: 0.5, bounce: 0.4}}
        >
          {text2}
        </motion.div>
      </Link>
      <div>
      <motion.div
        initial={{ rotate: 0 }}
        animate={{ rotate: rotation}}
        transition={{ stiffness: 100, damping: 50, ease: "easeInOut", duration: 0.2}}
        className={`absolute z-10 w-[400px] h-auto pointer-events-none bg-red rounded-lg`}
        style={{ top: `${cursorPosition.y}px`, left: `${cursorPosition.x}px` }}
      >
        <div className="overflow-hidden w-full h-full relative">
          <AnimatePresence>
            {isHovered && (
              <motion.div
                initial={{ x: xPos, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                exit={{ x: xPos, opacity: 0 }}
                transition={{ type: 'spring', bounce: 0, ease: "easeInOut", duration: 0.3 }}
              >
                <NextImage src={getImage()} alt="" className="w-full h-full bg-cover relative rounded-lg" width={400} height={200} priority />
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </motion.div>
      </div>
    </div>
  );
};