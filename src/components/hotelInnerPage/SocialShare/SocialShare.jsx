import React, { useEffect, useState } from "react";
import Image from "next/image";
import styles from "./socialShare.module.css";
import {
  EmailShareSvg,
  FacebookShareSvg,
  InstagramShareSvg,
  WhatsappShareSvg,
} from "../../common/svgs/Svgs";

const SocialShare = ({ onShareComplete }) => {
  const [currentUrl, setCurrentUrl] = useState("");

  useEffect(() => {
    if (typeof window !== "undefined") {
      setCurrentUrl(window.location.href);
    }
  }, []);

  if (!currentUrl) return null;

  const sharingData = [
    {
      icon: <FacebookShareSvg />,
      title: "Facebook",
      alt: "Facebook Icon",
      url: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(
        currentUrl
      )}`,
    },
    {
      icon: <WhatsappShareSvg />,
      title: "Whatsapp",
      alt: "Whatsapp Icon",
      url: `https://wa.me/?text=${encodeURIComponent(currentUrl)}`,
    },
    {
      icon: <InstagramShareSvg />,
      title: "Instagram",
      alt: "Instagram Icon",
      url: `https://www.instagram.com/`,
    },
    {
      icon: <EmailShareSvg />,
      title: "Email",
      alt: "Email Icon",
      url: `mailto:?subject=Check%20this%20out&body=${encodeURIComponent(
        currentUrl
      )}`,
    },
  ];

  return (
    <div className={styles.container}>
      <div className={styles.wrapper}>
        {sharingData.map((data, i) => (
          <>
            <a
              key={i}
              href={data.url}
              target="_blank"
              rel="noopener noreferrer"
              className={styles.item}
              onClick={() => onShareComplete()}
            >
              {data.icon}
              <h2 className={styles.title}>{data.title}</h2>
            </a>
            <div className={styles.borderBottom}></div>
          </>
        ))}
      </div>
    </div>
  );
};

export default SocialShare;
