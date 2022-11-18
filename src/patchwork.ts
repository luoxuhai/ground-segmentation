interface PatchworkParams {
  verbose: boolean;
  enable_RNR: boolean;
  enable_RVPF: boolean;
  enable_TGR: boolean;
}

export class PatchWork {
  constructor(params?: PatchworkParams) {}

  public estimateGround() {}
  public getHeight() {}
  public getTimeTaken() {}
  public getGround() {}
  public getNonground() {}
  public getCenters() {}
  public getNormals() {}
}
