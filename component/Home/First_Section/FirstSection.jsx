//React
import React, {useEffect, useState} from 'react'
import Image from 'next/image'

//Swiper
import { Swiper, SwiperSlide } from 'swiper/react'
import SwiperCore, { EffectFade } from 'swiper'
import 'swiper/swiper-bundle.min.css'

//Animation
import gsap from 'gsap'

//Components
import SectionHeader from '../../SectionHeader'
import ImageWrapper from '../../ImageWrapper'

SwiperCore.use([EffectFade])
//Top three trending movies this week
const FirstSection = ({movies}) => {

    const slidesTitleAnimationReset = index => {
        gsap.to(`.title-${index}`, {
            y: '100%',
            opacity: 0
        })
    }

    const showTitle = swiper => {
        const index = swiper.activeIndex
        console.log(index)
        gsap.to(`.title-${index}`, {
          y: '0',
          opacity: 1
        })
        
        if (index===0) {
            slidesTitleAnimationReset(1)
            slidesTitleAnimationReset(2)
        }
        else if (index===1) {
            slidesTitleAnimationReset(0)
            slidesTitleAnimationReset(2)
        }
        else if (index===2) {
            slidesTitleAnimationReset(0)
            slidesTitleAnimationReset(1)
        }
      }

    return (
        <>
            <section className="trending-movies">
            <SectionHeader title={'Top 3 this week'} />
            {
                movies?
                <Swiper
                    spaceBetween={0}
                    slidesPerView={1}
                    onSlideChange={(swiper) => showTitle(swiper)}
                    onSwiper={(swiper) => showTitle(swiper)}
                    effect="fade"
                >
                    {
                    movies &&
                    movies.map((movie, index) => {
                        return (
                        <SwiperSlide key={movie.id}>
                        <div className="child-slide">
                            <div className="movie-details-container">
                                <h1 className={`movie-title title-${index}`}>{movie.title}</h1>
                            </div>
                            <div className="backdrop-container">
                                <div className="img-wrapper">
                                    <ImageWrapper 
                                        src={`https://image.tmdb.org/t/p/original/${movie.backdrop_path}`}
                                        alt={movie.title} 
                                        type={'backdrop'}
                                    />
                                </div>
                            </div>
                        </div>
                        </SwiperSlide>
                        )
                    })

                    }
                </Swiper> :
                <div className="sketleton-trending-movies"></div>
            }
            </section>
            <style jsx>
                {`
                
                    .trending-movies {
                        position: relative;
                        width: 100%;
                    }

                    .child-slide {
                        position: relative;
                        height: 85vh;
                        width: 100%;
                    }

                    .sketleton-trending-movies {
                        position: relative;
                        height: 85vh;
                        width: 100%;
                        background-color: rgba(255,255,255,0.5);
                        animation: loading 1s linear infinite;
                    }

                    @keyframes loading {
                        0% {filter: brightness(100%)}
                        50% {filter: brightness(80%)}
                    }

                    

                    .backdrop-container {
                        position: absolute;
                        top: 0;
                        left: 0;
                        height: 100%;
                        width: 100%;
                        overflow: hidden;
                    }

                    .backdrop-container > .img-wrapper {
                        position: absolute;
                        top: 0;
                        left: 0;
                        height: 100%;
                        width: 100%;
                        object-fit: cover;
                        object-position: top;
                        transform: scale(1);
                        transition: 0.3s linear;
                    }

                    .child-slide:hover .img-wrapper {
                        transform: scale(1.1);
                    }

                    .movie-details-container {
                        position: absolute;
                        top: 0;
                        left: 0;
                        height: 100%;
                        width: 100%;
                        background-image: linear-gradient(to bottom, rgba(0,0,0,0.4), rgba(0,0,0,1) );
                        z-index: 4;
                        transition: 0.3s linear;
                    }

                    .child-slide:hover .movie-details-container {
                        background-image: linear-gradient(to bottom, rgba(0,0,0,0.1), rgba(0,0,0,1) );
                    }

                    .movie-details-container > .movie-title {
                        position: absolute;
                        left: 50px;
                        bottom: 20px;
                        color: white;
                        font-weight: 700;
                        font-size: 3rem;
                        opacity: 0;
                        transform: translate(0, -100%);
                    }

                `}
            </style>
        </>
    )
}

export default FirstSection