declare module "react-server-dom-webpack/server.edge" {
  type Options = {
    environmentName?: string;
    identifierPrefix?: string;
    signal?: AbortSignal;
    temporaryReferences?: TemporaryReferenceSet;
    onError?: ((error: unknown) => void) | undefined;
    onPostpone?: ((reason: string) => void) | undefined;
  };

  export function renderToReadableStream(
    model: ReactClientValue,
    webpackMap?: ClientManifest,
    options?: Options
  ): ReadableStream;
}
