"use client";

import Image from "next/image";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import BannerText from "./bannerText";
import { ArrowLeft, ArrowRight } from "lucide-react";

import bannerone from "@/images/bannerone.png";
import bannertwo from "@/images/bannertwo.png";
import bannerthree from "@/images/bannerthree.png";
import { useStore } from "@/hooks/use-store";
import { useSidebarToggle } from "@/hooks/use-sidebar-toggle";
import { cn } from "@/lib/utils";
import Slider from "react-slick";

const Banner = () => {
  const sidebar = useStore(useSidebarToggle, (state) => state);

  if (!sidebar) return null;

  const NextArrow = (props: any) => {
    const { onClick } = props;
    return (
      <div
        className="p-2 lg:p-3 bg-slate-100 dark:bg-slate-500 hover:text-orange-600 hover:bg-white cursor-pointer duration-200 rounded-full text-2xl flex items-center justify-center z-20 absolute left-2 top-[40%] lg:top-1/2"
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
        className=" p-2 lg:p-3 bg-slate-100 dark:bg-slate-500 hover:text-orange-600 hover:bg-white cursor-pointer duration-200 rounded-full text-2xl flex items-center justify-center z-20 absolute right-2 top-[40%] lg:top-1/2"
        onClick={onClick}
      >
        <ArrowRight />
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
    cssEase: "ease-out" // Ensure smooth transitions
  };

  return (
    <div
      className={cn(
        "relative  w-full  flex justify-center items-center overflow-hidden ",
        sidebar?.isOpen === false
          ? "lg:w-[calc(95vw-90px)]"
          : "lg:w-[calc(95vw-18rem)]"
      )}
    >
      <div
        className={cn(
          " relative w-full  rounded-lg  bg-gradient-to-tr dark:from-[#252525] dark:to-[#0a0a0a] from-[#e0e0e0] to-[#808081b7] bg-opacity-5 shadow-xl backdrop-filter backdrop-blur-lg  lg:border border-black dark:border-white border-opacity-10 dark:border-opacity-10 ",
          sidebar?.isOpen === false
            ? "lg:w-[calc(95vw-90px)]"
            : "lg:w-[calc(95vw-18rem)]"
        )}
      >
        <div className="absolute w-[4rem] lg:w-[7rem] h-[12rem] rounded-xl -z-50 bg-gradient-to-tr top-0 left-0 from-[#fff566fb] to-[#1e1c36] bg-opacity-30  shadow-xl border  rotate-[30deg] dark:border-opacity-30 blur-3xl"></div>
        <div className="absolute w-[4rem] lg:w-[5rem] h-[12rem] rounded-xl -z-50 bg-gradient-to-tr bottom-0   right-0 from-[#ebf37ffb] to-[#1e1c36] bg-opacity-30  shadow-xl border border-white rotate-[30deg] dark:border-opacity-30 blur-3xl"></div>

        <Slider {...settings}>
          <div
            className={cn(
              " w-full h-full relative ",
              sidebar?.isOpen === false
                ? "lg:w-[calc(95vw-90px)]"
                : "lg:w-[calc(95vw-18rem)]"
            )}
          >
            <Image
              src={bannerone}
              alt="bannerone"
              className={cn(
                " w-full h-full relative object-cover ",
                sidebar?.isOpen === false
                  ? "lg:w-[calc(95vw-90px)]"
                  : "lg:w-[calc(95vw-18rem)]"
              )}
              priority
            />
            <BannerText title="Outware Picks" />
          </div>
          <div
            className={cn(
              " w-full h-full relative ",
              sidebar?.isOpen === false
                ? "lg:w-[calc(95vw-90px)]"
                : "lg:w-[calc(95vw-18rem)]"
            )}
          >
            <Image
              src={bannertwo}
              alt="bannertwo"
              className={cn(
                " w-full h-full relative ",
                sidebar?.isOpen === false
                  ? "lg:w-[calc(95vw-90px)]"
                  : "lg:w-[calc(95vw-18rem)]"
              )}
            />
            <BannerText title="Seasonal Offers" />
          </div>
          <div
            className={cn(
              " w-full h-full relative ",
              sidebar?.isOpen === false
                ? "lg:w-[calc(95vw-90px)]"
                : "lg:w-[calc(95vw-18rem)]"
            )}
          >
            <Image
              src={bannerthree}
              alt="bannerthree"
              className={cn(
                " w-full h-full relative ",
                sidebar?.isOpen === false
                  ? "lg:w-[calc(95vw-90px)]"
                  : "lg:w-[calc(95vw-18rem)]"
              )}
            />
            <BannerText title="Best for men" />
          </div>
        </Slider>
      </div>
    </div>
  );
};

export default Banner;
