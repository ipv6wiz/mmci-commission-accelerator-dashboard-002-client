import {Component, OnInit} from '@angular/core';
import {RegNavBarComponent} from "../../../../theme/shared/components/reg-nav-bar/reg-nav-bar.component";
import {AuthenticationService} from "../../../../theme/shared/service";
import {UpperCasePipe} from "@angular/common";
import {Client} from "../../../../theme/shared/entities/client.interface";

@Component({
  selector: 'app-reg-pending',
  standalone: true,
    imports: [
        RegNavBarComponent,
        UpperCasePipe
    ],
  templateUrl: './reg-pending.component.html',
  styleUrls: ['./reg-pending.component.scss']
})
export class RegPendingComponent implements OnInit{
    // @ts-ignore
    public clientDocData: Client;
    public clientLocalData: Client;
    private status: string = 'loading';
    public statusMsg: string = 'Pending';

    constructor(private authService: AuthenticationService) {
        console.log('RegPendingComponent - constructor - called');
        this.clientLocalData = this.authService.getLocalClientData();
        console.log('constructor - local Client Data: ', this.clientLocalData);

    }
    async ngOnInit() {
        console.log('RegPendingComponent - ngOnInit - called');
        await this.getClientDoc();

        console.log('RegPendingComponent - ngOnInit - local Client Data: ', this.clientLocalData);
        console.log('RegPendingComponent - ngOnInit - Client Doc Data: ', this.clientDocData);
        if(this.clientDocData.status) {
            this.status = this.clientDocData.status;
        } else {
            this.status = 'UNKNOWN';
        }

        this.statusMsg = this.makeStatusMsg(this.status);
    }

    async getClientDoc() {
        const response = await this.authService.getCurrentClientDocument();
        if(response) {
            this.clientDocData = response;
        } else {
            throw new Error('getClientDoc failed')
        }

    }

    makeStatusMsg(status:string ): string {
        let msg: string = '';
        switch(status) {
            case 'Client Pending Verification':
                msg = 'Your Application is Pending Verification';
                break;
            case 'Client Application Verified':
                msg = 'Your Application has been Verified';
                break;
            case 'Client Pending Review':
                msg = 'Your Application is being Reviewed';
                break;

        }
        return msg;
    }
}
