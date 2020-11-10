import React from 'react'

const ForecastHour = props => {
    const { temp, month, day, hour, icon, description } = props;
    const iconUrl = `https://openweathermap.org/img/w/${icon}.png`;

    return (
        <div className="singleRow">
            <p align="center">
                Date : {month} / {day}
            </p>
            <p align="center"> Time : {hour}:00</p>
            <img src={iconUrl} />
            <p>{description}</p>
            <p align="center" weight="400">
                {temp}&#176;
            </p>
        </div>
    );
};

function ForeCast(props) {
    console.log(props.data)
    return (
        <div className="forecast_parent">
            {
                props.data.map(item => (
                    <div className="forecast_item">
                        <ForecastHour
                            key={item.dt}
                            temp={Math.floor(item.main.temp * 1) / 1}
                            icon={item.weather[0].icon}
                            description={item.weather[0].description}
                            month={item.dt_txt.slice(5, 7)}
                            day={item.dt_txt.slice(8, 10)}
                            hour={item.dt_txt.slice(11, 13) * 1}
                        />
                    </div>
                ))
            }
        </div>
    )
}

export default ForeCast
