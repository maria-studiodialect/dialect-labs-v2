import { motion, AnimatePresence } from "framer-motion";

export default function Loader({isLoaded}) {
    // Variants for the text animations
    const textVariants = {
        initial: (direction) => ({
            x: direction === "left" ? -800 : 800,
            opacity: 0,
        }),
        animate: {
            x: 0,
            opacity: 1,
            transition: { type: "spring", ease: 'easeInOut', duration: 0.65 },
        },
        exit: (direction) => ({
            y: direction === "left" ? -400 : 400,
            opacity: 0,
            transition: { type: "tween", ease: 'easeInOut', duration: 0.5 },
        }),
    };

    // Background variants, adjusted to handle isLoaded
    const bgVariants = {
        initial: { backgroundColor: "#000", opacity: 1 },
        animate: isLoaded ? { opacity: 0, transition: { duration: 0.5 } } : {},
        exit: { opacity: 0, transition: { duration: 0.5 } },
    };

    return (
        <motion.div
            className="bg-black pointer-events-none text-2xl w-full h-full font-monument uppercase flex flex-col justify-center items-center text-white z-30 fixed top-0 left-0"
            variants={bgVariants}
            initial="initial"
            animate="animate"
            exit="exit"
        >
            <AnimatePresence>
                {!isLoaded &&
                <>
                    <motion.div
                        custom="left"
                        variants={textVariants}
                        initial="initial"
                        animate="animate"
                        exit="exit"
                    >
                        Dialect
                    </motion.div>
                    <motion.div
                        custom="right"
                        variants={textVariants}
                        initial="initial"
                        animate="animate"
                        exit="exit"
                    >
                        Labs
                    </motion.div>
                </>
                }
            </AnimatePresence>
        </motion.div>
    );
}