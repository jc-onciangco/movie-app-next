//React
import React, {useEffect, useState} from 'react'
import Link from 'next/link'

//Components
import Spinner from '../LoaderComponents/Spinner'
import CountrySelector from '../CountrySelector'
import InnerMovieList from '../InnerMovieList'


const MoviesTvShowsGrid = ({pathname, movies, loadMore, loadingLoadMore, category, changeRegion}) => {
    const movieCategories = [
        {
            id: 0,
            name: category==='movie'? 'now playing' : 'airing today',
            url:category==='movie'? '/movie/now-playing' : '/tv/airing-today'
        },
        {
            id: 1,
            name: category==='movie'? 'top rated' : 'top rated',
            url:category==='movie'? '/movie/top-rated' : '/tv/top-rated'
        },
        {
            id: 2,
            name: category==='movie'? 'popular' : 'popular',
            url:category==='movie'? '/movie/popular' : '/tv/popular'
        },
        {
            id: 3,
            name: category==='movie'? 'upcoming' : 'on the air',
            url:category==='movie'? '/movie/upcoming' : '/tv/on-the-air'
        }
    ]

    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']



    const [currentCountry, setCurrentCountry] = useState('All')
    const [titleCurrentCountry, setTitleCurrentCountry] = useState('All')

    const selectCountry = (code, name) => {
        changeRegion(code)
        setCurrentCountry(name)
        setTitleCurrentCountry(name)
    }

    const searchCountry = val => {
        setCurrentCountry(val)
    }

    return (
        <>
            <div className="right-side">
                <section className="movie-list-section">
                    <div className="current-category-title-container">
                        {pathname.name}
                        {
                            titleCurrentCountry!=='All' &&
                            <span className="selected-region-title">{titleCurrentCountry}</span> 
                        }
                    </div>
                    {
                        category !== 'person' &&
                        <div className="filter-section">
                            <div className="category-section">
                            {
                                movieCategories.map(category => {
                                    return (
                                        <React.Fragment key={category.id}>
                                            <Link  href={category.url}>
                                                <a 
                                                    style={
                                                        {
                                                            opacity: pathname.pathname===category.url? '1' : '0.4', 
                                                            backgroundColor: pathname.pathname===category.url? 'white' : 'transparent',
                                                            color: pathname.pathname===category.url? 'black' : 'white'
                                                        }
                                                    } 
                                                    className='category'>
                                                    {category.name}
                                                </a>
                                            </Link>
                                        </React.Fragment>
                                    )
                                })
                            }
                            </div>
                            {
                                pathname.name === 'now playing' &&
                                <div className="region-container">
                                    <div className="region-title">Region</div>
                                    <CountrySelector 
                                        selectCountry={selectCountry}
                                        currentCountry={currentCountry}
                                        searchCountry={searchCountry}/>
                                </div>
                            }
                        </div>
                    }
                    <div className="movie-list">
                        <InnerMovieList movies={movies} category={category} loadMore={loadMore} loadingLoadMore={loadingLoadMore}/>
                    </div>
                </section>
            </div>
            <style jsx>
                {`
                
                    .right-side {
                        position: absolute;
                        top: 0;
                        right: 0;
                        width: 80%;
                        background-color: black;
                        color: white;
                        display: flex;
                    }

                    .movie-list-section {
                        width: 100%;
                        min-height: 100vh;
                    }

                    .current-category-title-container {
                        height: 12vh;
                        display: flex;
                        align-items: center;
                        padding: 0 0 0 2vw;
                        font-size: 1.8rem;
                        font-weight: 700;
                        background-color: black;
                        text-transform: Capitalize;
                    }

                    .selected-region-title {
                        font-size: 1.2rem;
                        opacity: 0.5;
                        font-weight: 600;
                        margin: 0 0 0 10px;
                    }

                    .filter-section {
                        height: 8vh;
                        display: flex;
                        justify-content: space-between;
                        padding: 0 2vw 6px 2vw;
                    }

                    .category-section {
                        display: flex;
                        align-items: center;
                    }

                    .category {
                        border: 2px solid white;
                        color: white;
                        font-weight: 600;
                        border-radius: 100px;
                        height: 60%;
                        display: flex;
                        align-items: center;
                        padding: 0 12px;
                        margin: 0 10px 0 0;
                        background-color: transparent;
                    }

                    .category:hover {
                        filter: brightness(80%);
                    }

                    .movie-list {
                        position: relative;
                        flex: 1;
                        overflow-y: scroll;
                        height: 80vh;
                    }

                    .movie-list::-webkit-scrollbar {
                        width: 1vw;
                    }

                    .movie-list::-webkit-scrollbar-track {
                        background-color: rgba(255,255,255,0.1);
                    }

                    .movie-list::-webkit-scrollbar-thumb {
                        background-color: #3FA0EF;
                    }

                    .region-container {
                        display: flex;
                        align-items:center;
                    }

                    .region-container .region-title {
                        margin: 0 10px 0 0;
                        font-weight: 600;
                        font-size: 1.3vw;
                        opacity: 0.8;
                    }

                
                `}
            </style>
        </>
    )
}

export default MoviesTvShowsGrid