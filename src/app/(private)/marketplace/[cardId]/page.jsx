'use client';

import { useParams } from 'next/navigation';
import { useQuery } from '@tanstack/react-query';
import { useState } from 'react';
import Image from 'next/image';

import minus from '@/assets/icons/icon-minus.png';
import plus from '@/assets/icons/icon-plus.png';

import Button from '@/components/ui/Button';
import EditModal from '@/features/marketplace/components/EditModal';

export default function DetailPage() {
  const { cardId } = useParams();

  const [isOpen, setIsOpen] = useState(false);

  const getCard = async (cardId) => {
    const token =
      localStorage.getItem('accessToken') || localStorage.getItem('token');

    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/market/cards/${cardId}`,
      {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      }
    );

    if (!res.ok) {
      throw new Error('서버로부터 데이터를 가져오는데 실패하였습니다.');
    }

    const cards = await res.json();

    return cards.data;
  };

  const {
    data: card,
    isPending,
    error,
  } = useQuery({
    queryKey: ['detailcard', cardId],
    queryFn: () => getCard(cardId),
  });

  const [quantity, setQuantity] = useState(1);

  if (isPending) {
    return <div>로딩중입니다....</div>;
  }

  if (error) {
    return <div>{error.message}</div>;
  }

  if (!card) {
    return null;
  }

  let saleColor = 'text-white';

  if (card.photoCard.template.grade === 'COMMON') {
    saleColor = 'text-main';
  } else if (card.photoCard.template.grade === 'RARE') {
    saleColor = 'text-blue';
  } else if (card.photoCard.template.grade === 'SUPER_RARE') {
    saleColor = 'text-purple';
  } else {
    saleColor = 'text-red';
  }

  let tradeColor = 'text-white';

  if (card.exchangeGrade === 'COMMON') {
    tradeColor = 'text-main';
  } else if (card.exchangeGrade === 'RARE') {
    tradeColor = 'text-blue';
  } else if (card.exchangeGrade === 'SUPER_RARE') {
    tradeColor = 'text-purple';
  } else {
    tradeColor = 'text-red';
  }

  const minusQuantity = (prev) => Math.max(1, prev - 1);
  const plusQunatity = (prev) => Math.min(card.quantity, prev + 1);

  async function handlePurchase(cardId) {
    const token =
      localStorage.getItem('accessToken') || localStorage.getItem('token');

    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/market/cards/${cardId}/purchase`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          quantity,
          price: quantity * card.price,
        }),
      }
    );

    if (!res.ok) {
      const { message } = await res.json();
      alert(message);
    }

    alert('구매하기 성공하였습니다.');
  }

  async function handleCancel(cardId) {
    const token =
      localStorage.getItem('accessToken') || localStorage.getItem('token');

    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/market/cards/${cardId}`,
      {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      }
    );
    if (!res.ok) {
      const { message } = await res.json();
      throw new Error(message);
    }
  }

  return (
    <div className="px-4 md:px-10 xl:px-20 min-[1920px]:px-32">
      <span className="flex py-[60px] text-gray-300 font-brb text-[24px] font-normal tracking-[-.0.72px] ">
        마켓플레이스
      </span>
      <div className="flex flex-col gap-[20px] mb-[70px]">
        <p className="flex text-[40px] text-white font-bold">
          {card.photoCard.template.title}
        </p>
        <p className="border border-white"></p>
      </div>

      <div className="flex justify-between">
        <div>
          <Image
            src={card.photoCard.template.imageUrl}
            alt={card.photoCard.template.title}
            width={960}
            height={720}
            loading="eager"
            priority
          />
        </div>

        <div className="flex flex-col items-center gap-[80px]">
          <div className="w-[500px]">
            <div className="flex items-center justify-between">
              <div className="flex gap-[10px]">
                <span
                  className={`flex items-center h-[29px] text-[24px] font-bold ${saleColor}`}
                >
                  {card.photoCard.template.grade}
                </span>
                <span className="flex items-center h-[29px] text-gray-400 text-[24px] font-bold">
                  |
                </span>
                <span className="flex items-center h-[29px] text-gray=300 text-[24px] font-bold">
                  {card.photoCard.template.genre}
                </span>
              </div>
              <span className="flex items-center h-[29px] text-white text-[18px] font-bold underline [text-decoration-skip-ink:none] [text-underline-position:from-font]">
                {card.photoCard.template.creator.nickname}
              </span>
            </div>
            <div className="border border-gray-400 my-[30px]"></div>
            <div className="text-white text-[16px] font-normal">
              {card.photoCard.template.description}
            </div>
            <div className="border border-gray-400 my-[30px]"></div>
            <div className="flex justify-between mb-[10px]">
              <span className="flex items-center text-gray-300 text-[18px] font-normal">
                가격
              </span>
              <span className="flex itmes-center text-white text-[20px] font-bold]">
                {card.price}P
              </span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-gray-300 text-[18px] font-normal">
                잔여
              </span>
              <div className="flex gap-[5px]">
                <span className="flex items-center text-white text-right text-[20px] font-bold]">
                  {card.remainQuantity}
                </span>
                <span className="flex items-center text-gray-300 text-right text-[20px] font-normal">
                  /{card.quantity}
                </span>
              </div>
            </div>
            <div className="border border-gray-400 my-[30px]"></div>
            <div className="flex items-center justify-between mb-[20px]">
              <span className="h-[22px] flex text-white text-[18px] font-normal justify-center items-center">
                구매수량
              </span>
              <div className="px-[12px] py-[10px] border border-gray-200 rounded-[2px]">
                <div className=" flex flex-row justify-between items-center w-[120px] h-[25px]">
                  <button
                    type="button"
                    className="cursor-pointer"
                    onClick={() => {
                      setQuantity(minusQuantity);
                    }}
                  >
                    <Image
                      src={minus}
                      alt="minus-icon"
                      className="flex w-[22px] h-[22px] justify-center items-center shrink-0"
                    />
                  </button>
                  <span className="flex h-[22px] items-center justify-center text-white text-center text-[18px] font-normal">
                    {quantity}
                  </span>
                  <button
                    type="button"
                    onClick={() => setQuantity(plusQunatity)}
                    className="cursor-pointer"
                  >
                    <Image
                      src={plus}
                      alt="plus-icon"
                      className="flex w-[22px] h-[22px] justify-center items-center shrink-0"
                    />
                  </button>
                </div>
              </div>
            </div>
            <div className="flex flex-row items-center justify-between">
              <span className="flex h-[22px] items-center justify-center text-white text-center text-[18px] font-normal">
                총 가격
              </span>
              <div className="flex flex-row items-center justify-between gap-[10px]">
                <span className="flex h-[24px] items-center justify-center text-white text-[20px] font-normal">
                  {quantity * card.price}P
                </span>
                <span className="flex items-center justify-center h-[22px] text-gray-300 text-right text-[18px] font-normal">
                  ({quantity})장
                </span>
              </div>
            </div>
          </div>
          {card.isSeller ? (
            <>
              <Button
                variant="primary"
                height="80"
                className="cursor-pointer"
                onClick={() => {
                  setIsOpen(true);
                }}
              >
                수정하기
              </Button>

              {isOpen && card && (
                <EditModal
                  minusQuantity={minusQuantity}
                  plusQunatity={plusQunatity}
                  currentUrl={card.photoCard.template.imageUrl}
                  card={card}
                  saleColor={saleColor}
                  minus={minus}
                  plus={plus}
                  cardId={cardId}
                  onClose={() => {
                    setIsOpen(false);
                  }}
                />
              )}

              <Button
                variant="secondary"
                height="80"
                className="cursor-pointer"
                onClick={() => handleCancel(cardId)}
              >
                취소하기
              </Button>
            </>
          ) : (
            <Button
              variant="primary"
              height="80"
              className="cursor-pointer"
              onClick={() => handlePurchase(cardId)}
            >
              포토카드 구매하기
            </Button>
          )}
        </div>
      </div>
      <div className="flex flex-col gap-[20px]">
        <div className="flex flex-row gap-[20px] itmes-center justify-between mt-[120px]">
          <span className="flex text-[40px] text-white font-bold">
            교환 희망 정보
          </span>
          <div style={{ width: '500px' }}>
            <Button variant="primary" height="60" className="cursor-pointer">
              포토카드 교환하기
            </Button>
          </div>
        </div>
        <p className="border border-white"></p>
      </div>

      {card.isSeller ? (
        <div className="flex flex-row">
          <div>교환 카드</div>
          <div>교환 카드</div>
          <div>교환 카드</div>
        </div>
      ) : (
        <div>
          <p className="mt-[60px] mb-[20px] text-[24px] text-white font-bold">
            {card.exchangeDescription}
          </p>
          <div className="flex w-[220px] gap-[15px] mb-[180px]">
            <span
              className={`flex items-center justify-center ${tradeColor} text-[24px] font-bold`}
            >
              {card.exchangeGrade}
            </span>
            <span className="fles items-center justify-center text-gray-400 text-[24px] font-bold">
              |
            </span>
            <span className="flex items-center justify-center text-[24px] font-bold text-gray-300">
              {card.exchangeGenre}
            </span>
          </div>
        </div>
      )}
    </div>
  );
}
