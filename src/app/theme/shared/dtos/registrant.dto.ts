import {RegStep} from "../entities/reg-step.interface";
import {ClientContactDto} from "./client-contact.dto";
import {ClientDreInfoDto} from "./client-dre-info.dto";
import {AddressDto} from "./address.dto";
import {BrokerageDto} from "./brokerage.dto";
import {AgentPerformanceDto} from "./agent-performance.dto";

export class Registrant {
    uid: string = '';
    contactInfo: ClientContactDto;
    dreInfo: ClientDreInfoDto;
    homeAddress: AddressDto;
    brokerageInfo: BrokerageDto;
    performanceInfo: AgentPerformanceDto;
    docUploadInfo: any;
    agentDreData: any;
    regSteps: RegStep[] = [];

    constructor(uid: string) {
        this.uid = uid;
        this.contactInfo = {};
        this.dreInfo = {};
        this.homeAddress = {};
        this.brokerageInfo = {};
        this.performanceInfo = {};
        this.docUploadInfo = {};
    }
}
