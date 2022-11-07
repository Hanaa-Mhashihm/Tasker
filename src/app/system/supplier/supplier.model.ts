import { AuditModel } from 'src/app/components/misc/AuditParams.Model';

// Definition of our model class
export class SupplierModel {
constructor(


        public supplierId: number,
                 public supplierCode: string,
                public supplierName: string,
                public supplierEmail: string,
                public mobile1: string,
                public mobile2: string,
                public mobile3: string,
                public address: string,
                public street1: string,
                public street2: string,
                public city: string,
                public state: string,
                public area: string,
                public overDueLimit: number,
                public creditTerm: number,
                public taxCardNo: string,
                public taxOffice: string,
                public remarks: string,
                public companyName: string,
                public aPIImagePath: string,
                public aPIPath: string,
                public extension: string,
                public fileName: string,
                public fullPath: string,
                public originalFileName: string,
        public entryMode: string,
        public active: boolean,
        public readOnly: boolean,
        public auditColumns: any,
) { }
}

export class SupplierAccountModel {
        constructor(
                public supplierAccountId: number,
                public supplierId: number,
                public description: string,
                public accountName: string,
                public accountNumber: string,
                public otherDetail1: string,
                public otherDetail2: string,
                public otherDetail3: string,
                public active: boolean,
    public entryMode: string,
    public readOnly: boolean,
    public auditColumns: any,
        ) { }
}

