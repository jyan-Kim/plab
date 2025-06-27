import { BrowserRouter, Route, Routes } from "react-router-dom"
import Home from "./pages/Home";


const Router = () => {
  return(
      <Routes>
        {/*라우트 추가 path는 내가정하는경로 element는 이동할 컴포넌트*/}
        <Route path="/" element={<Home />} />
      </Routes>
  )
}

export default Router