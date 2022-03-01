import PosterAndDetails from './PosterAndDetails'
import Casts from './Casts'
import ImageWrapper from '../ImageWrapper'
import { Swiper, SwiperSlide } from 'swiper/react'
import 'swiper/swiper-bundle.min.css'
import {useEffect, useState} from 'react'
import Link from 'next/link'
import Iframe from 'react-iframe'

const DetailsSection = ({allDetails}) => {
    const [innerWidth, setInnerWidth] = useState(null)
    const [showMoreImages, setShowMoreImages] = useState(false)

    useEffect(() => {
        setInnerWidth(window.innerWidth)
    }, [])
    
    return (
        <>
            <div className="details-section">
                <div className="trailer-video-modal">
                    <div class="container">
                        <iframe width="560" height="315" class="responsive-iframe" src="https://www.youtube.com/embed/PUe80HnKE3E"></iframe>
                    </div>
                </div>

                <PosterAndDetails allDetails={allDetails}/>

                {
                    allDetails.type === 'tv' &&
                    <div className="seasons">
                        <div className="seasons-title">Seasons</div>
                        <div className="seasons-list">
                            {
                                allDetails.details.seasons.map(season => {
                                        return (
                                            <div className="season" key={season.id}>
                                                <div className="img-wrapper">
                                                    {
                                                        season.poster_path?
                                                        <ImageWrapper src={`https://image.tmdb.org/t/p/w300/${season.poster_path}`} alt={season.name} type={'poster'} />
                                                        :
                                                        <ImageWrapper src={`/placeholder.jpg`} alt={season.name} type={'placeholder'} />    
                                                    }
                                                </div>
                                                <div className="season-details">
                                                    <div className="season-name">{season.name}</div>
                                                    <div className="season-episode">{season.episode_count} episodes</div>
                                                </div>
                                            </div>
                                        )
                                    })
                            }
                        </div>
                    </div>
                }

                <Casts allDetails={allDetails}/>


                <div className="images">
                    <div className="images-title">Images</div>
                    <div className="image-list">
                        {
                            allDetails.details.images.backdrops.slice(0, 12)
                                .map(image => {
                                    return (
                                        <div className="img-wrapper" key={image.file_path}>
                                            {
                                                image.file_path?
                                                <ImageWrapper src={`https://image.tmdb.org/t/p/w300/${image.file_path}`} alt={allDetails.details.title} type={'backdrop'} />
                                                :
                                                <ImageWrapper src={`/plis.jpg`} alt={allDetails.details.title} type={'placeholder'} />    
                                            }
                                        </div>
                                    )
                                }).slice(0,innerWidth <= 560? (showMoreImages? 10 : 3) : 10)
                        }
                    </div>
                    {
                        innerWidth <= 560 &&
                        <div className="show-more-container">
                            <div onClick={() => setShowMoreImages(prevState => !prevState)} className="show-more">
                                { showMoreImages? 'Show less' : 'Show more'}
                            </div>
                        </div>
                    }
                </div> 

                <div className="section-design">
                    <div className="recommendations">
                        <div className="recommendations-title">Recommended</div>
                        <div className="recommended-movies">
                            <Swiper
                                spaceBetween={10}
                                slidesPerView={innerWidth <= 560? 3.5 : 5}
                            >
                                {
                                    allDetails.recommendations.results.map(movie => {
                                        return (
                                            <SwiperSlide key={movie.id}>
                                                <div className="child-slide">
                                                    <div className="poster-container">
                                                        <Link href={`/movie/${movie.id}`}>
                                                            <a className="img-wrapper">     
                                                                {
                                                                    movie.poster_path?
                                                                    <ImageWrapper 
                                                                        src={`https://image.tmdb.org/t/p/w300/${movie.poster_path}`} 
                                                                        alt={movie.title}
                                                                        type={'poster'}
                                                                    /> :
                                                                    <ImageWrapper 
                                                                        src={`/placeholder.jpg`} 
                                                                        alt={movie.title}
                                                                        type={'placeholder'}
                                                                    />
                                                                }
                                                            </a>
                                                        </Link>
                                                    </div>
                                                    <div className="movie-details">
                                                        <Link href={`/movie/${movie.id}`}>
                                                            <a className="movie-name">{movie.title || movie.name}</a>
                                                        </Link>
                                                    </div>
                                                </div>
                                            </SwiperSlide>
                                        )
                                    })
                                }
                            </Swiper>
                        </div>
                    </div>
                </div>

            </div>
            <style jsx>
                {`

                    .trailer-video-modal {
                        height: 100vh;
                        width: 80%;
                        position: fixed;
                        top: 0;
                        right: 0;
                        z-index: 50;
                        background-color: orange;
                        display: flex;
                        justify-content: center;
                        align-items: center;
                    }

                    .container {
                        position: relative;
                        overflow: hidden;
                        width: 100%;
                        padding-top: 56.25%; /* 16:9 Aspect Ratio (divide 9 by 16 = 0.5625) */
                    }

                    /* Then style the iframe to fit in the container div with full height and width */
                    .responsive-iframe {
                        position: absolute;
                        top: 0;
                        left: 0;
                        bottom: 0;
                        right: 0;
                        width: 100%;
                        height: 100%;
                    }
                
                    .details-section {
                        position: relative;
                        top: -20vh;
                        left: 0;
                        z-index: 5;
                    }

                    .images, .seasons {
                        margin: 80px auto 0 auto;
                        width: 80%;
                        z-index: 3;
                    }

                    .images-title, .recommendations-title, .seasons-title {
                        font-size: 1em;
                        font-weight: 600;
                        color: white;
                        margin: 0 0 20px 0;
                    }

                    .seasons-list {
                        width: 100%;
                        display: grid;
                        grid-template-columns: repeat(5, 1fr);
                        grid-gap: 0.6vw;
                    }

                    .season {
                        margin: 0 0 10px 0;
                    }

                    .season-details {
                        color: white;
                        margin: 6px 0 0 0;
                    }

                    .season-name {
                        font-weight: 600;
                        font-size: 0.7em;
                    }

                    .season-episode {
                        font-weight: 600;
                        font-size: 0.65em;
                        color: rgba(255,255,255,0.6);
                    }

                    .image-list {
                        width: 100%;
                        display: grid;
                        grid-template-columns: repeat(4, 1fr);
                        grid-gap: 0.4vw;
                    }


                    .show-more-container {
                        font-size: 0.8em;
                        color: white;
                        text-align: center;
                        margin: 15px 0 0 0;
                    }

                    .show-more {
                        padding: 6px 0;
                        background-color: rgba(255,255,255,0.2);
                        border-radius: 4px;
                    }



                    .section-design {
                        background-color: rgba(255,255,255,0.05);
                        width: 100%;
                        margin: 80px 0 0 0;
                        padding:  30px 0;
                        height: 100%;
                    }
                    


                    .recommendations {
                        margin: 0 auto 0 auto;
                        width: 80%;
                        z-index: 3;
                    }

                    .recommended-movies {
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

                    .movie-details {
                        color: white;
                        overflow: hidden;
                        text-overflow: ellipsis;
                        white-space: nowrap;
                    }

                    .movie-name {
                        font-weight: 600;
                        font-size: 0.7em;
                    }

                    .movie-name:hover {
                        color: #6BD0FF;
                    }


                    @media screen and (max-width: 980px) {
                        .image-list {
                            width: 100%;
                            display: grid;
                            grid-template-columns: repeat(3, 1fr);
                            grid-gap: 0.4vw;
                        }


                        .seasons-list {
                            width: 100%;
                            display: grid;
                            grid-template-columns: repeat(4, 1fr);
                            grid-gap: 12px;
                        }
                    }

                    @media screen and (max-width: 680px) {
                        .image-list {
                            width: 100%;
                            display: grid;
                            grid-template-columns: repeat(2, 1fr);
                            grid-gap: 0.4vw;
                        }

                        .seasons-list {
                            width: 100%;
                            display: grid;
                            grid-template-columns: repeat(3, 1fr);
                            grid-gap: 12px;
                        }
                    }

                    @media screen and (max-width: 560px) {
                        .section-design {
                            margin: 70px 0 0 0;
                            padding: 30px 0;
                        }
                    
                        .images {
                            width: 90%;
                            margin: 50px auto 0 auto;
                            z-index: 3;
                        }

                        .recommendations {
                            width: 90%;
                            margin: 0 auto 0 auto;
                            z-index: 3;
                        }

                        .seasons-list {
                            width: 100%;
                            display: grid;
                            grid-template-columns: repeat(3, 1fr);
                            grid-gap: 10px;
                        }

                        .image-list {
                            width: 100%;
                            display: flex;
                            flex-wrap: wrap;
                        }

                        .img-wrapper {
                            width: 100%;
                            margin: 0 0 8px 0;
                        }   
                    }
                
                `}
            </style>
        </>
    )
} 

export default DetailsSection