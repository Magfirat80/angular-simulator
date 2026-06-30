import { Component, inject } from '@angular/core';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
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

  private readonly fb: FormBuilder = inject(FormBuilder);
  private readonly ref: DynamicDialogRef = inject(DynamicDialogRef);
  private readonly config: DynamicDialogConfig = inject(DynamicDialogConfig);

  readonly postEditForm = this.fb.nonNullable.group({
    title: [this.config.data.title, Validators.required],
    tags: [this.config.data.tags.join(', '), Validators.required],
    views: [this.config.data.views, [Validators.required, Validators.min(0)]]
  });

  save(): void {
    const value = this.postEditForm.getRawValue();

    this.ref.close({
      ...this.config.data,
      ...value,
      tags: value.tags
        .split(',')
        .map((tag: string) => tag.trim())
        .filter((tag: string) => tag.length > 0)
    });
  }

  close(): void {
    this.ref.close();
  }

}