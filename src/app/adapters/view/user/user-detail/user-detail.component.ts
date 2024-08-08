import { ChangeDetectionStrategy, Component } from "@angular/core";
import { CommonModule } from "@angular/common";
import { ActivatedRoute, Router } from "@angular/router";
import { Store } from "@ngrx/store";
import { Observable } from "rxjs";
import { FormsModule } from "@angular/forms";
import { HttpClientModule } from "@angular/common/http";
import { User } from "../../../../domain/models/user.model";
import { AppState } from "../../../../domain/store/reducers/app.reducer";
import { AlertComponent } from "../../alert/alert.component";
import { SubheaderComponent } from "../../subheader/subheader.component";
import { selectUserById } from "../../../../domain/store/selectors/user.selectors";
import { loadUserById } from "../../../../domain/store/actions/user.actions";
import { NgbModal } from "@ng-bootstrap/ng-bootstrap";

@Component({
  selector: "app-user-detail",
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    HttpClientModule,
    SubheaderComponent,
    AlertComponent,
  ],
  templateUrl: "./user-detail.component.html",
  styleUrls: ["./user-detail.component.scss"],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UserDetailComponent {
  user$!: Observable<Partial<User> | undefined>;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private store: Store<AppState>
  ) {}

  ngOnInit(): void {
    const userId = this.route.snapshot.paramMap.get("id");
    if (userId) {
      this.store.dispatch(loadUserById({ userId: +userId }));
      this.user$ = this.store.select(selectUserById(+userId));
    }
  }

  goBack(): void {
    this.router.navigate(["/users"]);
  }
}
