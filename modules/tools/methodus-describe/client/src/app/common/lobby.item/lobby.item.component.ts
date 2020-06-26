import {
  Component, OnInit, Input, TemplateRef, ChangeDetectionStrategy
} from '@angular/core';

@Component({
  selector: 'app-lobby-item',
  templateUrl: './lobby.item.component.html',
  styleUrls: ['./lobby.item.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class LobbyItemComponent implements OnInit {
  @Input() template: TemplateRef<any>;
  @Input() item: any;
  @Input() model: string;
  @Input() iconClass: string;

  ngOnInit() {

  }
}
