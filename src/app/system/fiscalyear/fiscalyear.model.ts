import { AuditModel } from 'src/app/components/misc/AuditParams.Model';

// Definition of our model class
export class FiscalYearModel {
constructor(


        public fiscalYearId: number,
                public fyear: number,
                public startDate: Date,
                public endDate: Date,
                public remarks: string,
                public comment: string,
                public isActive: boolean,
        public entryMode: string,
        public active: boolean,
        public readOnly: boolean,
        public auditColumns: any,
) { }
}

