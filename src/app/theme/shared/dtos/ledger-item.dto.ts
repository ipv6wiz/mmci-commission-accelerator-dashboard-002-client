export interface LedgerItemDto {
  uid: string;
  clientId: string;
  transactionDate: string; // IOS Format
  transType: string; // advance, escrow close, fee, to client, from client
  advanceId: string;
  advanceName: string;
  description: string;
  advanceAgreementNumber: string;
  amount: number; // $0.00
  balance: number; // updated on the fly
}
