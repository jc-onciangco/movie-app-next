//rReact 
import {useEffect} from 'react'

//Components
import Navigation from '../component/Navigation'
import MoviesTvShowsGrid from '../component/GridLists/MoviesTvShowsGrid'

//Layout
import MainLayout from '../layout/MainLayout'

const TvShow = () => {

    useEffect(() => {
        document.body.style.overflowY = 'hidden'
    },[])

    var movies = []

    for (var i = 0; i < 20; i++) {
        movies = [...movies, i]
    }

    return (
        <>
            <MainLayout siteData={{name: 'Tv Shows | SkyFlix'}}>
                <div className="home-container">
                    <div className="left-side">
                        <Navigation />
                    </div>
                    <MoviesTvShowsGrid movies={movies} />
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

export default TvShow