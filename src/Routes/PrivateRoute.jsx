import { Navigate, Outlet } from "react-router-dom"

const PrivateRoute = () => {
  const token = localStorage.getItem('token');

  return (
    <>
      {!token ?
        <Navigate to={'/login'} />
        :
        <Outlet />
      }
    </>
  )
}

export default PrivateRoute