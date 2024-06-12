"use client";
import Slider from "react-slick";
import bannerone from "@/images/bannerone.png";
import bannertwo from "@/images/bannertwo.png";
import bannerthree from "@/images/bannerthree.png";
import { PiCaretLeftLight, PiCaretRightLight } from "react-icons/pi";
import Image from "next/image";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import BannerText from "./bannerText";

const Banner = () => {
  const NextArrow = (props) => {
    const { onClick } = props;
    return (
      <div
        className="p-2 lg:p-3 bg-slate-100 dark:bg-slate-500 hover:text-orange-600 hover:bg-white cursor-pointer duration-200 rounded-full text-2xl flex items-center justify-center z-20 absolute left-2 top-[40%] lg:top-1/2"
        onClick={onClick}
      >
        <PiCaretLeftLight />
      </div>
    );
  };
  const PrevArrow = (props) => {
    const { onClick } = props;
    return (
      <div
        className=" p-2 lg:p-3 bg-slate-100 dark:bg-slate-500 hover:text-orange-600 hover:bg-white cursor-pointer duration-200 rounded-full text-2xl flex items-center justify-center z-20 absolute right-2 top-[40%] lg:top-1/2"
        onClick={onClick}
      >
        <PiCaretRightLight />
      </div>
    );
  };

  const settings = {
    dots: false,
    infinite: true,
    autoplay: true,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: true,
    nextArrow: <NextArrow />,
    prevArrow: <PrevArrow />,
    cssEase: "ease-out", // Ensure smooth transitions
  };

  return (
    <div className="relative w-[90vw] lg:w-[80vw] flex justify-center items-center overflow-hidden   ">
      {/* <div className="absolute inset-0 -z-10 overflow-hidden pointer-events-none">
        <div className="absolute inset-0 before:content-[''] before:absolute before:top-0 before:left-1/2 before:w-[72.1875rem] before:h-[72.1875rem] before:bg-gradient-to-tr before:from-[#ff80b5] before:to-[#e3fc89] before:opacity-30 before:rotate-[30deg] before:transform-gpu before:blur-3xl before:-translate-x-1/2 before:-translate-y-1/2"></div>
        <div className="absolute inset-0 after:content-[''] after:absolute after:top-0 after:left-1/2 after:w-[72.1875rem] after:h-[72.1875rem] after:bg-gradient-to-tr after:from-[#1a233d] after:to-[#8089fc] after:opacity-30 after:rotate-[30deg] after:transform-gpu after:blur-3xl after:-translate-x-1/2 after:-translate-y-1/2"></div>
      </div> */}

      <div className="relative w-[90vw] lg:w-[80vw] rounded-lg  bg-gradient-to-tr dark:from-[#363535] dark:to-[#10131b] from-[#e0e0e0] to-[#808081b7] bg-opacity-5 shadow-xl backdrop-filter backdrop-blur-lg  lg:border border-black dark:border-white border-opacity-10 dark:border-opacity-30">
        <div className="absolute w-[4rem] lg:w-[7rem] h-[12rem] rounded-xl -z-50 bg-gradient-to-tr top-0 left-0 from-[#fff566fb] to-[#1e1c36] bg-opacity-30  shadow-xl border  rotate-[30deg] dark:border-opacity-30 blur-3xl"></div>
        <div className="absolute w-[4rem] lg:w-[5rem] h-[12rem] rounded-xl -z-50 bg-gradient-to-tr bottom-0   right-0 from-[#ebf37ffb] to-[#1e1c36] bg-opacity-30  shadow-xl border border-white rotate-[30deg] dark:border-opacity-30 blur-3xl"></div>

        <Slider {...settings}>
          <div className="z-50 opacity-95 h-full relative">
            <Image
              src={bannerone}
              alt="bannerone"
              className="object-cover rounded-lg"
              priority
            />
            <BannerText title="Outware Picks" />
          </div>
          <div className="h-full w-[90vw] lg:w-[80vw] relative">
            <Image
              src={bannertwo}
              alt="bannertwo"
              className="object-cover w-[90vw] lg:w-[80vw] rounded-lg"
            />
            <BannerText title="Seasonal Offers" />
          </div>
          <div className="h-full relative">
            <Image
              src={bannerthree}
              alt="bannerthree"
              className="object-cover rounded-lg"
            />
            <BannerText title="Best for men" />
          </div>
        </Slider>
      </div>
    </div>
  );
};

export default Banner;
