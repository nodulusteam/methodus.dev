export class BodyRequest {
    public page_size:
        {
            page_name: string,
            page_next: string
        };
    public page_number: number;
}


export interface IBodyRequest {
    page_size:
    {
        page_name: string,
        page_next: string
    };
    page_number: number;
}
