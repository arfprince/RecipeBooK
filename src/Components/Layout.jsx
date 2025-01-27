import { Outlet } from 'react-router-dom'
import Header from './Header'
import Footer from './Footer'
import { useAuth } from '../Authentication/AuthContext';

function Layout() {
  const { isLoggedIn,setIsLoggedIn } = useAuth();
  return (
    <div className="flex flex-col min-h-screen">
      <Header isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn}/>
      <main className="flex-1 px-4 sm:px-6 lg:px-8 py-6">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}


export default Layout