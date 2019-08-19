import {Component, OnInit, Input, Output, EventEmitter} from '@angular/core';
import {StrappingHead} from "../../_interface/strapping-head";
import {Announcement} from "../../_interface/announcement";

@Component({
  selector: 'app-template-sh-typing',
  templateUrl: './template-sh-typing.component.html',
  styleUrls: ['./template-sh-typing.component.sass']
})
export class TemplateShTypingComponent implements OnInit {

  // Objekte empfangen:
  // diese Komponente hört darauf, ob Objekte beim Kombinieren der Angular-Komponenten an sie übergeben werden
  @Input() strappingHead$: StrappingHead;

  // Output-Variable und EventEmitter hinzu fügen
  @Output() announce: EventEmitter<any> = new EventEmitter<any>();

  constructor() {
  }

  ngOnInit() {
  }

  // '?': der Wert muss nicht in die Methode übergeben werden,
  // 'any': ein 'any'-Datenobjekt, d.h. jeder beliebige Datentyp
  // 'void': die Methode hat keinen Rückgabewert
  public changeCheck(event?: any): void {
    this.strappingHead$.status = !this.strappingHead$.status;
    const eventObject: Announcement = {
      label: 'check',
      object: this.strappingHead$
    };
    this.announce.emit(eventObject);
  }

  public changeLabel(event?: any): void {
    const eventObject: Announcement = {
      label: 'label',
      object: this.strappingHead$
    };
    this.announce.emit(eventObject);
  }

  public deleteStrappingHead(event?: any): void {
    const eventObject: Announcement = {
      label: 'delete',
      object: this.strappingHead$
    };
    this.announce.emit(eventObject);
  }

}
