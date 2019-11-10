import { Component, OnInit } from '@angular/core';
import { Task, label } from '../task';
import { AngularFireDatabase , AngularFireList, AngularFireDatabaseModule } from 'angularfire2/database';
import { NgForm } from '@angular/forms';
import { isUndefined, isNull } from 'util';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.css']
})
export class HomepageComponent implements OnInit {
  alllist:Task[];
  tasklist:Task[] ;
  pinnedlist:Task[];
  newtask:Task;
  Title:string;
  Content:string;
  nodeexist:boolean;
  pinnedexist:boolean
  dbref:AngularFireList<Task[]>;
  lastindex:number;
  noteaddmenu:boolean  = false;
  hidebutton:boolean = true;
  hidereset:boolean = false;
  filterlabels:label[];
  load:string
  filtermessage:string;
  userID:string;
  constructor(private router:Router,private db:AngularFireDatabase , public Auth:AuthService) {
    this.load = "Waiting for server"
    Auth.user.subscribe(user=>{
      if(isNull(user)){
        router.navigate(["/"])
      }else{
        this.userID = user.uid;
      }
    })
    this.filterlabels = []
    this.hidebutton = true;
    this.filtermessage = ""
   }
   
   goToarchive(){
    this.router.navigate(["/archive"]);
   }

   loaddata(){
    this.db.list("/Notes/").valueChanges().subscribe(notes=>{
      this.alllist = []
      this.tasklist = []
      this.load = "No notes"
      this.pinnedlist = []
      notes.forEach(note=>{
        this.newtask = <Task>note;
        if(isUndefined(this.newtask.label)){
          this.newtask.label = [];
        }
        this.alllist.push(this.newtask);
        
      })
      this.nodeexist = this.alllist.length != 0
      this.lastindex = 0
      if(this.nodeexist){
        this.setup()
      }

    })
   }
   checkexist (tl:label[]){
    let exist:boolean = false;
    for (let index = 0; index < tl.length; index++) {
      for (let index2 = 0; index2 < this.filterlabels.length; index2++) {
        if(tl[index].tag == this.filterlabels[index2].tag){
          exist = true;
          break;
        }
      }
      if(exist){
        break;
      }
    }
    return exist;
   }

   setup(){ 
    this.lastindex = this.alllist[(this.alllist.length-1)].id + 1; 
    this.alllist = this.alllist.filter(task => task.user == this.userID );
    this.tasklist = this.alllist.filter(task => !task.archive );

    if(this.filterlabels.length !=0){
      this.tasklist = this.tasklist.filter(task => this.checkexist(task.label) );
    }
    if(this.tasklist.length == 0){
      this.nodeexist = false;
    }
    this.pinnedlist = this.tasklist.filter(task => task.pinned );
    this.tasklist = this.tasklist.filter(task => !task.pinned );
    this.pinnedexist = this.pinnedlist.length != 0
   }
  ngOnInit() {

    this.loaddata();
  }
  alternatePin(task:Task){
    task.pinned = !task.pinned
    this.updateLabel(task)
  }

  addNote(){
    this.hidebutton = false;
    this.hidereset = false;
    this.noteaddmenu = true;
  }

  deleteNote(task:Task){
    this.db.list("/Notes/"+task.id).remove()
  }

  addtoArchive(task:Task){
    
    task.archive = !task.archive
    this.updateLabel(task)
  }

  updateLabel(task:Task){
    this.alllist = this.alllist.filter(t=>t.id!=task.id)
    this.alllist.push(task)
    
    this.db.object("/Notes/"+task.id).update(task)
    
  }
  
  resetfilter(){
    this.filterlabels = []
    this.setup()
    this.filtermessage = ""
    this.hidebutton = true;
    this.hidereset = false;
  }

  filter(label:label){
    this.filterlabels.push(label)
    this.setup()
    this.filtermessage = ""
    this.filterlabels.forEach(element => {
      this.filtermessage += " " + element.tag
    }); 
    this.hidebutton = false;
    this.hidereset = true;
  }

  closemenu(){
    this.noteaddmenu = false
    this.hidebutton = true
  }

  NoteCreator(data:NgForm){
    this.closemenu()
    this.newtask = {
      id:this.lastindex,
      user:this.userID,
      title:data.value.title,
      content:data.value.content,
      archive : false,
      pinned : false,
      checkbox : false,
      color : "#002536",
      label : []
    }
    this.db.object("/Notes/"+this.newtask.id).set(this.newtask)
    data.resetForm()
    this.resetfilter()
  }
}
