import * as authApi from './modules/auth.api';
import * as menuApi from './modules/menu.api';
export default {
  ...authApi,
  ...menuApi,
};
