import Navbar from "./components/header/Navbar";
import { Layout } from "antd";
import { Switch } from "react-router-dom";
import { AuthProvider } from "./contextApi/AuthContext";
import { ProductProvider } from "./contextApi/ProductContext";
import { CategoryProvider } from "./contextApi/CategoryContext";
import MainRouter from "./components/main/MainRouter";

const { Header, Footer } = Layout;

function App() {
  return (
    <div className="App">
      <AuthProvider>
        <CategoryProvider>
          <ProductProvider>
            <Header style={{ padding: 0 }}>
              <Navbar />
            </Header>
            <Switch>
              <MainRouter />
            </Switch>
            <Footer style={{ textAlign: "center" }}>
              Ant Design ©2018 Created by Ant UED
            </Footer>
          </ProductProvider>
        </CategoryProvider>
      </AuthProvider>
    </div>
  );
}

export default App;
