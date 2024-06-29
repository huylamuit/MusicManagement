import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'ng-spinner',
  templateUrl: './spinner.component.html',
  styleUrls: ['./spinner.component.css']
})
export class SpinnerComponent implements OnInit {

  @Input() display = false;
  @Input() error = false;

  constructor() { }

  ngOnInit() {
  }

}
