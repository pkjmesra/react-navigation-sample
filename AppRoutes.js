import AppLogin from './AppLogin';
import AppHome from './AppHome';
import AppSearch from './AppSearch';

const AppRoutes = {
  AppLogin: {
    navigationLevel: 0,
    name: 'Login Page',
    description: 'Login into the app',
    screen: AppLogin,
  },
  AppHome: {
    navigationLevel: 1,
    name: 'Home Page',
    description: 'Home Page',
    screen: AppHome,
  },
  AppSearch: {
    navigationLevel: 2,
    name: 'Search Page',
    description: 'Search for items',
    screen: AppSearch,
  },
  DeepLink: {
    navigationLevel: 6,
    name: 'Link in Stack',
    description: 'Deep linking into a route in stack',
    screen: AppHome,
    path: 'Items/itemOrder',
  },
};

export default AppRoutes;
