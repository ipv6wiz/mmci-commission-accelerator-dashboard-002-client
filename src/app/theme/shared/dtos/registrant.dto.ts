import {ClientContactDto} from "./client-contact.dto";
import {ClientDreInfoDto} from "./client-dre-info.dto";
import {AddressDto} from "./address.dto";
import {BrokerageDto} from "./brokerage.dto";
import {AgentPerformanceDto} from "./agent-performance.dto";
import { DocUploadInfoDto } from './doc-upload-info.dto';

export class Registrant {
    uid: string = '';
    contactInfo: ClientContactDto;
    dreInfo: ClientDreInfoDto;
    homeAddress: AddressDto;
    brokerageInfo: BrokerageDto;
    performanceInfo: AgentPerformanceDto;
    docUploadInfo: DocUploadInfoDto;
    agentDreData: any;
    brokerDreData: any;

    constructor(uid: string) {
        this.uid = uid;
        this.contactInfo = {};
        this.dreInfo = {};
        this.homeAddress = {};
        this.brokerageInfo = {};
        this.performanceInfo = {};
        this.docUploadInfo = {} as DocUploadInfoDto;
    }
}
