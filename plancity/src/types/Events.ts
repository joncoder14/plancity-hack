 import type { Category } from "./Categories";
 import type { EventImage } from "./Images";

 export interface Event {

    id: string;
    name: string;
    description: string | null;
    date: string;
    location: string;
    price: number;
    capacity: number;
    category: Category;
    categoryId: string;
    images: EventImage[];
    createdAt: Date;
    updatedAt: Date;
     
 }

export interface CreateEvent {
    name: string;
    description: string;
    date: string;
    location: string;
    price: number;
    capacity: number;
    categoryId: string;
    images: string[];
}

 export interface EditEvent {
    id: string;
    name: string;
    description: string | null;
    date: string;
    location: string;
    price: number;
    capacity: number;
    category: Category;
    categoryId: string;
    images: EventImage[];
 }