import React, { useEffect, useRef } from "react";
import { motion, useInView, useAnimation } from "framer-motion";

const ScrollReveal = ({
  children,
  threshold = 0.1, // How much of the element must be in view
  delay = 0, // Delay before animation starts (in seconds)
  duration = 0.5, // Animation duration (in seconds)
  direction = "up", // Animation direction: up, down, left, right
  distance = 50, // Distance to travel
  once = true, // Only animate once
  ...props
}) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once, threshold });
  const controls = useAnimation();

  // Set up animation variants based on direction
  const getVariants = () => {
    let initial = { opacity: 0 };

    switch (direction) {
      case "up":
        initial.y = distance;
        break;
      case "down":
        initial.y = -distance;
        break;
      case "left":
        initial.x = distance;
        break;
      case "right":
        initial.x = -distance;
        break;
      default:
        initial.y = distance;
    }

    return {
      hidden: initial,
      visible: {
        opacity: 1,
        x: 0,
        y: 0,
        transition: {
          duration,
          delay,
          ease: [0.25, 0.1, 0.25, 1.0], // cubic-bezier easing
        },
      },
    };
  };

  useEffect(() => {
    if (isInView) {
      controls.start("visible");
    } else if (!once) {
      controls.start("hidden");
    }
  }, [isInView, controls, once]);

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={controls}
      variants={getVariants()}
      {...props}
    >
      {children}
    </motion.div>
  );
};

export default ScrollReveal;
