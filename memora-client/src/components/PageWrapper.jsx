import { motion } from "framer-motion";
import { slideUp, transition } from "../lib/motion";

export default function PageWrapper({children}){
    return(
        <motion.div
        variants={slideUp}
        initial="initial"
        animate="animate"
        exit="exit"
        transition={transition}>
            {children}
        </motion.div>
    )
}