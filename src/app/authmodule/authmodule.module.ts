import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AuthmoduleRoutingModule } from './authmodule-routing.module';
import { RouterOutlet } from '@angular/router';


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    AuthmoduleRoutingModule,
    RouterOutlet
  ]
})
export class AuthmoduleModule { }
