// Angular Import
import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'app-guest',
  templateUrl: './guest.component.html',
  styleUrls: ['./guest.component.scss']
})
export class GuestComponent implements OnInit{

  constructor() {
    // console.log('>>>>>>>>>>>>>>>>> GuestComponent <<<<<<<<<<<<<<<<<<<<<<<<');
  }


  ngOnInit() {
        console.log('>>>>>>>>>>>>>>>>> GuestComponent <<<<<<<<<<<<<<<<<<<<<<<<');
    }
}
