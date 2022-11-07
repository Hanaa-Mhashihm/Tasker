import { AuditModel } from 'src/app/components/misc/AuditParams.Model';

// Definition of our model class
export class SuppInvProcModel {
constructor(


        public suppInvProcId: number,
public suppInvoiceId: number,
                public procExpenseId: number,
                public procDate: Date,
                public amount: number,
                public currency: number,
                public vendor: string,
                public remarks: string,
                public otherDet1: string,
                public otherDet2: string,
                public journalEntryId: number,
                public journalDetailId: number,
        public entryMode: string,
        public active: boolean,
        public readOnly: boolean,
        public auditColumns: any,
) { }
}

