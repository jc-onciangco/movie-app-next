//React
import {useState, useEffect} from 'react'
import axios from 'axios'

//Layout
import MainLayout from '../../layout/MainLayout'
import Navigation from '../../component/Navigation'

//Components
import DiscoverFilter from '../../component/Discover/DiscoverFilter'
import DiscoverList from '../../component/Discover/DiscoverList'

const Discover = () => {
    const sortByData = [
        {
            id: 0,
            name: 'popularity',
            order: 'desc',
            isActive: true,
            uri: 'popularity'
        },
        {
            id: 1,
            name: 'release date',
            order: 'desc',
            isActive: false,
            uri: 'release_date'
        },
        {
            id: 2,
            name: 'title',
            order: 'desc',
            isActive: false,
            uri: 'original_title'
        }
    ]

    const [sortBy, setSortBy] = useState(sortByData)
    const [movies, setMovies] = useState(null)
    const [genresCache, setGenresCache] = useState(null)
    const [page, setPage] = useState(1)
    const [loadingLoadMore, setLoadingLoadMore] = useState(false)
    const [movieGenresFilter, setMovieGenresFilter] = useState(null)
    const [selectedFilter, setSelectedFilter] = useState([])
    const [filterBtnSelected, setFilterBtnSelected] = useState(false)

    useEffect(() => {
        console.log('hhhhhh')
        getDiscoverMovies()
    },[])

    useEffect(async () => {
        if (page===1) return
        const genresString = selectedFilter && selectedFilter.join(',') 
        const {data} = await axios.get(`https://api.themoviedb.org/3/discover/movie?${selectedFilter.length? `with_genres=${genresString}&` : ''}sort_by=release_date.desc&page=${page}&api_key=3c543dcd94b82b3a00062a8ff1054b5e`)
        const nextResults = data.results.map(result => {
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
        if (!movieGenresFilter) return
        const notAllGenres = movieGenresFilter.filter(genre => genre.id!==20202020)
        if (notAllGenres.every(genre => !genre.isSelected)) {
            setMovieGenresFilter(prevState => {
                return prevState.map(genre => {
                    if (genre.id === 20202020) {
                        return {...genre, isSelected: true}
                    }
                    return genre
                })
            })
        }
    }, [selectedFilter])

    const getDiscoverMovies = async () => {
        try {
            const genresString = selectedFilter && selectedFilter.join(',') 
            const activeSorting =  sortBy.find(categ => categ.isActive)
            const {data} = await axios.get(`https://api.themoviedb.org/3/discover/movie?${selectedFilter.length? `with_genres=${genresString}&` : ''}${`sort_by=${activeSorting.uri}.${activeSorting.order}&`}page=${page}&api_key=3c543dcd94b82b3a00062a8ff1054b5e`)
            const {data: movie} = await axios.get(`https://api.themoviedb.org/3/genre/movie/list?api_key=3c543dcd94b82b3a00062a8ff1054b5e`)
            const {data: tv} = await axios.get(`https://api.themoviedb.org/3/genre/tv/list?api_key=3c543dcd94b82b3a00062a8ff1054b5e`)
            setGenresCache(movie)

            if (!selectedFilter.length) {
                const all = {id: 20202020, name: 'All', isSelected: true}
                setMovieGenresFilter([all ,...movie.genres.map(genre => ({...genre, isSelected: false}))])
            }
            
            const dataResults = {
                ...data,
                results: data.results.map(result => {
                            return {
                              ...result,
                              genre_ids: result.genre_ids.map(id => {
                                  return movie.genres.find(genre => genre.id === id)
                              })
                            }
                          })
            }

            // console.log('MOVIEIJAJNAKVWA', dataResults)
            setMovies(dataResults)
            setFilterBtnSelected(false)
        }
        catch (err) {
            console.log(err)
            setFilterBtnSelected(false)
        }
    }

    const loadMore = page => {
        setLoadingLoadMore(true)
        setPage(page)
    }

    const changeOrder = id => {
        setSortBy(prevState => {
            return prevState.map(sort => {
                if (sort.id === id) {
                    return {
                        ...sort,
                        order: sort.order==='desc' ? 'asc' : 'desc'
                    }
                }
                return sort
            })
        })
    }

    const changeSort = id => {
        setSortBy(prevState => {
            return prevState.map(sort => {
                if (sort.id === id) {
                    return {
                        ...sort,
                        isActive: true
                    }
                }
                return {...sort, isActive: false}
            })
        })
    }

    const selectGenre = id => {
        setMovieGenresFilter(prevState => {
            return prevState.map(genre => {
                if (id !== 20202020) {
                    if (genre.id === id) {
                        return {...genre, isSelected: !genre.isSelected}
                    }
                    
                    if (genre.id === 20202020) {
                        return {...genre, isSelected: false}
                    }
                }

                else {
                    if (genre.id === id) {
                        return {...genre, isSelected: true}
                    }

                    return {...genre, isSelected: false}
                }

                return genre
            })
        })

        if (id === 20202020) {
            setSelectedFilter([])
            return
        }

        setSelectedFilter(prevState => {
            if (prevState.includes(id)) {
                return prevState.filter(genreId => genreId!==id )
            }
            return [...prevState, id]
        })
    }

    const findFilter = () => {
        if (filterBtnSelected) return
        setMovies(null)
        setFilterBtnSelected(true)
        getDiscoverMovies()
    }

    return (
        <>
            <MainLayout siteData={{name: 'Discover | SkyFlix'}}>
                <div className="home-container">
                    <div className="left-side">
                        <Navigation />
                    </div>
                    <section className="discover-section">
                        <DiscoverFilter 
                            sortBy={sortBy}
                            changeOrder={changeOrder}
                            changeSort={changeSort}
                            movieGenresFilter={movieGenresFilter}
                            selectGenre={selectGenre}
                            findFilter={findFilter}
                            filterBtnSelected={filterBtnSelected}/>
                        <DiscoverList movies={movies} loadMore={loadMore} loadingLoadMore={loadingLoadMore}/>
                    </section>
                </div>
            </MainLayout>
            <style jsx>
                {`
                
                    .discover-section {
                        position: absolute;
                        top: 0;
                        right: 0;
                        width: 80%;
                        background-color: black;
                        display: flex;
                        height: 100vh;
                    }
                
                `}
            </style>
        </>
    )
}

export default Discover