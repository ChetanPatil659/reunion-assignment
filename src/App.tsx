import { useEffect } from "react";
import "./App.css";
import { BrowserRouter } from "react-router";
import SignedInRoutes from "./navigation/SignedInRoutes";
import SignedOutRoutes from "./navigation/SignedOutRoutes";
import { useDispatch, useSelector } from "react-redux";
import { getUser } from "./store/userSlice";
import { getTodo } from "./store/todoSlice";
import { ThunkDispatch } from 'redux-thunk';
import { AnyAction } from 'redux';

function App() {
  const {user} = useSelector((state: any) => state.user);
  const {loading} = useSelector((state: any) => state.user);
  const dispatch: ThunkDispatch<any, unknown, AnyAction> = useDispatch();
  
  useEffect(() => {
    
    if(localStorage.getItem('refreshToken') && localStorage.getItem('refreshToken') !== '' && !user?.email) {
      dispatch(getUser())
      dispatch(getTodo())
    }
  }, [user])

  if(loading){
    return (
      <h1 className="flex items-center justify-center h-screen">Loading...</h1>
    )
  }

  return (
      <BrowserRouter>
        {user?.email ? <SignedInRoutes /> : <SignedOutRoutes />}
      </BrowserRouter>
  );
}

export default App;
