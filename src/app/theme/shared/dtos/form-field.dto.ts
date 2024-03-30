import { Address } from '../entities/address.class';

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
  autoCapitalize?: string;
  mask?: string;
  addrObj?: Address;
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
  autoCapitalize?: '',
  mask?: '',
  addrObj?: null,
  pickerId?: '',
  startView?: 'month',
  storedFormat?: '',
  options?: []
 */
