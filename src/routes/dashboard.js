import Experiments from '../views/experiments/Experiments';
import UserProfile from '../views/userprofile/UserProfile';

const dashboardRoutes = [
  {
    path: "/dashboard/experiments",
    name: "Experiments",
    icon: require('../assets/images/ion-android-apps-ionicons.png'),
    component: Experiments
  },
  {
    path: "/dashboard/user",
    name: "User Profile",
    icon: "",
    component: UserProfile
  },
  { 
    redirect: true,
    path: "/dashboard",
    to: "/dashboard/experiments",
    name: "Experiments"
  }
];

export default dashboardRoutes;
