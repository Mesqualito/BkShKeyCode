import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { StartComponent} from "./start/start.component";
import { RecodeComponent} from "./recode/recode.component";


const routes: Routes = [
  { path: '', component: StartComponent },
  { path: 'recode', component: RecodeComponent },
  ];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
