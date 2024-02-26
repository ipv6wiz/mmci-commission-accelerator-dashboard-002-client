import {Address} from "./address.interface";

export interface AgentData {
    licenseType: string;
    firstName: string;
    middleName?: string;
    lastname: string;
    respBroker: string;
    homeAddress: Address

}
