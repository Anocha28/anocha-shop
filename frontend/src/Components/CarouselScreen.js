import React from 'react'
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from 'react-responsive-carousel';

const CarouselScreen = ({pictures, title, thumbs, play, loop, interval}) => {
    
    return (
        <>
        <Carousel width={"100%"} showThumbs={thumbs} autoPlay={play} infiniteLoop={loop} interval={interval} >
            {pictures.map((p, idx)=> (
                <div key={idx} className='m-0 p-0'>
                    <img src={`/${p}`} alt={idx}/>
                    {title && <h4 className="legend">{title}</h4>}                    
                </div>
            ))}
        </Carousel>
        </>
    )
    
}

const CarouselScreenTop = ({products, thumbsT, playT, loopT, intervalT}) => {
    
    return (
        <>
        <Carousel 
            width={"100%"} 
            showThumbs={thumbsT} 
            autoPlay={playT} 
            infiniteLoop={loopT} 
            interval={intervalT} 
            showIndicators={false} 
            >
            {products.map((p, idx)=> (
                <div key={idx} className='m-0 p-0'>
                    <img src={`/${p.images[0]}`} alt={p.name} className='' />
                    <h4 className="legend">{p.name}</h4>              
                </div>
            ))}
        </Carousel>
        </>
    )
    
}

CarouselScreen.defaultProps = {
    thumbs: false,
    play: true,
    loop: true,
    interval: 4000,
}
CarouselScreenTop.defaultProps = {
    thumbsT: false,
    playT: true,
    loopT: true,
    intervalT: 4000,
}

export{ CarouselScreen, CarouselScreenTop }
