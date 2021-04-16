//React
import {useState} from 'react'

const SearchedResultsCount = ({count, isSearchOpen, changeCategoryAndFetch, currentQuery}) => {

    const [currentCategory, setCurrentCategory] = useState('multi')

    const mainCategories = [
        {
            id: 0,
            name: 'all',
            ref: 'multi'
        },
        {
            id: 1,
            name: 'movie',
            ref: 'movie'
        },
        {
            id: 2,
            name: 'tv show',
            ref: 'tv'
        },
        {
            id: 3,
            name: 'person',
            ref: 'person'
        }
    ]

    const changeCategory = category => {
        changeCategoryAndFetch(category)
        setCurrentCategory(category)
    }

    return (
        <>
            <div className="search-results-count">
                <div className="inner-count">
                    {
                        (isSearchOpen && count) &&
                        <>
                        Showing <span>{count.countResults}</span> results for "{currentQuery}"
                        </>
                    }
                </div>
                <div className="categories">
                    {
                        mainCategories.map(category => {
                            return (
                                <span
                                    style={{color: currentCategory===category.ref? '#6BD0FF' : 'white'}}
                                    onClick={() => changeCategory(category.ref)} 
                                    className="category" 
                                    key={category.id}
                                >
                                    {category.name}
                                    <div 
                                        style={{backgroundColor: currentCategory===category.ref? '#6BD0FF' : 'transparent'}}
                                        className="category-indicator"
                                    ></div>
                                </span>
                            )
                        })
                    }
                </div>
            </div>
            <style jsx>
                {`
                
                    .search-results-count {
                        width: 100%;
                        height: 6vh;
                        display: flex;
                        justify-content: space-between;
                        padding: 0 2vw;
                    }

                    .categories {
                        display: flex;
                    }

                    .category {
                        position: relative;
                        display: inline-block;
                        padding: 0 20px;
                        display: flex;
                        align-items: center;
                        color: white;
                        text-transform: Capitalize;
                        background-color: transparent;
                        transition: 0.2s linear;
                        cursor: pointer;
                        font-weight: 600;
                    }

                    .category:hover {
                        background-color: rgba(255,255,255,0.05);
                    }

                    .category-indicator {
                        position: absolute;
                        bottom: 0;
                        left: 0;
                        width: 100%;
                        height: 10%;
                    }

                    .inner-count {
                        height: 100%;
                        display: flex;
                        align-items: center;
                        font-weight: 600;
                        color: rgba(255,255,255,0.6);
                    }
                    .inner-count > span {
                        color: rgba(255,255,255,0.9);
                        margin: 0 5px;
                    }
                
                `}
            </style>
        </>
    )
}


export default SearchedResultsCount