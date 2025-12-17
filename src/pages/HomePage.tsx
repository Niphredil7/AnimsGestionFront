import { useNavigate } from "react-router-dom";
import Footer from "../features/components/FooterSection";
import { userStore } from "../features/store/user.store";
import AboutSection from "./homePage/AboutSection";
import ActivitySection from "./homePage/ActivitySection";
import FunctionSection from "./homePage/FunctionSection";
import Header from "./homePage/Header";
import SignUpSection from "./homePage/SignupSection";
import { useEffect } from "react";







function HomePage() {
  const { access_token} = userStore()
  const navigate = useNavigate()
  useEffect(
  ()=> {if(access_token) navigate("/dashboard")}, [navigate, access_token]
)
  return (
          <div>

            <Header/>
            <AboutSection/>
            <FunctionSection/>
            <ActivitySection/>
            <SignUpSection/>
            <Footer/>
          </div>
    

  );
}

export default HomePage;
