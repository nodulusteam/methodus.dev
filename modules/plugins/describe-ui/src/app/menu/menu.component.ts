import { Component, OnInit, NgZone } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Location } from '@angular/common';
import { Injector } from '@methodus/platform-web';
import { DescribeView } from '../../modules/shim';

@Component({
    selector: 'app-menu',
    templateUrl: './menu.component.html',
    styleUrls: ['./menu.component.scss'],
})
export class MenuComponent implements OnInit {
    public color: string;
    public app: {
        version: string;
        name: string;
    };

    async ngOnInit() {
        const dashboard = await Injector.get<DescribeView>('DescribeView').dashboard();
        this.app = dashboard.app;
        this.color = (window as any).describe_color;
    }
}
