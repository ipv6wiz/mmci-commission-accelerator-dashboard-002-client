import { AddressClass } from '../entities/address.class';
import { AdvanceEscrowDetailsClass } from '../entities/advance-escrow-details.class';

export interface FormFieldDto {
  fieldLabel: string;
  placeholder: string;
  fcn: string;
  type: string;
  required: boolean;
  disabled: boolean;
  validators: any[];
  width: number; // percentage
  rowCol: string;
  default?: any;
  autoCapitalize?: string;
  mask?: string;
  addrObj?: AddressClass;
  escrowObj?: AdvanceEscrowDetailsClass;
  pickerId?: string;
  startView?: 'month' | 'year' | 'multi-year';
  storedFormat?: string;
  options?: any[];
}

/*
  fieldLabel: '',
  placeholder: '',
  fcn: '',
  type: '',
  required: true,
  disabled: false,
  validators: [],
  width: 0, // percentage
  rowCol: '',
  default?: null,
  autoCapitalize?: '',
  mask?: '',
  addrObj?: null,
  pickerId?: '',
  startView?: 'month',
  storedFormat?: '',
  options?: []
 */
