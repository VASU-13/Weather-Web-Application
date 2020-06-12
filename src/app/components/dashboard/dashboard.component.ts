import { Component, OnInit } from '@angular/core';
import { WeatherService } from '../../common/weather.service'
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { WeatherViewComponent } from '../weather-view/weather-view.component'
import { ToastrService } from 'ngx-toastr';
import { NgxSpinnerService } from 'ngx-spinner';



 

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  cityForm: FormGroup;
  constructor(private weatherService:WeatherService,
   
    private toastr: ToastrService,
     private formbuilder: FormBuilder,
    public dialog: MatDialog,
    private toastrService:ToastrService,
    private spinner: NgxSpinnerService,
    ) { }


  keyPress(event: any) {
    const pattern = /[a-zA-z]/;
    const inputChar = String.fromCharCode((event as KeyboardEvent).charCode);
    if (!pattern.test(inputChar)) {
      // invalid character, prevent input
      event.preventDefault();
    }
  }

  onCityFormSubmit() {
    let cityName = this.cityForm.value
    this.spinner.show()
    this.weatherService.getCityWeatherData(cityName.city).subscribe((weatherData:any)=>{
      this.spinner.hide()
      const dialogRef = this.dialog.open(WeatherViewComponent, {
        width: '950px',
        height: '550px'
      });
      this.weatherService.changeMessage({
        'cityWeatherData': weatherData

      })

      dialogRef.afterClosed().subscribe(result => {
      });

    }, err => {
        if (err.error) {
          this.spinner.hide()
          this.toastrService.error(err.error.cod, err.error.message, {
            timeOut: 2500
          });
        }
        else {
          this.spinner.hide()
          this.toastrService.error('Something went wrong', 'Error: ', { timeOut: 3000 });
        }
      }
      );

    
  }



  

  ngOnInit(): void {
   

    this.cityForm = this.formbuilder.group({
      city: ['', [Validators.required]],
    })

  }

}
