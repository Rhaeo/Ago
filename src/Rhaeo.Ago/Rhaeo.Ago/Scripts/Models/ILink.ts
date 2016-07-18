import { IItem } from "./IItem";

export interface ILink {
    Item: IItem;
    NextId: string;
    PrevId: string;
}
