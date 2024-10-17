declare module "react-server-dom-webpack/client" {
  type Options<T> = {
    callServer?: CallServerCallback<T>;
    temporaryReferences?: TemporaryReferenceSet;
  };

  export function createFromFetch<T>(
    promiseForResponse: Promise<Response>,
    options?: Options<T>
  ): Promise<T>;
}
