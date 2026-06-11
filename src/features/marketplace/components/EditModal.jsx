'use client';

import React, { useState } from 'react';
import { useQueryClient } from '@tanstack/react-query';
import closeIcon from '@/assets/icons/icon-close.png';
import Image from 'next/image';
import Button from '@/components/ui/Button';
import filterIcon from '@/assets/icons/icon-down.png';

const EditModal = ({
  currentUrl,
  card,
  cardId,
  onClose,
  saleColor,
  minus,
  plus,
}) => {
  const [quantity, setQuantity] = useState(card.quantity);
  const [price, setPrice] = useState(card.price);
  const [grade, setGrade] = useState(card.grade);
  const [genre, setGenre] = useState(card.genre);
  const [description, setDescription] = useState('');
  const [toggleGr, setToggleGr] = useState(false);
  const [toggleGe, setToggleGe] = useState(false);

  const queryClient = useQueryClient();

  async function handleSubmit(e) {
    e.preventDefault();
    try {
      const token =
        localStorage.getItem('accessToken') || localStorage.getItem('token');

      const res = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/market/cards/${cardId}`,
        {
          method: 'PATCH',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token} `,
          },
          body: JSON.stringify({
            quantity: Number(quantity),
            price: Number(price),
            exchangeGrade: grade,
            exchangeGenre: genre,
            exchangeDescription: description,
          }),
        }
      );

      if (!res.ok) {
        const { message } = await res.json();
        throw new Error(message);
      }

      alert('수정하기를 완료하였습니다.');
      handleClose();
      queryClient.invalidateQueries({ queryKey: ['detailcard', cardId] });
    } catch (error) {
      alert(error.message);
    }
  }

  const handleClose = () => {
    onClose && onClose();
  };

  const handleToggleGr = () => {
    setToggleGr(!toggleGr);
  };

  const grades = ['COMMON', 'RARE', 'SUPER_RARE', 'LEGENDARY'];

  const dropdownGr = () => {
    if (toggleGr === true)
      return (
        <div className="flex flex-col w-full bg-gray-500 absolute z-50 border border-gray-200 rounded-[2px]">
          {grades.map((gr) => (
            <button
              key={gr}
              type="button"
              className="text-gray-200 border-b border-gray-200 text-left cursor-pointer h-[60px] w-full px-[20px] py-[18px]"
              onClick={() => {
                setGrade(gr);
                setToggleGr(false);
              }}
            >
              {gr}
            </button>
          ))}
        </div>
      );
  };

  const handleToggleGe = () => {
    setToggleGe(!toggleGe);
  };

  const genres = [
    'ALBUM',
    'SPECIAL',
    'FAN_SIGN',
    'SEASON_GREETING',
    'FAN_MEETING',
    'CONCERT',
    'MD',
    'COLLABORATION',
    'FAN_CLUB',
    'OTHER',
  ];

  const dropdownGe = () => {
    if (toggleGe === true) {
      return (
        <div className="flex flex-col w-full bg-gray-500 absolute z-50 border border-gray-200 rounded-[2px]">
          {genres.map((g) => (
            <button
              key={g}
              type="button"
              className="text-gray-200 border-b border-gray-200 text-left cursor-pointer h-[60px] w-full px-[20px] py-[18px]"
              onClick={() => {
                setGenre(g);
                setToggleGe(false);
              }}
            >
              {g}
            </button>
          ))}
        </div>
      );
    }
  };

  //검증해야 할 것들: 작성하지 않은 것들은 어떻게 할 것인가??

  return (
    <div
      onClick={() => {
        handleClose;
      }}
      className="fixed inset-0 z-50 bg-black/70 overflow-y-auto"
    >
      <div className="py-[30px] md:py-[40px]">
        <div
          onClick={(e) => e.stopPropagation()}
          className="
            mx-auto
            w-[375px]
            md:w-[744px]
            xl:w-[1160px]
            h-[812px]
            md:h-[1093px]
            xl:h-[1000px]
            bg-[#161616]
            rounded-[2px]
            flex
            flex-col
            overflow-hidden
            relative
            font-[var(--font-sans)]
          "
        >
          {/* CLOSE */}
          <button
            onClick={handleClose}
            className="
              absolute
              top-4
              right-4
              z-50
              w-9
              h-9
              cursor-pointer
            "
          >
            <Image
              src={closeIcon}
              alt="닫기"
              width={36}
              height={36}
              className="w-full h-full"
            />
          </button>

          {/* SCROLL */}
          <div
            className="
              flex-1
              overflow-y-auto
              [&::-webkit-scrollbar]:w-[8px]
              [&::-webkit-scrollbar-thumb]:bg-[#5A5A5A]
              [&::-webkit-scrollbar-thumb]:rounded-[2px]
            "
          >
            <div className="mx-auto w-[345px] md:w-[704px] xl:w-[920px] py-8">
              {/* TOP TEXT */}
              <div
                style={{ fontFamily: 'var(--font-display)' }}
                className="
                  text-gray-300
                  text-[14px]
                  md:text-[16px]
                  xl:text-[24px]
                  mb-5
                  mt-5
                "
              >
                수정하기
              </div>

              {/* MAIN TITLE */}
              <h2
                className="
                  text-white
                  text-[26px]
                  md:text-[40px]
                  xl:text-[46px]
                  font-bold
                  border-b
                  border-white
                  pb-5
                  mb-6
                "
              >
                {card.photoCard.template.title}
              </h2>
              <form
                onSubmit={
                  handleSubmit
                  //   onClose;
                }
              >
                {/* 카드 정보 */}
                <div className="flex justify-between">
                  {/* 이미지 */}
                  <div>
                    <Image
                      src={currentUrl}
                      alt={card.photoCard.template.title}
                      width={440}
                      height={330}
                      loading="eager"
                      priority
                    />
                  </div>

                  {/* 설명 */}
                  <div className="flex flex-col items-center">
                    <div className="w-[440px]">
                      <div className="flex items-center justify-between">
                        <div className="flex gap-[10px]">
                          <span
                            className={`flex items-center h-[29px] text-[22px] font-bold ${saleColor}`}
                          >
                            {card.photoCard.template.grade}
                          </span>
                          <span className="flex items-center h-[29px] text-gray-400 text-[22px] font-bold">
                            |
                          </span>
                          <span className="flex items-center h-[29px] text-gray=300 text-[22px] font-bold">
                            {card.photoCard.template.genre}
                          </span>
                        </div>
                        <span className="flex items-center h-[29px] text-white text-[18px] font-bold underline [text-decoration-skip-ink:none] [text-underline-position:from-font]">
                          {card.photoCard.template.creator.nickname}
                        </span>
                      </div>
                    </div>
                    <div className="my-[30px] w-full border border-gray-400"></div>
                    <div className="w-full flex items-center justify-between mb-[20px]">
                      <span className="h-[24px] flex text-white text-[20px] font-normal justify-center items-center">
                        총 판매 수량
                      </span>
                      <div className="flex items-center justify-center gap-[20px]">
                        <div className="px-[12px] py-[10px] border border-gray-200 rounded-[2px] ">
                          <div className=" flex flex-row justify-between items-center w-[120px] h-[25px]">
                            <button
                              type="button"
                              className="cursor-pointer"
                              onClick={() => setQuantity(minusQunatity)}
                            >
                              <Image
                                src={minus}
                                alt="minus-icon"
                                className="flex w-[24px] h-[24px] justify-center items-center shrink-0"
                              />
                            </button>

                            <input
                              readOnly
                              className="flex w-[15px] h-[24px] items-center justify-center text-white text-center text-[20px] font-normal"
                              value={quantity}
                            />

                            <button
                              type="button"
                              className="cursor-pointer"
                              onClick={() => setQuantity(plusQunatity)}
                            >
                              <Image
                                src={plus}
                                alt="plus-icon"
                                className="flex w-[24px] h-[24px] justify-center items-center shrink-0"
                              />
                            </button>
                          </div>
                        </div>
                        <div className="flex flex-col items-center justify-right h-[41px]">
                          <span className="text-[20px] font-bold text-white">
                            /{card.quantity}
                          </span>
                          <span className="text-[14px] font-light text-gray-200">
                            최대 {card.quantity}장
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* 장당가격 */}
                    <div className="flex flex-row items-center justify-between w-full mt-[20px]">
                      <span className="flex itmes-center justify-center text-white text-[20px] font-normal">
                        장당 가격
                      </span>
                      <div>
                        <input
                          className="focus:outline-none focus:border-main h-[50px] pr-[10px] text-right mr-[10px] border border-gray-200 rounded-[2px]"
                          type="text"
                          placeholder={card.price}
                          value={price}
                          onChange={(e) => setPrice(e.target.value)}
                        />
                        <span>P</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* 교환희망정보 */}
                <div className="flex flex-col gap-[20px]">
                  <div className="flex flex-row gap-[20px] itmes-center justify-between mt-[80px]">
                    <span className="flex text-[40px] text-white font-bold">
                      교환 희망 정보
                    </span>
                  </div>
                  <p className="border-b border-white mb-[50px]"></p>
                </div>

                {/* 등급&장르 */}
                <div className="flex flex-row mb-[50px] w-full items-center gap-[40px]">
                  {/* 등급 */}
                  <div className="flex flex-col flex-1">
                    <span className="text-white text-[20px] font-bold mb-[10px]">
                      등급
                    </span>
                    <div className="relative z-50">
                      <button
                        type="button"
                        className="text-gray-200 text-left cursor-pointer border border-gray-200 rounded-[2px] h-[60px] w-full px-[20px] py-[18px]"
                        onClick={() => {
                          setToggleGr(!toggleGr);
                        }}
                      >
                        {grade || '등급을 선택해 주세요'}
                      </button>

                      {/* //토글버튼 */}
                      {toggleGr && dropdownGr()}

                      <button
                        type="button"
                        className="absolute right-[20px] top-1/2 -translate-y-1/2 cursor-pointer"
                        onClick={handleToggleGr}
                      >
                        <Image src={filterIcon} alt="dropdown" />
                      </button>
                    </div>
                  </div>

                  {/* 장르 */}
                  <div className="flex flex-col flex-1">
                    <span className="text-white text-[20px] font-bold mb-[10px]">
                      장르
                    </span>
                    <div className="relative">
                      <button
                        type="button"
                        className="cursor-pointer text-left border border-gray-200 rounded-[2px] h-[60px] w-full px-[20px] py-[18px]"
                        onClick={() => {
                          setToggleGe(!toggleGe);
                        }}
                      >
                        {genre || '장르를 선택해 주세요'}
                      </button>
                      {toggleGe && dropdownGe()}
                      <button
                        type="button"
                        className="absolute right-[20px] top-1/2 -translate-y-1/2 cursor-pointer"
                        onClick={handleToggleGe}
                      >
                        <Image src={filterIcon} alt="dropdown" />
                      </button>
                    </div>
                  </div>
                </div>

                {/* 설명 */}
                <div className="flex flex-col">
                  <span className="text-white text-[20px] font-bold mb-[10px]">
                    교환 희망 설명
                  </span>
                  <input
                    className="w-full border border-gray-200 rounded-[2px] focus:outline-none focus:border-main h-[90px] px-[20px] py-[18px]"
                    type="text"
                    placeholder="설명을 입력해주세요"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                  />
                </div>
                <p className="flex mt-[60px] mb-[30px] border border-gray-400"></p>

                {/* 버튼 */}
                <div className="flex items-center justify-center gap-[40px]">
                  <Button
                    type="button"
                    style={{ width: 440 }}
                    variant="secondary"
                    height="60"
                    className="cursor-pointer"
                    onClick={handleClose}
                  >
                    취소하기
                  </Button>
                  <Button
                    type="submit"
                    style={{ width: 440 }}
                    variant="primary"
                    height="60"
                    className="cursor-pointer"
                  >
                    수정하기
                  </Button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditModal;
