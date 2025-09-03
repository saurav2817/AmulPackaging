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
  fadeDown: {
    from: { y: -40, opacity: 0 },
    to: { y: 0, opacity: 1 }
  },
  fadeLeft: {
    from: { x: 40, opacity: 0 },
    to: { x: 0, opacity: 1 }
  },
  fadeRight: {
    from: { x: -40, opacity: 0 },
    to: { x: 0, opacity: 1 }
  },
  slideLeft: {
    from: { x: 60, opacity: 0 },
    to: { x: 0, opacity: 1 }
  },
  slideRight: {
    from: { x: -60, opacity: 0 },
    to: { x: 0, opacity: 1 }
  },
  slideUp: {
    from: { y: 60, opacity: 0 },
    to: { y: 0, opacity: 1 }
  },
  slideDown: {
    from: { y: -60, opacity: 0 },
    to: { y: 0, opacity: 1 }
  },
  zoomIn: {
    from: { scale: 0.9, opacity: 0 },
    to: { scale: 1, opacity: 1 }
  },
  zoomOut: {
    from: { scale: 1.1, opacity: 0 },
    to: { scale: 1, opacity: 1 }
  },
  rotateIn: {
    from: { rotation: -10, opacity: 0 },
    to: { rotation: 0, opacity: 1 }
  },
  rotateInClockwise: {
    from: { rotation: 10, opacity: 0 },
    to: { rotation: 0, opacity: 1 }
  },
  flipX: {
    from: { rotationX: -90, transformPerspective: 400, opacity: 0 },
    to: { rotationX: 0, transformPerspective: 400, opacity: 1 }
  },
  flipY: {
    from: { rotationY: -90, transformPerspective: 400, opacity: 0 },
    to: { rotationY: 0, transformPerspective: 400, opacity: 1 }
  },
  skewIn: {
    from: { skewY: 6, opacity: 0 },
    to: { skewY: 0, opacity: 1 }
  },
  blurIn: {
    from: { filter: "blur(8px)", opacity: 0 },
    to: { filter: "blur(0px)", opacity: 1 }
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


