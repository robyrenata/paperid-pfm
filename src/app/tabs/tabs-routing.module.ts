import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { TabsPage } from "./tabs.page";

const routes: Routes = [
  {
    path: "tabs",
    component: TabsPage,
    children: [
      {
        path: "home",
        loadChildren: () =>
          import("../pages/home/home.module").then((m) => m.HomePageModule),
      },
      {
        path: "incomes",
        loadChildren: () =>
          import("../pages/incomes/incomes.module").then(
            (m) => m.IncomesPageModule
          ),
      },
      {
        path: "expenses",
        loadChildren: () =>
          import("../pages/expenses/expenses.module").then(
            (m) => m.ExpensesPageModule
          ),
      },
      {
        path: "",
        redirectTo: "/tabs/home",
        pathMatch: "full",
      },
    ],
  },
  {
    path: "",
    redirectTo: "/tabs/home",
    pathMatch: "full",
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TabsPageRoutingModule {}
