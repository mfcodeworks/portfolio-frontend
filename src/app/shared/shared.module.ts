import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { NavbarComponent } from './components/navbar/navbar.component';
import { ToolSliderComponent } from './components/tool-slider/tool-slider.component';
import { BlockComponent } from './components/block/block.component';
import { ModalComponent } from './components/modal/modal.component';
import { PostPreviewComponent } from './components/post-preview/post-preview.component';
import { FooterComponent } from './components/footer/footer.component';

@NgModule({
  declarations: [
    NavbarComponent,
    FooterComponent,
    ToolSliderComponent,
    BlockComponent,
    ModalComponent,
    PostPreviewComponent
  ],
  imports: [
    CommonModule,
    RouterModule
  ],
  exports: [
    CommonModule,
    RouterModule,
    NavbarComponent,
    FooterComponent,
    ToolSliderComponent,
    BlockComponent,
    ModalComponent,
    PostPreviewComponent
  ]
})
export class SharedModule { }
