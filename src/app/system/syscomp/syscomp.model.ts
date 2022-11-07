import { AuditModel } from 'src/app/components/misc/AuditParams.Model';

// Definition of our model class
export class SysCompModel {
constructor(


        public sysCompId: number,
                public businessName: string,
                public businessAddress: string,
                public pOBox: string,
                public website: string,
                public phone1: string,
                public phone2: string,
                public taxNumber: string,
                public mailAddress: string,
        public entryMode: string,
        public active: boolean,
        public readOnly: boolean,
        public auditColumns: any,
) { }
}

