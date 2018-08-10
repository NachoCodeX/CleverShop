import { Component, OnInit } from '@angular/core';
import { DataService } from '../../../services/data/data.service';

@Component({
  selector: 'app-index-dashboard',
  templateUrl: './index-dashboard.component.html',
  styleUrls: ['./index-dashboard.component.scss']
})
export class IndexDashboardComponent implements OnInit {
  public isOpen: boolean

  constructor(private dataService: DataService) { }

  ngOnInit() {
    this.subcribeToDataService()
  }
  subcribeToDataService() {
    this.dataService
      .getCurrentisOpenDialog()
      .subscribe(
        value => {
          console.log(value);

          this.isOpen = value
        }
      )
  }

}
