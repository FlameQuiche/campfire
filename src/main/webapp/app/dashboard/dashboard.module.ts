import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CampFireBarchartModule } from './barchart/barchart.module';
import { CampFireDoughnutchartModule } from './doughnutchart/doughnutchart.module';
import { CampFireLinechartModule } from './linechart/linechart.module';
import { CampFirePiechartModule } from './piechart/piechart.module';
import { CampFirePolarareachartModule } from './polarareachart/polarareachart.module';
import { CampFireRadarchartModule } from './radarchart/radarchart.module';

@NgModule({
    imports: [
        CampFireBarchartModule,
        CampFireDoughnutchartModule,
        CampFireLinechartModule,
        CampFirePiechartModule,
        CampFirePolarareachartModule,
        CampFireRadarchartModule
    ],
    declarations: [],
    entryComponents: [],
    providers: [],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class CampFireDashboardModule {}
