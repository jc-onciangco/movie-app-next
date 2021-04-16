//React
import {useRouter} from 'next/router'

//Components
import Movies from '../../component/Movies'

const OnTheAir = () => {
    
    const router = useRouter()

    return (
        <Movies
            siteData={{
                name: 'On The Air | SkyFlix',
                category: 'tv'
            }}
            pathname={{
                pathname: router.pathname, 
                name: 'on the air',
                apiURI: 'on_the_air'
            }}
        />
    )
}

export default OnTheAir