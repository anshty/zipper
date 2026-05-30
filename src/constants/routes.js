import SplashScreen from '@screens/common/SplashScreen';
import HomeScreen from '@screens/customer/HomeScreen';

export const routes = [
  // ---------- common----------
  {
    name: 'SplashScreen',
    animation: 'slide_from_right',
    component: SplashScreen,
    protected: false,
  },
// -----------CUSTOMER ----------
 {
    name: 'HomeScreen',
    animation: 'slide_from_right',
    component: HomeScreen,
    protected: false,
  },
];
