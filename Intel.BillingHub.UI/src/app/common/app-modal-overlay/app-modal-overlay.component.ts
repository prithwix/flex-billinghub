import { Component, Input, OnInit } from '@angular/core';
import { delay } from 'rxjs/operators';
import { SpinnerService } from 'src/app/services/spinner.service';
@Component({
  selector: 'app-modal-overlay',
  templateUrl: './app-modal-overlay.component.html',
  styleUrls: ['./app-modal-overlay.component.scss']
})
export class AppModalOverlayComponent implements OnInit {
  @Input() isLoading: boolean = false;
  @Input() src = 'assets/Loading.gif';
  constructor(private loadingSpinner: SpinnerService) { }

  ngOnInit(): void {
    this.loadingSpinner.showSpinner
      .pipe(delay(0))
      .subscribe(response => {
        this.isLoading = response;
      })
  }

}
