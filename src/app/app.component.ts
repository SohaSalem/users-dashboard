import { Component, OnInit } from "@angular/core";
import { Router, RouterOutlet } from "@angular/router";
import { Store } from "@ngrx/store";
import { AppState } from "./domain/store/reducers/app.reducer";
import { Observable } from "rxjs";
import { CommonModule } from "@angular/common";
import { NavigationHeaderComponent } from "./adapters/view/home/navigation-header/navigation-header.component";

@Component({
  selector: "app-root",
  standalone: true,
  imports: [RouterOutlet, CommonModule, NavigationHeaderComponent],
  templateUrl: "./app.component.html",
  styleUrl: "./app.component.scss",
})
export class AppComponent implements OnInit {
  title = "admin-user-management";
  loading$!: Observable<boolean>;

  constructor(private store: Store<AppState>, private router: Router) {}

  ngOnInit(): void {}
}
