import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { WeatherData } from '../models/weatherData.model';
import { WeatherForecastData } from '../models/weatherForecast .model';

@Injectable({
  providedIn: 'root'
})
export class WeatherService {
  API_KEY='4a5fec6681af98b4470df7428e0e0272'
  constructor(private http_:HttpClient) { }

  getWeatherDataForecast (lat:number, lon:number):Observable<WeatherForecastData>{
    return this.http_.get<WeatherForecastData>(`https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&exclude=hourly,minutely,alerts&units=metric&appid=${this.API_KEY}`);
  }
  getWeatherDataWithCityName(city_name:string):Observable<WeatherData>{
    return this.http_.get<WeatherData>(`https://api.openweathermap.org/data/2.5/weather?q=${city_name}&units=metric&appid=${this.API_KEY}`);
  }
  getWeatherDataWitGeographical(lat:number, lon:number):Observable<WeatherData>{
    return this.http_.get<WeatherData>(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${this.API_KEY}`);
  }
}
