export interface Entity {
    id?: number;
    deletedAt?: string;
    createdAt?: string;
    updatedAt?: string;
}

export interface PaginationInterface {
    take?:number;
    skip?:number;
}
