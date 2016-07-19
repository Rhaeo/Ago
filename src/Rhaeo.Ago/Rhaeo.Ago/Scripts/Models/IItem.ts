export interface IItem {
    id: string;
    cyphertext: string;
    salt: string;
    iV: string;
    isMarked: boolean;
}
