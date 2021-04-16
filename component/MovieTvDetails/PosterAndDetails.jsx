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
                </div>
                {
                    allDetails?
                    <div className="important-details">
                        <div className="title-media-type">
                            <span className="media-type">Movie</span>
                            <div className="title">{allDetails.details.title} <span className="year-only">({allDetails.details.release_date.split('-')[0]})</span></div>
                        </div>
                        <div className="votes">
                            <div className="stars-container">
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
                        <div className="genres">
                            {
                                allDetails.details.genres.map(genre => {
                                    return (
                                        <Link href={`/genres/${genre.id}`} key={genre.id}>
                                            <a className="genre">{genre.name}</a>
                                        </Link>
                                    )
                                })
                            }
                        </div>
                        <div className="external-links">
                            {
                                allDetails.details.homepage &&
                                <a href={allDetails.details.homepage} className="icon-links">
                                    <i className="fas fa-link"></i>
                                </a>
                            }
                            {
                                allDetails.externalID.imdb_id &&
                                <a href={`https://www.imdb.com/title/${allDetails.externalID.imdb_id}/`} className="icon-links">
                                    <i className="fab fa-imdb"></i>
                                </a>
                            }
                            {
                                allDetails.externalID.facebook_id &&
                                <a href={`https://www.facebook.com/${allDetails.externalID.facebook_id}/`} className="icon-links">                          	
                                    <i className="fab fa-facebook-square"></i>
                                </a>
                            }
                            {
                                allDetails.externalID.twitter_id &&
                                <a href={`https://twitter.com/${allDetails.externalID.twitter_id}/`} className="icon-links">
                                    <i className="fab fa-twitter-square"></i>
                                </a>
                            }
                            {
                                allDetails.externalID.instagram_id &&
                                <a href={`https://www.instagram.com/${allDetails.externalID.instagram_id}/`} className="icon-links">
                                    <i className="fab fa-instagram"></i>
                                </a>
                            }
                        </div>
                        <div className="line"></div>
                        <div className="release-date-and-runtime">
                            <div className="release-date">
                                Realese date: 
                                <span>{`${months[allDetails.details.release_date.split('-')[1] - 1]} ${allDetails.details.release_date.split('-')[2][0]==='0'? allDetails.details.release_date.split('-')[2].slice(1) : allDetails.details.release_date.split('-')[2]}, ${allDetails.details.release_date.split('-')[0]}`}</span>
                            </div>
                            <div className="runtime">
                                Runtime: <span>{`${Math.floor(allDetails.details.runtime/60)}hr ${allDetails.details.runtime - (Math.floor(allDetails.details.runtime/60) * 60)}min`}</span>
                            </div>
                        </div>
                        <div className="overview">
                            <div className="overview-title">Overview</div>
                            <div className="overview-content">
                                {allDetails.details.overview}
                            </div>
                            <div className="crews">
                                {
                                    allDetails.castsAndCrews.crew.filter(crew => {
                                        return crew.job === 'Director'
                                    }).map(crew => {
                                        return (
                                            <div className="crew" key={crew.id}>
                                                <Link href={`/${crew.id}`}>
                                                    <a className="fullname">{crew.name}</a>
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
                    }

                    .important-details {
                        flex: 0.75;

                    }

                    .title-media-type {
                        padding: 0 2vw;
                    }

                    .media-type {
                        display: block;
                        font-size: 0.75em;
                        color: rgba(255,255,255,0.8);
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
                        padding: 6px 2vw 6px 2vw;
                        position: relative;
                        font-size: 0.6em;
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
                        padding: 10px 2vw 0 2vw;
                    }

                    .genre {
                        margin: 0 10px 10px 0;
                        font-size: 0.5em;
                        font-weight: 600;
                        background-color: #1A74E2;
                        border-radius: 3px;
                        padding: 3px 8px;
                        color: white;
                    }

                    .external-links {
                        display: flex;
                        flex-wrap: wrap;
                        padding: 0 2vw 10px 2vw;
                        color: white;
                        font-size: 0.8em;
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
                        padding: 10px 2vw;
                        font-size: 0.6em;
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
                        padding: 10px 2vw;
                        color: white;
                    }

                    .overview-title {
                        font-size: 0.8em;
                        font-weight: 600;
                    }

                    .overview-content {
                        font-size: 0.6em;
                        margin: 6px 0 0 0;
                    }




                    .crews {
                        margin: 30px 0 0 0;
                        color: white;
                        display: flex;
                        align-items: center;
                    }

                    .crew {
                        margin: 0 30px 0 0;
                    }

                    .crew > .fullname {
                        font-size: 0.7em;
                        font-weight: 600;
                    }

                    .crew > .position {
                        font-size: 0.6em;
                        color: rgba(255,255,255,0.6);
                    }
                
                `}
            </style>
        </>
    )
}

export default PosterAndDetails