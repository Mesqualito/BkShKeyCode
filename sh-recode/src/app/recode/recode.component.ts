import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { Dictionary } from './dictionary';


@Component({
  selector: 'app-recode',
  templateUrl: './recode.component.html',
  styleUrls: ['./recode.component.sass']
})
export class RecodeComponent implements OnInit {

  codes = new Dictionary();
  modell = new Dictionary();
  bandbreite = new Dictionary();
  spannmotor = new Dictionary();
  transportmotor = new Dictionary();
  gehaeuse = new Dictionary();
  verschliesserantrieb = new Dictionary();
  verschlussart = new Dictionary();
  frei = new Dictionary();
  ausrichtung = new Dictionary();
  zusatzoptionen = new Dictionary();

  fgCode = new FormGroup({
    fcModell: new FormControl(''),
    fcBandbreite: new FormControl(''),
    fcSpannmotor: new FormControl(''),
    fcTransportmotor: new FormControl(''),
    fcGehaeuse: new FormControl(''),
    fcVerschliesserantrieb: new FormControl(''),
    fcVerschlussart: new FormControl(''),
    fcFrei: new FormControl(''),
    fcAusrichtung: new FormControl(''),
    fcZusatzoptionen: new FormControl('')
  });

  constructor() {}

  ngOnInit() {
    this.modell.set('SSH', '1');
    this.modell.set('PSH', '4');
    this.codes.set('1', this.modell);
    this.bandbreite.set('32mm', '3');
    this.bandbreite.set('25mm', '4');
    this.bandbreite.set('19mm', '5');
    this.codes.set('2', this.bandbreite);
    this.spannmotor.set('E (elektrisch)', '1');
    this.spannmotor.set('P (pneumatisch)', '4');
    this.spannmotor.set('ohne Spannmotor', '9');
    this.codes.set('3', this.spannmotor);
    this.transportmotor.set('E (elektrisch)', '1');
    this.transportmotor.set('P (pneumatisch)', '4');
    this.transportmotor.set('ohne Transportmotor', '9');
    this.codes.set('4', this.transportmotor);
    this.gehaeuse.set('A (Aluminiumgehäuse', 'A');
    this.gehaeuse.set('S (Stahlgehäuse', 'S');
    this.codes.set('5', this.gehaeuse)
    this.verschliesserantrieb.set('E (elektrisch)', '1');
    this.verschliesserantrieb.set('P (pneumatisch)', '4');
    this.codes.set('6', this.verschliesserantrieb);
    this.verschlussart.set('Kerbverschluss hülsenlos (Stahl)', '1');
    this.verschlussart.set('mit Hülse (Stahl/Kunststoff)', '2');
    this.verschlussart.set('Punkt-Schweißverschluss (Stahl/Kunststoff)', '4');
    this.verschlussart.set('WIG-Schweißverschluss (Stahl)', '5');
    this.verschlussart.set('Reibschweißverschluss (Kunststoff)', '7');
    this.verschlussart.set('Heizkeilverschluss (Kunststoff)', '8');
    this.verschlussart.set('Ultraschallverschluss (Kunststoff)', '9');
    this.codes.set('7', this.verschlussart);
    this.frei.set('', '0');
    this.codes.set('8', this.frei);
    this.ausrichtung.set('R (Antriebseinheit rechts)', 'R');
    this.ausrichtung.set('L (Antriebseinheit links)', 'L');
    this.codes.set('9', this.ausrichtung);
    this.zusatzoptionen.set('ohne Sicherheitskerbe', '1');
    this.zusatzoptionen.set('SK (mit Sicherheitskerbe', '3');
    this.zusatzoptionen.set('Typ AM (Typ Amova)', 'T');
    this.codes.set('10', this.zusatzoptionen);
  }
}
