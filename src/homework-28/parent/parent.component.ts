import { Component } from '@angular/core';
import { IUser } from '../IUser';
import { ChildComponent } from '../child/child.component';

@Component({
  selector: 'app-parent',
  imports: [ChildComponent],
  templateUrl: './parent.component.html',
  styleUrl: './parent.component.scss',
})
export class ParentComponent {

  user: IUser = {
    name: 'Alex',
    age: 21
  };

  changeName() {
    this.user.name = 'Eugene';
  }

}