import {Component, OnInit} from '@angular/core';
import {StrappingHead} from "../_interface/strapping-head";
import {Announcement} from "../_interface/announcement";

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

  constructor() {
    this.showDecoded = true;
    this.showEncoded = false;

    this.$decoded = [
      {
        id: 0,
        label: 'test',
        status: false,
        position: 1
      },
      {
        id: 1,
        label: 'test 2',
        status: false,
        position: 2
      }
    ];
    this.$encoded = [];
  }

  ngOnInit() {
  }

  public decode(event: StrappingHead): void {
    event.position = this.$decoded.length + 1;
    this.$decoded.push(event);
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
