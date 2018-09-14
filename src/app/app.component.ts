import { Component, OnInit } from '@angular/core';
import { HttpServiceService } from "./http-service.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  loggedIn:boolean;
  objLoaderStatus:boolean=false;
  cities = [ {id:1275339,name:'Mumbai'}, {id:1269843,name:'Hyderabad'}, {id:1264527,name:'Chennai'}, {id:1273294,name:'Delhi'}];
  temperatureList = [];
  cityInfo = {};
  constructor(private http:HttpServiceService) {
  }
  ngOnInit() {
    this.http.isLoggedFn().subscribe(
      (x) => this.loggedIn = x
    );

  }

  citySelect(event){
    console.log(event.target.value);
    if (event.target.value=='1') {
      return;
    }
    this.objLoaderStatus=true;
    this.http.get(event.target.value)
    .subscribe(
      (res) => {
        console.log(res);
        this.objLoaderStatus=false;
        this.temperatureList=res.list;
        this.temperatureList.length=5;
        this.cityInfo= res.city;
      },
      (error) => console.log(error)
    );
  }
  Logout(){
    console.log('logout hit!!!');
    localStorage.clear();
    this.http.loggedIn.next(false);
  }
}