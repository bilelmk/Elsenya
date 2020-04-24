import React, { useState } from "react";
import { Link } from "react-router-dom";

import RegisterMap from "../map/RegisterMap";

function Home() {
  const [count, setCount] = useState(0);

  return (
    <div>
      Home
      <div>
        <Link to="/information">information</Link>
        <br />
        <Link to="/information/article">article</Link>
      </div>
        <RegisterMap/>
    </div>
  );
}
export default Home;
