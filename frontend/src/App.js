import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Private } from "./routers";
import { Public } from "./routers";
import { Provider } from "react-redux";
import { customerStore } from "./redux/customerStore";
import { dashboardStore } from "./redux/dashboardStore";
function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          {Private.map((route) => {
            const Layout = route.layout;
            const Page = route.element;
            return (
              <Route
                exact
                path={route.path}
                element={
                  <Provider store={dashboardStore}>
                    <Layout>
                      <Page />
                    </Layout>
                  </Provider>
                }
              />
            );
          })}
          {Public.map((route) => {
            const Layout = route.layout;
            const Page = route.element;
            return (
              <Route
                key={route.element}
                exact
                path={route.path}
                element={
                  <Provider store={customerStore}>
                    <Layout>
                      <Page />
                    </Layout>
                  </Provider>
                }
              />
            );
          })}
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
