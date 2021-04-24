export class SdkConfig {
  private static ApiUrl = 'http://bakery.infinityfreeapp.com';

  static get ApiPath() {
    return this.ApiUrl;
  }
  static set ApiPath(path: string) {
    this.ApiUrl = path;
  }
}
