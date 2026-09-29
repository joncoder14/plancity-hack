import type { Event } from "./Events";

export interface Category {
    id:string,
    name:string,
    description:string,
    events: Event [],
    createdAt:string,
    updatedAt:string,
}

export type CreateCategory = Pick<Category, "name" | "description">;

export type EditCategory = Pick<Category, "name" | "description">;

