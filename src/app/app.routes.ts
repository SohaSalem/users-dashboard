import { Routes } from "@angular/router";
import { HomeComponent } from "./adapters/view/home/home.component";
import { UserComponent } from "./adapters/view/user/user.component";

export const routes: Routes = [
  {
    path: "",
    component: HomeComponent,
    children: [
      { path: "", redirectTo: "user", pathMatch: "full" },
      { path: "user", component: UserComponent },
    ],
  },
  { path: "**", redirectTo: "" },
];
