interface IDeferred<T> {
  resolve: (payload: T) => void;
  reject: (reason: any) => void;
  promise: Promise<T>;
}
