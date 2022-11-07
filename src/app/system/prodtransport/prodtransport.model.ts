import { AuditModel } from 'src/app/components/misc/AuditParams.Model';

// Definition of our model class
export class ProdTransportModel {
constructor(


        public prodTransportId: number,
                               public truckName: string,
                public truckModel: string,
                public regNo: string,
                public driverName: string,
                public driverLicense: string,
                public contact1: string,
                public contact2: string,
                public departDate: Date,
                public arrivalDate: Date,
                public transportCost: number,
                public suppInvoiceId: number,
                public currency: number,
                public comment: string,
                public journalEntryId: number,
                public journalDetailId: number,
                public transCode: string,
        public entryMode: string,
        public active: boolean,
        public readOnly: boolean,
        public auditColumns: any,
) { }
}
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
                public active: boolean,
				public entryMode: string,
				public readOnly: boolean,
				public auditColumns: any,
        ) { }
}

