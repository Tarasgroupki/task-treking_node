export class Task{
    constructor(public title: string,
                public description: string,
                public status: number,
                public sprint_assigned: string,
                public user_created: string,
               // public invoice_id: number,
                public deadline: string
    )
    { }
}
