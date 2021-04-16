//React
import {useRouter} from 'next/router'

//Components
import Movies from '../../component/Movies'

const Person = () => {
    
    const router = useRouter()

    return (
        <Movies
            siteData={{
                name: 'Popular Person | SkyFlix',
                category: 'person'
            }}
            pathname={{
                pathname: router.pathname, 
                name: 'person',
                apiURI: 'popular'
            }}
        />
    )
}

export default Person