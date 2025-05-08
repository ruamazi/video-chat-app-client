import { Routes, Route, Navigate } from "react-router";
import Home from "./pages/Home";
import SignUp from "./pages/SignUp";
import Login from "./pages/Login";
import Notifications from "./pages/Notifications";
import Call from "./pages/Call";
import Chat from "./pages/Chat";
import Onboarding from "./pages/Onboarding";
import PageLoader from "./components/PageLoader";
import useAuthUser from "./hooks/useAuthUser";
import { Toaster } from "react-hot-toast";
import Layout from "./components/Layout";
import { useThemeStore } from "./store/useThemeStore";
import Friends from "./pages/Friends";

function App() {
 const { isLoading, authUser } = useAuthUser();

 const { theme } = useThemeStore();

 const authenticated = Boolean(authUser);
 const isOnBoarded = authUser?.isOnBoarded;

 if (isLoading) return <PageLoader />;

 return (
  <div className="min-h-screen" data-theme={theme}>
   <Routes>
    <Route
     path="/"
     element={
      authenticated && isOnBoarded ? (
       <Layout>
        <Home />
       </Layout>
      ) : (
       <Navigate to={!authenticated ? "/login" : "/onboarding"} />
      )
     }
    />
    <Route
     path="/signup"
     element={
      authenticated ? (
       <Navigate to={isOnBoarded ? "/" : "/onboarding"} />
      ) : (
       <SignUp />
      )
     }
    />
    <Route
     path="/login"
     element={
      authenticated ? (
       <Navigate to={isOnBoarded ? "/" : "/onboarding"} />
      ) : (
       <Login />
      )
     }
    />
    <Route
     path="/notifications"
     element={
      authenticated && isOnBoarded ? (
       <Layout showSidebar={true}>
        <Notifications />
       </Layout>
      ) : (
       <Navigate to={!authenticated ? "/login" : "/onboarding"} />
      )
     }
    />
    <Route
     path="/call/:id"
     element={
      authenticated && isOnBoarded ? (
       <Call />
      ) : (
       <Navigate to={!authenticated ? "/login" : "/onboarding"} />
      )
     }
    />
    <Route
     path="/chat/:id"
     element={
      authenticated && isOnBoarded ? (
       <Layout showSidebar={false}>
        <Chat />
       </Layout>
      ) : (
       <Navigate to={authenticated ? "/onboarding" : "/login"} />
      )
     }
    />
    <Route
     path="/friends"
     element={
      authenticated && isOnBoarded ? (
       <Layout showSidebar={true}>
        <Friends />
       </Layout>
      ) : (
       <Navigate to={!authenticated ? "/login" : "/onboarding"} />
      )
     }
    />
    <Route
     path="/profile"
     element={
      authenticated && isOnBoarded ? (
       <Layout showSidebar={true}>
        <Onboarding />
       </Layout>
      ) : (
       <Navigate to={!authenticated ? "/login" : "/onboarding"} />
      )
     }
    />
    <Route
     path="/onboarding"
     element={
      authenticated ? (
       isOnBoarded ? (
        <Navigate to="/" />
       ) : (
        <Onboarding />
       )
      ) : (
       <Navigate to="/login" />
      )
     }
    />
   </Routes>
   <Toaster />
  </div>
 );
}

export default App;
