import { Component, effect, Inject, OnInit } from '@angular/core';
import { provideNgxMask } from 'ngx-mask';
import { FormFieldDto } from '../../../dtos/form-field.dto';
import { MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import { MlsListService } from '../../../service/mls-list.service';
import { EscrowCompanyService } from '../../../service/escrow-company.service';
import { EscrowCompanyDto } from '../../../dtos/escrow-company.dto';
import { MlsListDto } from '../../../dtos/mls-list.dto';
import { HelpersService } from '../../../service/helpers.service';
import { FormBuilder } from '@angular/forms';
import { Address } from '../../../entities/address.class';
import { MmciFormMatComponent } from '../../mmci-form-mat/mmci-form-mat.component';
import { dataGridRefreshSignal } from '../../../signals/data-grid-refresh.signal';
import { mmciFormSubmitSignal } from '../../mmci-form-mat/signals/mmci-form-submit.signal';
import { AdvanceService } from '../../../service/advance.service';
import { SelectDto } from '../../../dtos/select.dto';

@Component({
  selector: 'app-advance-request-form',
  standalone: true,
  imports: [
    MmciFormMatComponent
  ],
  providers: [
    provideNgxMask()
  ],
  templateUrl: './advance-request-form-dialog.component.html',
  styleUrl: './advance-request-form-dialog.component.scss'
})
export class AdvanceRequestFormDialogComponent implements OnInit {
  fieldsArr!: FormFieldDto[];
  chipListArr: string[];
  escrow!: EscrowCompanyDto[];
  mls!: MlsListDto[];
  dataTypeTag: string = 'advance';
  formConfig!: SelectDto[];

  constructor(
    public modal: MatDialog,
    private formBuilder: FormBuilder,
    private helpers: HelpersService,
    private service: AdvanceService,
    private mlsService: MlsListService,
    private escrowService: EscrowCompanyService,
    @Inject(MAT_DIALOG_DATA) public data: any,
  ) {
    effect(() => {
      const formSubmitSignal = mmciFormSubmitSignal();
      if(formSubmitSignal.action === 'submit') {
        this.onSubmit(formSubmitSignal).then();
      }
    });
    this.formConfig = [
      {key: 'fieldIdPrefix', value: 'advance'},
      {key: 'dataTypeTag', value: 'advances'},
      {key: 'formTag', value: 'Commission Advance'},
    ];

    this.chipListArr = [];


  }

  ngOnInit() {
    this.escrow = this.data.escrow;
    this.mls = this.data.mls;
    console.log('ngOnInit - Escrow Companies: ', this.escrow);
    console.log('ngOnInit - MLS Systems: ', this.mls);
    this.fieldsArr = this.populateFormFields();
  }

  populateFormFields(): FormFieldDto[] {
    const fields: any[] = [];
      // fields.push({
      //   fieldLabel: '',
      //   placeholder: '',
      //   fcn: '',
      //   type: '',
      //   required: true,
      //   disabled: false,
      //   validators: [],
      //   width: 0, // percentage
      //   rowCol: '',
      //   autoCapitalize: '',
      //   mask: '',
      //   addrObj: null,
      //   pickerId: '',
      //   startView: 'month',
      //   storedFormat: '',
      //   options: []
      // });

    fields.push({
      fieldLabel: 'MLS #',
      placeholder: 'MLS # of property',
      fcn: 'mlsId',
      type: 'text',
      required: true,
      disabled: false,
      validators: [],
      width: 33, // percentage
      rowCol: '1.1',
    });

    fields.push({
      fieldLabel: 'MLS System',
      placeholder: 'Choose',
      fcn: 'mlsSystem',
      type: 'select',
      required: true,
      disabled: false,
      validators: [],
      width: 33, // percentage
      rowCol: '1.2',
      options: this.mls
    });

    fields.push({
      fieldLabel: 'Property Address',
      placeholder: 'Address of property in escrow',
      fcn: 'propertyAddress',
      type: 'address',
      required: true,
      disabled: false,
      validators: [],
      width: 100, // percentage
      rowCol: '2.1',
      addrObj: new Address(this.formBuilder, this.helpers)
    });

    fields.push({
      fieldLabel: 'Requested Amount',
      placeholder: 'Amount of Commission you want',
      fcn: 'amountRequested',
      type: 'currency',
      required: true,
      disabled: false,
      validators: [],
      width: 33, // percentage
      rowCol: '3.1',
    });

    fields.push({
      fieldLabel: 'Agent Commission',
      placeholder: 'Commission due to you',
      fcn: 'agentCommission',
      type: 'currency',
      required: true,
      disabled: false,
      validators: [],
      width: 33, // percentage
      rowCol: '3.2',
    });

    fields.push({
      fieldLabel: 'Gross Commission',
      placeholder: 'Commission Sale',
      fcn: 'grossCommission',
      type: 'currency',
      required: true,
      disabled: false,
      validators: [],
      width: 33, // percentage
      rowCol: '3.3',
    });

    return fields;
  }

  async onSubmit(event: any) {
    console.log('onSubmit - event: ', event);
    let response;
    if(event.formType === 'new') {
      response = await this.service.createItem(event.formData);
    } else if(event.formType === 'update') {
      response = await this.service.updateItem(event.formData.uid, event.formData);
    }
    dataGridRefreshSignal.set({refresh: true, dataType: this.dataTypeTag })
    console.log('onSubmit - response: ', response);
  }
}