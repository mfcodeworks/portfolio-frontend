import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { NavbarComponent } from './components/navbar/navbar.component';
import { ToolSliderComponent } from './components/tool-slider/tool-slider.component';
import { BlockComponent } from './components/block/block.component';
import { ModalComponent } from './components/modal/modal.component';

@NgModule({
  declarations: [
    NavbarComponent,
    ToolSliderComponent,
    BlockComponent,
    ModalComponent
  ],
  imports: [
    CommonModule,
    RouterModule
  ],
  exports: [
    CommonModule,
    RouterModule,
    NavbarComponent,
    ToolSliderComponent,
    BlockComponent,
    ModalComponent
  ]
})
export class SharedModule { }
