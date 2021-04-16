import Head from 'next/head'

const MainLayout = ({children, siteData}) => {
    return (
        <>
            <div className="app-container">
                <Head>
                    <title>{siteData.name}</title>
                    <link rel="icon" href="/favicon.ico" />
                    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.3/css/all.min.css" integrity="sha512-iBBXm8fW90+nuLcSKlbmrPcLa0OT92xO1BIsZ+ywDWZCvqsWgccV3gFoRBv0z+8dLJgyAHIhR35VZc2oM/gI1w==" crossorigin="anonymous" />
                </Head>
                {children}
            </div>
            <style jsx>
                {`
                
                    .app-container {
                        background-color: rgb(37, 37, 37);
                    }

                `}
            </style>
        </>
    )
}

export default MainLayout