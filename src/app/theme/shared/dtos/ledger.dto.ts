import { LedgerItemDto } from './ledger-item.dto';

export interface LedgerDto {
  clientId: string
  creditLimit: number;
  balance: number;
  ledgerItems: LedgerItemDto[];
}
