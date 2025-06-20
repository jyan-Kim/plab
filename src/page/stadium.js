import { useState, useEffect } from 'react';
import Header from '../component/Header';
import Modal from '../component/Modal'; // 예약 모달 컴포넌트


//서버로부터 구장사진을 받아옴
//구장 정보 세부페이지
const StadiumPage = () => {
  const [stadiumImageUrl, setStadiumImageUrl] = useState(''); // 구장 사진 URL 상태
  const [stadiumInfo, setStadiumInfo] = useState({}); // 구장 정보 상태
  const [isModalOpen, setIsModalOpen] = useState(false); // 예약 모달 상태

  // 서버로부터 구장사진과 정보를 받아옴
  useEffect(() => {
    const fetchStadiumData = async () => {
      try {
        const response = await fetch('');// url 필요
        const data = await response.json();
        console.log(data); // 서버에서 받아온 데이터 확인
        setStadiumImageUrl(data.imageUrl); // 서버에서 url이름이 다르면 변경필요
        setStadiumInfo(data.info);  // 서버에서 정보이름이 다르면 변경필요
      } catch (error) {
        console.error('구장 정보 불러오기 실패:', error);
      }
    };
    fetchStadiumData();
  }, []);

const handleReservation = (e) => {
  e.preventDefault();
  // 예약 처리 로직 작성
  alert("예약이 완료되었습니다!");
  setIsModalOpen(false);
};

  return (
    <div>
      <Header />
      <div>
        {/*구장 사진*/}
        {stadiumImageUrl ? (
          <img src={stadiumImageUrl} alt="구장사진" className="w-full h-64 object-cover" />
        ) : (
          <div>등록된 구장사진이 없습니다</div>  
        )}
      </div>
      <div>
        <div>
          {/* 구장 정보 (왼쪽 배치) stadiuminfo.~ (서버에서 받아오는데이터에따라 변경필요)*/}
          <span>{stadiumInfo.size || '정보 없음'}</span>
          <span>{stadiumInfo.shower || '정보 없음'}</span>
          <span>{stadiumInfo.parking || '정보 없음'}</span>
          <span>{stadiumInfo.shoeRental || '정보 없음'}</span>
          <span>{stadiumInfo.drinkSale || '정보 없음'}</span>    
        </div>
        <div>
          {/*날짜,위치,예약 (오른쪽 배치)*/}
          <button onClick={() => setIsModalOpen(true)}>예약 하기</button>
      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
        <h2 className="text-lg font-bold mb-4">예약하기</h2>
        <form onSubmit={handleReservation}>
          <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">예약</button>
        </form>
      </Modal>
        </div>
      </div>
    </div>
    );
};

export default StadiumPage;