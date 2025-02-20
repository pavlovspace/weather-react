import { useAppDispatch, useAppSelector } from './hooks/hooks'
import { fetchWeather } from './store/weather/weatherSlice'
import SearchBar from './components/SearchBar/SearchBar'
import WeatherDisplay from './components/WeatherDisplay/WeatherDisplay'
import './App.css'


const App: React.FC = () => {
    const dispatch = useAppDispatch()
    const weatherData = useAppSelector((state) => state.weather.data)
    const isLoading = useAppSelector((state) => state.weather.loading)
    const error = useAppSelector((state) => state.weather.error)

    const handleSearch = (city: string) => {
        dispatch(fetchWeather(city))
    }

    return (
        <>
            <div>
                <h1>Weather App</h1>
                <SearchBar onSearch={handleSearch} />

                {isLoading && <p>Loading...</p>}
                {error && <p>{error}</p>}
                {weatherData && <WeatherDisplay data={weatherData} />}
            </div>
        </>
    )
}

export default App
