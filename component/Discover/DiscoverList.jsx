import InnerMovieList from '../InnerMovieList'

const DiscoverList = ({movies, loadMore, loadingLoadMore}) => {
    return (
        <>
            <section>
                <div className="title-container">Discover</div>
                <div className="movie-list">
                    <InnerMovieList category={'movie'} movies={movies} loadMore={loadMore} loadingLoadMore={loadingLoadMore}/>
                </div>
            </section>
            <style jsx>
                {`
                
                    section {
                        width: 80%;
                        height: 100%;
                    }

                    .title-container {
                        height: 12vh;
                        display: flex;
                        align-items: center;
                        padding: 0 0 0 2vw;
                        font-size: 1.8rem;
                        font-weight: 700;
                        background-color: black;
                        text-transform: Capitalize;
                        color: white;
                    }

                    .movie-list {
                        height: 88vh;
                        position: relative;
                        overflow-y: scroll;
                    }
                
                `}
            </style>
        </>
    )
}

export default DiscoverList