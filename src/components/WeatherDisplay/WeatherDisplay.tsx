import React from 'react'
import styles from './WeatherDisplay.module.css'

interface WeatherData {
    name: string
    main: {
        temp: number
        humidity: number
    }
    weather: {
        description: string
    }[]
    wind: {
        speed: number
    }
}

interface WeatherDisplayProps {
    data: WeatherData
}

const WeatherDisplay: React.FC<WeatherDisplayProps> = ({ data }) => {
    return (
        <div className={styles.weatherContainer}>
            <h2 className={styles.weatherTitle}>Weather in {data.name}</h2>
            <p className={styles.weatherDetails}>
                <span>Temperature:</span> {data.main.temp}°C
            </p>
            <p className={styles.weatherDescription}>Condition: {data.weather[0].description}</p>
            <p className={styles.weatherDetails}>
                <span>Humidity:</span> {data.main.humidity}%
            </p>
            <p className={styles.weatherDetails}>
                <span>Wind Speed:</span> {data.wind.speed} m/s
            </p>
        </div>
    )
}

export default WeatherDisplay
