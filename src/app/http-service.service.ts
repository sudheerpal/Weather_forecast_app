import { Injectable } from '@angular/core';
import { Observable } from "rxjs/Rx";
import { Http, Response } from "@angular/http";
import * as Rx from "rxjs";
import "rxjs/Rx";
import {Config} from './config';

@Injectable()
export class HttpServiceService {
  loggedIn = new Rx.BehaviorSubject(localStorage.getItem('login')?true:false);
  constructor(private http:Http) { }

  public get(url:string): Observable<any>{
    return this.http.get(Config.baseurl+url+'&APPID='+Config.app_id).map((res: Response) => {
      return res.json();
    } )
    }

      isLoggedFn():Observable<any>{
      return this.loggedIn;
      }  

}