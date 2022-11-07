import { AuditModel } from 'src/app/components/misc/AuditParams.Model';

// Definition of our model class
export class ShareholderModel {
constructor(


        public shareholderId: number,
                public shCode: string,
                public shName: string,
                public shEmail: string,
                public shMobile1: string,
                public shMobile2: string,
                public shMobile3: string,
                public address: string,
                public street1: string,
                public street2: string,
                public city: string,
                public state: string,
                public area: string,
        public entryMode: string,
        public active: boolean,
        public readOnly: boolean,
        public auditColumns: any,
) { }
}

