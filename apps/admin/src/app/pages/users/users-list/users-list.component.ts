import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UsersService, User } from '@lm/users';
import { ConfirmationService, MessageService } from 'primeng/api';

@Component({
    selector: 'admin-users-list',
    templateUrl: './users-list.component.html',
    styles: []
})
export class UsersListComponent implements OnInit {
    users: User[] = [];

    constructor(
        private messageService: MessageService,
        private confirmationService: ConfirmationService,
        private router: Router,
        private usersService: UsersService
    ) {}

    ngOnInit(): void {
        this._getUsers();
    }

    deleteUser(userId: string) {
        this.confirmationService.confirm({
            message: 'Do you want to delete this user?',
            header: 'Delete User',
            icon: 'pi pi-exclamation-triangle',
            accept: () => {
                this.usersService.deleteUser(userId).subscribe(
                    () => {
                        this._getUsers();
                        this.messageService.add({ severity: 'success', summary: 'Success', detail: 'User was deleted' });
                    },
                    () => {
                        this.messageService.add({ severity: 'error', summary: 'Error', detail: 'User was not deleted' });
                    }
                );
            }
        });
    }

    updateUser(userId: string) {
        this.router.navigateByUrl(`users/form/${userId}`);
    }

    private _getUsers() {
        this.usersService.getUsers().subscribe((users) => {
            this.users = users;
        });
    }
}
