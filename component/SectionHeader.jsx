//React
import Link from 'next/link'

const SectionHeader = ({title}) => {
    return (
        <>
        <header>
            <h1 className="section-title discover-title">
                {title}
                <Link href="/discover">
                <a className="see-more see-more-discover">See more</a>
                </Link>
            </h1>
        </header>
        <style jsx>
            {`
            
            header {
                height: 40vh;
                display: flex;
                align-items: flex-end;
                padding: 0 40px 20px 60px;
            }

            .discover-title {
                font-weight: 700;
                font-size: 2.5rem;
                color: white;
            }

            .see-more-discover {
                color: rgba(255,255,255,0.5);
                font-size: 1.2rem;
                margin: 0 0 0 20px;
                font-weight: 600;
            }

            `}
        </style>
        </>
    )
}

export default SectionHeader