import { NgModule } from "@angular/core";
import { HttpClientModule } from '@angular/common/http';
import { ApiServiceService } from "./api-service.service";
@NgModule({
    imports: [
        HttpClientModule
    ],
    providers: [ApiServiceService]
})
export class ServicesModule { }