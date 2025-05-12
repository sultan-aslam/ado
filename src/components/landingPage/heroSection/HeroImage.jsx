import Image from 'next/image'
import React from 'react'

const HeroImage = ({src, style}) => {
  return (
    <Image
    fill
    src={src}
    alt="bannerImage"
    style={{ objectFit: "cover" , borderRadius: "150px", ...style}}
    sizes="(max-width: 600px) 100vw, 
    (max-width: 750px) 244px, 
    (max-width: 900px) 244px, 
    (max-width: 1100px) 190px, 
    (max-width: 1349px) 255px, 
    281px"
  />
  )
}

export default HeroImage