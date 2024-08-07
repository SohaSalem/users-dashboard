import { ChangeDetectionStrategy, Component } from "@angular/core";
import { RouterModule } from "@angular/router";
import { Store } from "@ngrx/store";
import { AppState } from "../../../../domain/store/reducers/app.reducer";
import { CommonModule } from "@angular/common";

@Component({
  selector: "app-navigation-header",
  standalone: true,
  imports: [RouterModule, CommonModule],
  templateUrl: "./navigation-header.component.html",
  styleUrl: "./navigation-header.component.scss",
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NavigationHeaderComponent {
  constructor(private store: Store<AppState>) {}

  ngOnInit(): void {}
}
