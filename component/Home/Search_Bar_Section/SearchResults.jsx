//React
import {useState} from 'react'

//Components
import SquareLoading from '../../LoaderComponents/SquareLoading'
import Spinner from '../../LoaderComponents/Spinner'
import {globalStateContext} from '../../../context/GlobalState'
import ImageWrapper from '../../ImageWrapper'

const SearchResults = ({results, isLoading, changeCategoryAndFetch, filterGenres, loadMore, loadingLoadMore}) => {
    // var results = []

    // for (var i = 0; i < 20; i++) {
    //     results = [...results, i]
    // }
    const {genres, selectGenre} = globalStateContext()
    const [currentCategory, setCurrentCategory] = useState('multi')
    const [selectedGenres, setSelectedGenres] = useState([])

    const mainCategories = [
        {
            id: 0,
            name: 'all',
            id: 'multi'
        },
        {
            id: 1,
            name: 'movie',
            id: 'movie'
        },
        {
            id: 2,
            name: 'tv show',
            id: 'tv'
        },
        {
            id: 3,
            name: 'person',
            id: 'person'
        }
    ]

    const changeCategory = category => {
        changeCategoryAndFetch(category)
        setCurrentCategory(category)
    }

    const chooseGenre = (genreId, genreName, category) => {
        // if (selectedGenres.includes(genre)) {
        //     setSelectedGenres(prevState => {
        //         return prevState.filter(selected => selected !== genre)
        //     })
        // }
        // else {
        //     setSelectedGenres(prevState => [...prevState, genre])
        // }

        selectGenre(genreId, category)
        filterGenres(genreId, genreName, category)
    }

    return (
        <>
            <div className="search-results">
                
                {/* <section className="left-section">
                    <div className="show-type-filter">
                        <div className="filter-title">What do you want?</div>
                        <div className="categories">
                            {
                                mainCategories.map(category => {
                                    return (
                                        <div className="checkbox-wrapper" key={category.id}>
                                            <label htmlFor={category.id}>
                                                <input onChange={() => changeCategory(category.id)} id={category.id} type="radio" name="category" checked={currentCategory===category.id? true : false}/>
                                                <span>{category.name}</span>
                                            </label>
                                        </div>
                                    )
                                })
                            }
                        </div>
                    </div>
                    <div className="show-type-filter">
                        <div className="filter-title">Genre</div>
                        <div className="categories genres-categories">
                            {
                                genres &&
                                (
                                    currentCategory==='tv'?
                                    genres.tvGenres.map(genre => {
                                        return (
                                            <span
                                                style={{backgroundColor: genre.isSelect? '#3FA0EF' : 'rgba(255,255,255,0.1)'}} 
                                                onClick={() => chooseGenre(genre.id, genre.name, 'tv')}
                                                className="genre-filter" 
                                                key={genre.id}>{genre.name}</span>
                                        )
                                    }) :
                                    (
                                        currentCategory==='movie'?
                                        genres.movieGenres.map(genre => {
                                            return (
                                                <span 
                                                    style={{backgroundColor: genre.isSelect? '#3FA0EF' : 'rgba(255,255,255,0.1)'}} 
                                                    onClick={() => chooseGenre(genre.id, genre.name, 'movie')}
                                                    className="genre-filter" 
                                                    key={genre.id}>{genre.name}</span>
                                            )
                                        }) :
                                        (
                                            currentCategory==='multi' &&
                                            genres.allGenres.map(genre => {
                                                return (
                                                    <span 
                                                        style={{backgroundColor: genre.isSelect? '#3FA0EF' : 'rgba(255,255,255,0.1)'}} 
                                                        onClick={() => chooseGenre(genre.id, genre.name, 'all')}
                                                        className="genre-filter" 
                                                        key={genre.id}>{genre.name}</span>
                                                )
                                            })
                                        )
                                    )
                                )
                            }
                        </div>
                    </div>
                </section> */}

                <section className="right-section">
                    {
                        results &&
                        <>
                            <div className="inner-results">
                                {   
                                    results &&
                                    results.dataResults.results.map(result => {
                                        return (      
                                        <div className="result" key={result.id}>
                                            <div className="posterpath-container">
                                                {
                                                    (result.poster_path===null || result.profile_path===null)?
                                                    <div className="img-wrapper">
                                                        <ImageWrapper 
                                                            src={'/placeholder.jpg'} 
                                                            alt={'placeholder'}
                                                            type={'placeholder'}/>
                                                    </div> :
                                                    <div className="img-wrapper">
                                                        <ImageWrapper 
                                                            src={`https://image.tmdb.org/t/p/original/${result.poster_path || result.profile_path}`} 
                                                            alt={result.title}
                                                            type={'poster'}/>
                                                    </div>
                                                }
                                            </div>
                                            <div className="details">
                                                <div className="title">{result.title || result.name}</div>
                                                <div className="genres">
                                                    {   
                                                        result.genre_ids &&
                                                        result.genre_ids.map(genre => {
                                                        return (
                                                            <span key={genre.id} className="genre">
                                                            {
                                                                genre.name
                                                            }
                                                            </span>
                                                        )
                                                        })
                                                    }
                                                    {   
                                                        result.known_for &&
                                                        result.known_for.map((show, index) => {
                                                        return (
                                                            <span key={show.id} className="known-for">
                                                            {
                                                               `${show.title || show.name}${result.known_for.length !== index+1 && ', '}`
                                                            }
                                                            </span>
                                                        )
                                                        })
                                                    }
                                                </div>
                                            </div>
                                        </div>
                                        )
                                    })
                                }
                            </div>
                            {
                                results.dataResults.results.length!==0?
                                (
                                    results.dataResults.results.length !== results.dataResults.total_results &&
                                    (
                                        loadingLoadMore?
                                        <div className="pagination">
                                            <Spinner />
                                        </div>:
                                        <div className="pagination">
                                            <div onClick={() => loadMore(results.dataResults.page + 1)} className="load-more">Load more</div>
                                        </div>  
                                    )
                                ):
                                <div className="not-found">No Results Found</div>
                            }
                        </>
                    }
                    {
                        isLoading &&
                        <div className="loading-results">
                            <SquareLoading />
                        </div>
                    }
                </section>
            </div>
            <style jsx>
                {`
                
                    .search-results {
                        height: 84vh;
                        width: 100%;
                        background-color: transparent;
                    }

                    .left-section {
                        flex: 0.25;
                        height: 100%;
                        border: 2px solid transparent;
                        border-right-color: rgba(255,255,255,0.15);
                        padding: 0 0 0 25px;
                        overflow-y: scroll;
                    }

                    .filter-title {
                        font-size: 1.1rem;
                        font-weight: 600;
                        margin: 25px 0 15px 0;
                        color: white;
                    }

                    .genres-categories {
                        display: flex;
                        flex-wrap: wrap;
                    }

                    .genres-categories > span {
                        font-size: 1.05rem;
                        font-weight: 600;
                        padding: 6px 12px;
                        color: rgba(255,255,255,0.8);
                        margin: 0 8px 10px 0;
                        transition: 0.2s liner;
                        cursor: pointer;
                    }

                    .genres-categories > span:hover {
                        background-color: rgba(255,255,255,0.15);
                    }

                    .checkbox-wrapper {
                        margin: 0 0 5px 0;
                        padding: 0 0 0 15px;
                    }

                    .checkbox-wrapper > label > input {
                        margin: 0 10px 0 0;
                    }

                    .checkbox-wrapper > label > span {
                        font-size: 1.05rem;
                        font-weight: 600;
                        color: rgba(255,255,255,0.8);
                    }

                    .right-section {
                        position: relative;
                        flex: 1;
                        overflow-y: scroll;
                        height: 100%;
                        padding: 25px 0 10px 0;
                    }

                    .right-section::-webkit-scrollbar {
                        width: 1vw;
                    }

                    .right-section::-webkit-scrollbar-track {
                        background-color: rgba(255,255,255,0.1);
                    }

                    .right-section::-webkit-scrollbar-thumb {
                        background-color: #3FA0EF;
                    }

                    .inner-results {
                        width: 95%;
                        margin: 0 auto;
                        display: grid;
                        grid-template-columns: repeat(5, 1fr);
                        grid-gap: 20px;
                    }

                    .loading-results {
                        height: 100%;
                        width: 100%;
                        display: flex;
                        justify-content: center;
                        align-items: center;
                    }

                    .not-found {
                        padding: 12px 0;
                        color: white;
                        font-weight: 600;
                        opacity: 0.9;
                        height: 100%;
                        display: flex;
                        align-items: center;
                        justify-content: center;
                        font-size: 1.4vw;
                    }

                    .inner-results > .result {
                        margin: 0 0 20px 0;
                    } 

                    .posterpath-container {
                        width: 100%;
                    }

                    .posterpath-container  > .img-wrapper {
                        width: 100%;
                    }

                    .details {
                        padding: 0 0 0 6px;
                        margin: 10px 0 0 0;
                    }

                    .details > .title{
                        color: white;
                        font-size: 0.95rem;
                        font-weight: 600;
                    }

                    .genres {
                        display: flex;
                        flex-wrap: wrap;
                        margin: 10px 0 0 0;
                    }

                    .genres > .genre {
                        font-size: 0.9rem;
                        font-weight: 600;
                        padding: 2px 4px;
                        margin: 4px 3px;
                        background-color: white;
                    }

                    .genres > .known-for {
                        font-size: 0.8rem;
                        font-weight: 600;
                        color: rgba(255,255,255,0.6);
                        margin: 2px;
                    }


                    /* Papagination */

                    .pagination {
                        height: 12vh;
                        width: 100%;
                        display: flex;
                        justify-content: center;
                        align-items: center;
                    }

                    .pagination > .load-more {
                        cursor: pointer;
                        color: white;
                        font-weight: 600;
                        font-size: clamp(1rem, 1.5vw, 1.5rem)
                    }

                `}
            </style>
        </>
    )
}

export default SearchResults