import { Route, Switch} from "react-router-dom/cjs/react-router-dom";
import "./App.css";
import Blog from "./pages/Blog";
import Home from "./pages/Home";
import PageNotFound from "./pages/PageNotFound";
import { ThemeProvider } from "styled-components";
import { BrowserRouter } from "react-router-dom/cjs/react-router-dom.min";
import { GlobalStyle } from '../src/styles/GlobalStyle'
import GoToTop from "./components/common/GoToTop";
import Footer from "./components/common/Footer";
import Header from "./components/common/Header";
import Top from "./components/Home/Top";




function App() {
  const theme = {
    colors: {
      heading: "rgb(24 24 29)",
      text: "rgb(24 24 29)",
      white: "#fff",
      black: " #212529",
      helper: "#8490ff",
      bg: "rgb(249 249 255)",
      footer_bg: "#0a1435",
      btn: "rgb(98 84 243)",
      border: "rgba(98, 84, 243, 0.5)",
      hr: "#ffffff",
      gradient:
        "linear-gradient(0deg, rgb(132 144 255) 0%, rgb(98 189 252) 100%)",
      shadow:
        "rgba(0, 0, 0, 0.02) 0px 1px 3px 0px,rgba(27, 31, 35, 0.15) 0px 0px 0px 1px;",
      shadowSupport: " rgba(0, 0, 0, 0.16) 0px 1px 4px",
    },
    media: { mobile: "768px", tab: "998px" },
  };

    
  return (
    <div className="container">
      
      <ThemeProvider theme={theme}>
        <GlobalStyle />
        <GoToTop />
        <BrowserRouter>
          {/* Page header  */}
            {/* <Top /> */}
          {/* Page header  */}
             <Header />
            <Switch>
              <Route path="/blog/:id" exact component={Blog} />   
              <Route path="/" component={Home} />
              <Route path="*" component={PageNotFound} />
            </Switch>
        </BrowserRouter>
        <Footer />
      </ThemeProvider>
      
    </div>
  );
}

export default App;
