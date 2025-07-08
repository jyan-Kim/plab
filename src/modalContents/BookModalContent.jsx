

const BookModalContent = () => {
  return(
    <div>
      <h2 className="text-xl font-bold text-blue-700 dark:text-cyan-200 mb-6 text-center">
        예약하기
      </h2>
      <p className="text-gray-700 dark:text-gray-300 text-center mb-4">
        예약 기능은 현재 개발 중입니다. 곧 업데이트될 예정이니 조금만 기다려주세요!
      </p>
      <div className="flex justify-center">
        <button
          className="py-2 px-4 bg-blue-500 dark:bg-cyan-600 text-white rounded-lg hover:bg-blue-600 dark:hover:bg-cyan-700 transition"
          disabled
        >
          예약하기 (준비 중)
        </button>
      </div>
    </div>
  )
}


export default BookModalContent;