const SearchInput = ({handleExpandSearch}) => {
    return (
        <>
            <input onFocus={handleExpandSearch} type="text" placeholder="Search"/>
            <style jsx>
                {`
                
                .input {
                    flex: 1;
                    height: 100%;
                    border: none;
                    outline: none;
                    background-color: transparent;
                    font-size: 1.2rem;
                    color: rgba(255,255,255,0.9);
                    letter-spacing: 1px;
                }
                    ::placeholder {
                    color: rgba(255,255,255,0.7);
                    font-size: 0.95rem;
                }
                
                `}
            </style>
        </>
    )
}

export default SearchInput