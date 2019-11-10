import { Injectable } from '@angular/core';

@Injectable({
    providedIn:"root"
})
export class Task {
    id:number;
    title:string;
    content:string;
    checkbox:boolean;
    pinned:boolean;
    archive:boolean;
    color:string;
    label:label[];
    user:string;
}

@Injectable({
    providedIn:"root"
})
export class label {
    tag:string
}

