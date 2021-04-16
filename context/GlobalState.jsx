import React , {useState, useEffect, useContext} from 'react'

import axios from 'axios'

const GlobalStateContext = React.createContext()

export const globalStateContext = () => {
    return useContext(GlobalStateContext)
} 

const GlobalState = ({children}) => {

    const [genres, setGenres] = useState(null)
    const [defaultGenres, setDefaultGenres] = useState(null)
    const [genreChangeDetector, setGenreChangeDetector] = useState(true)

    useEffect(() => {
        getGenres()
    }, [])

    useEffect(() => {
        if (!genres) return
        if (genres.tvGenres.every(genre => !genre.isSelect)) {
            setGenres(prevState => {
                return {
                    ...prevState,
                    tvGenres: defaultGenres.tvGenres
                }
            })
        }
        if (genres.movieGenres.every(genre => !genre.isSelect)) {
            setGenres(prevState => {
                return {
                    ...prevState,
                    movieGenres: defaultGenres.movieGenres
                }
            })
        }
        if (genres.allGenres.every(genre => !genre.isSelect)) {
            setGenres(prevState => {
                return {
                    ...prevState,
                    allGenres: defaultGenres.allGenres
                }
            })
        }
    }, [genreChangeDetector])


    const getGenres = async () => {
        const {data: movie} = await axios.get(`https://api.themoviedb.org/3/genre/movie/list?api_key=3c543dcd94b82b3a00062a8ff1054b5e`)
        const {data: tv} = await axios.get(`https://api.themoviedb.org/3/genre/tv/list?api_key=3c543dcd94b82b3a00062a8ff1054b5e`)
        const allGenres = [...movie.genres, ...tv.genres]
        const noDupsGenres = removeGenresDuplicates(allGenres.map(genre => genre.name))
        const finalGenres = {
            genres: allGenres,
            tvGenres: [{id: 121212, name: 'All', isSelect: true}, ...tv.genres.map(genre => ({...genre, isSelect: false}))],
            movieGenres: [{id: 121212, name: 'All', isSelect: true}, ...movie.genres.map(genre => ({...genre, isSelect: false}))],
            allGenres: [{id: 121212, name: 'All', isSelect: true}, ...noDupsGenres.map((genre, index) => ({name: genre, id: index, isSelect: false}))]
        }
        setGenres(finalGenres)
        setDefaultGenres(finalGenres)
    }

    const removeGenresDuplicates = data => {
        return data.filter((value, index) => data.indexOf(value) === index)
    }

    const checkGenresSelection = (genre, genreId) => {
        if (genreId!==121212) {
            if (genre.id===genreId) {
                return {...genre, isSelect: !genre.isSelect}
            }

            if (genre.id===121212) {
                return {...genre, isSelect: false}
            }
        }
        
        if (genreId===121212) {
            if (genre.id!==genreId) {
                return {...genre, isSelect: false}
            }
        }

        return genre
    }

    const selectGenre = (genreId, category) => {
        setGenreChangeDetector(prevState => !prevState)
        setGenres(prevState => {
            if (category==='tv') {
                return {
                    ...prevState,
                    tvGenres: prevState.tvGenres.map(genre => {
                        return checkGenresSelection(genre, genreId)
                    })
                }
            }
            else if (category==='movie') {
                return {
                    ...prevState,
                    movieGenres: prevState.movieGenres.map(genre => {
                        return checkGenresSelection(genre, genreId)
                    })
                }
            }
            else if (category==='all') {
                return {
                    ...prevState,
                    allGenres: prevState.allGenres.map(genre => {
                        return checkGenresSelection(genre, genreId)
                    })
                }
            }

        })
        
        
        // if (category==='tv') {
        //     const isAllGenreSelectedFromTv = genres.tvGenres.find(genre => genre.id===121212).isSelect
        //     if (genreId===121212 && !isAllGenreSelectedFromTv) {
        //         setGenres(prevState => {
        //             return {
        //                 ...prevState,
        //                 tvGenres: defaultGenres.tvGenres
        //             }
        //         })
        //     }
        // }
        
        // else if (category==='movie') {
        //     const isAllGenreSelectedFromMovie = genres.movieGenres.find(genre => genre.id===121212).isSelect
        //     if (genreId===121212 && !isAllGenreSelectedFromMovie) {
        //         setGenres(prevState => {
        //             return {
        //                 ...prevState,
        //                 movieGenres: defaultGenres.movieGenres
        //             }
        //         })
        //     }
        // }
        
        // else if (category==='all') {
        //     const isAllGenreSelectedFromAll = genres.allGenres.find(genre => genre.id===121212).isSelect
        //     if (genreId===121212 && !isAllGenreSelectedFromAll) {
        //         setGenres(prevState => {
        //             return {
        //                 ...prevState,
        //                 allGenres: defaultGenres.allGenres
        //             }
        //         })
        //     }
        // }
    }

    const value = {
        genres,
        selectGenre,
        genreChangeDetector
    }

    return (
        <GlobalStateContext.Provider value={value} >
            {children}
        </GlobalStateContext.Provider>
    )
}

export default GlobalState