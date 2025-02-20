import React, { useState, useEffect } from 'react'
import styles from './SearchBar.module.css'

const API_KEY = import.meta.env.VITE_WEATHER_API_KEY

interface City {
    name: string
    country: string
}

interface SearchBarProps {
    onSearch: (city: string) => void
}

const SearchBar: React.FC<SearchBarProps> = ({ onSearch }) => {
    const [query, setQuery] = useState('')
    const [cities, setCities] = useState<City[]>([])

    useEffect(() => {
        if (!query.trim()) {
            setCities([])
            return
        }

        const fetchCities = async () => {
            try {
                const response = await fetch(`https://api.openweathermap.org/geo/1.0/direct?q=${query}&limit=10&appid=${API_KEY}`)
                const data: City[] = await response.json()
                console.log(data)

                const uniqueCities = Array.from(new Set(data.map(({ name, country }) => `${name}-${country}`))).map((key) => {
                    const [name, country] = key.split('-')
                    return { name, country }
                })

                setCities(uniqueCities)
            } catch (error) {
                console.error('Error fetching cities:', error)
            }
        }

        fetchCities()
    }, [query])

    return (
        <div className={styles.searchContainer}>
            <input type="text" className={styles.searchInput} placeholder="Enter city name..." value={query} onChange={(e) => setQuery(e.target.value)} />
            {cities.length > 0 && (
                <ul className={styles.cityList}>
                    {cities.map(({ name, country }) => (
                        <li key={`${name}-${country}`} className={styles.cityItem} onClick={() => onSearch(name)}>
                            {name}, {country}
                        </li>
                    ))}
                </ul>
            )}
        </div>
    )
}

export default SearchBar
