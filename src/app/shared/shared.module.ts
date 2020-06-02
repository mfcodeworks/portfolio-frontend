import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { NgxSkeletonLoaderModule } from 'ngx-skeleton-loader';
import { NavbarComponent } from './components/navbar/navbar.component';
import { ToolSliderComponent } from './components/tool-slider/tool-slider.component';
import { BlockComponent } from './components/block/block.component';
import { ModalComponent } from './components/modal/modal.component';
import { PostPreviewComponent } from './components/post-preview/post-preview.component';
import { FooterComponent } from './components/footer/footer.component';

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    NgxSkeletonLoaderModule
  ],
  declarations: [
    NavbarComponent,
    FooterComponent,
    ToolSliderComponent,
    BlockComponent,
    ModalComponent,
    PostPreviewComponent
  ],
  exports: [
    CommonModule,
    RouterModule,
    NgxSkeletonLoaderModule,
    NavbarComponent,
    FooterComponent,
    ToolSliderComponent,
    BlockComponent,
    ModalComponent,
    PostPreviewComponent
  ]
})
export class SharedModule { }
