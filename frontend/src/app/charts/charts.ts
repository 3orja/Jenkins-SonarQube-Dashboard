import { Component, Input, OnChanges, SimpleChanges, ElementRef, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import Chart from 'chart.js/auto';

@Component({
  selector: 'app-chart',
  standalone: true,
  imports: [CommonModule],
  template: '<div class="chart-container"><canvas #chartCanvas></canvas></div>',
  styles: ['.chart-container { position: relative; height: 250px; width: 100%; }']
})
export class ChartComponent implements OnChanges {
  @Input() chartData: any;
  @Input() chartType: string = 'bar';
  @ViewChild('chartCanvas') chartCanvas!: ElementRef<HTMLCanvasElement>;
  
  chart: Chart | undefined;

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['chartData'] && this.chartData) {
      setTimeout(() => {
        this.createChart();
      }, 100);
    }
  }

  createChart(): void {
    if (this.chart) {
      this.chart.destroy();
    }

    if (!this.chartCanvas) return;
    
    const canvas = this.chartCanvas.nativeElement;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const data = {
      labels: this.chartData.labels,
      datasets: Array.isArray(this.chartData.datasets) 
        ? this.chartData.datasets 
        : [{
            label: 'Data',
            data: this.chartData.data,
            backgroundColor: [
              'rgba(75, 192, 192, 0.6)',
              'rgba(255, 159, 64, 0.6)',
              'rgba(255, 99, 132, 0.6)',
              'rgba(54, 162, 235, 0.6)'
            ],
            borderColor: [
              'rgba(75, 192, 192, 1)',
              'rgba(255, 159, 64, 1)',
              'rgba(255, 99, 132, 1)',
              'rgba(54, 162, 235, 1)'
            ],
            borderWidth: 1
          }]
    };

    this.chart = new Chart(ctx, {
      type: this.chartType as any,
      data: data,
      options: {
        responsive: true,
        maintainAspectRatio: false
      }
    });
  }
}
