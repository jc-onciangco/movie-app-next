//React
import {useRouter} from 'next/router'

//Components
import Movies from '../../component/Movies'

const TopRated = () => {
    
    const router = useRouter()

    return (
        <Movies
            siteData={{
                name: 'Top Rated Movies | SkyFlix',
                category: 'movie'
            }}
            pathname={{
                pathname: router.pathname, 
                name: 'top rated',
                apiURI: 'top_rated'
            }}
        />
    )
}

export default TopRated