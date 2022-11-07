import { AuditModel } from 'src/app/components/misc/AuditParams.Model';

// Definition of our model class
export class SuppInvPartModel {
constructor(


        public suppInvPartId: number,
                                public suppInvoiceId: number,
                public partnerId: number,
        public entryMode: string,
        public active: boolean,
        public readOnly: boolean,
        public auditColumns: any,
) { }
}

