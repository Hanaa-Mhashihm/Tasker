import { AuditModel } from 'src/app/components/misc/AuditParams.Model';

// Definition of our model class
export class ProdTransProdModel {
constructor(


        public prodTransProdId: number,
                                public prodTransportId: number,
                public productId: number,
                public quantity: number,
                public productUnitId: number,
                public journalEntryId: number,
                public journalDetailId: number,
                public baleCount: number,
                public weight: number,
                public baleLoaded: number,
                public baleRemaining: number,
        public entryMode: string,
        public active: boolean,
        public readOnly: boolean,
        public auditColumns: any,
) { }
}

