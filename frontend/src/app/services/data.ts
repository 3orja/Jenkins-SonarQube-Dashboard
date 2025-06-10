import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, delay } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class Data {
  constructor(private http: HttpClient) { }

  getDashboardData(): Observable<any> {
    // Mock data for development
    return of({
      summary: {
        labels: ['Complete', 'In Progress', 'Pending'],
        data: [65, 20, 15]
      },
      performance: {
        labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
        datasets: [{
          label: 'Performance',
          data: [65, 59, 80, 81, 56, 55],
          backgroundColor: 'rgba(75, 192, 192, 0.2)',
          borderColor: 'rgba(75, 192, 192, 1)',
          borderWidth: 1,
          fill: false
        }]
      },
      statistics: {
        labels: ['Users', 'Sessions', 'Conversions', 'Bounce Rate'],
        datasets: [{
          label: 'Statistics',
          data: [85, 67, 45, 23],
          backgroundColor: [
            'rgba(255, 99, 132, 0.6)',
            'rgba(54, 162, 235, 0.6)',
            'rgba(255, 206, 86, 0.6)',
            'rgba(75, 192, 192, 0.6)'
          ]
        }]
      },
      activities: [
        { time: new Date(), description: 'System update completed' },
        { time: new Date(Date.now() - 3600000), description: 'New user registered' },
        { time: new Date(Date.now() - 7200000), description: 'Maintenance scheduled' },
        { time: new Date(Date.now() - 86400000), description: 'Weekly report generated' }
      ]
    }).pipe(
      delay(1000), // Simulate network delay
      catchError(this.handleError('getDashboardData', {}))
    );
  }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(`${operation} failed: ${error.message}`);
      return of(result as T);
    };
  }
}
