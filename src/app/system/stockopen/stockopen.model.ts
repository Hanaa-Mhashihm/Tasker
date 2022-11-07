import { AuditModel } from 'src/app/components/misc/AuditParams.Model';

// Definition of our model class
export class StockOpenModel {
constructor(


        public stockOpenId: number,
                public fiscalYearId: number,
                public productId: number,
                public quantity: number,
                public productUnitId: number,
                public wareHouseId: number,
        public entryMode: string,
        public active: boolean,
        public readOnly: boolean,
        public auditColumns: any,
) { }
}

