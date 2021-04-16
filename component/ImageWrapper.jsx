import Image from 'next/image'

const ImageWrapper = ({src, alt, type}) => {
    return (
        <>
            {
                type==='backdrop' &&
                <Image src={src} alt={alt} height="2160" width="3840" layout="responsive"/>
            }
            {
                (type==='poster' || type==='profile') &&
                <Image src={src} alt={alt} height="3000" width="2000" layout="responsive"/>
            }
            {
                type==='loading' &&
                <Image src={src} alt={alt} height="3000" width="2000" layout="responsive"/>
            }
            {
                type==='placeholder' &&
                <Image src={src} alt={alt} height="3000" width="2000" layout="responsive"/>
            }
        </>
    )
}

export default ImageWrapper