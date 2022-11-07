import { AuditModel } from 'src/app/components/misc/AuditParams.Model';

// Definition of our model class
export class CostCenterModel {
constructor(


        public costCenterId: number,
                public costCode: string,
                public costName: string,
                public description: string,
                public remarks: string,
        public entryMode: string,
        public active: boolean,
        public readOnly: boolean,
        public auditColumns: any,
) { }
}

