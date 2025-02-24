  import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
  import { AuthProvider } from "../modules/auth/context/AuthContext";
  import Login from "../modules/auth/views/Login";
  import PrivateRoutes from "../modules/auth/context/privateRoutes";
  import PeopleList from "../modules/people/views/PeopleList";
  import Form from "../modules/auth/components/Form";
  import PanelPerson from "../modules/people/views/panelPerson.jsx";
  import ErrorPage403 from "../modules/people/views/error403";


  const AppRouter = () => {
    return (
      <AuthProvider>
        <Router>
          <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/usersList" element={<PrivateRoutes role="admin"> <PeopleList /> </PrivateRoutes>}/>
            <Route path="/usersForm"element={<PrivateRoutes role="admin"><Form /></PrivateRoutes>}/>
            
            <Route path="/userPanel" element={ <PrivateRoutes role="usuario"><PanelPerson /></PrivateRoutes> }/>

            <Route path="/403" element={<ErrorPage403 />} />
            
          </Routes>  
        </Router>
      </AuthProvider>
    );
  };

  export default AppRouter;
