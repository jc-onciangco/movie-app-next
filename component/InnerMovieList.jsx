import Link from 'next/link'
import Spinner from './LoaderComponents/Spinner'
import Image from 'next/image'

const InnerMovieList = ({movies, category, loadMore, loadingLoadMore}) => {
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']

    return (
        <>
            {
                movies?
                (
                    movies.results.length===0?
                    <div className="no-result">No results</div>
                    :
                    <div className="inner-movie-list">
                        {   
                            movies.results.map(movie => {
                                return (
                                    <div className="movie" key={movie.id}>
                                        <div className="movie-posterpath-container">
                                            {
                                               (movie.poster_path || movie.profile_path)?
                                                <div className="img-wrapper">
                                                    <Image src={`https://image.tmdb.org/t/p/w500/${movie.poster_path || movie.profile_path}`} alt={movie.title} height="900" width="600"/>
                                                </div> 
                                                :
                                                <div className="img-wrapper">
                                                    <Image src="/placeholder.jpg" alt={movie.title} height="900" width="600"/> 
                                                </div> 
                                            }
                                        </div>
                                        <div className="details">
                                            <Link href={`/${category}/${movie.id}`}>
                                                <a className="title">{movie.title || movie.name}</a> 
                                            </Link>
                                            {
                                                category !== 'person' &&
                                                <div className="release-date">
                                                    {
                                                        (movie.release_date==='' || movie.release_date)?
                                                        'Release date:' :
                                                        'First air date:'
                                                    }
                                                    <span>
                                                        {   (movie.release_date==='' || movie.first_air_date==='')?
                                                            (
                                                                    'N/A'
                                                            ) :
                                                            (
                                                                movie.release_date? 
                                                                `${months[movie.release_date.split('-')[1] - 1]} ${movie.release_date.split('-')[2][0]==='0'? movie.release_date.split('-')[2].slice(1) : movie.release_date.split('-')[2]}, ${movie.release_date.split('-')[0]}`
                                                                :
                                                                `${months[movie.first_air_date.split('-')[1] - 1]} ${movie.first_air_date.split('-')[2][0]==='0'? movie.first_air_date.split('-')[2].slice(1) : movie.first_air_date.split('-')[2]}, ${movie.first_air_date.split('-')[0]}`
                                                            )
                                                        }
                                                    </span>
                                                </div>
                                            }
                                            <div className="genres">
                                                {   
                                                    category !== 'person'?
                                                    movie.genre_ids.map(genre => {
                                                        return (
                                                            <span key={genre.id} className="genre">{genre.name}</span>
                                                        )
                                                    }) :
                                                    movie.known_for.map((show, index) => {
                                                        return (
                                                            <Link href={`/${show.media_type}/${show.id}`} key={show.id}>
                                                                <a className="know-for">{show.title || show.name}{movie.known_for.length!==index+1 && ', '}</a>
                                                            </Link>
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
                ) :
                <div className="inner-movie-list">
                    {
                        [1,2,3,4,5,6,7,8].map(num => {
                        return (
                            <div className="movie" key={num}>
                                <div className="movie-posterpath-container skel-movie-posterpath-container">
                                    <img src={`/placeholder.jpg`} alt=''/>
                                </div>
                                <div className="details">
                                    <div className="skel-title"></div>
                                    <div className="skel-release-date"></div>
                                    <div className="genres">
                                        <span className="skel-genres"></span>
                                        <span className="skel-genres"></span>
                                    </div>
                                </div>
                            </div>
                            )
                        })
                    }
                </div>
            }
            {   
                movies &&
                (
                    movies.total_results!==movies.results.length &&
                    <div className="pagination">
                        {
                            loadingLoadMore? 
                            <div className="pagination">
                                <Spinner />
                            </div>:
                            <div onClick={() => loadMore(movies.page + 1)} className="load-more">Load more</div>
                        }
                    </div>  
                )
            }
            <style jsx>
                {`
                
                    .inner-movie-list {
                        width: 100%;
                        display: grid;
                        grid-template-columns: repeat(4, 1fr);
                        grid-gap: 20px;
                        padding: 0 20px;
                    }

                    .movie {
                    }

                    .no-result {
                        width: 100%;
                        height: 100%;
                        font-weight: 600;
                        display: flex;
                        justify-content: center;
                        align-items: center;
                    }

                    .movie-posterpath-container {
                        position: relative;
                        width: 100%;
                        height: auto;
                        overflow: hidden;
                    }

                    .movie-posterpath-container::before {
                        content: '';
                        position: absolute;
                        top: 0;
                        left: 0;
                        height: 100%;
                        width: 100%;
                        z-index: 5;
                    }

                    .movie-posterpath-container > .img-wrapper {
                        height: 100%;
                        width: 100%;
                        object-fit: cover;
                        object-position: center;
                        transform: scale(1.02);
                        transition: 0.3s linear;
                    }

                    .movie:hover .img-wrapper {
                        transform: scale(1.05);
                    }

                    .details {
                        margin: 6px 0 0 0;
                    }

                    .votes {
                        height: 2.6vw;
                        width: 2.6vw;
                        border-radius: 50%;
                        background-image: linear-gradient(45deg, #1A74E2, #3FA0EF, #6BD0FF); 
                        margin: 0 12px 0 0;
                        color: white;
                        display: flex;
                        justify-content: center;
                        align-items: center;
                        font-weight: 600;
                    }

                    .title {
                        font-size: 1.15rem;
                        font-weight: 700;
                        color: #6BD0FF;
                        margin: 0 0 5px 0;
                    }

                    .release-date {
                        font-size: 0.9rem;
                        font-weight: 600;
                        margin: 0 0 10px 0;
                        color: white;
                    }

                    .release-date > span {
                        font-weight: 400;
                        color: rgba(255,255,255,0.8);
                        margin: 0 0 0 5px;
                    }

                    .genres {
                        display: flex;
                        flex-wrap: wrap;
                        margin: 8px 0;
                    }

                    .genre {
                        background-color: rgba(255,255,255,0.2);
                        color: white;
                        padding: 2.5px 10px;
                        padding-bottom: 2px;
                        margin: 0 8px 8px 0;
                        border-radius: 100px;
                        font-size: 0.8rem;
                        font-weight: 600;
                        backdrop-filter: blur(5px);
                    }

                    .know-for {
                        font-size: 1.1vw;
                        margin: 0 5px 0 0;
                        color: rgba(255, 255, 255,0.65);
                        transition: 0.1s linear;
                    }

                    .know-for:hover {
                        color: white;
                    }

                    .skel-movie-posterpath-container > img {
                        position: relative;
                        height: 100%;
                        width: 100%;
                        object-fit: cover;
                        object-position: center;
                        transform: scale(1.02);
                        transition: 0.3s linear;
                    }
                    
                    .skel-movie-posterpath-container::before {
                        content: '';
                        position: absolute;
                        top: 0;
                        left: 0;
                        height: 100%; 
                        width: 100%;
                        background-color: #999999;
                        z-index: 1;
                        animation: shine 0.8s linear infinite;
                    }

                    .skel-title {
                        margin: 10px 0;
                        height: 1.5vw;
                        width: 80%;
                        background-color: rgba(255,255,255,0.7);
                        border-radius:100px;
                        animation: shine 0.8s linear infinite;
                    }

                    .skel-release-date {
                        height: 1.1vw;
                        width: 50%;
                        margin: 0 0 10px 0;
                        background-color: rgba(255,255,255,0.3);
                        border-radius:100px;
                        animation: shine 0.8s linear infinite;
                    }

                    .skel-genres {
                        background-color: rgba(255,255,255,0.2);
                        padding: 2.5px 10px;
                        margin: 0 8px 8px 0;
                        border-radius: 100px;
                        width: 5vw;
                        height: 1rem;
                        animation: shine 0.8s linear infinite;
                    }

                    @keyframes shine {
                        0% {
                            filter: brightness(100%);
                        }
                        50% {
                            filter: brightness(130%);
                        }
                    }


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

export default InnerMovieList