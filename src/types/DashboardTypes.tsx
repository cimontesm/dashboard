export interface OpenMeteoResponse {
  latitude: number
  longitude: number
  generationtime_ms: number
  utc_offset_seconds: number
  timezone: string
  timezone_abbreviation: string
  elevation: number
  current_units: CurrentUnits
  current: Current
  hourly_units: HourlyUnits
  hourly: Hourly
  daily_units: DailyUnits
  daily: Daily
}

export interface CurrentUnits {
  time: string
  interval: string
  temperature_2m: string
  relative_humidity_2m: string
  apparent_temperature: string
  is_day: string
  wind_speed_10m: string
}

export interface Current {
  time: string
  interval: number
  temperature_2m: number
  relative_humidity_2m: number
  apparent_temperature: number
  is_day: number
  wind_speed_10m: number
}

export interface HourlyUnits {
  time: string
  temperature_2m: string
  wind_speed_10m: string
}

export interface Hourly {
  time: string[]
  temperature_2m: number[]
  wind_speed_10m: number[]
}

export interface DailyUnits {
  time: string
  sunrise: string
  sunset: string
  precipitation_probability_max: string
}

export interface Daily {
  time: string[]
  sunrise: string[]
  sunset: string[]
  precipitation_probability_max: number[]
}