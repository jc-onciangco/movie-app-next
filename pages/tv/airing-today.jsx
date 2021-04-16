//React
import {useRouter} from 'next/router'

//Components
import Movies from '../../component/Movies'

const AiringToday = () => {
    
    const router = useRouter()

    return (
        <Movies
            siteData={{
                name: 'Airing Today | SkyFlix',
                category: 'tv'
            }}
            pathname={{
                pathname: router.pathname, 
                name: 'airing today',
                apiURI: 'airing_today'
            }}
        />
    )
}

export default AiringToday