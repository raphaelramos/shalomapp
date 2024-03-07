import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-shalom',
  templateUrl: './shalom.page.html',
  styleUrls: ['./shalom.page.scss'],
})
export class ShalomPage implements OnInit {

  constructor(private router: Router) { }

  ngOnInit() {
  }

  route(route) {
    this.router.navigate([route]);
  }

}
