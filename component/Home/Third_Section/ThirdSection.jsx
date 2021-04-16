//React
import {useState} from 'react'

//Components
import SectionHeader from '../../SectionHeader'
import ImageWrapper from '../../ImageWrapper'

//Swiper
import { Swiper, SwiperSlide } from 'swiper/react'
import SwiperCore, { EffectFade } from 'swiper'
import 'swiper/swiper-bundle.min.css'


//Trending today
const ThirdSection = ({trends}) => {
    const [trendingRemoveShadow, setTrendingRemoveShadow] = useState(false)
    const categories = [
        {
            id: 0,
            name: 'all',
        },
        {
            id: 1,
            name: 'movie',
        },
        {
            id: 2,
            name: 'tv show',
        }
    ]
    const [activeCategory, setAvtiveCategory] = useState('all')

    const activateCategory = category => {
        setAvtiveCategory(category)
    }

    return (
        <>
            <section className="trending-movies-container">
                <SectionHeader title={`Trending today`} />
                <div className="trending-list">
                    <div className="trending-categories">
                        {
                            categories.map(category => {
                                return (
                                    <div    className={`all-category category ${activeCategory===category.name? 'active': 'inactive'}`}
                                            onClick={() => activateCategory(category.name)}
                                            key={category.id}>
                                        {category.name}
                                    </div>
                                )
                            })
                        }
                    </div>
                    <div className="trending-movies">
                        <Swiper
                            spaceBetween={0}
                            slidesPerView={5.5}
                            onSlideChange={(swiper) => {}}
                            onSwiper={(swiper) => console.log(swiper)}
                            >
                            {
                                trends?
                                trends.map(trend => {
                                    if (trend.category === activeCategory) {
                                        return (
                                            trend.trending.map((movie, index) => {
                                                return (
                                                <SwiperSlide key={movie.id}>
                                                    <div className="child-slide">
                                                        <div className="poster-container">
                                                            <div className="img-wrapper">
                                                                {
                                                                    movie.poster_path?
                                                                    <ImageWrapper 
                                                                        src={`https://image.tmdb.org/t/p/original/${movie.poster_path}`} 
                                                                        alt={movie.title}
                                                                        type={'poster'}
                                                                    /> :
                                                                    <ImageWrapper 
                                                                        src={`/placeholder.jpg`} 
                                                                        alt={'placeholder'}
                                                                        type={'placeholder'}
                                                                    />
                                                                }
                                                            </div>
                                                        </div>
                                                        <div className="details">
                                                            <div className="trending-title">{movie.title || movie.name}</div>
                                                        </div>    
                                                        <div className="trending-rank">{index+1}</div>
                                                    </div>
                                                </SwiperSlide>
                                                )
                                            })
                                        )
                                    }
                                    return
                                }) :
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
                                            </div>
                                        </SwiperSlide>
                                    )
                                })

                            }
                        </Swiper>
                    </div>
                </div>
            </section>
            <style jsx>
                {`
                
                    .trending-movies-container {

                    }

                    .trending-list {
                        height: 100vh;
                    }

                    .trending-categories {
                        color: white;
                        padding: 0 0 0 60px;
                        display: flex;
                    }

                    .trending-categories > .category {
                        font-size: 1.05rem;
                        font-weight: 600;
                        display: flex;
                        justify-content: center;
                        align-items: center;
                        padding: 10px 20px;
                        margin: 0 5px 0 0;
                        background-color: rgba(255,255,255,0.2);
                        opacity: 0.6;
                        transition: 0.3s linear;
                        cursor: pointer;
                        text-transform: capitalize;
                    }

                    .trending-categories > .active {
                        background-image: linear-gradient(45deg, #1A74E2, #3FA0EF);
                        opacity: 1;
                    }

                    .trending-categories > .inactive:hover {
                        background-color: rgba(255,255,255,0.25);
                    }

                    .trending-movies {
                        position: relative;
                        margin: 30px 0 0 0;
                        padding: 0 0 0 60px;
                    }

                    .child-slide {
                        position: relative;
                        transform: scale(0.9);
                        transition: 0.3s linear;
                        overflow: hidden;
                    }

                    .child-slide:hover {
                        transform: scale(1);
                    }

                    .poster-container {
                        overflow: hidden;
                    }

                    .poster-container > .img-wrapper {
                        width: 100%;
                        object-fit: contain;
                        object-position: top;
                        transform: scale(1);
                        transition: 0.3s linear;
                    }

                    .skel-img-wrapper {
                        position: relative;
                    }

                    .skel-img-wrapper::before {
                        content: '';
                        position: absolute;
                        top: 0;
                        left: 0;
                        height: 100%;
                        width: 100%;
                        background-color: #808080;
                        animation: loading 1s linear infinite;
                        z-index: 1;
                    }

                    @keyframes loading {
                        0% {filter: brightness(100%)}
                        50% {filter: brightness(80%)}
                    }

                    .child-slide > .details {
                        overflow: hidden;
                        position: absolute;
                        top: 0;
                        left: 0;
                        height: 100%;
                        width: 100%;
                        z-index: 2;
                        background-image: linear-gradient(to bottom, transparent, rgba(0,0,0,0.1), rgba(0,0,0,0.7), rgba(0,0,0,0.9));
                    } 

                    .trending-rank {
                        position: absolute;
                        top: 0;
                        right: 0;
                        transform: translate(15%, -30%);
                        font-size: 10vw;
                        font-weight: 700;
                        color: white;
                        mix-blend-mode: exclusion;
                        z-index: 1;
                    }

                    .trending-title {
                        position: absolute;
                        bottom: 0;
                        left: 0;
                        width: 100%;
                        color: white;
                        font-size: 1.3rem;
                        padding: 0 10px 10px 10px;
                        font-weight: 600;
                    }
                
                `}
            </style>
        </>
    )
}

export default ThirdSection