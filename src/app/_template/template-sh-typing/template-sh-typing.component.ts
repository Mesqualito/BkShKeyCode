import {Component, OnInit, Input, Output, EventEmitter} from '@angular/core';
import {StrappingHead} from "../../_interface/strapping-head";
import {Announcement} from "../../_interface/announcement";
import { DataService } from "../../_service/data.service";

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

  constructor(
    public _dataService: DataService
  ) {
  }

  ngOnInit() {
  }

  // '?': der Wert muss nicht in die Methode übergeben werden,
  // 'any': ein 'any'-Datenobjekt, d.h. jeder beliebige Datentyp
  // 'void': die Methode hat keinen Rückgabewert
  public changeCheck(event?: any): void {
    this.strappingHead$.status = !this.strappingHead$.status;
    this._dataService.putStrappingHead(this.strappingHead$).subscribe((data: StrappingHead) => {
      const eventObject: Announcement = {
        label: 'check',
        object: this.strappingHead$
      };
      this.announce.emit(eventObject);
    }, error => {
      console.log(`%cERROR: ${error.message}`, `color: red; font-size: 12px;`);
    });
  }

  public changeLabel(event?: any): void {
    this._dataService.putStrappingHead(this.strappingHead$).subscribe((data: StrappingHead) => {
      const eventObject: Announcement = {
        label: 'label',
        object: this.strappingHead$
      };
      this.announce.emit(eventObject);
    }, error => {
      console.log(`%cERROR: ${error.message}`, `color: red; font-size: 12px;`);
    });
  }

  public deleteStrappingHead(event?: any): void {
    this._dataService.deleteStrappingHead(this.strappingHead$).subscribe((data: StrappingHead) => {
    const eventObject: Announcement = {
    label: 'delete',
    object: this.strappingHead$
    };
    this.announce.emit(eventObject);
    }, error => {
      console.log(`%cERROR: ${error.message}`, `color: red; font-size: 12px;`);
    });
  }
}
