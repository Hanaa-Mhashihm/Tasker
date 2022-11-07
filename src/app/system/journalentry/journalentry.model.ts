import { AuditModel } from 'src/app/components/misc/AuditParams.Model';

// Definition of our model class
export class JournalEntryModel {
constructor(


        public journalEntryId: number,
        public entryName: string,
        public currency: number,
        public sysCompanyId: number,
        public description: string,
        public entryMode: string,
        public reference: string,
        public forexRate: string,
        public journalEntryDetailEntry: journalentrydetailModel[],
        public active: boolean,
        public readOnly: boolean,
        public auditColumns: any,
        public entryDate: string,

) { }
}

export class journalentrydetailModel {
        constructor(
                public journalEntryDetailId: number,
                public journalEntryId: number,
                public accountId: number,
                public customerId: number,
                public supplierId: number,
                public costCenterId: number,
                public sysCompanyId: number,
                public shareholderId: number,
                public showShare: boolean,
                public showSupplier: boolean,
                public showCustomer: boolean,
                public showCost: boolean,

                public debit: number,
                public credit: number,
                public reference: string,
                public narration: string,
                public relatedJournalEntryDetailId: number,
                public active: boolean,
    public entryMode: string,
    public readOnly: boolean,
    public auditColumns: any,
        ) { }
}

export class SortingModel {
        constructor(
        
        
                public id: number,
                public code: string,
                public name: string,
                public array: any,
                public value: string,
                        
        ) { }
        }
        export class FilteringModel {
        constructor(
        
        
                public columnName: string,
                public displayName: string,
                public frontEndType: string,
                public tableColumnId: number,
                public tableId: number,
                public array1: any,
                public array2: any,
                public operation: string,
                public permission1: boolean,
                public permission2: boolean,
                public value1: string|null,
                public value2: string|null
        
        
        
                        
        ) { }
        }

        export interface DeleteModel {
                name: string,
        id: number;
              }
