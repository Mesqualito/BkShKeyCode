import {Component, OnInit} from '@angular/core';
import {StrappingHead} from "../../_interface/strapping-head";

@Component({
  selector: 'app-template-sh-typing-form',
  templateUrl: './template-sh-typing-form.component.html',
  styleUrls: ['./template-sh-typing-form.component.sass']
})
export class TemplateShTypingFormComponent implements OnInit {

  public strappingHead$: StrappingHead;

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

    console.log(this.strappingHead$);
  }
}
