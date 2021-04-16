import BackdropSection from './BackdropSection'
import DetailsSection from './DetailsSection'

const Details = ({allDetails}) => {
    return (
        <>
            <section className="movie-details">
                <BackdropSection allDetails={allDetails}/>
                <DetailsSection allDetails={allDetails} />
            </section>
            <style jsx>
                {`
                
                    .movie-details {
                        position: absolute;
                        top: 0;
                        right: 0;
                        width: 80%;
                        background-color: black;
                        font-size: clamp(1.1rem, 2.1vw, 1.6rem);
                        padding: 0 0 100px 0;
                    }
                
                `}
            </style>
        </>
    )
}

export default Details