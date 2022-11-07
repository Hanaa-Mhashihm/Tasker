import { AuditModel } from 'src/app/components/misc/AuditParams.Model';

// Definition of our model class
export class BookContProdModel {
constructor(


        public bookContProdId: number,
                                public prodTransProdId: number,
                public productId: number,
                public baleCount: number,
                public bookContId: number,
        public entryMode: string,
        public active: boolean,
        public readOnly: boolean,
        public auditColumns: any,
) { }
}

