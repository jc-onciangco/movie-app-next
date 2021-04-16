//Components
import SectionHeader from '../../SectionHeader'
import ImageWrapper from '../../ImageWrapper'

//Disocover movies
const SecondSection = ({movies}) => {

    return (
        <>
        <section className="discover-movies">
          <SectionHeader title={'Discover'} />
          <div className="discover-movie-container">
            {
              movies?
              movies.map(movie => {
                return (
                  <div className="discover-movie" key={movie.id}>
                    <div className="blur-style">
                      <div className="border-style"></div>
                    </div>
                    <div className="discover-movie-details-container">
                      <div className="details">
                        <h1 className={`discover-movie-title`}>{movie.title}</h1>
                        <p>
                          {
                            movie.genre_ids.map(genre => {
                              return (
                                <span className="genre" key={genre.id}>
                                  {
                                    genre.name
                                  }
                                </span>
                              )
                            })
                          }
                        </p>
                      </div>
                    </div>
                    <div className="backdrop-container">
                      <div className="img-wrapper">
                        <ImageWrapper 
                          src={`https://image.tmdb.org/t/p/original/${movie.backdrop_path}`} 
                          alt={movie.title}
                          type={'backdrop'}
                        />
                      </div>
                    </div>
                  </div>
                )
              }) :
              <div className="sketleton-discover-movies"></div>
            }
          </div>
        </section>
        <style jsx>
            {`
            
            .discover-movies {
                width: 100%;
            }

            .discover-movie-container {
              display: flex;
              flex-direction: column;
            }

            .sketleton-discover-movies {
              position: relative;
              top: 0;
              left: 0;
              height: 35vh;
              width: 100%;
              background-color: rgba(255,255,255,0.5);
              animation: loading 1s linear infinite;
            }

            @keyframes loading {
                0% {filter: brightness(100%)}
                50% {filter: brightness(80%)}
            }

            .discover-movie {
                background-color: white;
                position: relative;
                top: 0;
                left: 0;
                height: 35vh;
                width: 100%;
                overflow: hidden;
                transition: 0.3s linear;
            }

            .discover-movie:hover {
                height: 65vh;
            }

            .discover-movie:hover .img-wrapper {
                object-position: top;
                transform: scale(1.05);
            }

            .backdrop-container {
                position: absolute;
                top: 0;
                left: 0;
                height: 100%;
                width: 100%;
                overflow: hidden;
            }

            .backdrop-container > .img-wrapper {
                position: absolute;
                top: 0;
                left: 0;
                height: 100%;
                width: 100%;
                object-fit: cover;
                object-position: center;
                transform: scale(1);
                transition: 0.3s linear;
            }

            .discover-movie-details-container {
                position: absolute;
                top: 0;
                left: 0;
                height: 100%;
                width: 100%;
                background-image: linear-gradient(to right, rgba(0,0,0,1), rgba(0,0,0,0.4), rgba(0,0,0,1) );
                z-index: 4;
                transition: 0.3s linear;
                display: flex;
                flex-direction: column;
                justify-content: center;
                align-items: center;
            }

            .discover-movie-details-container > .details {
              text-align: left;
            }

            .discover-movie-details-container > .details > p {
              opacity: 0;
              transition: 0.3s linear;
            }

            .discover-movie-details-container > .details > p > .genre {
              position: relative;
              margin: 0 18px 0 0;
              color: rgba(255,255,255,0.75);
              font-weight: 600;
              display: inline-block;
              transition: 0.3s linear;
              transform: translate(0, -10px);
              padding: 0 0 2px 0;
            }

            .discover-movie-details-container > .details > p > .genre::before {
              content: '';
              position: absolute;
              top: 0;
              left: 0;
              border: 1.5px solid transparent;
              border-bottom-color: transparent;
              height: 100%;
              width: 0%;
              transition: 0.25s linear;
            }

            .discover-movie-details-container > .details > p > .genre:hover::before {
              width: 100%;
              border-bottom-color: rgba(255,255,255,0.75);
            }

            .discover-movie-details-container > .details > p > .genre:hover {
              color: rgba(255,255,255,1);
            }

            .blur-style {
                position: absolute;
                backdrop-filter: blur(0px);
                position: absolute;
                top: 0;
                left: 0;
                height: 100%;
                width: 100%;
                z-index: 5;
                pointer-events: none;
                padding: 12px;
            }
            .border-style {
                border: 1px solid transparent;
                background-color: transparent;
                height: 100%;
                width: 100%;
                transition: 0.3s linear;
                opacity: 0.6;
            }

            .discover-movie-details-container > .details > h1 {
                font-size: 3.5vw;
                -webkit-text-fill-color: transparent;
                -webkit-text-stroke-color: white;
                -webkit-text-stroke-width: 1px;
                transition: 0.3s linear;
                line-height: 0;
            }

            .discover-movie-container:hover  .blur-style{
                backdrop-filter: blur(3px);
            }
            .discover-movie:hover .blur-style {
                backdrop-filter: blur(0px);
            }
            .discover-movie:hover .border-style {
                border: 1px solid white;
            }

            .discover-movie:hover .discover-movie-details-container {
                background-image: linear-gradient(to right, rgba(0,0,0,0.8), rgba(0,0,0,0.4), rgba(0,0,0,0.8) );
            }

            .discover-movie:hover .details > .discover-movie-title {
                font-size: 3rem;
                -webkit-text-fill-color: white;
                opacity: 0.8;
            }

            .discover-movie:hover .details > p {
                opacity: 1;
            }

            .discover-movie .details > .discover-movie-title:hover {
              opacity: 1;
            }

            `}
        </style>
        </>
    )
}

export default SecondSection