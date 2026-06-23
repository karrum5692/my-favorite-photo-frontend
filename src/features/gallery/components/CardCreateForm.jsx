'use client';

import React, { useState, useRef } from 'react';
import { useCreateMyCard } from '../hooks/useGallery';
import { useRouter } from 'next/navigation';
import ResultModal from '@/components/ui/ResultModal';

export default function CreateCardForm() {
  const router = useRouter();
  const createCardMutation = useCreateMyCard();
  const fileInputRef = useRef(null);
  const [isModal, setIsModal] = useState(false);

  const [title, setTitle] = useState('');
  const [grade, setGrade] = useState('');
  const [genre, setGenre] = useState('');
  const [price, setPrice] = useState('');
  const [totalIssued, setTotalIssued] = useState('');
  const [fileName, setFileName] = useState('');
  const [description, setDescription] = useState('');
  const [selectedFile, setSelectedFile] = useState(null);
  const [errors, setErrors] = useState({});
  const isFormFilled =
    title &&
    grade &&
    genre &&
    price &&
    totalIssued &&
    selectedFile &&
    description;

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setSelectedFile(file);
    setFileName(file.name);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const newErrors = {};
    if (!title.trim()) newErrors.title = '포토카드 이름을 입력해 주세요.';
    if (!grade) newErrors.grade = '등급을 선택해 주세요.';
    if (!genre) newErrors.genre = '장르를 선택해 주세요.';
    if (!price) newErrors.price = '가격을 입력해 주세요.';
    else if (isNaN(Number(price)) || Number(price) < 0) {
      newErrors.price = '숫자만 입력 가능합니다.';
    }
    if (!totalIssued) {
      newErrors.totalIssued = '총 발행량을 입력해 주세요.';
    } else if (isNaN(Number(totalIssued)) || Number(totalIssued) < 0) {
      newErrors.totalIssued = '숫자만 입력 가능합니다.';
    } else if (Number(totalIssued) > 20) {
      newErrors.totalIssued = '총 발행량은 20장을 초과할 수 없습니다.';
    }
    if (!selectedFile) newErrors.selectedFile = '사진을 업로드해 주세요.';
    if (!description) newErrors.description = '카드 설명을 입력해 주세요.';

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }
    setErrors({});
    createCardMutation.mutate(
      {
        image: selectedFile,
        title,
        description,
        grade,
        genre,
        price: Number(price),
        totalIssued: Number(totalIssued),
      },
      {
        onSuccess: () => {
          setIsModal(true);
        },
        onError: (error) => {
          alert('생성 실패: ' + error.message);
        },
      }
    );
  };

  return (
    <div className="w-full bg-[#111111] min-h-screen text-white pt-10 pb-20">
      <div className="max-w-[1200px] mx-auto px-4 border-b-[2px] border-solid border-[var(--color-white)] pb-[1.5rem] mb-[50px]">
        <h1
          style={{ fontFamily: 'var(--font-baskins)' }}
          className="text-white font-['BR_B'] text-[62px] font-normal not-italic tracking-[-1.86px]"
        >
          포토카드 생성
        </h1>
      </div>

      <div className="max-w-[716px] mx-auto px-4">
        <form onSubmit={handleSubmit} className="flex flex-col gap-10">
          <div className="flex flex-col gap-2">
            <label className="text-white font-bold text-[20px] not-italic">
              포토카드 이름
            </label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full bg-[var(--black-black,#0F0F0F)] border border-[var(--gray-gray200,#DDD)] rounded-[2px] p-4 text-white placeholder-gray-600 focus:outline-none focus:border-[var(--gray-gray200,#DDD)]"
              placeholder="포토카드 이름을 입력해 주세요"
            />
            {errors.title && (
              <p className="text-red-500 text-sm">{errors.title}</p>
            )}
          </div>

          <div className="flex flex-col gap-2">
            <label className="text-white font-bold text-[20px] not-italic">
              등급
            </label>
            <select
              value={grade}
              onChange={(e) => setGrade(e.target.value)}
              className="w-full bg-[var(--black-black,#0F0F0F)] border border-[var(--gray-gray200,#DDD)] rounded-[2px] p-4 text-white placeholder-gray-600 focus:outline-none focus:border-[var(--gray-gray200,#DDD)]"
            >
              <option value="" disabled hidden>
                등급을 선택해 주세요
              </option>
              <option value="COMMON">COMMON</option>
              <option value="RARE">RARE</option>
              <option value="SUPER_RARE">SUPER RARE</option>
              <option value="LEGENDARY">LEGENDARY</option>
            </select>
            {errors.grade && (
              <p className="text-red-500 text-sm">{errors.grade}</p>
            )}
          </div>

          <div className="flex flex-col gap-2">
            <label className="text-white font-bold text-[20px] not-italic">
              장르
            </label>
            <select
              value={genre}
              onChange={(e) => setGenre(e.target.value)}
              className="w-full bg-[var(--black-black,#0F0F0F)] border border-[var(--gray-gray200,#DDD)] rounded-[2px] p-4 text-white placeholder-gray-600 focus:outline-none focus:border-[var(--gray-gray200,#DDD)]"
            >
              <option value="" disabled hidden>
                장르를 선택해 주세요
              </option>
              <option value="ALBUM">ALBUM</option>
              <option value="SPECIAL">SPECIAL</option>
              <option value="FAN_SIGN">FAN SIGN</option>
              <option value="SEASON_GREETING">SEASON GREETING</option>
              <option value="FAN_MEETING">FAN MEETING</option>
              <option value="CONCERT">CONCERT</option>
              <option value="MD">MD</option>
              <option value="COLLABORATION">COLLABORATION</option>
              <option value="FAN_CLUB">FAN CLUB</option>
              <option value="OTHER">OTHER</option>
            </select>
            {errors.genre && (
              <p className="text-red-500 text-sm">{errors.genre}</p>
            )}
          </div>

          <div className="flex flex-col gap-2">
            <label className="text-white font-bold text-[20px] not-italic">
              가격
            </label>
            <input
              type="text"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              className="w-full bg-[var(--black-black,#0F0F0F)] border border-[var(--gray-gray200,#DDD)] rounded-[2px] p-4 text-white placeholder-gray-600 focus:outline-none focus:border-[var(--gray-gray200,#DDD)]"
              placeholder="가격을 입력해 주세요"
            />
            {errors.price && (
              <p className="text-red-500 text-sm">{errors.price}</p>
            )}
          </div>

          <div className="flex flex-col gap-2">
            <label className="text-white font-bold text-[20px] not-italic">
              총 발행량
            </label>
            <input
              type="text"
              value={totalIssued}
              onChange={(e) => setTotalIssued(e.target.value)}
              className="w-full bg-[var(--black-black,#0F0F0F)] border border-[var(--gray-gray200,#DDD)] rounded-[2px] p-4 text-white placeholder-gray-600 focus:outline-none focus:border-[var(--gray-gray200,#DDD)]"
              placeholder="20"
            />
            {errors.totalIssued && (
              <p className="text-red-500 text-sm">{errors.totalIssued}</p>
            )}
          </div>

          <div className="flex flex-col gap-2">
            <label className="text-white font-bold text-[20px] not-italic">
              사진 업로드
            </label>
            <div className="flex gap-3">
              <input
                type="text"
                readOnly
                value={fileName}
                className="flex-1 bg-[#1a1a1a] border border-[var(--gray-gray200,#DDD)] rounded-[2px] p-4 text-white placeholder-gray-600 focus:outline-none"
                placeholder="사진 업로드"
              />
              <input
                type="file"
                ref={fileInputRef}
                onChange={handleFileChange}
                className="hidden"
                accept="image/*"
              />
              <button
                type="button"
                onClick={() => fileInputRef.current.click()}
                className="bg-[#1a1a1a] border border-[#d6fe42] text-[#d6fe42] font-semibold px-6 py-4 rounded-md hover:bg-gray-800 transition-colors"
              >
                파일 선택
              </button>
            </div>
            {errors.selectedFile && (
              <p className="text-red-500 text-sm">{errors.selectedFile}</p>
            )}
          </div>

          <div className="flex flex-col gap-2">
            <label className="text-white font-bold text-[20px] not-italic">
              포토카드 설명
            </label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full bg-[var(--black-black,#0F0F0F)] border border-[var(--gray-gray200,#DDD)] rounded-[2px] p-4 text-white placeholder-gray-600 focus:outline-none focus:border-[var(--gray-gray200,#DDD)] h-40 resize-none"
              placeholder="카드 설명을 입력해 주세요"
            />
            {errors.description && (
              <p className="text-red-500 text-sm">{errors.description}</p>
            )}
          </div>

          <button
            type="submit"
            disabled={createCardMutation.isPending}
            className={`w-full font-bold py-4 rounded-md mt-6 disabled:opacity-50 transition-colors text-center text-lg ${
              isFormFilled
                ? 'bg-[#EFFF04] text-black hover:opacity-90'
                : 'bg-[#5A5A5A] text-[#A4A4A4] hover:bg-[#8a8a8a]'
            }`}
          >
            {createCardMutation.isPending ? '생성 중...' : '생성하기'}
          </button>
        </form>
      </div>
      {isModal && (
        <ResultModal
          isOpen={true}
          onClose={() => {
            setIsModal(false);
            router.push('/gallery/create');
          }}
          title="포토카드 생성"
          result="success"
          description={`[${grade}|${title}] 포토카드 생성에 성공했습니다!`}
          buttonText="마이갤러리에서 확인하기"
          onButtonClick={() => {
            router.push('/gallery');
          }}
        />
      )}
    </div>
  );
}
