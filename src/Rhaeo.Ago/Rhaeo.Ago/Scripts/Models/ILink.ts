import { IItem } from "./IItem";

export interface ILink {
    item: IItem;
    nextId: string;
    prevId: string;
}
