import { Injectable } from '@angular/core';
import { HttpClient, HttpEventType } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class DownloadService {
  loads$ = new BehaviorSubject({});

  constructor(private http: HttpClient) {}

  downloadFile(url: string, filename?: string) {
    const id = `${url}_${new Date().getTime()}`;

    this.http
      .get(url, {
        responseType: 'blob',
        reportProgress: true,
        observe: 'events',
      })
      .subscribe((event) => {
        if (event.type === HttpEventType.DownloadProgress) {
          if (event.total) {
            this.loads$.next({
              ...this.loads$.value,
              [id]: event,
            });
          }
        }

        if (event.type === HttpEventType.Response) {
          const loads: any = { ...this.loads$.value };
          delete loads[id];
          this.loads$.next(loads);

          // download blog data
          const blobUrl = URL.createObjectURL(event.body);
          const link = document.createElement('a');
          link.href = blobUrl;
          link.download = filename || 'download';
          link.dispatchEvent(
            new MouseEvent('click', {
              bubbles: true,
              cancelable: true,
              view: window,
            })
          );
        }
      });
  }
}
