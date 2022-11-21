import initPCLCore from '../libs/patchwork/build/patchworkpp';

export interface InitOptions {
  arrayBuffer?: ArrayBuffer;
  url?: string;
  /**
   * Override the default settings object used when fetching the Wasm module from the network.
   *
   * @default { credentials: 'same-origin' }
   */
  fetchOptions?: RequestInit;
  onsuccess?: () => void;
  onerror?: (error: unknown) => void;
}

async function init(options?: InitOptions) {
  const {
    arrayBuffer,
    url,
    fetchOptions: fetchSettings = { credentials: 'same-origin' },
  } = options ?? {};

  const moduleOptions = {
    wasmBinary: arrayBuffer,
    locateFile: (path: string, scriptDirectory: string) => url || scriptDirectory + path,
    fetchSettings,
  };

  return initPCLCore(moduleOptions);
}

interface PatchworkParams {
  verbose: boolean;
  enable_RNR: boolean;
  enable_RVPF: boolean;
  enable_TGR: boolean;
}

export class PatchWork {
  private _patchwork: any;

  constructor(initOptions?: InitOptions, params?: PatchworkParams) {
    return (async (): Promise<PatchWork> => {
      const core = await init(initOptions);
      this._patchwork = new core.PatchWorkpp(params);
      return this;
    })() as unknown as PatchWork;
  }

  public estimateGround() {
    return this._patchwork.estimateGround();
  }
  public getHeight() {}
  public getTimeTaken() {}
  public getGround() {}
  public getNonground() {}
  public getCenters() {}
  public getNormals() {}
}
