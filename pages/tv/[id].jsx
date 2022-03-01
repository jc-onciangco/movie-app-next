//React
import {useEffect, useState} from 'react'
import {useRouter} from 'next/router'
import axios from 'axios'

//Layout
import MainLayout from '../../layout/MainLayout'
import Navigation from '../../component/Navigation'
import Details from '../../Component/MovieTvDetails/Details'

const TvId = () => {
    const router = useRouter()
    const [allDetails, setAllDetails] = useState(null)

    useEffect(() => {
        document.body.style.overflowY = 'scroll'
    },[])

    useEffect(() => {
        if (router.isReady) {
            getMovieDetails(router.query.id)
        }
    }, [router])

    const getMovieDetails = async id => {
        const apiKey = '3c543dcd94b82b3a00062a8ff1054b5e'
        const {data: details} = await axios.get(`https://api.themoviedb.org/3/tv/${id}?append_to_response=videos,images&api_key=${apiKey}`)
        const {data: recommendations} = await axios.get(`https://api.themoviedb.org/3/tv/${id}/recommendations?api_key=${apiKey}`)
        const {data: castsAndCrews} = await axios.get(`https://api.themoviedb.org/3/tv/${id}/credits?api_key=${apiKey}`)
        const {data: externalID} = await axios.get(`https://api.themoviedb.org/3/tv/${id}/external_ids?api_key=${apiKey}`)
        const {data: reviews} = await axios.get(`https://api.themoviedb.org/3/tv/${id}/reviews?api_key=${apiKey}`)
        const allData = {details, recommendations, castsAndCrews, externalID, reviews, type: 'tv'}
        console.log(allData)
        setAllDetails(allData)
    }

    return (
        <>
            <MainLayout siteData={{name: 'Discover | SkyFlix'}}>
                <div className="home-container">
                    <div className="left-side">
                        <Navigation />
                    </div>
                    <Details allDetails={allDetails}/>
                </div>
            </MainLayout>
            <style jsx>
                {`



                `}
            </style>
        </>
    )
}

export default TvId