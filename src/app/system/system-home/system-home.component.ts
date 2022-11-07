import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-system-home',
  templateUrl: './system-home.component.html',
  styleUrls: ['./system-home.component.scss']
})
export class SystemHomeComponent implements OnInit {

  constructor(
    private titleService: Title,) { 
      this.titleService.setTitle("Welcome - Tasker");
    }

  ngOnInit() {
    console.log("*\n**\n***\n****")
    console.log("****\n***\n**\n*")
    console.log("   *\n  * *\n * * *\n* * * *")
  }

}
