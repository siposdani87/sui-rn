import { Colors } from '../constants';
import useDarkTheme from './useDarkTheme';

export default function useActionColor(disabled: boolean) {
    const isDarkTheme = useDarkTheme();
    
    function getActionColor(_selected?: boolean) {
      if (disabled){
        return isDarkTheme ? Colors.contentDisabledDark : Colors.contentDisabledLight;
      }
      return isDarkTheme ? Colors.primaryBright : Colors.primary;
    }

    return getActionColor;
}
