import ImageWrapper from '../ImageWrapper'

const BackdropSection = ({allDetails}) => {
    return (
        <>
            <div className="hero-section">
                <div className="backdrop">
                    {
                        allDetails?
                        <ImageWrapper 
                            src={`https://image.tmdb.org/t/p/original/${allDetails.details.backdrop_path}`}
                            alt={allDetails.details.title} 
                            type={'backdrop'}
                         /> :
                        <div className="placeholder" ></div>
                    }
                </div>
            </div>
            <style jsx>
                {`
                
                .hero-section {
                    position: relative;
                    height: 60vh;
                    background-color: black;
                    overflow: hidden;
                }

                .backdrop {
                    position: relative;
                    height: 100%;
                    width: 100%;
                    top: 0;
                    left: 0;
                }

                .hero-section:before {
                    content: '';
                    position: absolute;
                    top: 0;
                    left: 0;
                    height: 100%;
                    width: 100%;
                    background-image: linear-gradient(to top, black,rgba(0,0,0,0.9), rgba(0,0,0,0.8), rgba(0,0,0,0.6),rgba(0,0,0,0.3),rgba(0,0,0,0.1));
                    z-index: 1;
                }

                .placeholder {
                    height: 100%;
                    width: 100%;
                    background-color: black;
                }
                
                `}
            </style>
        </>
    )
}

export default BackdropSection