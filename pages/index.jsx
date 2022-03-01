import Head from 'next/head'
// import styles from '../styles/Home.module.css'

import React, {useEffect, useState} from 'react'

import axios from 'axios'

//Layout
import MainLayout from '../layout/MainLayout'

//Components
import Navigation from '../component/Navigation'
import FirstSection from '../component/Home/First_Section/FirstSection'
import SecondSection from '../component/Home/Second_Section/SecondSection'
import ThirdSection from '../component/Home/Third_Section/ThirdSection'
import SearchbarSection from '../component/Home/Search_Bar_Section/SearchbarSection'

import Link from 'next/link'

export default function Home() {

  const [topThreeTrendingMovieThisWeek, setTopThreeTrendingMovieThisWeek] = useState(null)
  const [discoverMovies, setDiscoverMovies] = useState(null)
  const [trending, setTrending] = useState(null)
  const [innerWidth, setInnerWidth] = useState(null)
  
  useEffect(() => {
    getTopThreeTrendingMovieThisWeek()
  },[])

  useEffect(() => {
    setInnerWidth(window.innerWidth)
}, [])

  const getTopThreeTrendingMovieThisWeek = async () => {
    const {data} = await axios.get('https://api.themoviedb.org/3/trending/movie/week?api_key=3c543dcd94b82b3a00062a8ff1054b5e')
    const topThree = data.results.slice(0, 3)
    setTopThreeTrendingMovieThisWeek(topThree)
    getDiscoverMovies()
  } 

  const getDiscoverMovies = async () => {
    const {data} = await axios.get('https://api.themoviedb.org/3/discover/movie?api_key=3c543dcd94b82b3a00062a8ff1054b5e')
    const {data: movie} = await axios.get(`https://api.themoviedb.org/3/genre/movie/list?api_key=3c543dcd94b82b3a00062a8ff1054b5e`)
    const discover = data.results.slice(0,5).map(result => {
      return {
        ...result,
        genre_ids: result.genre_ids.map(id => {
          return movie.genres.find(genre => genre.id === id)
        })
      }
    })
    setDiscoverMovies(discover)
    getTrendingToday()
    console.log('DISCOVER: ', discover, movie)
  }

  const getTrendingToday = async () => {
    const {data: all} = await axios.get(`https://api.themoviedb.org/3/trending/all/day?api_key=3c543dcd94b82b3a00062a8ff1054b5e`)
    const {data: movie} = await axios.get(`https://api.themoviedb.org/3/trending/movie/day?api_key=3c543dcd94b82b3a00062a8ff1054b5e`)
    const {data: tv} = await axios.get(`https://api.themoviedb.org/3/trending/tv/day?api_key=3c543dcd94b82b3a00062a8ff1054b5e`)
    const trending = [
      {
        id: 0,
        category: 'all',
        trending: all.results.slice(0,10)
      },
      {
        id: 1,
        category: 'movie',
        trending: movie.results.slice(0,10)
      },
      {
        id: 2,
        category: 'tv show',
        trending: tv.results.slice(0,10)
      }
    ]
    console.log('rtrending', trending)
    setTrending(trending)
  }

  const handleExpandSearch = () => {
    setExpandSearchArea(true)
  }

  const handleMinimizeSearch = () => {
    setExpandSearchArea(false)
  }

  return (
    <>
      <MainLayout siteData={{name: 'Home | SkyFlix'}}>
        <div className="home-container">
          <div className="left-side">
            <Navigation />
          </div>
          <div className="right-side">
            <SearchbarSection />
            <section className="hero-section">
              <div className="hero-details">
                <h1>SKYFLIX</h1>
                <p>Discover your favorite movies, TV shows, and people.</p>
              </div>
              {/* <div className="desktop-container">
                <img src="/desktop.png" alt=""/>
                <video autoplay="true" loop="true">
                  <source src="/batman.mp4" type="video/mp4" />
                </video>
              </div> */}
            </section>
            <FirstSection movies={topThreeTrendingMovieThisWeek} />
            <SecondSection movies={discoverMovies} />
            <ThirdSection trends={trending} />
          </div>
        </div>
      </MainLayout>
      <style jsx>
        {`

            .home-container {
              position: relative;
              width: 100%;
            }

            .right-side {
              position: absolute;
              top: 0;
              right: 0;
              width: 80%;
              background-color: black;
              padding: 8vh 0 0 0;
            }

            .left-side {
              position: absolute;
              top: 0;
              left: 0;
              width: 20%;
            }

            .hero-section {
              position: relative;
              width: 100%;
              height: 60vh;
              background-image: linear-gradient(to bottom, rgba(0,0,0,0.4), black), url('/hero1.jpg');
              background-size: cover;
              background-position: center;
              background-repeat: no-repeat;
            }

            .hero-details {
              position: absolute;
              top: 15%;
              left: 10%;
              transform: translate(0, 0);
            }

            .hero-details > h1 {
              font-size: 5rem;
              line-height: 0;
              color: white;
            }

            .hero-details > p {
              font-size: 1.5rem;
              font-weight: 600;
              color: rgba(255,255,255,0.8);
              margin: -20px 0 0 0;
            }

            /* .desktop-container {
              position: absolute;
              top: 20%;
              right: 50px;
              -ms-transform: translate(0,-50%);
              transform: translate(0,-50%);
              width: 350px;
              height: 196px;
              background-color: orange;
            }

            .desktop-container > img {
              position: absolute;
              width: 100%;
              top: 0;
              left: 0;
              pointer-events: none;
              z-index: 1;
            }

            .desktop-container > video {
              position: absolute;
              height: 90%;
              top: 5%;
              left: 4%;
              bottom: 5%;
            } */

            
            @media screen and (max-width: 560px) {
              .right-side {
                position: absolute;
                top: 0;
                right: 0;
                width: 100%;
                background-color: black;
                padding: 8vh 0 0 0;
              }
            }

        `}
      </style>
    </>
  )
}
