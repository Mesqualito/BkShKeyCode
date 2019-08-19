import {Component, OnInit} from '@angular/core';
import {StrappingHead} from "../../_interface/strapping-head";

@Component({
  selector: 'app-template-sh-typing',
  templateUrl: './template-sh-typing.component.html',
  styleUrls: ['./template-sh-typing.component.sass']
})
export class TemplateShTypingComponent implements OnInit {

  // bei einzelnem Datenobjekt, formale Ebene: $ am Ende;
  // Überprüfung auf Datenobjekt
  public strappingHead$: StrappingHead;

  constructor() {

    this.strappingHead$ = {
      id: 1,
      label: 'SSH32 PEAR',
      status: false,
      position: 1
    }

  }

  ngOnInit() {
  }

  // '?': der Wert muss nicht in die Methode übergeben werden,
  // 'any': ein 'any'-Datenobjekt, d.h. jeder beliebige Datentyp
  // 'void': die Methode hat keinen Rückgabewert
  public changeCheck(event?: any): void {
    this.strappingHead$.status = !this.strappingHead$.status;
  }

}
