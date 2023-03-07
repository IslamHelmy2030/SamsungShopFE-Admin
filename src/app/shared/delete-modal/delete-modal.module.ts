import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DeleteModalComponent } from './delete-modal.component';

@NgModule({
  declarations: [DeleteModalComponent],
  exports: [DeleteModalComponent],
  imports: [CommonModule],
})
export class DeleteModalModule {}
