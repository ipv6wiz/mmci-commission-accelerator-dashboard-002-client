import { Component, OnInit } from '@angular/core';
import {AuthenticationService} from "../../../../theme/shared/service";
import {DemoAlertComponent} from "../../../../theme/shared/components/demo-alert/demo-alert.component";
import {NgIf} from "@angular/common";
import {ActivatedRoute, Router, RouterLink} from "@angular/router";
import {Client} from "../../../../theme/shared/entities/client.interface";

@Component({
    selector: 'app-verify-email',
    standalone: true,
    templateUrl: './verify-email.component.html',
    imports: [
        DemoAlertComponent,
        NgIf,
        RouterLink
    ],
    styleUrls: ['./verify-email.component.scss']
})
export default class VerifyEmailComponent implements OnInit {
    client: any;
    constructor(
        public authService: AuthenticationService,
        private router: Router,
        private route: ActivatedRoute
    ) {

    }
    ngOnInit() {
        const userData = this.route.snapshot.paramMap.get('userData') || '{}';
        this.client = JSON.parse(userData);
    }
}
