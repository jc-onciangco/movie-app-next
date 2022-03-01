import { Swiper, SwiperSlide } from 'swiper/react'
import 'swiper/swiper-bundle.min.css'
import ImageWrapper from '../ImageWrapper'
import Link from 'next/link'
import {useEffect, useState} from 'react'

const Casts = ({allDetails}) => {
    const [innerWidth, setInnerWidth] = useState(null)

    useEffect(() => {
        setInnerWidth(window.innerWidth)
    }, [])

    return (
        <>
            <div className="casts">
                <div className="casts-title">Casts</div>
                <div className="casts-list">
                    <Swiper
                        spaceBetween={10}
                        slidesPerView={innerWidth <= 560? 3.5 : 5}
                    >
                        {   
                            allDetails.castsAndCrews.cast.slice(0, 10).map(cast => {
                                return (
                                    <SwiperSlide key={cast.id}>
                                        <div className="child-slide">
                                            <div className="poster-container">
                                                <div className="img-wrapper">  
                                                    {
                                                        cast.profile_path?
                                                        <ImageWrapper 
                                                            src={`https://image.tmdb.org/t/p/original/${cast.profile_path}`}
                                                            alt={cast.name} 
                                                            type={'profile'}
                                                        /> :
                                                        <ImageWrapper 
                                                            src={`/placeholder.jpg`}
                                                            alt={cast.name} 
                                                            type={'placeholder'}
                                                        /> 
                                                    }                                          
                                                </div>
                                            </div>
                                            <div className="cast-details">
                                                <Link href="">
                                                    <a className="cast-fullname">{cast.name}</a>
                                                </Link>
                                                <div className="cast-role-name">{cast.character}</div>
                                            </div>
                                        </div>
                                    </SwiperSlide>
                                )
                            })
                        }
                    </Swiper>
                </div> 
            </div>
            <style jsx>
                {`
                
                    .casts {
                        width: 80%;
                        margin: 80px auto 0 auto;
                        z-index: 3;
                    }

                    @media screen and (max-width: 560px) {
                        .casts {
                            width: 90%;
                            margin: 50px auto 0 auto;
                            z-index: 3;
                        }
                    }

                    .casts-title {
                        font-size: 1em;
                        font-weight: 600;
                        color: white;
                    }

                    .skel-title {
                        height: 0.8em;
                        width: 10vw;
                        border-radius: 100px;
                        background-color: rgba(255,255,255,0.3);
                    }

                    .casts-list {
                        width: 100%;
                        margin: 10px 0 0 0;
                    }

                    .cast {
                        height: 100%;
                        width: 150px;
                    }

                    .cast-image {
                        height: 100%;
                    }

                    .child-slide {
                        position: relative;
                        overflow: hidden;
                    }

                    
                    .poster-container {
                        overflow: hidden;
                        transition: 0.3s linear;
                        box-shadow: 0 2px 3px rgba(0,0,0,0.1);
                    }

                    .cast-details {
                        color: white;
                    }

                    .cast-fullname {
                        font-weight: 600;
                        font-size: 0.7em;
                    }

                    .cast-role-name {
                        font-size: 0.65em;
                        color: rgba(255,255,255,0.6);
                    }
                
                `}
            </style>
        </>
    )
}

export default Casts