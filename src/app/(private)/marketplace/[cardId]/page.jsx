'use client';

import { useParams } from 'next/navigation';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { useState } from 'react';
import Image from 'next/image';

import minus from '@/assets/icons/icon-minus.png';
import plus from '@/assets/icons/icon-plus.png';
import back from '@/assets/icons/icon-back.png';

import Button from '@/components/ui/Button';
import EditModal from '@/features/marketplace/components/EditModal';
import { useRouter } from 'next/navigation';
import TradeModal from '@/features/photocard/components/TradeModal';
import ResultModal from '@/components/ui/ResultModal';
import ExchangeGrid from '@/features/marketplace/components/ExchangeGrid';
import AlertModal from '@/components/ui/AlertModal';

export default function DetailPage() {
  const { cardId } = useParams();
  const router = useRouter();

  const queryClinet = useQueryClient();

  const [isLoading, setIsLoading] = useState(false);
  const [isOpenEdit, setIsOpenEdit] = useState(false);
  const [isOpenExchange, setIsOpenExchange] = useState(false);
  const [isOpenAlert, setIsOpenAlert] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

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

  //판매자 상세페이지 - 타인의 교환 신청 정보 가져오기
  async function getProposals(cardId) {
    try {
      const token =
        localStorage.getItem('accessToken') || localStorage.getItem('token');

      const res = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/market/listings/${cardId}/proposals`,
        {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (!res.ok) {
        const errorData = await res.json().catch(() => ({}));
        throw new Error(errorData.message || '서버 응답 오류');
      }
      const data = await res.json();

      return data.data;
    } catch (error) {
      throw new Error(error.message);
    }
  }

  const { data: proposalCards } = useQuery({
    queryKey: ['proposedCards', cardId],
    queryFn: () => getProposals(cardId),
    enabled: !!card?.isSeller,
  });

  //구매자 상세페이지 - 나의 교환 신청 정보 가져오기
  async function getMyProposals() {
    try {
      const token =
        localStorage.getItem('accessToken') || localStorage.getItem('token');

      const res = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/market/proposals/sent`,
        {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (!res.ok) {
        const errorData = await res.json().catch(() => ({}));
        throw new Error(errorData.message || '서버 응답 오류');
      }

      const data = await res.json();
      return data.data;
    } catch (error) {
      throw new Error(error.message);
    }
  }

  const { data: myProposalCards } = useQuery({
    queryKey: ['myProposalCards'],
    queryFn: () => getMyProposals(),
    enabled: !card?.isSeller,
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

  const plusQuantity = (prev) => Math.min(card?.quantity, prev + 1);

  async function handlePurchase(cardId) {
    setIsLoading(true);
    try {
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
        return;
      }

      queryClinet.invalidateQueries({ queryKey: ['user'] });

      setIsSuccess(true);
    } catch (error) {
      alert(error.message);
      setIsSuccess(false);
    } finally {
      setIsSubmitted(true);
      setIsLoading(false);
    }
  }

  if (isSubmitted) {
    return (
      <ResultModal
        isOpen={true}
        onClose={() => {
          setIsSubmitted(false);
          router.push('/marketplace');
        }}
        title="구매"
        result={isSuccess ? 'success' : 'failure'}
        description={
          isSuccess
            ? `[${card.photoCard.template.grade}|${card.photoCard.template.title}]${quantity}장 구매에 성공했습니다!`
            : `[${card.photoCard.template.grade}|${card.photoCard.template.title}]${quantity}장 구매에 실패했습니다!`
        }
        buttonText={
          isSuccess ? '마이갤러리에서 확인하기' : '마켓플레이스로 돌아가기'
        }
        onButtonClick={() => {
          if (isSuccess) {
            setIsSubmitted(false);
            router.push('/gallery');
          } else {
            setIsSubmitted(false);
            router.push('/marketplace');
          }
        }}
      />
    );
  }

  async function handleCancel(cardId) {
    setIsLoading(true);
    try {
      const token =
        localStorage.getItem('accessToken') || localStorage.getItem('token');

      const res = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/market/cards/cancel/${cardId}`,
        {
          method: 'PATCH',
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
      alert('판매글이 취소되었습니다.');
      router.push('/marketplace');
    } catch (error) {
      alert(error.message);
    } finally {
      setIsLoading(false);
    }
  }

  //교환 수락
  async function handleAcceptProposal(proposalId) {
    try {
      const token =
        localStorage.getItem('accessToken') || localStorage.getItem('token');

      const res = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/market/proposals/${proposalId}/accept`,
        {
          method: 'PATCH',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (!res.ok) {
        const errorData = await res.json().catch(() => ({}));
        throw new Error(errorData.mesage || '서버 응답 오류');
      }

      alert('교환 신청이 완료되었습니다.');
    } catch (error) {
      throw new Error(error.message);
    }
  }

  //교환 거절
  async function handleRejectProposal(proposalId) {
    try {
      const token =
        localStorage.getItem('accessToken') || localStorage.getItem('token');

      const res = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/market/proposals/${proposalId}/reject`,
        {
          method: 'PATCH',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (!res.ok) {
        const errorData = await res.json().catch(() => ({}));
        throw new Error(errorData.mesage || '서버 응답 오류');
      }

      alert('교환 신청을 거절하였습니다.');
    } catch (error) {
      throw new Error(error.message);
    }
  }

  //교환 취소

  return (
    <div className="px-4 md:px-5 xl:px-56 max-w-[1920px] w-full mx-auto">
      <div className="flex flex-row">
        <button
          className="hidden md:block cursor-pointer"
          onClick={() => {
            router.push('/marketplace');
          }}
        >
          <Image src={back} alt="뒤로가기" />
        </button>
        <span className="hidden md:block flex text-gray-300 font-brb font-normal tracking-[-.0.72px] md:text-base xl:text-2xl py-15">
          마켓플레이스
        </span>
      </div>

      <div className="flex flex-col gap-5 mb-[70px]">
        <p className="flex text-2xl md:text-3xl xl:text-4xl text-white font-bold">
          {card.photoCard.template.title}
        </p>
        <p className="border border-white"></p>
      </div>

      {/* 이미지 */}
      <div className="gap-5 md:flex md:gap-5 xl:gap-20">
        <div className="relative w-full aspect-square md:aspect-[4/3]">
          <Image
            src={card.photoCard.template.imageUrl}
            alt={card.photoCard.template.title}
            fill
            loading="eager"
            priority
            className="object-contain object-top"
          />
        </div>

        {/* 카드 판매 정보 */}
        <div className="flex flex-col items-center w-full gap-20">
          <div className="w-full">
            <div className="flex items-center justify-between">
              <div className="flex gap-2.5">
                <span
                  className={`flex items-center text-lg xl:text-2xl font-bold ${saleColor}`}
                >
                  {card.photoCard.template.grade}
                </span>
                <span className="flex items-center text-gray-400 text-lg xl:text-2xl font-bold">
                  |
                </span>
                <span className="flex items-center text-gray-300 text-lg xl:text-2xl font-bold">
                  {card.photoCard.template.genre}
                </span>
              </div>
              <span className="flex items-center text-white text-lg xl:text-lg font-bold underline [text-decoration-skip-ink:none] [text-underline-position:from-font]">
                {card.photoCard.owner.nickname}
              </span>
            </div>
            <div className="border border-gray-400 my-8"></div>
            <div className="text-white text-base font-normal">
              {card.photoCard.template.description}
            </div>
            <div className="border border-gray-400 my-8"></div>
            <div className="flex justify-between mb-2.5">
              <span className="flex items-center text-gray-300 text-lg font-normal">
                가격
              </span>
              <span className="flex itmes-center text-white text-xl font-bold">
                {card.price}P
              </span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-gray-300 text-lg font-normal">잔여</span>
              <div className="flex gap-1.5">
                <span className="flex items-center text-white text-right text-xl font-bold">
                  {card.remainQuantity}
                </span>
                <span className="flex items-center text-gray-300 text-right text-xl font-normal">
                  /{card.quantity}
                </span>
              </div>
            </div>
            <div className="border border-gray-400 my-8"></div>
            <div className="flex items-center justify-between mb-5">
              <span className="h-[22px] flex text-white text-[18px] font-normal justify-center items-center">
                구매수량
              </span>
              <div className="px-3 py-2.5 border border-gray-200 rounded-[2px]">
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
                    onClick={() => setQuantity(plusQuantity)}
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
              <span className="flex h-[22px] items-center justify-center text-white text-center text-lg font-normal">
                총 가격
              </span>
              <div className="flex flex-row items-center justify-between gap-2.5">
                <span className="flex h-6 items-center justify-center text-white text-xl font-normal">
                  {quantity * card.price}P
                </span>
                <span className="flex items-center justify-center h-[22px] text-gray-300 text-right text-lg font-normal">
                  ({quantity})장
                </span>
              </div>
            </div>
          </div>
          {card?.isSeller ? (
            <>
              <Button
                variant="primary"
                height="80"
                className="cursor-pointer"
                onClick={() => {
                  setIsOpenEdit(true);
                }}
              >
                수정하기
              </Button>

              {isOpenEdit && card && (
                <EditModal
                  minusQuantity={minusQuantity}
                  plusQuantity={plusQuantity}
                  currentUrl={card.photoCard.template.imageUrl}
                  card={card}
                  saleColor={saleColor}
                  minus={minus}
                  plus={plus}
                  cardId={cardId}
                  onClose={() => {
                    setIsOpenEdit(false);
                  }}
                />
              )}

              <Button
                variant="secondary"
                height="80"
                className="cursor-pointer"
                onClick={() => setIsOpenAlert(true)}
              >
                판매 내리기
              </Button>
              {isOpenAlert && (
                <AlertModal
                  isLoading={isLoading}
                  isOpen={isOpenAlert}
                  onClose={() => setIsOpenAlert(false)}
                  title="포토카드 판매 내리기"
                  description="정말로 판매를 중단하시겠습니까?"
                  onButtonClick={() => handleCancel(cardId)}
                  buttonText="판매 내리기"
                />
              )}
            </>
          ) : (
            <>
              <Button
                variant="primary"
                height="80"
                className="cursor-pointer"
                onClick={() => setIsOpenAlert(true)}
              >
                포토카드 구매하기
              </Button>
              {isOpenAlert && (
                <AlertModal
                  isLoading={isLoading}
                  isOpen={isOpenAlert}
                  onClose={() => setIsOpenAlert(false)}
                  title="포토카드 구매"
                  description={`[${card.photoCard.template.grade} | ${card.photoCard.template.title}]\n${quantity}장을 구매하시겠습니까?`}
                  onButtonClick={() => handlePurchase(cardId)}
                  buttonText="구매하기"
                />
              )}
            </>
          )}
        </div>
      </div>

      {/* 교환 목록 */}
      {card?.isSeller ? (
        <div>
          <p className="flex text-2xl md:text-3xl xl:text-4xl text-white font-bold mt-32 mb-5">
            교환 제시 목록
          </p>
          <p className="border border-white mb-16"></p>
          {proposalCards?.length > 0 ? (
            <ExchangeGrid
              proposal={proposalCards}
              cardIsSeller={card?.isSeller}
              handleAcceptProposal={handleAcceptProposal}
              handleRejectProposal={handleRejectProposal}
            />
          ) : (
            <p className="mb-16">교환 제시된 목록이 없습니다.</p>
          )}
        </div>
      ) : (
        <div>
          <div className="flex flex-col gap-5">
            <div className="flex flex-row gap-5 itmes-center justify-between mt-32">
              <span className="flex text-2xl md:text-3xl xl:text-4xl text-white font-bold">
                교환 희망 정보
              </span>
              <div style={{ width: '400px' }}>
                <Button
                  variant="primary"
                  height="60"
                  className="cursor-pointer"
                  onClick={() => setIsOpenExchange(true)}
                >
                  포토카드 교환하기
                </Button>
                {
                  <TradeModal
                    isOpen={isOpenExchange}
                    onClose={() => setIsOpenExchange(false)}
                    targetListingId={cardId}
                  />
                }
              </div>
            </div>
            <p className="border border-white"></p>
          </div>
          <div>
            <p className="mt-14 mb-5 text-2xl text-white font-bold">
              {card.exchangeDescription}
            </p>
            <div className="flex gap-4 mb-[180px]">
              <span
                className={`flex items-center justify-center ${tradeColor} text-2xl font-bold`}
              >
                {card.exchangeGrade}
              </span>
              <span className="flex items-center justify-center text-gray-400 text-2xl font-bold">
                |
              </span>
              <span className="flex items-center justify-center text-2xl font-bold text-gray-300">
                {card.exchangeGenre}
              </span>
            </div>
          </div>
          {myProposalCards?.length > 0 &&
          cardId == myProposalCards?.[0]?.saleListing?.id ? (
            <>
              <p className="flex text-4xl text-white font-bold mt-32">
                내가 제시한 교환 목록
              </p>
              <p className="border border-white"></p>
              <ExchangeGrid
                proposal={myProposalCards}
                cardIsSeller={card?.isSeller}
              />
            </>
          ) : null}
        </div>
      )}
    </div>
  );
}
