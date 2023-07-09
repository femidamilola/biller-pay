"use client";
import Link from "next/link";
import { FC, useCallback, useRef, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation } from "swiper/modules";
import Image, { StaticImageData } from "next/image";
import ArrowLeft from "../icons/ArrowLeft";
import ArrowRight from "../icons/ArrowRight";
import { Swiper as SwiperCore } from "swiper/types";

interface Props {
  title: string;
  contentArr: Array<{ id: number; image: StaticImageData; header?: string }>;
  link: string;
  linkType?: string;
}

const CollectionCarousel: FC<Props> = ({
  title,
  contentArr,
  link,
  linkType,
}) => {
  const swiperRef = useRef<SwiperCore>();
  const nextRef = useRef<any>(null);

  const [endState, setEndState] = useState(false);
  const [startState, setStartState] = useState(true);

  const handleSlideChange = () => {
    if (swiperRef.current && swiperRef.current.isEnd) {
      setEndState(true);
      setStartState(false);
    } else if (swiperRef.current && swiperRef.current.isBeginning) {
      setEndState(false);
      setStartState(true);
    } else {
      setEndState(false);
      setStartState(false);
    }
  };

  const handleNext = useCallback(() => {
    swiperRef.current?.slideNext();
  }, []);

  const handlePrev = useCallback(() => {
    swiperRef.current?.slidePrev();
  }, []);

  const autoplay = {
    delay: 9000,
    disableOnInteraction: true,
  };

  const breakpoints = {
    "1200": {
      slidesPerView: 5,
      spaceBetween: 3,
    },

    "1000": {
      slidesPerView: 4,
      spaceBetween: 2,
    },
    "600": {
      slidesPerView: 4,
      spaceBetween: 10,
    },
    "460": {
      slidesPerView: 3,
      spaceBetween: 5,
    },

    "0": {
      slidesPerView: 2,
      spaceBetween: 2,
    },
  };

  return (
    <div className="carousel-collection">
      <div className="flex justify-between items-center ">
        <h4 className=" font-semibold text-[26px] lg:text-[40px] font-grotesk  ">
          {title}
        </h4>
        <div className="flex items-center gap-5 ">
          <Link href={link} className="text-[18px] lg:text-[23px]  ">
            See more
          </Link>
          <div className=" hidden lg:flex items-center gap-5">
            <button
              className="carousel-btn"
              onClick={handlePrev}
              disabled={startState}
            >
              <ArrowLeft />
            </button>
            <button
              className="carousel-btn"
              onClick={handleNext}
              disabled={endState}
            >
              <ArrowRight />
            </button>
          </div>
        </div>
      </div>
      <div className="mt-[25px] lg:mt-[60px] ">
        <Swiper
          onSlideChange={handleSlideChange}
          modules={[Navigation, Autoplay]}
          // autoplay={autoplay}
          cssMode={true}
          breakpoints={breakpoints}
          navigation={{
            nextEl: nextRef.current,
          }}
          onBeforeInit={(swiper) => {
            swiperRef.current = swiper;
          }}
        >
          {contentArr.map((item) => (
            <SwiperSlide className="" key={`collection-${item.id}`}>
              <Link
                href={linkType ? `/${linkType}/${item.id}` : ""}
                className="rounded-[0.721rem] relative flex items-center justify-center bg-white h-[100px] w-[150px] md:w-[200px] lg:h-[140px]  lg:w-[240px]  "
              >
                <Image
                  src={item.image}
                  alt="img"
                  className=" rounded-[0.721rem] w-[90%] h-[85%] aspect-[3/2] object-contain  "
                  sizes="100%"
                />
              </Link>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
};
export default CollectionCarousel;
