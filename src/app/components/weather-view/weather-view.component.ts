import { Component, OnInit,Inject } from '@angular/core';
import { WeatherService } from '../../common/weather.service'
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';






@Component({
  selector: 'app-weather-view',
  templateUrl: './weather-view.component.html',
  styleUrls: ['./weather-view.component.css']
})
export class WeatherViewComponent implements OnInit {

  cityWeatherData:any
  cityTemp:number;
  cityTempFixed:string;
  
  constructor(@Inject(MAT_DIALOG_DATA) public data,
    private weatherService: WeatherService,
    
    public dialogRef: MatDialogRef<WeatherViewComponent>
  ) { }

  closeDialog() {
    this.dialogRef.close();
  }

  ngOnInit(): void {

    this.weatherService.currentMessage.subscribe((message: any) => {
      this.cityWeatherData = message.cityWeatherData
      this.cityTemp = this.cityWeatherData.main.temp.toFixed(2) - 273.15;
      this.cityTempFixed = this.cityTemp.toFixed(2);

      




    })
  }

}
