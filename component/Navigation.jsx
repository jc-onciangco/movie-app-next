import Link from 'next/link'
import {useEffect} from 'react'
import {useRouter} from 'next/router'

const Navigation = () => {
    const router = useRouter()
    const navLinks = [
        {
            id: 0,
            name: 'home',
            url: ['/', '/discover'],
            icon: 'home'
        },
        {
            id: 1,
            name: 'movie',
            url: ['/movie/now-playing','/movie/top-rated','/movie/popular','/movie/upcoming', '/movie/[id]'],
            icon: 'film'
        },
        {
            id: 2,
            name: 'tv show',
            url: ['/tv/airing-today'],
            icon: 'tv'
        },
        {
            id: 3,
            name: 'person',
            url: ['/person'],
            icon: 'user'
        }
    ]

    useEffect(() => {
        // var prevScrollpos = window.pageYOffset

        // window.onscroll = function() {

        //     var currentScrollPos = window.pageYOffset

        //     if (prevScrollpos > currentScrollPos) {
        //         document.getElementById("navbar").style.top = "0"
        //     } 
            
        //     else {
        //         document.getElementById("navbar").style.top = "-12vh"
        //     }

        //     prevScrollpos = currentScrollPos;
            
        // }
    },[])

    return (
        <> 
            <nav id="navbar">
                <div className="inner-container">
                    <div className="logo-container">
                        <Link href="/">
                            <a className="website-title">SKYFLIX</a>
                        </Link>
                    </div>
                    <div className="nav-links">
                        {
                            navLinks.map(link => {
                                return (
                                    <div className="nav-link-container" key={link.id}>
                                        <Link href={link.url[0]}>
                                            <a 
                                                className="nav-link"
                                                style={
                                                    {
                                                        backgroundColor: link.url.includes(router.pathname)? 'rgba(26, 116, 226, 0.2)' : 'transparent',
                                                        padding: link.url.includes(router.pathname)? '22px 0 22px 2vw' : '14px 0 14px 1.8vw',
                                                        color: link.url.includes(router.pathname)? 'rgba(255,255,255,1)' : 'rgba(255,255,255,0.8)'
                                                    }
                                                }
                                            >
                                               <div className="current-link" style={{backgroundImage: link.url.includes(router.pathname)? 'linear-gradient(45deg, #1A74E2, #3FA0EF, #6BD0FF)' : 'linear-gradient(45deg, transparent, transparent)'}}></div>
                                                <div className="icon-container">
                                                    <i style={{transform: link.url.includes(router.pathname)? 'scale(1.25)' : 'scale(1)'}} className={`fas fa-${link.icon}`}></i>
                                                </div>
                                                <div style={{fontSize: link.url.includes(router.pathname)? '0.9rem' : '0.8rem'}} className="link-name">
                                                    {link.name}
                                                </div>
                                            </a>
                                        </Link>
                                    </div>
                                )
                            })
                        }
                    </div>
                </div>
            </nav>
            <style jsx>
                {`
                
                    nav {
                        position: fixed;
                        top: 0;
                        bottom: 0;
                        left: 0;
                        width: 20%;
                        background-color: rgb(22, 22, 22);
                        z-index: 20;
                        transition: 0.3s linear;
                    }

                    .inner-container {
                        width: 100%;
                        height: 100%;
                    }

                    .logo-container {
                        width: 100%;
                        height: 10vh;
                        display: flex;
                        align-items: center;
                        padding: 0 0 0 2vw;
                    }

                    .website-title {
                        font-size: 1.8rem;
                        font-weight: 700;
                        color: white;
                        letter-spacing: -2px;
                    }

                    .nav-links {
                        margin: 20px 0 0 0;
                    }

                    .nav-link-container > a {
                        position: relative;
                        font-size: 0.9rem;
                        font-weight: 600;
                        color: rgba(255,255,255,0.8);
                        text-transform: uppercase;
                        padding: 18px 0 18px 2vw;
                        display: flex;
                        align-items: center;
                        width: 100%;
                        transition: 0.1s linear;
                    }

                    .current-link {
                        content: '';
                        position: absolute;
                        top: 0;
                        left: 0;
                        height: 100%;
                        width: 0.35vw;
                    }

                    .nav-link-container > a:hover {
                        backdrop-filter: brightness(70%);
                    }

                    .nav-link > .icon-container {
                        flex: 0.15;
                        display: flex;
                        justify-content: center;
                        align-items: center;
                    }

                    .nav-link > .link-name {
                        flex: 0.85;
                        display: flex;
                        align-items: center;
                        padding: 0 0 0 1vw;
                    }
                
                `}
            </style>
        </>
    )
}

export default Navigation