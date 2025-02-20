import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit'

const API_KEY = import.meta.env.VITE_WEATHER_API_KEY

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

interface WeatherState {
    data: WeatherData | null
    loading: boolean
    status: 'loading' | 'success' | 'failed'
    error: string | null
}

const initialState: WeatherState = {
    data: null,
    loading: false,
    status: 'loading',
    error: null,
}

export const fetchWeather = createAsyncThunk<WeatherData, string, { rejectValue: string }>('weather/fetchWeather', async (city, { rejectWithValue }) => {
    try {
        const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`)

        if (!response.ok) {
            throw new Error('Failed to fetch weather data')
        }

        return await response.json()
    } catch (error) {
        if (error instanceof Error) {
            return rejectWithValue(error.message)
        }
        return rejectWithValue('Unknown error occurred')
    }
})

const weatherSlice = createSlice({
    name: 'weather',
    initialState,
    reducers: {
        clearWeather(state) {
            state.data = null
            state.error = null
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchWeather.pending, (state) => {
                state.loading = true
                state.error = null
            })
            .addCase(fetchWeather.fulfilled, (state, action: PayloadAction<WeatherData>) => {
                state.loading = false
                state.status = 'success'
                state.data = action.payload
            })
            .addCase(fetchWeather.rejected, (state, action: PayloadAction<string | undefined>) => {
                state.loading = false
                state.status = 'failed'
                state.error = action.payload ?? null
            })
    },
})

export const { clearWeather } = weatherSlice.actions
export default weatherSlice.reducer
