import {Address} from "./address.interface";
import {Brokerage} from "./brokerage.interface";
import {AgentPerformance} from "./agent-performance.interface";
import {AgentData} from "./agent-data.interface";

export interface Client {
    uid: string;
    defaultPage: string;
    status: string;
    firstName?: string;
    middleName?: string;
    lastName?: string;
    email?: string;
    displayName?: string;
    photoURL?: string;
    emailVerified?: boolean;
    lastLogin?: string;
    roles: string[];
    dreNumber?: string;
    dreState?: string;
    dreLicenseExpirationDate?: Date;
    cellPhone?: string;
    homeAddress?: Address;
    brokerage?: Brokerage;
    performance?: AgentPerformance;
    creditLimit?: number;
    dateApplied?: Date;
    dateApproved?: Date;
    approvedBy?: string;
    dateUpdated?: Date;
    updatedBy?: string;
    dateArchived?: Date;
    archivedBy?: string;
    agentData?: AgentData;
    bucket?: string;
    clientDocs?: any;
}
