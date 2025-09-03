import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const variantConfigs = {
  fadeUp: {
    from: { y: 40, opacity: 0 },
    to: { y: 0, opacity: 1 }
  },
  fadeIn: {
    from: { opacity: 0 },
    to: { opacity: 1 }
  },
  slideLeft: {
    from: { x: 60, opacity: 0 },
    to: { x: 0, opacity: 1 }
  },
  slideRight: {
    from: { x: -60, opacity: 0 },
    to: { x: 0, opacity: 1 }
  },
  zoomIn: {
    from: { scale: 0.9, opacity: 0 },
    to: { scale: 1, opacity: 1 }
  }
};

const AnimateOnScroll = ({
  children,
  as: Component = "div",
  className = "",
  variant = "fadeUp",
  duration = 0.8,
  delay = 0,
  stagger = 0.12,
  once = false,
  start = "top 75%",
  scrub = false,
  itemsSelector,
  ...rest
}) => {
  const containerRef = useRef(null);

  useEffect(() => {
    const elem = containerRef.current;
    if (!elem) return;

    const config = variantConfigs[variant] || variantConfigs.fadeUp;
    const targets = itemsSelector
      ? elem.querySelectorAll(itemsSelector)
      : elem;

    const tween = gsap.fromTo(
      targets,
      { ...config.from },
      {
        ...config.to,
        duration,
        delay,
        ease: "power2.out",
        stagger: itemsSelector ? stagger : 0,
        scrollTrigger: {
          trigger: elem,
          start,
          toggleActions: once ? "play none none none" : "play none none reverse",
          scrub
        }
      }
    );

    return () => {
      if (tween) tween.kill();
    };
  }, [variant, duration, delay, stagger, once, start, scrub, itemsSelector]);

  return React.createElement(Component, { ref: containerRef, className, ...rest }, children);
};

export default AnimateOnScroll;


