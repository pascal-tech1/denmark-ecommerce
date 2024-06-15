import { Button } from "../ui/button";
import Container from "./Container";
import { motion } from "framer-motion";

const BannerText = ({ title }: { title: string }) => {
  return (
    <div className=" lg:absolute top-0 left-16 bg-background lg:bg-transparent   w-[95vw] lg:w-[80vw] h-full">
      <div className="flex h-full flex-col gap-y-3 lg:gap-y-6 justify-center overflow-hidden max-w-screen-xl mx-auto px-10 xl:px-0 py-6">
        <motion.h2
          initial={{ y: 40, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.7 }}
          className=" text-2xl md:text-3xl min-[1280px]:text-6xl lg:text-4xl lg:text-white  drop-shadow font-bold"
        >
          {title}
        </motion.h2>

        <motion.p
          initial={{ y: 40, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.7 }}
          className=" md:inline-block lg:text-lg lg:text-white w-full"
        >
          Stock up on sportswear and collections on our <br />
          awesome mid-season sale.
        </motion.p>
        <motion.div
          initial={{ y: 40, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.7 }}
          className="flex gap-x-4 lg:mt-2"
        >
          <Button variant={"ghost"} className=" border border-opacity-30 border-yellow-600 whitespace-nowrap ">
            Find out more
          </Button>
          <Button
            variant={"default"}
            className=" whitespace-nowrap bg-yellow-400  hover:bg-yellow-500 dark:hover:bg-yellow-400 dark:bg-yellow-200 "
          >
            Shop Now
          </Button>
        </motion.div>
      </div>
    </div>
  );
};

export default BannerText;
