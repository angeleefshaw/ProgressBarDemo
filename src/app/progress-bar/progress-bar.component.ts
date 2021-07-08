import { Component, OnInit } from '@angular/core';
import { Router, NavigationStart, NavigationEnd } from '@angular/router';
import { DownloadService } from '../services/download.service';

@Component({
  selector: 'app-progress-bar',
  templateUrl: './progress-bar.component.html',
  styleUrls: ['./progress-bar.component.scss'],
})
export class ProgressBarComponent implements OnInit {
  isPageLoading = false;
  isDownloading = false;
  loadingProgress = 0;

  constructor(
    private router: Router,
    private downloadService: DownloadService
  ) {}

  ngOnInit(): void {
    this.router.events.subscribe((event) => {
      // If it's the start of navigation, show loading bar
      if (event instanceof NavigationStart) {
        this.isPageLoading = true;
        return;
      }

      // Else navigation has ended, so hide loading bar
      if (event instanceof NavigationEnd) {
        setTimeout(() => {
          this.isPageLoading = false;
        }, 500);
        return;
      }
    });

    this.downloadService.loads$.subscribe((loads) => {
      const items = Object.values(loads);

      this.isDownloading = items.length > 0;

      // calculate loading progress
      if (this.isDownloading) {
        const loaded: number = items.reduce(
          (s: number, l: any) => s + l.loaded,
          0
        );
        const total: number = items.reduce(
          (s: number, l: any) => s + l.total,
          0
        );
        this.loadingProgress = Math.round((100 * loaded) / total);
      }
    });
  }
}
