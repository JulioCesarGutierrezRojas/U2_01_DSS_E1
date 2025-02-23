import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { AuthProvider } from "../modules/auth/context/AuthContext";
import Login from "../modules/auth/views/Login"
import PrivateRoutes from "../modules/auth/context/privateRoutes";
import PeopleList from "../modules/people/views/PeopleList";
import Form from "../modules/auth/components/Form";

const AppRouter = () =>{
    return(
        <AuthProvider>
            <Router>
                <Routes>
                    <Route path="/" element={<Login/>}/>
                    <Route path="/usersList" element={<PrivateRoutes><PeopleList /></PrivateRoutes>} />
                    <Route path="/usersForm" element={<PrivateRoutes><Form /></PrivateRoutes>} />
                </Routes>
            </Router>
        </AuthProvider>
    );
};

export default AppRouter;