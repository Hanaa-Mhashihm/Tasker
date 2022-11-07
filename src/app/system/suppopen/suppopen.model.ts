import { AuditModel } from 'src/app/components/misc/AuditParams.Model';

// Definition of our model class
export class SuppOpenModel {
constructor(


        public suppOpenId: number,
                public fiscalYearId: number,
                public supplierId: number,
                public supplierAccountId: number,
                public suppNetTotal: number,
                public suppNetPay: number,
                public suppAccNetTot: number,
                public suppAccNetPay: number,
                public suppNetInvCount: number,
                public suppAccInvCount: number,
                public creditAmount: number,
        public entryMode: string,
        public active: boolean,
        public readOnly: boolean,
        public auditColumns: any,
) { }
}

