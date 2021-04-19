import { singleton } from '@/sdk/core';

@singleton
export class CoreService {
  public DrawerMode = true;

  // Alert
  public Alert = {
    Mode: false,
    Text: '',
    Color: 'success' as 'error' | 'success',
    Close: true
  };

  public showAlert(
    text: string,
    color: 'error' | 'success' = 'success',
    close = true
  ) {
    const { Alert } = new CoreService();
    Alert.Mode = true;
    Alert.Text = text;
    Alert.Color = color;
    Alert.Close = close;
  }
}
