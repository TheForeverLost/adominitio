import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { label } from '../task';

@Component({
  selector: 'app-labelbox',
  templateUrl: './labelbox.component.html',
  styleUrls: ['./labelbox.component.css']
})
export class LabelboxComponent implements OnInit {
  @Input() item:label
  @Output() deleteLabel:EventEmitter<label> = new EventEmitter();
  @Output() filterLabel:EventEmitter<label> = new EventEmitter();
  tag:string;
  clicked:boolean;
  constructor(tag:label) { 
    this.item = tag
    this.tag = tag.tag
  }

  ngOnInit() {
    this.tag = this.item.tag
  }
  
  tagClicked(){
    this.clicked = true;
  }

  closeMenu(){
    this.clicked = false;
  }

  removeLabel(){
    this.deleteLabel.emit(this.item);
    this.closeMenu()
  }

  filter(){
    this.filterLabel.emit(this.item);
    this.closeMenu()
  }
}
