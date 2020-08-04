import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AddJobRoutingModule } from './add-job-routing.module';
import { AddJobComponent } from './add-job.component';
import { MaterialModule } from '../shared/module/material';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [AddJobComponent],
  imports: [
    CommonModule,
    AddJobRoutingModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class AddJobModule { }
