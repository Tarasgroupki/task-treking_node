export class Lead {
    constructor(public title: string,
                public description: string,
                public status: number,
                public user_assigned: string,
                public client: string,
                public user_created: string,
                public contact_date: string
    ) { }
}
