export const enum ActionTypes {
  //
  SetPassphrase,
  CreateNewTask,
  // Notifications:
  PushErrorNotification,
  PushTraceNotification,
  PushDebugNotification,
  // Items:
  ChangeComposerText,
  ReplaceItems,
  SwapItemsByIds,
  RemoveItemById,
  MarkItemById,
  ElectPivotItem,
  MoveAbove,
  MoveBelow,
  UpdateItemById,
  // Drafts:
  UpdateBelowDraft,
  UpdateAboveDraft,
  UpdateNewDraft,
  CommitAboveDraft,
  CommitBelowDraft,
  CommitNewDraft,
  Login,
  Logout
}
