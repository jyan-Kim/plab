import HomeLeft from "../components/home/HomeLeft"
import HomeRight from "../components/home/HomeRight"




const Home = () => {
  return (
    <div className="flex">
      <div className="w-2/3 p-4">
        {/* 왼쪽 컨텐츠 컨테이너 */}
        <HomeLeft />
      </div>
      <div className="w-1/3 p-4">
        {/* 오른쪽 로그인 컨테이너 */}
        <HomeRight />
      </div>
    </div>
  )
}

export default Home