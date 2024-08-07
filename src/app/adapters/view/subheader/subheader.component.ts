import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-subheader',
  standalone: true,
  templateUrl: './subheader.component.html',
  styleUrls: ['./subheader.component.scss'],
})

export class SubheaderComponent {
  @Input() title!: string;
  @Output() addUser = new EventEmitter<void>();

  constructor() {}

  openAddUserModal() {
    this.addUser.emit();
  }
}
