import { Component, OnInit } from '@angular/core';
import { DownloadService } from '../services/download.service';

@Component({
  selector: 'app-download',
  templateUrl: './download.component.html',
  styleUrls: ['./download.component.scss'],
})
export class DownloadComponent implements OnInit {
  constructor(private downloadService: DownloadService) {}

  ngOnInit(): void {}

  download(url: string, filename: string) {
    this.downloadService.downloadFile(url, filename);
  }
}
