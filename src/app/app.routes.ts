import { Routes } from "@angular/router";
import { HomeComponent } from "./adapters/view/home/home.component";
import { UserComponent } from "./adapters/view/user/user.component";
import { UserDetailComponent } from "./adapters/view/user/user-detail/user-detail.component";

export const routes: Routes = [
  {
    path: "",
    component: HomeComponent,
    children: [
      { path: "", redirectTo: "user", pathMatch: "full" },
      { path: "user", component: UserComponent },
      { path: "user/:id", component: UserDetailComponent },
    ],
  },
  { path: "**", redirectTo: "" },
];
