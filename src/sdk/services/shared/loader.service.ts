import { singleton } from '@/sdk/core';

@singleton
export class LoaderService {
  // Linear Loader
  public LinearLoader = false;
  public LinearLoaderMessage = '';
  public showLinearLoader(msg?: string) {
    this.LinearLoaderMessage = msg ?? '';
    this.LinearLoader = true;
  }
  public hideLinearLoader() {
    this.LinearLoader = false;
  }

  // Full Screen Loader
  private FullScreenLoaderCount = 0;
  public FullScreenLoaderMessage = '';
  public FullScreenLoaderFullWidth = false;
  public FullScreenLoader = false;
  public showFullScreenLoader(msg?: string, state = true, fullWidth = false) {
    if (state) {
      this.FullScreenLoaderMessage = msg ?? '';
      this.FullScreenLoader = true;
      this.FullScreenLoaderCount++;
      this.FullScreenLoaderFullWidth = fullWidth;
    }
  }
  public hideFullScreenLoader(state = true) {
    if (state) {
      this.FullScreenLoaderCount--;
      if (this.FullScreenLoaderCount === 0) {
        this.FullScreenLoader = false;
      }
    }
  }
}
