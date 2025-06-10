import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ChartComponent } from '../charts/charts';
import { Data } from '../services/data';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, ChartComponent],
  templateUrl: './dashboard.html',
  styleUrls: ['./dashboard.scss']
})
export class Dashboard implements OnInit {
  loading = true;
  dashboardData: any;

  constructor(private dataService: Data) {}

  ngOnInit(): void {
    this.dataService.getDashboardData().subscribe({
      next: (data) => {
        this.dashboardData = data;
        this.loading = false;
      },
      error: (err) => {
        console.error('Error fetching dashboard data', err);
        this.loading = false;
      }
    });
  }
}
