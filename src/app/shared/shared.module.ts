import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { NavbarComponent } from './components/navbar/navbar.component';
import { ToolSliderComponent } from './components/tool-slider/tool-slider.component';
import { BlockComponent } from './components/block/block.component';

@NgModule({
  declarations: [
    NavbarComponent,
    ToolSliderComponent,
    BlockComponent
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
    BlockComponent
  ]
})
export class SharedModule { }
