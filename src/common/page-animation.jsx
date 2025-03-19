import {AnimatePresence,motion} from "framer-motion";
// AnimatePresence took control or give control of motion 

const AnimationWrapper = ({children,initial={opacity:0},animate={opacity:1},transition ={duration:1},keyvalue,classname}) =>{
    return (
        <AnimatePresence>
        <motion.div
        key={keyvalue}
        initial={initial}
animate={animate}
transition={transition}
className={classname}
        >
{/* key value is given so that for different sign and signup form it will again reder and also shows motion effect  */}
{/* as previously we were toggling between signin and signup no animation we have seen beacause as button clicked type changed so react changes where type is there and nothing else like the pages mounted or reloads unnecessary giving key with type value will amke chage in type making react helpless to reload or mount wrapper class again to run due to which toggling makes wrapper again reloads or run component and make transition occurs  */}

            {children}
        </motion.div>
        </AnimatePresence>
    )
}

export default AnimationWrapper;