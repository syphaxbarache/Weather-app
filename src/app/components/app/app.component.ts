import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { WeatherData } from 'src/app/models/weatherData.model';
import { WeatherForecastData } from 'src/app/models/weatherForecast .model';
import { WeatherService } from 'src/app/services/weather.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit  {

  datetoday:Date = new Date();
  nextDay : Date = new Date(this.datetoday);
  celsius :boolean = true;
  research! : string;
  weatherDataGeo!:WeatherData ;
  weatherForecasData! : WeatherForecastData;
  long!:number;lat!:number;
  
  constructor(private weatherService:WeatherService){}

  ngOnInit(): void {
    this.getPosition().subscribe(pos => {
      this.lat = pos.coords.latitude;
      this.long = pos.coords.longitude;
      this.weatherService.getWeatherDataForecast(this.lat,this.long ).subscribe({
        next:(res)=>{
          this.weatherForecasData = res;
        }
      })
      this.weatherService.getWeatherDataWitGeographical(this.lat,this.long ).subscribe({
        next:(res)=>{
          this.weatherDataGeo = res;
        }
      })
   });
   
  }
  getPosition(): Observable<any> {
    return Observable.create(function(observer:any) {
      window.navigator.geolocation.getCurrentPosition(position => {
        observer.next(position);
        observer.complete();
      },
        error => observer.error(error));
    });
}
  researchWeather(){
    this.weatherService.getWeatherDataWithCityName(this.research).subscribe(res=>{
      this.weatherDataGeo = res;
      this.weatherService.getWeatherDataForecast(res.coord.lat,res.coord.lon).subscribe({
        next:(res)=>{
          this.weatherForecasData = res;
        }
      })
    })
  }
  
  myposition(){
    this.ngOnInit();
  }

  changerTypeDegre(){
    if(this.celsius){
      this.celsius=false;
    }else{
      this.celsius=true;
    }
  }
 
  iconday(i:number):string{
    if(i==0){
      return `https://openweathermap.org/img/wn/${this.weatherDataGeo.weather[0].icon}@2x.png`
    }else{
      return `https://openweathermap.org/img/wn/${this.weatherForecasData.daily[i].weather[0].icon}@2x.png`
    }
  }
  dayforcast(){
    const today = new Date()
    const tomorrow = new Date(today);
    return [today,tomorrow.setDate(tomorrow.getDate() + 1),tomorrow.setDate(tomorrow.getDate() + 2),tomorrow.setDate(tomorrow.getDate() + 3),tomorrow.setDate(tomorrow.getDate() + 4),tomorrow.setDate(tomorrow.getDate() + 5)]
  }

 
}
