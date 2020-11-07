export declare class DB {
    static getPosts(filter?: any, pageNumber?: number, pageSize?: number): {
        userId: number;
        id: number;
        title: string;
        body: string;
    }[];
}
