import { AuditModel } from 'src/app/components/misc/AuditParams.Model';

// Definition of our model class
export class ProcExpenseModel {
constructor(


        public procExpenseId: number,
                public expName: string,
        public entryMode: string,
        public active: boolean,
        public readOnly: boolean,
        public auditColumns: any,
) { }
}

