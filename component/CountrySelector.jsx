import {useState, useEffect} from 'react'
import countryCode from '../data/countryCode'
import Fuse from 'fuse.js'

const CountrySelector = ({selectCountry, currentCountry, searchCountry}) => {   

    const newCountry = [{name: 'All', countryCode: '000', alphaTwo: 'All'},...countryCode.map(country => {
        const stringCountry = JSON.stringify(country)
                                    .replace('alpha-2', 'alphaTwo')
                                    .replace('country-code', 'countryCode')
        return JSON.parse(stringCountry)
    })]
    
    const [countries, setCountries] = useState(newCountry)
    const [openCountries, setOpenCountries] = useState(false)

    return (
        <>
            <div>  
                <div className="select-country">
                    <div 
                        className="selected-country"
                        onClick={() => setOpenCountries(prevState => !prevState)}>{currentCountry}</div>
                    <div className="country-list">
                        {   
                            openCountries &&
                            countries.map(country => {
                                return (
                                    <div 
                                        onClick={() => {
                                            selectCountry(country.alphaTwo, country.name)
                                            setOpenCountries(false)
                                        }} 
                                        className="country" 
                                        key={country.countryCode}>{country.name}</div>
                                )
                            })
                        }
                    </div>
                </div>
            </div>
            <style jsx>
                {`
                
                    .select-country {
                        background-color: white;
                        position: relative;
                        width: 12vw;
                        color: black;
                    }

                    .selected-country {
                        font-size: 1.16vw;
                        padding: 6px 12px;
                        height: 100%;
                        width: 100%;
                        outline: none;
                        border: none;
                        font-weight: 600;
                    }

                    .country-list {
                        position: absolute;
                        bottom: 0;
                        left: 0;
                        width: 100%;
                        max-height: 200px;
                        z-index: 10;
                        transform: translate(0, 100%);
                        overflow-y: scroll;
                    }

                    .country {
                        font-size: 1.16vw;
                        background-color: #161616;
                        width: 100%;
                        padding: 5px 12px;
                        cursor: pointer;
                        color: white;
                        border: 1px solid transparent;
                        border-bottom-color: black;
                        transition: 0.2s linear;
                        font-weight: 400;
                    }

                    .country:hover {
                        filter: brightness(150%);
                    }
                
                `}
            </style>
        </>
    )
}

export default CountrySelector