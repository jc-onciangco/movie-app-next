//React
import {useState, useEffect, useRef, useMemo} from 'react'
import axios from 'axios'
//Components
import SearchResults from './SearchResults'
import SearchedResultsCount from './SearchedResultsCount'
//State
import {globalStateContext} from '../../../context/GlobalState'

const SearchbarSection = () => {
    const {genres, genreChangeDetector} = globalStateContext()
    const inputRef = useRef()
    const [expandSearchArea, setExpandSearchArea] = useState(false)
    const [results, setResults] = useState(null)
    const [resultsCache, setResultsCache] = useState(null)
    const [loadingResults, setLoadingResults] = useState(false)
    const [category, setCategory] = useState('multi') 
    const [selectedGenres, setSelectedGenres] = useState({
      all: [],
      movie: [],
      tv: []
    })
    const [page, setPage] = useState(1)
    const [loadingLoadMore, setLoadingLoadMore] = useState(false)
    const [queryCache, setQueryCache] = useState(null)
    const [onChangeQueryCache, setOnChangeQueryCache] = useState(null)

    useEffect(() => {
      if (!expandSearchArea) {
        document.body.style.overflowY = 'scroll'
        return
      }
      document.body.style.overflowY = 'hidden'
    },[expandSearchArea])

    useEffect(() => {
      if (!results) return
      fetchSearchedData(queryCache)
    }, [category])

    // const filterResults = useMemo(() => {
    //   if (!genres) {}
    //   const searchedResults = results.dataResults
    //   const movieGenres = genres.movieGenres.filter(genre => genre.isSelect)
    //                                         .map(genre => genre.name)
    //   const filteredResults = searchedResults.filter(result => {
    //     movieGenres.forEach(filter => {
    //       return result.genre_ids.some(genre => genre.name === filter)
    //     })
    //   })
      
    //   console.log(movieGenres, results, filteredResults)
    // }, [genres])

    useEffect(() => {
      if (!results) return
      const searchedResults = results.dataResults
      var filteredResults = resultsCache
      selectedGenres.movie.forEach(filter => {
        filteredResults = filteredResults.filter(result => {
          return result.genre_ids.some(genre => genre.name === filter)
        })
      })
      setResults
      console.log(selectedGenres, filteredResults)
    }, [selectedGenres])

    useEffect(async () => {
      if (page===1) return
      const query = queryCache
      const {data} = await axios.get(`https://api.themoviedb.org/3/search/${category}?query=${query}&page=${page}&api_key=3c543dcd94b82b3a00062a8ff1054b5e`)
      const nextResults = data.results.map(result => {
                          if (!result.genre_ids) return result
                          return {
                            ...result,
                            genre_ids: result.genre_ids.map(id => {
                              if (category === 'multi') {
                                return genres.genres.find(genre => genre.id === id)
                              }
                              else if (category === 'movie') {
                                return genres.movieGenres.find(genre => genre.id === id)
                              }
                              else if (category === 'tv') {
                                return genres.tvGenres.find(genre => genre.id === id)
                              }
                            })
                          }
                        })
      
      const filteredArr = [...results.dataResults.results, ...nextResults].reduce((acc, current) => {
        const x = acc.find(result => result.id === current.id)
        if (!x) {
          return acc.concat([current])
        } else {
          return acc
        }
      }, [])

      setResults(prevState => {
        return {
          ...prevState,
          dataResults: {
            ...data,
            results:  filteredArr
          }
        }
      })

      setLoadingLoadMore(false)
    }, [page])

    const handleExpandSearch = () => {
      setExpandSearchArea(true)
    }

    const handleMinimizeSearch = () => {
      setExpandSearchArea(false)
      setResults(null)
      setLoadingResults(false)
      inputRef.current.value = ''
    }

    const fetchSearchedData = async query => {
      setResults(null)
      setLoadingResults(true)
      setQueryCache(query)
      try {
        const {data} = await axios.get(`https://api.themoviedb.org/3/search/${category}?query=${query}&page=${page}&api_key=3c543dcd94b82b3a00062a8ff1054b5e`)
        const dataResults = {
          ...data,
          results: data.results.map(result => {
                      if (!result.genre_ids) return result
                      return {
                        ...result,
                        genre_ids: result.genre_ids.map(id => {
                          if (category === 'multi') {
                            return genres.genres.find(genre => genre.id === id)
                          }
                          else if (category === 'movie') {
                            return genres.movieGenres.find(genre => genre.id === id)
                          }
                          else if (category === 'tv') {
                            return genres.tvGenres.find(genre => genre.id === id)
                          }
                        })
                      }
                    })
        }
        console.log('Modified with genres: ',dataResults)
        const countResults = data.total_results
        setResults({dataResults, countResults})
        setResultsCache({dataResults, countResults, query})
        setLoadingResults(false)
      }
      catch (error) {
        setLoadingResults(false)
        setResults(null)
      }
    }

    const searchShow = () => {
      if (inputRef.current.value==='') return
      fetchSearchedData(onChangeQueryCache)
    }

    const changeCategoryAndFetch = chosenCategory => {
      setPage(1)
      setCategory(chosenCategory)
    }  

    const clearSearch = () => {
      inputRef.current.value = ''
      setOnChangeQueryCache(null)
    }

    const enterSearch = e => {
      if (e.key==='Enter') {
        fetchSearchedData(inputRef.current.value)
      }
    }

    // const filterGenres = (id, name, category) => {
    //   if (name === 'All') {
    //     setSelectedGenres({
    //       all: [],
    //       movie: [],
    //       tv: []
    //     })
    //     return
    //   }

    //   setSelectedGenres(prevState => {

    //     if (category === 'movie') {
    //       if (prevState.movie.includes(name)) {
    //         return {
    //           ...prevState,
    //           movie: prevState.movie.filter(filter => filter !== name)
    //         }
    //       }
    //       return {
    //         ...prevState,
    //         movie: [...prevState.movie, name]
    //       }
    //     }

    //   })
    //   // if (!results) return
    //   // const searchedResults = results.dataResults
    //   // const filteredResults = searchedResults.filter(result => {
    //   //   return result.genre_ids.some(genre => genre.name === name)
    //   // })
    //   console.log(id, name, category)
    // }

    const loadMore = page => {
      setLoadingLoadMore(true)
      setPage(page)
    }

    const saveQuerySearch = e => {
      const val = e.target.value
      setOnChangeQueryCache(val)
    }
    
    return (
        <>
            <div className="search-bar">
              {
                expandSearchArea &&
                <div onClick={handleMinimizeSearch} className="exit-search ">
                  <i className="fas fa-chevron-left"></i>
                </div> 
              }
              <div className="highest-container">
                <div className={`search-container`}>
                  <div className="icon-container">
                    <i className="fas fa-search"></i>
                  </div>
                  <input onChange={saveQuerySearch} onKeyDown={enterSearch} ref={inputRef} onFocus={handleExpandSearch} type="text" placeholder="Search"/>
                  <div className="clear-container">
                    <i onClick={clearSearch} className="fas fa-times"></i>
                  </div>
                </div>
                {
                  expandSearchArea &&
                  <div 
                    style={
                      {
                        filter: inputRef.current.value===''? 'brightness(50%)' : 'brightness(100%)',
                        cursor: inputRef.current.value===''? 'not-allowed' : 'pointer'
                      }
                    }
                    onClick={searchShow} 
                    className="search-btn"
                  >Search</div>
                }
              </div>
              {
                expandSearchArea &&
                <SearchedResultsCount 
                  count={results} 
                  isSearchOpen={expandSearchArea}
                  changeCategoryAndFetch={changeCategoryAndFetch}
                  currentQuery={queryCache}
                />
              }
              {
                expandSearchArea &&
                <SearchResults
                  results={results} 
                  isLoading={loadingResults} 
                  changeCategoryAndFetch={changeCategoryAndFetch}
                  // filterGenres={filterGenres}
                  loadMore={loadMore}
                  loadingLoadMore={loadingLoadMore}
                />
              }
            </div>
            <style jsx>
                {`
                
            .search-bar {
              position: fixed;
              top: 0;
              right: 0;
              width: 80%;
              min-height: ${expandSearchArea? '10vh' : '8vh'};
              z-index: 20;
              transition: 0.3s linear;
              display: flex;
              flex-direction: column;
              align-items: center;
              background-color: rgba(0,0,0,0.8);
              backdrop-filter: blur(5px);
            }

            .exit-search {
              position: absolute;
              top: 0;
              left: 0;
              z-index: 21;
              color: white;
              height: ${expandSearchArea? '10vh' : '8vh'};
              display: flex;
              align-items: center;
              padding: 0 0 0 20px;
            }

            .search-bar:hover {
              min-height: 10vh;
            }

            .highest-container {
              height: ${expandSearchArea? '10vh' : '8vh'};
              width: 100%;
              display: flex;
              align-items: center;
              justify-content: center;
              transition: 0.3s linear;
            }

            .search-bar:hover .highest-container{
              height: 10vh;
            }

            .search-container {
              height: ${expandSearchArea? '6vh' : '5vh'};
              width: 40%;
              display: flex;
              align-items: center;
              background-color: rgba(255,255,255,0.2);
              transition: 0.3s linear;
            }

            .search-container > .clear-container {
              display: flex;
              justify-content: center;
              align-items: center;
              padding: 0 12px;
            }

            .clear-container > i {
              font-size: 1.1rem;
              color: rgba(255,255,255,0.5);
            }

            .search-bar:hover .search-container{
              height: 6vh;
            }

            .search-container > .icon-container {
              display: flex;
              justify-content: center;
              align-items: center;
              padding: 0 12px;
            }

            .icon-container > i {
              font-size: 1.1rem;
              color: rgba(255,255,255,0.5);
            }

            .search-container > input {
              height: 100%;
              width: 100%;
              border: none;
              outline: none;
              font-size: 1.2rem;
              background-color: transparent;
              color: rgba(255,255,255,0.9);
              letter-spacing: 1px;
              flex: 1;
            }
            ::placeholder {
              color: rgba(255,255,255,0.7);
              font-size: 0.95rem;
            }

            .search-btn {
              margin: 0 0 0 20px;
              background-color: rgba(255,255,255,0.25);
              height: ${expandSearchArea? '6vh' : '5vh'};
              padding: 0 14px;
              display: flex;
              justify-content: center;
              align-items: center;
              font-size: 0.9;
              font-weight: 600;
              color: white;
              transition: 0.15s linear;
              cursor: pointer;
            }

            .search-btn:hover {
              background-color: rgba(255,255,255,0.3);
            }
                
                `}
            </style>
        </>
    )
}

export default SearchbarSection