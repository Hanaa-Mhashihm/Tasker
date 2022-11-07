import { AuditModel } from 'src/app/components/misc/AuditParams.Model';

// Definition of our model class
export class PartTransModel {
constructor(


        public partTransId: number,
                public operationCost: number,
                public comment: string,
                public suppInvoiceId: number,
                public transDate: Date,
                public totalCost: number,
                public totalSale: number,
        public entryMode: string,
        public active: boolean,
        public readOnly: boolean,
        public auditColumns: any,
) { }
}

export class PartTransDetModel {
        constructor(
                public partTransDetId: number,
                public partTransId: number,
                public partnerId: number,
                public percentValue: number,
                public comment: string,
                public active: boolean,
				public entryMode: string,
				public readOnly: boolean,
				public auditColumns: any,
        ) { }
}

