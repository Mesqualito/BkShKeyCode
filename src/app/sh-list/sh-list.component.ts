import {Component, OnInit, OnDestroy } from '@angular/core';
import {StrappingHead} from "../_interface/strapping-head";
import {Announcement} from "../_interface/announcement";
import {DataService} from "../_service/data.service";
import {Subscription} from 'rxjs';
import {DragulaService} from "ng2-dragula";

@Component({
  selector: 'app-sh-list',
  templateUrl: './sh-list.component.html',
  styleUrls: ['./sh-list.component.sass']
})
export class ShListComponent implements OnInit, OnDestroy {

  public showEncoded: boolean;
  public showDecoded: boolean;
  public $decoded: StrappingHead[];
  public $encoded: StrappingHead[];
  public subs = new Subscription();

  constructor(
    public _dataService: DataService,
    public _dragulaService: DragulaService
  ) {
    this.showDecoded = true;
    this.showEncoded = false;
    this.$decoded = [];
    this.$encoded = [];
    this.loadData();

    this._dragulaService.createGroup('strappingheads', {
      // verbieten, Elemente aus der Liste raus zu ziehen;
      // alternativ ToDo: löschen, wenn das Element per Drag'n'Drop aus dem Listen-Container raus bewegt wird
      removeOnSpill: false,
      moves: function (el, container, handle) {
        return handle.className === 'handle';
      }
    });

    this.subs.add(_dragulaService.drop('strappingheads')
      .subscribe(({ el }) => {
        this.position();
      })
    );
  }

  ngOnInit() {
  }

  ngOnDestroy(): void {
    // Dragula schreibt vor, beim Vernichten der Komponente auch die Subscriptions zu löschen
    this.subs.unsubscribe();
  }

  public position(): void {
    console.log(`%cFUNC: position()`, `color: white; background-color: black; padding 5px; font-size: 16px;`);
    let position = 0;
    this.$decoded.forEach((strappinghead: StrappingHead) => {
      // vor jedem Element wird position um 1 hoch gezählt;
      // wir zählen durch und weisen jedem Element eine Position zu.
      // Das Array wurde von Dragula sortiert!
      let oldPosition = strappinghead.position;
      position += 1;
      strappinghead.position = position;
      this._dataService.putStrappingHead(strappinghead).subscribe((data: StrappingHead) => {
        console.log(`%cSUC: ${data.label} wurde neu positioniert von ${oldPosition} auf ${data.position}`, `color: green; font-size: 12px;`);
      }, error => {
        console.log(`%cERROR: ${error.message}`, `color: red; font-size: 12px;`);
      });
    });
  }

  public loadData(): void {
    console.log(`%cFUNC: loadData()`, `color: white; background-color: black; padding 5px; font-size: 16px;`);
    this.$decoded = [];
    this.$encoded = [];
    this._dataService.getStrappingHead().subscribe((data: StrappingHead[]) => {
      data.forEach((strappingHead: StrappingHead) => {
        if(strappingHead.status === true) {
          this.$encoded.push(strappingHead);
        } else {
          this.$decoded.push(strappingHead);
        }
      });
      this.$decoded.sort((obj1, obj2) => {
        return obj1.position - obj2.position;
      });
    }, error => {
      console.log(`%cERROR: ${error.message}`, `color:red; font-size: 12px;`);
    });
  }

  public decode(event: StrappingHead): void {
    event.position = this.$decoded.length + 1;
    this._dataService.postStrappingHead(event).subscribe((data: StrappingHead) => {
      console.log(`%SUC: "${data.label}" wurde erfolgreich erstellt.`, `color:green`);
      this.$decoded.push(data);
    }, error => {
      console.log(`%cERROR: ${error.message}`, `color: red; font-size: 12px;`);
    });
  }

  public update(event: Announcement): void {
    console.log(`%cFUNC: update()`, `color: white; background-color: black; padding 5px; font-size: 16px;`);
    if ('check' === event.label) {
      console.log(`%c"${event.label}-Event" wurde getriggert. `, `color:green;`);
      if (!event.object.status) {
        this.$encoded.splice(this.$encoded.indexOf(event.object), 1);
        this.$decoded.push(event.object);
      } else {
        this.$decoded.splice(this.$decoded.indexOf(event.object), 1);
        this.$encoded.push(event.object);
      }
    }
    if ('delete' === event.label) {
      console.log(`%c"${event.label}-Event" wurde getriggert. `, `color:green;`);
      if (event.object.status) {
        this.$encoded.splice(this.$encoded.indexOf(event.object), 1);
      } else {
        this.$decoded.splice(this.$decoded.indexOf(event.object), 1);
      }
    }
    if ('label' === event.label) {
      console.log(`%c"${event.label}-Event" wurde getriggert. `, `color:green;`);
      if (event.object.status) {
        this.$encoded.forEach((strappingHead: StrappingHead) => {
          if (strappingHead.id === event.object.id) {
            strappingHead.label = event.object.label;
          }
        });
      } else {
        this.$decoded.forEach((strappingHead: StrappingHead) => {
          if (strappingHead.id === event.object.id) {
            strappingHead.label = event.object.label;
          }
        });
      }
    }
    console.log(this.$decoded);
  }
}
