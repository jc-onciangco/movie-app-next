//rReact 
import {useEffect, useState} from 'react'
import axios from 'axios'

//Components
import Navigation from './Navigation'
import MoviesTvShowsGrid from './GridLists/MoviesTvShowsGrid'

//Layout
import MainLayout from '../layout/MainLayout'


const Movies = ({siteData, pathname}) => {
    const apiKey = '3c543dcd94b82b3a00062a8ff1054b5e'
    const [movies, setMovies] = useState(null)
    const [page, setPage] = useState(1)
    const [loadingLoadMore, setLoadingLoadMore] = useState(false)
    const [genresCache, setGenresCache] = useState(null)
    const [region, setRegion] = useState(null)

    useEffect(() => {
        document.body.style.overflowY = 'hidden'
    },[])

    useEffect(() => {
        getMovie()
    }, [])

    useEffect(async () => {
        if (page===1) return
        const {data} = await axios.get(`https://api.themoviedb.org/3/${siteData.category}/${pathname.apiURI}?page=${page}&api_key=${apiKey}`)
        const nextResults = siteData.category==='person'? data.results : data.results.map(result => {
                                return {
                                ...result,
                                genre_ids: result.genre_ids.map(id => {
                                    return genresCache.genres.find(genre => genre.id === id)
                                })
                                }
                            })

        const filteredArr = [...movies.results, ...nextResults].reduce((acc, current) => {
            const x = acc.find(result => result.id === current.id)
            if (!x) {
              return acc.concat([current])
            } else {
              return acc
            }
          }, [])

          setMovies({
              ...data,
              results: filteredArr
          })
          setLoadingLoadMore(false)
    }, [page])

    useEffect(() => {
        getMovie()
    }, [region])

    const getMovie = async () => {
        const {data} = await axios.get(`https://api.themoviedb.org/3/${siteData.category}/${pathname.apiURI}?page=${page}${region && `&region=${region}`}&api_key=${apiKey}`)
        const {data: movie} = await axios.get(`https://api.themoviedb.org/3/genre/movie/list?api_key=3c543dcd94b82b3a00062a8ff1054b5e`)
        const {data: tv} = await axios.get(`https://api.themoviedb.org/3/genre/tv/list?api_key=3c543dcd94b82b3a00062a8ff1054b5e`)
        setGenresCache(siteData.category!=='person'? (siteData.category==='movie'? movie : tv) : null)
        const dataResults = siteData.category==='person'? data : {
            ...data,
            results: data.results.map(result => {
                        return {
                          ...result,
                          genre_ids: result.genre_ids.map(id => {
                              return siteData.category==='movie'? movie.genres.find(genre => genre.id === id) : tv.genres.find(genre => genre.id === id) 
                          })
                        }
                      })
        }
        setMovies(dataResults)
    }

    const loadMore = page => {
        setLoadingLoadMore(true)
        setPage(page)
    }

    const changeRegion = code => {
        setMovies(null)
        if (code === 'All') {
            return setRegion(null)
        }
        console.log(code)
        setRegion(code)
    }

    return (
        <>
            <MainLayout siteData={siteData}>
                <div className="home-container">
                    <div className="left-side">
                        <Navigation />
                    </div>
                    <MoviesTvShowsGrid 
                        pathname={pathname} 
                        movies={movies} 
                        loadMore={loadMore}
                        loadingLoadMore={loadingLoadMore}
                        category={siteData.category}
                        changeRegion={changeRegion}
                    />
                </div>
            </MainLayout>
            <style jsx>
                {`
                
                    .home-container {
                        position: relative;
                        width: 100%;
                    }

                    .left-side {
                        position: absolute;
                        top: 0;
                        left: 0;
                        width: 20%;
                    }
                
                `}
            </style>
        </>
    )
}

export default Movies