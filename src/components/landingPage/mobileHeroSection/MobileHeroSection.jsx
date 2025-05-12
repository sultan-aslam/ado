"use client";
import React, { useEffect } from "react";
import { RightArrow } from "@/components/Icons/RightArrow";
import { LeftArrow } from "@/components/Icons/LeftArrow";
import Slider from "react-slick";
import MobileHeroSlider from "./MobileHeroSlider";
import styles from "./mobileHeroSection.module.css";
import { useAppDispatch, useAppSelector } from "@/store/reduxHooks";
import { fetchHeroBanners } from "@/store/features/hero/heroSlice";
import Image from "next/image";
import LeftArrowMobileSlider from "../../../../public/images/LeftArrowMobileSlider.svg";
import RightArrowMobileSlider from "../../../../public/images/RightArrowMobileSlider.svg";

const MobileHeroSection = () => {
  const dispatch = useAppDispatch();
  const { data, loading, error } = useAppSelector((state) => state.hero);

  useEffect(() => {
    if (data?.length === 0) {
      dispatch(fetchHeroBanners());
    }
  }, [data?.length, dispatch]);

  function NextArrow(props) {
    const { onClick } = props;
    return (
      <div className={styles.next} onClick={onClick}>
        <Image src={RightArrowMobileSlider} alt="Next" />
      </div>
    );
  }

  function PrevArrow(props) {
    const { onClick } = props;
    return (
      <div className={styles.prev} onClick={onClick}>
        <Image src={LeftArrowMobileSlider} alt="Previous" />
      </div>
    );
  }

  const settings = {
    infinite: true,
    slidesToShow: 1,
    slidesToScroll: 1,
    nextArrow: <NextArrow />,
    prevArrow: <PrevArrow />,
  };
  const heroSlider = [
    {
      id: 1,
      text: `‘’Zeer betrouwbaar. Makkelijk en snel te boeken. Medewerkers zijn erg vriendelijk en geven gelijk antwoord op je vraag. Denken graag mee aan oplossingen.’’`,
      author: "Zuleyha ",
    },
    {
      id: 2,
      text: `‘’Ik had problemen met een boeking, Na WhatsApp contact en ook telefonisch contact is alles in orde gekomen. Ik ben zeer goed geholpen geweest. Was een boeking voor 10 personen’’`,
      author: "Provoost",
    },
    {
      id: 3,
      text: `‘’Wat een service bij Adotravel👌🏼 Dit is een reismaatschappij naar ieders hart en met een groot hart, hier ben je geen nummer maar een klant! Geen enkele vraag is te veel of te moeilijk voor hun, het goede advies, boeken van de reis gebeurt zeer correct en met de nodige zorg. Dankjewel Adotrave’’`,
      author: "Jolien",
    },
    {
      id: 4,
      text: `‘’Alles wordt keurig snel geregeld Wordt goed met je meegedacht en oplossingsgericht gewerk’’`,
      author: "Henny",
    },
  ];
  return (
    <>
      <Slider {...settings}>
        <div key="slide1">
          <MobileHeroSlider data={data} heroSlider={heroSlider[0]} loading={loading} error={error} />
        </div>
        <div key="slide2">
          <MobileHeroSlider data={data} heroSlider={heroSlider[1]} loading={loading} error={error}/>
        </div>
        <div key="slide3">
          <MobileHeroSlider data={data} heroSlider={heroSlider[2]} loading={loading} error={error}/>
        </div>
        <div key="slide4">
          <MobileHeroSlider data={data} heroSlider={heroSlider[3]} loading={loading} error={error}/>
        </div>
      </Slider>
    </>
  );
};

export default MobileHeroSection;
