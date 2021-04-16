//React
import {useRouter} from 'next/router'

//Components
import Movies from '../../component/Movies'

const NowPlaying = () => {
    
    const router = useRouter()

    return (
        <Movies
            siteData={{
                name: 'Now Playing | SkyFlix',
                category: 'movie'
            }}
            pathname={{
                pathname: router.pathname, 
                name: 'now playing',
                apiURI: 'now_playing'
            }}
        />
    )
}

export default NowPlaying