import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'app-sh-list',
  templateUrl: './sh-list.component.html',
  styleUrls: ['./sh-list.component.sass']
})
export class ShListComponent implements OnInit {

  public showEncoded: boolean;
  public showDecoded: boolean;

  constructor() {
    this.showEncoded = true;
    this.showDecoded = false;
  }

  ngOnInit() {
  }

}
