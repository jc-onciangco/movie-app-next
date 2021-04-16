//React
import {useRouter} from 'next/router'

//Components
import Movies from '../../component/Movies'

const Upcoming = () => {
    
    const router = useRouter()

    return (
        <Movies
            siteData={{
                name: 'Upcoming Movies | SkyFlix',
                category: 'movie'
            }}
            pathname={{
                pathname: router.pathname, 
                name: 'upcoming',
                apiURI: 'upcoming'
            }}
        />
    )
}

export default Upcoming