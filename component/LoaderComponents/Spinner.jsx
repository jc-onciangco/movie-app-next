const Spinner = () => {
    return (
        <>
            <div className="spinner">
                
            </div>
            <style jsx>
                {`
                
                    .spinner {
                        height: 2.3vw;
                        width: 2.3vw;
                        border: 4px solid white;
                        border-top-color: transparent;
                        border-radius: 50%;
                        background-color: transparent;
                        animation: spin 1.25s linear infinite;
                    }

                    @keyframes spin {
                        0% {
                            transform: rotateZ(0deg);
                        }
                        100% {
                            transform: rotateZ(360deg);
                        } 
                    }
                
                `}
            </style>
        </>
    )
}

export default Spinner