import { AuditModel } from 'src/app/components/misc/AuditParams.Model';

// Definition of our model class
export class CustOpenModel {
constructor(


        public custOpenId: number,
                public fiscalYearId: number,
                public customerId: number,
                public customerAccountId: number,
                public custNetTotal: number,
                public custNetPay: number,
                public custAccNetTot: number,
                public custAccNetPay: number,
                public custNetInvCount: number,
                public custAccInvCount: number,
                public creditAmount: number,
                public customerAccount: string,
        public entryMode: string,
        public active: boolean,
        public readOnly: boolean,
        public auditColumns: any,
) { }
}

