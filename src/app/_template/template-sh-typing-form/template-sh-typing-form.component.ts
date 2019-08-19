import {Component, OnInit, Output, EventEmitter} from '@angular/core';
import {StrappingHead} from "../../_interface/strapping-head";
import {Announcement} from "../../_interface/announcement";

@Component({
  selector: 'app-template-sh-typing-form',
  templateUrl: './template-sh-typing-form.component.html',
  styleUrls: ['./template-sh-typing-form.component.sass']
})
export class TemplateShTypingFormComponent implements OnInit {

  public strappingHead$: StrappingHead;
  @Output() announce: EventEmitter<StrappingHead> = new EventEmitter<StrappingHead>();

  constructor() {
    this.strappingHead$ = {
      id: undefined,
      label: undefined,
      status: false,
      position: undefined
    };
  }

  ngOnInit() {
  }

  public encodeStrappingHead(event?: any): void {
    this.announce.emit(this.strappingHead$);
    console.log(this.strappingHead$);
    this.strappingHead$ = {
      id: undefined,
      label: undefined,
      status: false,
      position: undefined
    };
  }
}
