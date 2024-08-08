import { Component, EventEmitter, Input, Output } from "@angular/core";

@Component({
  selector: "app-subheader",
  standalone: true,
  templateUrl: "./subheader.component.html",
  styleUrls: ["./subheader.component.scss"],
})
export class SubheaderComponent {
  @Input() title!: string;
  @Input() newUser: boolean = true;
  @Output() addUser = new EventEmitter<void>();

  openAddUserModal() {
    this.addUser.emit();
  }
}
