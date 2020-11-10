import React from 'react'

function RightSingleColumn(props) {
    return (
        <div className="col-6 col-md-4 text-center">
            <div className="d-flex align-items-start justify-content-center">
                <h2>{props.main}</h2>
                {
                    props.span ? <span className="degree_symbol">&deg;</span> : null
                }
            </div>
            <p>{props.title}</p>
        </div>
    )
}

export default RightSingleColumn

