import { Component, inject } from '@angular/core';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { FormBuilder, ReactiveFormsModule, Validators, FormGroup } from '@angular/forms';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';

@Component({
  selector: 'app-post-edit-dialog',
  standalone: true,
  imports: [ReactiveFormsModule, InputTextModule, ButtonModule],
  templateUrl: './post-edit-dialog.component.html',
  styleUrl: './post-edit-dialog.component.scss',
})
export class PostEditDialogComponent {

  private fb: FormBuilder = inject(FormBuilder);
  private ref: DynamicDialogRef = inject(DynamicDialogRef);
  private config: DynamicDialogConfig = inject(DynamicDialogConfig);

  postEditForm: FormGroup = this.fb.nonNullable.group({
    title: [this.config.data.title, Validators.required],
    tags: [this.config.data.tags.join(', '), Validators.required],
    views: [this.config.data.views, [Validators.required, Validators.min(0)]]
  });

  save(): void {
    const formValue: any = this.postEditForm.getRawValue();

    const tags: string[] = formValue.tags
      .split(',')
      .map((tag: string) => tag.trim())
      .filter((tag: string) => tag.length > 0);

    const updatedPost: any = {
      ...this.config.data,
      ...formValue,
      tags
    };  

    this.ref.close(updatedPost);
  }

  close(): void {
    this.ref.close();
  }

}