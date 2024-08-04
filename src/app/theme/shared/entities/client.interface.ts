import {Address} from "./address.interface";
import {AgentPerformance} from "./agent-performance.interface";
import {AgentData} from "./agent-data.interface";
import { BrokerageDto } from '../dtos/brokerage.dto';
import { CreditLimitItemEntity } from './credit-limit-item.entity';

export interface Client {
    uid: string;
    agentData?: AgentData;
    agentDreData?: any;
    approvedBy?: string;
    archivedBy?: string;
    brokerage?: BrokerageDto;
    bucket?: string;
    cellPhone?: string;
    clientDocs?: any;
    creditLimit?: CreditLimitItemEntity;
    dateApplied?: Date;
    dateApproved?: Date;
    dateArchived?: Date;
    dateUpdated?: Date;
    defaultPage?: string;
    displayName?: string;
    dreLicenseExpirationDate?: Date;
    dreNumber?: string;
    dreState?: string;
    email?: string;
    emailVerified?: boolean;
    firstName?: string;
    homeAddress?: Address;
    lastLogin?: string;
    lastName?: string;
    middleName?: string;
    performance?: AgentPerformance;
    photoURL?: string;
    roles?: string[];
    status?: string;
    updatedBy?: string;
}
