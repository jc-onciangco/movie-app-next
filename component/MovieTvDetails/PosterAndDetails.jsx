import ImageWrapper from '../ImageWrapper'
import Link from 'next/link'

const PosterAndDetails = ({allDetails}) => {
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']

    return(
        <>
            <div className="details">
                <div className="poster">
                    <div className="img-wrapper">
                        {       
                            allDetails?
                            <ImageWrapper 
                                src={`https://image.tmdb.org/t/p/original${allDetails.details.poster_path}`}
                                alt={allDetails.details.title} 
                                type={'poster'}
                            /> :
                            <div className="placeholder" ></div>
                        }
                    </div>
                    <div title="Watch now!" className="watch-trailer">Watch Trailer</div>
                </div>
                {
                    allDetails?
                    <div className="important-details">
                        <div className="title-media-type padding-style">
                            <span className="media-type">{allDetails.type}</span>
                            <div className="title">{allDetails.details.title || allDetails.details.name} <span className="year-only">
                                ({allDetails.details.release_date? allDetails.details.release_date.split('-')[0] : allDetails.details.first_air_date.split('-')[0]})
                            </span></div>
                        </div>
                        <div className="votes padding-style">
                            <div title={`Vote average: ${allDetails.details.vote_average}`} className="stars-container">
                                {
                                    [1,2,3,4,5].map(star => {
                                        return (
                                            <div className="icon-star" key={star}>
                                                <i className="fas fa-star"></i>
                                            </div>
                                        )
                                    })
                                }
                                <div style={{width: `${(allDetails.details.vote_average * 100) / 10}%`}} className="stars-container-active">
                                    {
                                        [1,2,3,4,5].map(star => {
                                            return (
                                                <div className="icon-star-active" key={star}>
                                                    <i className="fas fa-star"></i>
                                                </div>
                                            )
                                        })
                                    }
                                </div>
                            </div>
                        </div>
                        <div className="genres padding-style">
                            {
                                allDetails.details.genres.map(genre => {
                                    return (
                                        <Link href={`/genres/${genre.id}`} key={genre.id}>
                                            <a title={genre.name} className="genre">{genre.name}</a>
                                        </Link>
                                    )
                                })
                            }
                        </div>
                        <div className="external-links padding-style">
                            {
                                allDetails.details.homepage &&
                                <a title="Website" href={allDetails.details.homepage} className="icon-links">
                                    <i className="fas fa-link"></i>
                                </a>
                            }
                            {
                                allDetails.externalID.imdb_id &&
                                <a title="IMDB" href={`https://www.imdb.com/title/${allDetails.externalID.imdb_id}/`} className="icon-links">
                                    <i className="fab fa-imdb"></i>
                                </a>
                            }
                            {
                                allDetails.externalID.facebook_id &&
                                <a title="Facebook" href={`https://www.facebook.com/${allDetails.externalID.facebook_id}/`} className="icon-links">                          	
                                    <i className="fab fa-facebook-square"></i>
                                </a>
                            }
                            {
                                allDetails.externalID.twitter_id &&
                                <a title="Twitter" href={`https://twitter.com/${allDetails.externalID.twitter_id}/`} className="icon-links">
                                    <i className="fab fa-twitter-square"></i>
                                </a>
                            }
                            {
                                allDetails.externalID.instagram_id &&
                                <a title="Instagram" href={`https://www.instagram.com/${allDetails.externalID.instagram_id}/`} className="icon-links">
                                    <i className="fab fa-instagram"></i>
                                </a>
                            }
                        </div>
                        <div className="line"></div>
                        <div className="release-date-and-runtime padding-style">
                            <div className="release-date">
                                {
                                    allDetails.details.release_date? 'Release date:' : 'First air date:'
                                }
                                {
                                    (allDetails.details.release_date || allDetails.details.first_air_date)?
                                    <span>
                                        {
                                            allDetails.details.release_date?
                                            `${months[allDetails.details.release_date.split('-')[1] - 1]} ${allDetails.details.release_date.split('-')[2][0]==='0'? allDetails.details.release_date.split('-')[2].slice(1) : allDetails.details.release_date.split('-')[2]}, ${allDetails.details.release_date.split('-')[0]}`:
                                            `${months[allDetails.details.first_air_date.split('-')[1] - 1]} ${allDetails.details.first_air_date.split('-')[2][0]==='0'? allDetails.details.first_air_date.split('-')[2].slice(1) : allDetails.details.first_air_date.split('-')[2]}, ${allDetails.details.first_air_date.split('-')[0]}`
                                        }
                                    </span>
                                    :
                                    <span>N/A</span>
                                }
                            </div>
                            {
                                allDetails.details.runtime &&
                                <div className="runtime">
                                    Runtime: <span>{`${Math.floor(allDetails.details.runtime/60)}hr ${allDetails.details.runtime - (Math.floor(allDetails.details.runtime/60) * 60)}min`}</span>
                                </div>
                            }
                            {
                                allDetails.details.number_of_episodes &&
                                <div className="runtime">
                                    Number of episodes: <span>{allDetails.details.number_of_episodes}</span>
                                </div>
                            }
                            {
                                allDetails.details.number_of_seasons &&
                                <div className="runtime">
                                    Number of seasons: <span>{allDetails.details.number_of_seasons}</span>
                                </div>
                            }
                        </div>
                        <div className="overview padding-style">
                            <div className="overview-title">Overview</div>
                            <div className="overview-content">
                                {allDetails.details.overview}
                            </div>
                            <div className="crews">
                                {
                                    allDetails.castsAndCrews.crew.slice(0, 3).map(crew => {
                                        return (
                                            <div className="crew" key={crew.id}>
                                                <Link href={`/${crew.id}`}>
                                                    <a title={crew.name} className="fullname">{crew.name}</a>
                                                </Link>
                                                <div className="position">{crew.job}</div>
                                            </div>
                                        )
                                    })
                                }
                            </div>
                        </div>
                    </div> :
                    <div className="skel-important-details"></div>
                }
            </div>
            <style jsx>
                {`
                
                    .details {
                        width: 80%;
                        margin: 0 auto;
                        z-index: 3;
                        display: flex;
                    }

                    .poster {
                        flex: 0.25;
                        height: 100%;
                    }

                    .img-wrapper {
                        height: 100%;
                        border-radius: 4px;
                        overflow: hidden;
                    }

                    .watch-trailer {
                        background-color: white;
                        margin: 10px 0 0 0;
                        border-radius: 4px;
                        font-size: 0.6em;
                        font-weight: 600;
                        text-align: center;
                        padding: 6px 0;
                        width: 100%;
                        transition: 0.2s linear;
                        cursor: pointer;
                    }

                    .watch-trailer:hover {
                        -webkit-filter: brightness(92%);
                        filter: brightness(92%);
                    }

                    .important-details {
                        flex: 0.75;
                    }

                    .padding-style {
                        padding: 0 2vw;
                    }

                    .media-type {
                        display: block;
                        font-size: 0.75em;
                        color: rgba(255,255,255,0.8);
                        text-transform: capitalize;
                        font-weight: 600;
                    }

                    .title {
                        font-size: 1.3em;
                        font-weight: 700;
                        color: white;
                    }

                    .year-only {
                        font-weight: 400;
                        opacity: 0.6;
                    }

                    .votes {
                        position: relative;
                        font-size: 0.65em;
                        margin: 5px 0 0 0;
                    }

                    .stars-container {
                        position: relative;
                        display: inline-flex;
                    }

                    .stars-container-active {
                        display: inline-flex;
                        position: absolute;
                        top: 0;
                        left: 0;
                        z-index: 1;
                        overflow: hidden;
                    }

                    .icon-star {
                        color: rgba(255,255,255,0.5);
                    }

                    .icon-star-active {
                        color: yellow;
                    }

                    .genres {
                        display: flex;
                        flex-wrap: wrap;
                        margin: 10px 0 0 0;
                    }

                    .genre {
                        margin: 0 10px 10px 0;
                        font-size: 0.6em;
                        font-weight: 600;
                        background-color: #1A74E2;
                        border-radius: 3px;
                        padding: 3px 8px;
                        color: white;
                    }

                    .external-links {
                        display: flex;
                        flex-wrap: wrap;
                        margin: 0 0 10px 0;
                        color: white;
                        font-size: 1em;
                    }

                    .icon-links {
                        margin: 0 12px 0 0;
                    }

                    .line {
                        width: 100%;
                        height: 1px;
                        background-color: white;
                        margin: 0 0 0 2vw;
                        border-radius: 10px;
                        opacity: 0.6;
                    }



                    .release-date-and-runtime {
                        margin: 10px 0;
                        font-size: 0.7em;
                        color: white;
                    }

                    .release-date, .runtime {
                        font-weight: 600;
                        margin: 0 0 4px 0;
                    }

                    .release-date > span,
                    .runtime > span {
                        color:rgba(255,255,255,0.8);
                        margin: 0 0 0 10px;
                    }



                    .overview {
                        margin: 20px 0;
                        color: white;
                    }

                    .overview-title {
                        font-size: 1em;
                        font-weight: 600;
                    }

                    .overview-content {
                        font-size: 0.75em;
                        margin: 6px 0 0 0;
                    }




                    .crews {
                        margin: 30px 0 0 0;
                        color: white;
                        display: flex;
                        align-items: center;
                        justify-content: space-between;
                    }

                    .crew > .fullname {
                        font-size: 0.8em;
                        font-weight: 600;
                    }

                    .crew > .position {
                        font-size: 0.75em;
                        color: rgba(255,255,255,0.6);
                    }



                    @media screen and (max-width: 560px) {
                        .details {
                            width: 90%;
                            flex-direction: column;
                        }
                        
                        .poster {
                            height: 100%;
                            margin: 0 0 25px 0;
                            padding: 0 15vw;
                        }

                        .title-media-type {
                            margin: 0 0 10px 0;
                        }

                        .title {
                            font-size: 1.45em;
                        }

                        .padding-style {
                            padding: 0;
                        }

                        .votes {
                            margin: 0 0 15px 0;
                            font-size: 0.8em;
                        }

                        .genres {
                            margin: 0 0 20px 0;
                        }
                        
                        .genre {
                            font-size: 0.65em;
                        }

                        .external-links {
                            justify-content: center;
                            font-size: 1.2em;
                        }

                        .line {
                            margin: 0;
                        }

                        .release-date-and-runtime {
                            margin: 10px 0 20px 0;
                            font-size: 0.75em;
                            color: white;
                        }

                        .overview-title {
                            font-size: 1em;
                        }

                        .overview-content {
                            font-size: 0.75em;
                        }

                        .release-date > span,
                        .runtime > span {
                           font-weight: 400;
                        }

                        .crew > .fullname {
                            font-size: 0.75em;
                            font-weight: 600;
                        }

                        .crew > .position {
                            font-size: 0.75em;
                        }

                        .watch-trailer {
                            background-color: white;
                            margin: 10px 0 0 0;
                            border-radius: 4px;
                            font-size: 0.65em;
                            font-weight: 600;
                            text-align: center;
                            padding: 8px 0;
                            width: 100%;
                        }

                    }
                
                `}
            </style>
        </>
    )
}

export default PosterAndDetails