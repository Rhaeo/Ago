import { ILink } from "./ILink";
import { INotification } from "./INotification";

export interface IState {
  passphrase: string;
  items: ILink[];
  notifications: INotification[];
  newDraft: string;
  aboveDrafts: { [id: string]: string },
  belowDrafts: { [id: string]: string },
  selectedItemId: string;
  isLoggedIn: boolean;
}
