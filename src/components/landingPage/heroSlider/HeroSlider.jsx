"use client";
import React from "react";
import Slider from "react-slick";
import styles from "./heroSlider.module.css";
import arrowLeft from "../../../../public/images/arrowLeft.svg";
import arrowRight from "../../../../public/images/arrowRight.svg";
import Image from "next/image";

const HeroSlider = () => {
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

  function NextArrow(props) {
    const { onClick } = props;
    return (
      <div className={styles.button} onClick={onClick}>
        <Image src={arrowRight} alt="Next" />
      </div>
    );
  }

  function PrevArrow(props) {
    const { onClick } = props;
    return (
      <div className={styles.prev} onClick={onClick}>
        <Image src={arrowLeft} alt="Previous" />
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

  return (
    <div className={styles.slider}>
      <Slider {...settings} className={styles.slickContainer}>
        {heroSlider.map((el) => (
          <div className={styles.slick} key={el.id}>
            <div className={styles.name}> {el.text}</div>
            <div className={styles.places}>{el.author}</div>
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default HeroSlider;
