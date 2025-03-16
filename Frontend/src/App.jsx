import {createBrowserRouter, RouterProvider } from 'react-router-dom'
import LandingPage from './Land/LandingPage'
import RegisterF from './RegisterF/RegisterF'
import RegisterHOD from './RegisterHOD/RegisterHOD'
import RegisterS from './RegisterSt/RegisterS'
import Aboutus from './Aboutus/Aboutus'
import LoginP from './LoginP/LoginP.jsx';
import LoginS from './LoginS/LoginS.jsx';
import LoginH from './LoginH/LoginH.jsx';
import LoginF from './LoginF/LoginF.jsx';
import ContactUs from './ContactUs/ContactUs.jsx';
import Route from './Route/Route.jsx'
import Routel from './Route/Routel.jsx'
import Start from './Start/Start.jsx'
import Starth from './Start/Starth.jsx'
import AttendanceFilter from './AttendanceFilter/AttendanceFilter.jsx'
import AttendanceFilterh from './AttendanceFilter/AttendanceFilterh.jsx'
import FacultyDashboard from './FacultyDashboard/FacultyDashboard.jsx'
import Home from './Home/Home.jsx'
import Studentfilter from './Studentfilter/Studentfilter.jsx'
import Homes from './Home/Homes.jsx'
import FacultyRecords from './FacultyRecords/FacultyRecords.jsx'
import Homeh from './Home/Homeh.jsx'
import FacultyDashboardh from './FacultyDashboard/FacultyDashboardh.jsx'


function App() {
 const router=createBrowserRouter([
  {
    path:'/',
    element:<LandingPage/>,
  },
  {
    path:'/home',
    element:<Home/>,
  },
  {
    path:'/homes',
    element:<Homes/>,
  }
  ,
  {
    path:'/homeh',
    element:<Homeh/>,
  }
  ,
  {
    path: '/reghod',
    element: <RegisterHOD />,
  },
  {
    path: '/regst',
    element: <RegisterS />,
  },
  {
    path: '/regf',
    element: <RegisterF />,
  },
  {
    path: '/about',
    element: <Aboutus />,
  },
  {
    path:'/loginp',
    element: <LoginP/>
  },
  {
    path:'/contactus',
    element: <ContactUs/>
  },
  
  {
    path:'/logins',
    element: <LoginS/>
  },
  {
    path:'/loginh',
    element: <LoginH/>
  },
  {
    path:'/loginf',
    element: <LoginF/>
  },
  {
    path:'/login',
    element: <Routel/>
  },
  {
    path:'/signup',
    element: <Route/>
  },
  {
    path:'/start',
    element: <Start/>
  },
  {
    path:'/starth',
    element: <Starth/>
  },
  {
    path:'/s',
    element: <AttendanceFilterh/>
  },
  {
    path:'/sf',
    element: <AttendanceFilter/>
  },
  {
    path:'/dashboardf',
    element: <FacultyDashboard/>
  }
  ,
  {
    path:'/dashboards',
    element: <Studentfilter/>
  }
  ,
  {
    path:'/dashboardh',
    element: <FacultyDashboardh/>
  }
  ,
  {
    path:'/hodf',
    element: <FacultyRecords/>
  }
 ])
  return (
  <>
  <RouterProvider router={router} />
  </>
  )
}

export default App