import { Injectable } from '@angular/core';
import * as data from '../../assets/data.json';

@Injectable({
    providedIn: 'root'
})
export class DataService {

    dataConfig: any = (data as any).default[0];

    constructor() {}
}
