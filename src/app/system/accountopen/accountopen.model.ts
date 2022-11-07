import { AuditModel } from 'src/app/components/misc/AuditParams.Model';

// Definition of our model class
export class AccountOpenModel {
constructor(


        public accountOpenId: number,
                public fiscalYearId: number,
                public accountId: number,
                public amount: number,
                public currency: number,
                public remarks: string,
                public comment: string,
        public entryMode: string,
        public active: boolean,
        public readOnly: boolean,
        public auditColumns: any,
) { }
}

