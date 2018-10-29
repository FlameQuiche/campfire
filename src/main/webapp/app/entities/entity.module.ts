import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

import { CampFireFolderMpmModule } from './folder-mpm/folder-mpm.module';
import { CampFireBookmarkMpmModule } from './bookmark-mpm/bookmark-mpm.module';
import { CampFireSprintMpmModule } from './sprint-mpm/sprint-mpm.module';
import { CampFireMoodMpmModule } from './mood-mpm/mood-mpm.module';
import { CampFireIdeaMpmModule } from './idea-mpm/idea-mpm.module';
import { CampFireActionMpmModule } from './action-mpm/action-mpm.module';
import { CampFireTeamMpmModule } from './team-mpm/team-mpm.module';
/* jhipster-needle-add-entity-module-import - JHipster will add entity modules imports here */

@NgModule({
    // prettier-ignore
    imports: [
        CampFireFolderMpmModule,
        CampFireBookmarkMpmModule,
        CampFireSprintMpmModule,
        CampFireMoodMpmModule,
        CampFireIdeaMpmModule,
        CampFireActionMpmModule,
        CampFireTeamMpmModule,
        /* jhipster-needle-add-entity-module - JHipster will add entity modules here */
    ],
    declarations: [],
    entryComponents: [],
    providers: [],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class CampFireEntityModule {}
