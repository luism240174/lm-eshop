import { Location } from '@angular/common';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { CategoriesService, Category } from '@lm/products';
import { MessageService } from 'primeng/api';
import { Subject, timer } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Component({
    selector: 'admin-categories-form',
    templateUrl: './categories-form.component.html',
    styleUrls: []
})
export class CategoriesFormComponent implements OnInit, OnDestroy {
    form: FormGroup;
    isSubmitted = false;
    editMode = false;
    currentCategoryId: string;
    endsubs$: Subject<any> = new Subject();

    constructor(
        private formBuilder: FormBuilder,
        private location: Location,
        private messageService: MessageService,
        private categoriesService: CategoriesService,
        private route: ActivatedRoute
    ) {}

    ngOnInit(): void {
        this.form = this.formBuilder.group({
            name: ['', Validators.required],
            icon: ['', Validators.required],
            color: ['#fff']
        });

        this._checkEditMode();
    }

    ngOnDestroy() {
        this.endsubs$.next();
        this.endsubs$.complete();
      }


    onSubmit() {
        this.isSubmitted = true;

        if (this.form.invalid) {
            return;
        }
        const category: Category = {
            id: this.currentCategoryId,
            name: this.categoryForm.name.value,
            icon: this.categoryForm.icon.value,
            color: this.categoryForm.color.value
        };

        if (this.editMode) {
            this._updateCategory(category);
        } else {
            this._addCategory(category);
        }

    }

    
    onCancel() {
        this.location.back();
      }

    private _addCategory(category: Category) {
        this.categoriesService
            .createCategory(category)
            // .pipe(takeUntil(this.endsubs$))
            .subscribe(
            (category: Category) => {
                this.messageService.add({ 
                    severity: 'success', 
                    summary: 'Success', 
                    detail: `Category ${category.name} was created` 
                });
                timer(2000)
                    .toPromise()
                    .then(() => {
                        this.location.back();
                    });
            },
            () => {
                this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Category was not created' });
            }
        );
        console.log(this.form.controls.name.value);
        console.log(this.form.controls.icon.value);
    }

    private _updateCategory(category: Category) {
        this.categoriesService
            .updateCategory(category)
            .pipe(takeUntil(this.endsubs$))
            .subscribe(
            () => {
                this.messageService.add({ 
                    severity: 'success', 
                    summary: 'Success', 
                    detail: 'Category was updated' 
                });
                timer(2000)
                    .toPromise()
                    .then(() => {
                        this.location.back();
                    });
            },
            () => {
                this.messageService.add({ 
                    severity: 'error', 
                    summary: 'Error', 
                    detail: 'Category was not updated' 
                });
            }
        );
        console.log(this.form.controls.name.value);
        console.log(this.form.controls.icon.value);
    }

    private _checkEditMode() {
        this.route.params
            .pipe(takeUntil(this.endsubs$))
            .subscribe((params) => {
            if (params.id) {
                this.editMode = true;
                this.currentCategoryId = params.id;
                this.categoriesService.getCategory(params.id)
                .pipe(takeUntil(this.endsubs$))
                .subscribe((category) => {
                    this.categoryForm.name.setValue(category.name);
                    this.categoryForm.icon.setValue(category.icon);
                    this.categoryForm.color.setValue(category.color);
                });
            }
        });
    }


    get categoryForm() {
        return this.form.controls;
    }
}
