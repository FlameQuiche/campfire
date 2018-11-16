import { NgModule } from '@angular/core';

import { CampFireSharedLibsModule, FindLanguageFromKeyPipe, JhiAlertComponent, JhiAlertErrorComponent } from './';
import { TeamMpmSelectorComponent } from 'app/shared/team/team-mpm-selector.component';

@NgModule({
    imports: [CampFireSharedLibsModule],
    declarations: [FindLanguageFromKeyPipe, JhiAlertComponent, JhiAlertErrorComponent, TeamMpmSelectorComponent],
    exports: [CampFireSharedLibsModule, FindLanguageFromKeyPipe, JhiAlertComponent, TeamMpmSelectorComponent, JhiAlertErrorComponent]
})
export class CampFireSharedCommonModule {}
