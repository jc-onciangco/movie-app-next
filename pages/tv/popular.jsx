//React
import {useRouter} from 'next/router'

//Components
import Movies from '../../component/Movies'

const Popular = () => {
    
    const router = useRouter()

    return (
        <Movies
            siteData={{
                name: 'Popular Movies | SkyFlix',
                category: 'tv'
            }}
            pathname={{
                pathname: router.pathname, 
                name: 'popular',
                apiURI: 'popular'
            }}
        />
    )
}

export default Popular