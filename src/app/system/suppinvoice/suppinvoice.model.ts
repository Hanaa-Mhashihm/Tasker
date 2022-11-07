import { AuditModel } from 'src/app/components/misc/AuditParams.Model';

// Definition of our model class
export class SuppInvoiceModel {
constructor(


        public suppInvoiceId: number,
                public invoiceNo: string,
                public invoiceDate: Date,
                public discountType: number,
                public discountAmount: number,
                public supplierId: number,
                public currency: number,
                public supplierAccountId: number,
                public discJournalEntryId: number,
                public discJournalDetailId: number,
        public entryMode: string,
        public active: boolean,
        public readOnly: boolean,
        public auditColumns: any,
) { }
}
export class invoiceproductModel {
        constructor(
                public suppInvoiceProductId: number,
                public suppInvoiceId: number,
                public productId: number,
                public quantity: number,
                public productUnitId: number,
                public unitPrice: number,
                public totalPrice: number,
                public journalEntryId: number,
                public journalDetailId: number,
                public active: boolean,
				public entryMode: string,
				public readOnly: boolean,
				public auditColumns: any,
        ) { }
}
export class invoicetaxModel {
        constructor(
                public suppInvoiceTaxId: number,
                public suppInvoiceId: number,
                public taxId: number,
                public journalEntryId: number,
                public journalDetailId: number,
                public active: boolean,
				public entryMode: string,
				public readOnly: boolean,
				public auditColumns: any,
        ) { }
}
export class productPricingModel {
        constructor(
                public unitId: number,
                public unitName: string,
                public unitPrice: number,
                
        ) { }
}
export class forexRateModel {
        constructor(
                public id: number,
                public name: string,
               
                
        ) { }
}

