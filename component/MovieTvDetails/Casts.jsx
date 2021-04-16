import { Swiper, SwiperSlide } from 'swiper/react'
import 'swiper/swiper-bundle.min.css'
import ImageWrapper from '../ImageWrapper'
import Link from 'next/link'

const Casts = ({allDetails}) => {
    return (
        <>
        {
            allDetails?
            <div className="casts">
                <div className="casts-title">Casts</div>
                <div className="casts-list">
                    <Swiper
                        spaceBetween={4}
                        slidesPerView={5}
                        onSlideChange={(swiper) => {}}
                        onSwiper={(swiper) => console.log(swiper)}
                    >
                        {
                            allDetails.castsAndCrews.cast.filter((num, index) => {
                                return index < 10
                            }).map(cast => {
                                return (
                                    <SwiperSlide key={cast.id}>
                                        <div className="child-slide">
                                            <div className="poster-container">
                                                <div className="img-wrapper skel-img-wrapper">  
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
            </div> :
            <div className="casts">
                <div className="casts-title">Casts</div>
                <div className="casts-list">
                    <Swiper
                        spaceBetween={2}
                        slidesPerView={5}
                        onSlideChange={(swiper) => {}}
                        onSwiper={(swiper) => console.log(swiper)}
                    >
                        {
                            [1,2,3,4,5,6,7,8,9,10].map(num => {
                                return (
                                    <SwiperSlide key={num}>
                                        <div className="child-slide">
                                            <div className="poster-container">
                                                <div className="img-wrapper skel-img-wrapper">                                            
                                                    <ImageWrapper 
                                                        src={`/placeholder.jpg`} 
                                                        alt={'loading...'}
                                                        type={'loading'}
                                                    />
                                                </div>
                                            </div>
                                            <div className="cast-details">
                                                <div className="cast-fullname">John Doe</div>
                                                <div className="cast-role-name">Kenji</div>
                                            </div>
                                        </div>
                                    </SwiperSlide>
                                )
                            })

                        }
                    </Swiper>
                </div> 
            </div>
        }
            <style jsx>
                {`
                
                    .casts {
                        width: 80%;
                        margin: 30px auto 0 auto;
                        z-index: 3;
                    }

                    .casts-title {
                        font-size: 0.8em;
                        font-weight: 600;
                        color: white;
                    }

                    .casts-list {
                        border-radius: 4px;
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
                        transform: scale(0.95);
                        transition: 0.3s linear;
                        box-shadow: 0 2px 3px rgba(0,0,0,0.1);
                    }

                    .poster-container:hover {
                        transform: scale(1);
                    }

                    .cast-details {
                        margin: -5px 0 0 0;
                        color: white;
                    }

                    .cast-fullname {
                        font-weight: 600;
                        font-size: 0.65em;
                    }

                    .cast-role-name {
                        font-size: 0.6em;
                        color: rgba(255,255,255,0.6);
                    }
                
                `}
            </style>
        </>
    )
}

export default Casts