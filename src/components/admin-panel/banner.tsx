import React, { useState, useEffect } from "react";
import Image from "next/image";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { ArrowLeft, ArrowRight } from "lucide-react";
import bannerone from "@/images/bannerone.png";
import bannertwo from "@/images/bannertwo.png";
import bannerthree from "@/images/bannerthree.png";
import Slider from "react-slick";
import { useSidebarToggle } from "../../hooks/use-sidebar-toggle";
import { useStore } from "zustand";
import { cn } from "../../lib/utils";

const Banner = () => {
  const sidebar = useStore(useSidebarToggle, (state) => state);
  const [showFeatures, setShowFeatures] = useState(false);
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const handleResize = () => {
      const topDiv = document.querySelector(".top-div") as HTMLElement | null;
      if (topDiv) {
        setShowFeatures(topDiv.offsetWidth >= 1024);
      }
    };

    // Initialize the check
    handleResize();

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  if (!sidebar) return null;

  const NextArrow = (props: any) => {
    const { onClick } = props;
    return (
      <div
        className="hidden p-2 lg:p-3 bg-slate-100 dark:bg-slate-500 hover:text-orange-600 hover:bg-white cursor-pointer duration-200 rounded-full text-2xl lg:flex items-center justify-center z-20 absolute left-2 top-[40%] lg:top-1/2"
        onClick={onClick}
      >
        <ArrowLeft />
      </div>
    );
  };

  const PrevArrow = (props: any) => {
    const { onClick } = props;
    return (
      <div
        className="hidden p-2 lg:p-3 bg-slate-100 dark:bg-slate-500 hover:text-orange-600 hover:bg-white cursor-pointer duration-200 rounded-full text-2xl lg:flex items-center justify-center z-20 absolute right-2 top-[40%] lg:top-1/2"
        onClick={onClick}
      >
        <ArrowRight />
      </div>
    );
  };

  const settings = {
    dots: true,
    infinite: true,
    autoplay: true,
    centerMode: showFeatures ? true : false,
    centerPadding: "300px",
    slidesToShow: 1,
    speed: 400,
    slidesToScroll: 1,
    arrows: true,
    nextArrow: <NextArrow />,
    prevArrow: <PrevArrow />,
    cssEase: "ease-out", // Ensure smooth transitions
    beforeChange: (current: any, next: any) => setCurrentSlide(next)
  };

  return (
    <div>
      <div>
        {/* <div className="absolute w-[4rem] h-[3rem] lg:w-[7rem] md:h-[12rem] rounded-xl -z-50 bg-gradient-to-tr top-0 left-0 from-[#fff566fb] to-[#1e1c36] bg-opacity-30 shadow-xl border rotate-[30deg] dark:border-opacity-30 blur-3xl"></div>
        <div className="absolute w-[4rem] h-[3rem] lg:w-[5rem] md:h-[12rem] rounded-xl -z-50 bg-gradient-to-tr bottom-0 right-0 from-[#ebf37ffb] to-[#1e1c36] bg-opacity-30 shadow-xl border border-white rotate-[30deg] dark:border-opacity-30 blur-3xl"></div> */}

        <Slider {...settings}>
          {[bannerone, bannertwo, bannerthree].map((banner, index) => (
            <div
              key={index}
              className={cn(
                "w-full h-full flex justify-between relative transition-all duration-500",
                currentSlide === index ? " " : "blur-sm opacity-30 "
              )}
            >
              <Image
                src={banner}
                alt={`banner${index + 1}`}
                className={cn(
                  "w-full h-full relative",
                  sidebar?.isOpen === false
                    ? "lg:w-[calc(95vw-90px)]"
                    : "lg:w-[calc(95vw-18rem)]"
                )}
                priority
              />
              {/* <BannerText title={index === 0 ? "Outware Picks" : index === 1 ? "Seasonal Offers" : "Best for men"} /> */}
            </div>
          ))}
        </Slider>
      </div>
    </div>
  );
};

export default Banner;
