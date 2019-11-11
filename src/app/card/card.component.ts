import { Component, OnInit, Injectable, Input ,Output, EventEmitter } from '@angular/core';
import {Task ,  label} from '../task'
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import { isUndefined, isNull } from 'util';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.css']
})
export class CardComponent implements OnInit {
  @Input() task:Task;
  @Output() alternatePin: EventEmitter<Task> = new EventEmitter();
  @Output() deleteNote: EventEmitter<Task> = new EventEmitter();
  @Output() updateArchive: EventEmitter<Task> = new EventEmitter();
  @Output() updateLabel: EventEmitter<Task> = new EventEmitter();
  @Output() editContent: EventEmitter<Task> = new EventEmitter();
  @Output() filtercontent : EventEmitter<label> = new EventEmitter();
  editable:string = "None";
  pinbutton:string = "Pin";
  labelmenu:string = "None";
  Title:string;
  Content:string;
  todobox:string = "";
  colorMenu:string = "None";
  archivebutton:string;
  textdecoration:string;
  newlabel:string;
  option:string[] =   ["#360303" , "#150753" , "#002536" , "#cc7c0c"]
  labels:label[];
  constructor(task:Task ,router:Router ) { 
    this.task = task;
    this.todobox = task.checkbox?"Remove to-do":"Make to-do"
  }
  
  ngOnInit() {
    
    this.labels = this.task.label
    this.todobox = this.task.checkbox?"Remove to-do":"Make to-do"
    this.textdecoration = "None"
    if (this.task.checkbox) {
      this.textdecoration = this.task.completed?"line-through":"None"
    }else{
      this.task.completed = false;
    }
    if (this.task.pinned) {
      this.pinbutton = "Unpin";
    }else{
      this.pinbutton = "Pin";
    }
    if (this.task.archive) {
      this.archivebutton = "un-archive";
    }else{
      this.archivebutton = "Send to archive";
    }
    
  }

  
  edit(){
    this.closeeditter()
    this.editable = "Block";
  }

  toggle(){
    let check:boolean = !this.task.completed
    this.task.completed = check
    this.editContent.emit(this.task) 
  }

  update(Data:NgForm){
      this.task.title = isNull(Data.value.title)?Data.value.title:this.task.title
      this.task.content = isNull(Data.value.content)?Data.value.content:this.task.content
      
      Data.resetForm()
      this.editContent.emit(this.task);
      this.closeeditter()
  }

  closeeditter(){
    this.editable = "None"
    this.colorMenu = "None"
    this.labelmenu = "None"
  }
  checkbox(){
    this.task.checkbox = ! this.task.checkbox
    this.editContent.emit(this.task);
  }
  setPinned(task:Task){
    this.alternatePin.emit(task)
  }

  deleteTask(task:Task){
    this.deleteNote.emit(task)
  }

  openColorMenu(){
    this.closeeditter()
    this.colorMenu = "Block";
  }

  setColor(color:string){
    this.task.color = color;
    this.editContent.emit(this.task)
    this.closeeditter()
  }

  archive(task:Task){
    this.updateArchive.emit(task)
  }

  showLabelMenu(){
    this.closeeditter()
    this.labelmenu = "Block";
  }

  addLabel(labeldata:NgForm){
    
    this.newlabel = labeldata.value.label;
    this.task.label = this.labels
    this.task.label.push({tag:this.newlabel})
    this.updateLabel.emit(this.task)
  }

  filterbylabel(label:label){
    this.filtercontent.emit(label)
  }

  removelabel(newlabel:label){
    this.task.label = this.labels.filter(l=>l.tag != newlabel.tag)
    this.updateLabel.emit(this.task)
  }
}
