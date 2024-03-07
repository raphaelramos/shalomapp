import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Geolocation } from '@capacitor/geolocation';

import { ApiProvider } from '../services/api';
import { ErrorService } from 'src/app/shared/error.service';
declare var google;

@Component({
  selector: 'app-celulas',
  templateUrl: './celulas.page.html',
  styleUrls: ['./celulas.page.scss'],
})
export class CelulasPage implements OnInit, AfterViewInit {

  isInternet = true;
  latitude: any;
  longitude: any;
  celulas: any = [];
  load = false;
  lista = false;
  term: string;
  diaSemana = {
    '1': 'Domingo',
    '2': 'Segunda',
    '3': 'Terça',
    '4': 'Quarta',
    '5': 'Quinta',
    '6': 'Sexta',
    '7': 'Sábado'
  }

  @ViewChild('mapElement', {static: false}) mapNativeElement: ElementRef;
  constructor(public app: ApiProvider,
    private errorService: ErrorService) {
      const script = document.createElement('script');
      script.id = 'googleMap';
      script.src = 'https://maps.googleapis.com/maps/api/js?key=' + this.app.google_api;
      document.head.appendChild(script);
    }

  ngOnInit() {
    // Track a screen view
    this.app.firebase("Células");
  }

  ionViewDidEnter() {
    this.isInternet = this.app.isOnline()
  }

  ngAfterViewInit(): void {
    this.load = false;

    this.app.getCelulas()
    .subscribe(res => {
      this.celulas = res;

      this.printCurrentPosition().then((position) => {
        this.map(position, res);
      }).catch((error) => {
        this.map(null, res);
      });
      
    }, (error: string) => {
      this.errorService.message(error);
    });
  }

  printCurrentPosition = async () => {
    const coordinates = await Geolocation.getCurrentPosition();
    return coordinates;
  };

  map(geo = null, res) {
    this.load = true;

    const infowindow = new google.maps.InfoWindow({
      maxWidth: 400
    });

    if (geo) {
      this.latitude = geo.coords.latitude;
      this.longitude = geo.coords.longitude;
    } else {
      this.latitude = -18.9274434;
      this.longitude = -48.32058549999999;
    }
    
    const map = new google.maps.Map(this.mapNativeElement.nativeElement, {
      center: {lat: -18.9274434, lng: -48.32058549999999},
      zoom: 15
    });
    /*location object*/
    const pos = {
      lat: this.latitude,
      lng: this.longitude
    };
    map.setCenter(pos);

    const me = {
      url: 'assets/icon/map.png', // image url
      scaledSize: new google.maps.Size(35, 35), // scaled size
    };
    const icon = {
      url: 'assets/icon/maker.png', // image url
      scaledSize: new google.maps.Size(35, 35), // scaled size
    };

    if (geo) {
      const marker = new google.maps.Marker({
        position: pos,
        map: map,
        title: 'Você está aqui!',
        icon: me
      });
      const content = '<div style="font-size: 20px !important;">' +
          '<p>Você está aqui!</p>' +
          '</div>';
      marker.addListener('click', function() {
        infowindow.setContent(content);
        infowindow.open(map, marker);
      });
    }

    res.forEach(celula => {
      if (celula.latitudeCelula && celula.latitudeCelula != 0) {
        const pos = {
          lat: celula.latitudeCelula,
          lng: celula.longitudeCelula
        };

        const marker = new google.maps.Marker({
          position: pos,
          map: map,
          title: celula.nomeMembro,
          icon: icon
        });
        const content = '<div style="font-size: 20px !important;">' +
            '<p>Líder: </p>' + celula.nomeMembro +
            '<p>Dia: </p>' + this.diaSemana[celula.diaCelula] + ' ' + celula.horarioCelula +
            '<p>Endereço: </p>' + celula.txtEndereco +
            '<p>Telefone: </p>' + celula.telefoneCelula +
            '</div>';
        marker.addListener('click', function() {
          infowindow.setContent(content);
          infowindow.open(marker.get('map'), marker);
          this.app.firebaseEvent("ver_celula");
        });
      }
    })
  }
}