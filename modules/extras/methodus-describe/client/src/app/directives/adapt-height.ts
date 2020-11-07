import { Directive, ElementRef, Input, OnInit } from '@angular/core';

@Directive({
    selector: '[appAdaptHeight]'
})


export class AdaptHeightDirective implements OnInit {
    @Input('appAdaptHeight') appAdaptHeight: number;
    constructor(private readonly el: ElementRef) {

    }
    set() {
        const view = this.viewport();
        this.el.nativeElement.style.height = `${(view.height - this.appAdaptHeight)}px`;
        this.adapt();
    }
    async ngOnInit() {
        this.set();
    }

    adapt() {
        setTimeout(() => {
            this.set();
        }, 1000);
    }

    viewport() {
        let e: any = window
            , a = 'inner';
        if (!('innerWidth' in window)) {
            a = 'client';
            e = document.documentElement || document.body;
        }
        return { width: e[a + 'Width'], height: e[a + 'Height'] };
    }

}
