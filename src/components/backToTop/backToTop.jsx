import React, { useEffect, useState } from "react"
import { FaChevronCircleUp } from "react-icons/fa";

const BackToTop = () =>{

    const [isVisible, setIsVisible] = useState(false)

    useEffect(() =>{
        const toggleVisibility = () =>{
            if(window.scrollY > 300) {
                setIsVisible(true)
            } else{
                setIsVisible(false)
            }
        } ;

        window.addEventListener("scroll", toggleVisibility);

        return () => window.removeEventListener("scroll", toggleVisibility);
    }, []);

    const ScrollToTop = () =>{
        window.scrollTo({
            top:0,
            behavior: "smooth",
        });
    };

    return(
        <>
            <div>
                {isVisible && (
                    <button
                        onClick={ScrollToTop}
                        aria-label="Back to top"
                        title="Back to top"
                        className="fixed right-6 bottom-6 w-12 h-12 rounded-full bg-[#0e2c6d] text-[#ffcb08] flex items-center justify-center shadow-[0_6px_20px_rgba(0,0,0,0.25)] cursor-pointer z-[9999] hover:bg-[#0b2355] hover:shadow-xl active:scale-95 transition duration-200 ease-out"
                    >
                        <FaChevronCircleUp size={28} />
                    </button>
                )}
            </div>
        </>
    )
}

export default BackToTop;