import {Component, OnInit} from '@angular/core';
import {StrappingHead} from "../_interface/strapping-head";
import {Announcement} from "../_interface/announcement";
import {DataService} from "../_service/data.service";
import {Subscription} from 'rxjs';

@Component({
  selector: 'app-sh-list',
  templateUrl: './sh-list.component.html',
  styleUrls: ['./sh-list.component.sass']
})
export class ShListComponent implements OnInit {

  public showEncoded: boolean;
  public showDecoded: boolean;
  public $decoded: StrappingHead[];
  public $encoded: StrappingHead[];

  constructor(
    public _dataService: DataService
  ) {
    this.showDecoded = true;
    this.showEncoded = false;
    this.$decoded = [];
    this.$encoded = [];
    this.loadData();
  }

  ngOnInit() {
  }

  public loadData(): void {
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
