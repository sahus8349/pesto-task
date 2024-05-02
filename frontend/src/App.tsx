import { useEffect, useState } from "react";
import { Outlet, useNavigation } from "react-router-dom";
import { useSelector } from "react-redux";
import Layout from "./components/Layout/Layout";
import Loader from "./components/Loader/Loader";
import Authenticate from "./Authenticate";

function PageWithLoadingPlaceholder() {
  const { state } = useNavigation();
  const [isLoading, setIsLoading] = useState(true);
  const User = useSelector((state: any) => state.user);

  useEffect(() => {
    if (User.id !== "" && User.id !== undefined) {
      setIsLoading(false);
    }

    setIsLoading(false);
  }, [User]);

  if (state === "loading" || isLoading) {
    return <Loader />;
  }

  return <Outlet />;
}

function App() {
  return (
    <Authenticate>
      <Layout>
        <PageWithLoadingPlaceholder />
      </Layout>
    </Authenticate>
  );
}

export default App;
