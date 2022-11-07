import { AuditModel } from 'src/app/components/misc/AuditParams.Model';

// Definition of our model class
export class BookingModel {
constructor(


        public bookingId: number,
                public bookingNo: string,
                public comment: string,
                public bookDate: Date,
                public bookClose: Date,
        public entryMode: string,
        public active: boolean,
        public readOnly: boolean,
        public auditColumns: any,
) { }
}

export class BookContModel {
        constructor(
                public bookContId: number,
                public bookingId: number,
                public containerNo: string,
                public sizeW: string,
                public sizeH: string,
                public comment: string,
                public weight: number,
                public departDate: Date,
                public arrivalDate: Date,
                public active: boolean,
				public entryMode: string,
				public readOnly: boolean,
				public auditColumns: any,
        ) { }
}

export class BookExpListModel { 
        constructor( 
                public bookExpListId: number, 
                public bookingId: number, 
                public expType: string, 
                public supplier: number, 
                public currency: number, 
                public forexRate: number, 
                public amount: number, 
                public journalId: number, 
                public journalDetailId: number, 
                public desc1: string, 
                public desc2: string, 
                public active: boolean, 
    public entryMode: string, 
    public readOnly: boolean, 
    public auditColumns: any, 
        ) { } 
}

