import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SlideHeaderComponent } from './common/slide-header/slide-header.component';
import { SlideFooterComponent } from './common/slide-footer/slide-footer.component';

import { ClickStopPropagationDirective } from './directives/stop-prop';
import { LobbyItemComponent } from './common/lobby.item/lobby.item.component';
import { DirtyService } from './services/dirty.service';
import { LoaderService } from './services/loader.service';
import { LoaderComponent } from './common/loader/loader.component';
import { PrettyPrintPipe } from './pipes/prettyprint';
import { KeysPipe } from './pipes/keys-pipe';
import { HumanizePipe } from './pipes/humanize-pipe';
import { SafeHtmlPipe } from './pipes/safe-html';
import { MenuComponent } from './menu/menu.component';
import { LobbyComponent } from './common/lobby/lobby.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { SharedModule } from '../modules/shared.module';

@NgModule({
    imports: [CommonModule, SharedModule],
    declarations: [
        LobbyComponent,
        MenuComponent,
        DashboardComponent,
        ClickStopPropagationDirective,
        SlideHeaderComponent,
        SlideFooterComponent,
        LobbyItemComponent,
        LobbyComponent,
        LoaderComponent,
        PrettyPrintPipe,
        KeysPipe,
        HumanizePipe,
        SafeHtmlPipe,
    ],
    providers: [DirtyService, LoaderService],
    exports: [
        LobbyComponent,
        LobbyItemComponent,
        SlideHeaderComponent,
        SlideFooterComponent,
        PrettyPrintPipe,
        KeysPipe,
        HumanizePipe,
        SafeHtmlPipe,
    ],
})
export class SharedAppModule {
    constructor() {}

    static forRoot(): ModuleWithProviders<SharedAppModule> {
        return {
            ngModule: SharedAppModule,

            providers: [],
        };
    }
}
