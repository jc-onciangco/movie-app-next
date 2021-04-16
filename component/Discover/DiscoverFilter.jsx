const DiscoverFilter = ({sortBy, changeOrder, changeSort, movieGenresFilter, selectGenre, findFilter, filterBtnSelected}) => {

    const handleChangeOrder = (id, isActive) => {
        if (!isActive) return
        changeOrder(id)
    }

    const handleChangeSort = (id, isActive) => {
        if (isActive) return
        changeSort(id)
    }

    const handleSelectGenre = (id, isSelected) => {
        if (id === 20202020 && isSelected) return
        selectGenre(id)
    }

    return (
        <>
            <section>
                {
                    movieGenresFilter &&
                    <>
                        <div className="sort-section">
                            <div className="title">Sort by:</div>
                            <div className="selections">
                                {
                                    sortBy.map(sort => {
                                        return (
                                            <div className={sort.isActive? 'select active-select' : 'select'} key={sort.id}>
                                                <span onClick={() => handleChangeSort(sort.id, sort.isActive)} className={sort.isActive? 'select-body active-select-body' : 'select-body'}>{sort.name}</span>
                                                <div onClick={() => handleChangeOrder(sort.id, sort.isActive)} className={sort.isActive? "icon-arrow active-icon-arrow" : 'icon-arrow'}>
                                                    { sort.order==='asc' && <i className="fas fa-arrow-up"></i> }
                                                    { sort.order==='desc' && <i className="fas fa-arrow-down"></i> }
                                                </div>
                                            </div>
                                        )
                                    })
                                }
                            </div>
                        </div>
                        <div className="sort-section">
                            <div className="title">Genres:</div>
                            <div className="selections genres-selections">
                                {
                                    movieGenresFilter.map(genre => {
                                        return (
                                            <span 
                                                onClick={() => handleSelectGenre(genre.id, genre.isSelected)}
                                                className={genre.isSelected? "genre selected-genre" : "genre"} 
                                                key={genre.id}
                                            >
                                                {genre.name}
                                            </span>
                                        )
                                    })
                                }
                            </div>
                        </div>
                        <div className="sort-section">
                            <div onClick={findFilter} className={filterBtnSelected? "disabled-search-filter search-filter" : "search-filter"}>Filter</div>
                        </div>
                    </>
                }
            </section>
            <style jsx>
                {`
                
                    section {
                        width: 20%;
                        height: 100%;
                        padding: 0 15px 40px 15px;
                        overflow-y: scroll;
                        font-size: clamp(1rem, 1.4vw, 1.4rem);
                    }

                    section::-webkit-scrollbar {
                        width: 0.5vw;
                    }

                    section::-webkit-scrollbar-track {
                        background-color: rgba(255,255,255,0.1);
                    }

                    section::-webkit-scrollbar-thumb {
                        background-color: rgba(255,255,255,0.3);
                        border-radius: 100px;
                    }

                    .sort-section {
                        margin: 20px 0 0 0;
                    }

                    .title {
                        font-size: 1em;
                        font-weight: 600;
                        margin: 0 0 12px 0;
                        color: white;
                    }

                    .select {
                        display: inline-flex;
                        border-radius: 3px;
                        border: 2px solid white;
                        margin: 0 0 10px 0;
                    }

                    .active-select {
                        border: 2px solid #3FA0EF;
                    }
                    
                    .select-body {
                        display: inline-block;
                        padding: 2.5px 8px;
                        font-size: 0.85em;
                        font-weight: 600;
                        background-color: white;
                        color: black;
                        text-transform: Capitalize;
                        cursor: pointer;
                        transition: 0.2s linear;
                    }

                    .select-body:hover {
                        filter: brightness(90%);
                    }

                    .active-select-body {
                        background-color: #3FA0EF;
                        color: white;
                    }

                    .icon-arrow {
                        display: inline-block;
                        padding: 0 8px;
                        font-size: 0.8em;
                        background-color: white;
                        display: flex;
                        align-items: center;
                        cursor: pointer;
                        transition: 0.2s linear;
                    }

                    .icon-arrow :hover {
                        filter: brightness(90%);
                    }

                    .active-icon-arrow {
                        color: #3FA0EF;
                        border-radius: 3px;
                    }




                    .genres-selections {
                        display: flex;
                        flex-wrap: wrap;
                    }

                    .genre {
                        background-color: white;
                        margin: 0 8px 8px 0;
                        padding: 2px 6px;
                        font-size: 0.8em;
                        font-weight: 600;
                        border: 2px solid white;
                        border-radius: 3px;
                        cursor: pointer;
                        transition: 0.2s linear;
                    }

                    .genre:hover {
                        filter: brightness(90%);
                    }

                    .selected-genre {
                        border: 2px solid #3FA0EF;
                        background-color: #3FA0EF;
                        color: white;
                    }

                    .search-filter {
                        background-color: white;
                        padding: 3px 0px;
                        font-size: 0.9em;
                        font-weight: 600;
                        border: 2px solid white;
                        text-align: center;
                        letter-spacing: 1px;
                        border-radius: 4px;
                        cursor: pointer;
                    }

                    .search-filter:hover {
                        filter: brightness(90%);
                    }

                    .disabled-search-filter {
                        filter: brightness(70%);
                    }

                `}
            </style>
        </>
    )
}

export default DiscoverFilter