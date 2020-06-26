import { Component, OnInit, Input, OnDestroy, NgZone } from '@angular/core';
import { LoaderService } from '../../services/loader.service';
import { Subscription } from 'rxjs';


@Component({
  selector: 'app-loader',
  templateUrl: './loader.component.html',
  styleUrls: ['./loader.component.scss']
})
export class LoaderComponent implements OnInit, OnDestroy {
  busy = false;
  @Input() name: string;
  constructor(private readonly _ngZone: NgZone, private readonly loaderService: LoaderService) {

  }
  subscription: Subscription;
  ngOnInit() {
    if (this.name) {
      this.subscription = this.loaderService.getSubscription(this.name).subscribe((value: boolean) => {
        this._ngZone.run(async () => {

          this.busy = value;
        });
      });
      this.loaderService.sync();
    }
  }

  ngOnDestroy(): void {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }
}
