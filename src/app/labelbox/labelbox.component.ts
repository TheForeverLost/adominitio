import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { label } from '../task';
import { Router } from '@angular/router';

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
  archive:boolean;
  constructor(private router:Router,tag:label) { 
    this.item = tag
    this.tag = tag.tag
  }

  ngOnInit() {
    this.tag = this.item.tag
    if(this.router.url === "/archive"){
      this.archive = true;
    }else{
      this.archive = false;
    }
  }
  
  tagClicked(){
    this.clicked = this.archive?false:true;
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
