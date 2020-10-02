import { NgModule } from '@angular/core';
import { CommonModule} from '@angular/common'
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatTabsModule } from '@angular/material/tabs';

@NgModule({
  imports: [
    CommonModule,
    MatProgressBarModule,
    MatTabsModule 
  ],
  exports : [
    MatProgressBarModule,
    MatTabsModule 
  ]
 
})
export class MaterialModule { }