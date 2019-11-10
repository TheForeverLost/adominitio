import { Component, OnInit } from '@angular/core';
import { Task } from '../task';
import { AngularFireDatabaseModule, AngularFireDatabase } from 'angularfire2/database';
import { isUndefined, isNull } from 'util';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
@Component({
  selector: 'app-archive',
  templateUrl: './archive.component.html',
  styleUrls: ['./archive.component.css']
})
export class ArchiveComponent implements OnInit {
  tasklist:Task[]
  newtask:Task;
  nodeexist:boolean;
  userID:string;
  load:string;
  constructor(private router:Router,private db:AngularFireDatabase , public Auth:AuthService) {
    this.load = "Waiting for server";
    Auth.user.subscribe(user=>{
      if(isNull(user)){
        router.navigate(["/"])
      }else{
        this.userID = user.uid
      }
    })
    this.nodeexist = true;
  
   }
   
   loadData(){
    this.db.list("/Notes").valueChanges().subscribe(notes=>{
      this.tasklist = []
      this.load = "No Notes archived";
      notes.forEach(note=>{
        this.newtask = <Task>note;
        if(isUndefined(this.newtask.label)){
          this.newtask.label = [];
        }
        this.tasklist.push(this.newtask);
        
      })
      this.tasklist = this.tasklist.filter(task => task.user == this.userID)
      this.tasklist = this.tasklist.filter(task => task.archive );
      this.nodeexist = this.tasklist.length != 0
    })
   }
  ngOnInit() {
    this.loadData();
  }


  leavearchive(){
    this.router.navigate(["/home"])  
  }

  deleteNote(task:Task){
    this.db.list("/Notes/"+task.id).remove()
    
  }

  updateArchive(task:Task){
    
    task.archive = !task.archive
    this.updateLabel(task)
  }

  updateLabel(task:Task){
    this.db.object("/Notes/" + task.id).update(task)
    
  }
}
