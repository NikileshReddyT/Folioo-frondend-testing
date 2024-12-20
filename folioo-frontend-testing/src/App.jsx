import React, { useEffect } from "react";
import {
  BrowserRouter,
  Routes,
  Route,
  useLocation,
  data,
} from "react-router-dom";
import axios from "axios";

const DynamicPage = () => {
  const [data, setData] = React.useState(null);
  // const { pathname } = useLocation();
  const pathname = window.location.hostname;
  const firstSegment = pathname.split(".")[0];




  // console.log(window.location);

  useEffect(() => {
    // console.log(firstSegment);
    // console.log(pathname);
    axios
      .get(`http://10.123.16.177:4000/user/${firstSegment}`)
      .then((res) => {
        console.log(res);
        setData(res.data);
      })
      .catch((e) => {
        console.error(e);
      });
  }, [firstSegment]);


  if (!data) {
    return <h1>No Data</h1>;
  }



  return (
    <>
      <h1>Path: {pathname}</h1>
      <h2>Name : {data.name}</h2>
      <h2>Description: {data.description}</h2>
    </>
  );
};

const App = () => {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<h1>Home</h1>} />
          <Route path='*' element={<DynamicPage />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
};

export default App;
