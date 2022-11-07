import { AuditModel } from 'src/app/components/misc/AuditParams.Model';

// Definition of our model class
export class AllCurrModel {
constructor(


        public allCurrId: number,
                               public dollar: number,
                public aed: number,
                public euro: number,
        public entryMode: string,
        public active: boolean,
        public readOnly: boolean,
        public auditColumns: any,
) { }
}

