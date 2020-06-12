import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class WeatherService {

  private messageSource = new BehaviorSubject({});
  currentMessage = this.messageSource.asObservable();

  changeMessage(message: any) {
    this.messageSource.next(message)
  }


  constructor(private http: HttpClient) {
  }


  
  getCityWeatherData(cityName) {
    
    const apiUrl = "https://api.openweathermap.org/data/2.5/weather?q=";
    const apiKey = "&appid=bb71a16a517ded682a916adf620d81c1";
    return this.http.get(apiUrl + cityName + apiKey)
  }

}
