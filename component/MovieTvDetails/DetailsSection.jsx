import PosterAndDetails from './PosterAndDetails'
import Casts from './Casts'
import ImageWrapper from '../ImageWrapper'

const DetailsSection = ({allDetails}) => {
    
    return (
        <>
            <div className="details-section">
                <PosterAndDetails allDetails={allDetails}/>
                <Casts allDetails={allDetails}/>
                {
                    allDetails?
                    <div className="images">
                        <div className="images-title">Images</div>
                        <div className="image-list">
                            {
                                allDetails.details.images.backdrops.slice(0, 12)
                                    .map(image => {
                                        return (
                                            <div className="img-wrapper" key={image.file_path}>
                                                {
                                                    image.file_path?
                                                    <ImageWrapper src={`https://image.tmdb.org/t/p/original/${image.file_path}`} alt={allDetails.details.title} type={'backdrop'} />
                                                    :
                                                    <ImageWrapper src={`/plis.jpg`} alt={allDetails.details.title} type={'placeholder'} />    
                                                }
                                            </div>
                                        )
                                    })
                            }
                        </div>
                    </div> :
                    <div className="images">
                        <div className="images-title">Fake</div>
                        <div className="image-list">
                            <div className="img-wrapper">
                                <ImageWrapper src={'/plis.jpg'} alt={'image'} type={'backdrop'} />
                            </div>
                        </div>
                    </div>
                }
                {

                }
                <div className="videos">
                    <div className="videos-title">Videos</div>
                </div>
                <div className="recommendations">
                    <div className="recommendations-title">Recommended</div>
                </div>
            </div>
            <style jsx>
                {`
                
                    .details-section {
                        position: relative;
                        top: -20vh;
                        left: 0;
                        z-index: 5;
                    }

                    .images, .videos, .recommendations {
                        width: 80%;
                        margin: 50px auto 0 auto;
                        z-index: 3;
                    }

                    .images-title, .videos-title, .recommendations-title {
                        font-size: 0.8em;
                        font-weight: 600;
                        color: white;
                        margin: 0 0 10px 0;
                    }

                    .image-list {
                        width: 100%;
                        display: flex;
                        flex-wrap: wrap;
                    }

                    .img-wrapper {
                        flex-grow: 1;
                        width: 15vw;
                    }   
                
                `}
            </style>
        </>
    )
} 

export default DetailsSection