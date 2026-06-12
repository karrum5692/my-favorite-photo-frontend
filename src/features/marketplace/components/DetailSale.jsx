'use client';

import React, { useState } from 'react';
import closeIcon from '@/assets/icons/icon-close.png';
import Image from 'next/image';
import Button from '@/components/ui/Button';

const EditModal = ({ card, onClose, saleColor, minus, plus }) => {
  const [quantity, setquantity] = useState(card.quantity);
  const [price, setPrice] = useState(card.price);
  const [grade, setGrade] = useState(card.grade);
  const [genre, setGenre] = useState(card.genre);
  const [description, setDescription] = useState('');

  async function handleSubmit(cardId) {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/market/mycard/${cardId}`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({}),
      }
    );

    if (!res.ok) {
      throw new Error('서버로부터 판매 등록을 실패하였습니다.');
    }
  }

  const handleClose = () => {
    onClose && onClose();
  };

  const minusQunatity = (prev) => Math.max(1, prev - 1);

  const plusQunatity = (prev) => Math.min(card.quantity, prev + 1);

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
            onClick={() => {
              handleClose;
            }}
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
              <form onSubmit={handleSubmit}>
                {/* 카드 정보 */}
                <div className="flex justify-between">
                  {/* 이미지 */}
                  <div>
                    <Image
                      src={card.photoCard.template.imageUrl}
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
                              onClick={() => setRemainQuantity(minusQunatity)}
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
                              value={remainQuantity}
                              onChange={(e) =>
                                setRemainQuantity(e.target.value)
                              }
                            />

                            <button
                              type="button"
                              className="cursor-pointer"
                              onClick={() => setRemainQuantity(plusQunatity)}
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
                    <div className="flex flex-row items-center justify-between w-full mt-[20px]">
                      <span className="flex itmes-center justify-center text-white text-[20px] font-normal">
                        장당 가격
                      </span>
                      <div>
                        <input
                          className="h-[50px] pr-[10px] text-right mr-[10px] border border-gray-200 rounded-[2px]"
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
                {/* 등급/장르 */}
                <div className="flex flex-row mb-[50px] w-full items-center gap-[40px]">
                  <div className="flex flex-col flex-1">
                    <span className="text-white text-[20px] font-bold mb-[10px]">
                      등급
                    </span>
                    <input
                      readOnly
                      className="border border-gray-200 rounded-[2px] h-[60px] w-full px-[20px] py-[18px]"
                      placeholder="등급을 선택해주세요"
                      value={grade}
                      onChange={(e) => setGrade(e.target.value)}
                    />
                  </div>
                  <div className="flex flex-col flex-1">
                    <span className="text-white text-[20px] font-bold mb-[10px]">
                      장르
                    </span>
                    <input
                      readOnly
                      className="border border-gray-200 rounded-[2px] h-[60px] w-full px-[20px] py-[18px]"
                      placeholder="장르를 선택해주세요"
                      value={genre}
                      onChange={(e) => setGenre(e.target.value)}
                    />
                  </div>
                </div>
                {/* 설명 */}
                <div className="flex flex-col">
                  <span className="text-white text-[20px] font-bold mb-[10px]">
                    교환 희망 설명
                  </span>
                  <input
                    className="w-full border border-gray-200 rounded-[2px] h-[90px] px-[20px] py-[18px]"
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
                    style={{ width: 440 }}
                    variant="secondary"
                    height="60"
                    className="cursor-pointer"
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
