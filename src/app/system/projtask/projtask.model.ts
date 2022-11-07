import { AuditModel } from 'src/app/components/misc/AuditParams.Model';

// Definition of our model class
export class ProjTaskModel {
constructor(


        public projTaskId: number,
                public templateName: string,
                public description: string,
        public entryMode: string,
        public active: boolean,
        public readOnly: boolean,
        public auditColumns: any,
) { }
}

