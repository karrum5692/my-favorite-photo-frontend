'use client';

import React, { useState, useRef } from 'react';
import { useCreateMyCard } from '../hooks/useGallery';
import { useRouter } from 'next/navigation';

export default function CreateCardForm() {
  const router = useRouter();
  const fileInputRef = useRef(null);
  const createCardMutation = useCreateMyCard();

  const [title, setTitle] = useState('');
  const [grade, setGrade] = useState('');
  const [genre, setGenre] = useState('');
  const [price, setPrice] = useState('');
  const [totalIssued, setTotalIssued] = useState('');
  const [fileName, setFileName] = useState('');
  const [description, setDescription] = useState('');
  const [selectedFile, setSelectedFile] = useState(null);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setSelectedFile(file);
    setFileName(file.name);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (
      !title.trim() ||
      !grade ||
      !genre ||
      !price ||
      !totalIssued ||
      !selectedFile
    ) {
      alert('모든 필수 항목을 입력하고 사진을 업로드해 주세요.');
      return;
    }

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
          alert('포토카드가 성공적으로 생성되었습니다!');
          router.push('/gallery');
        },
        onError: (error) => {
          alert('생성 실패: ' + error.message);
        },
      }
    );
  };

  return (
    <div className="w-full bg-[#111111] min-h-screen text-white pt-10 pb-20">
      <div className="max-w-[1200px] mx-auto px-4">
        <h1 className="text-3xl font-bold mb-14 border-b border-gray-800 pb-4">
          포토카드 생성
        </h1>
      </div>

      <div className="max-w-[716px] mx-auto px-4">
        <form onSubmit={handleSubmit} className="flex flex-col gap-8">
          <div className="flex flex-col gap-2">
            <label className="text-sm font-semibold text-gray-300">
              포토카드 이름
            </label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full bg-[#1a1a1a] border border-gray-700 rounded-md p-4 text-white placeholder-gray-600 focus:outline-none focus:border-gray-500"
              placeholder="포토카드 이름을 입력해 주세요"
            />
          </div>

          <div className="flex flex-col gap-2">
            <label className="text-sm font-semibold text-gray-300">등급</label>
            <select
              value={grade}
              onChange={(e) => setGrade(e.target.value)}
              className="w-full bg-[#1a1a1a] border border-gray-700 rounded-md p-4 text-white focus:outline-none focus:border-gray-500 appearance-none"
            >
              <option value="" disabled hidden>
                등급을 선택해 주세요
              </option>
              <option value="COMMON">COMMON</option>
              <option value="RARE">RARE</option>
              <option value="SUPER_RARE">SUPER RARE</option>
              <option value="LEGENDARY">LEGENDARY</option>
            </select>
          </div>

          <div className="flex flex-col gap-2">
            <label className="text-sm font-semibold text-gray-300">장르</label>
            <select
              value={genre}
              onChange={(e) => setGenre(e.target.value)}
              className="w-full bg-[#1a1a1a] border border-gray-700 rounded-md p-4 text-white focus:outline-none focus:border-gray-500 appearance-none"
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
          </div>

          <div className="flex flex-col gap-2">
            <label className="text-sm font-semibold text-gray-300">가격</label>
            <input
              type="number"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              className="w-full bg-[#1a1a1a] border border-gray-700 rounded-md p-4 text-white placeholder-gray-600 focus:outline-none focus:border-gray-500"
              placeholder="가격을 입력해 주세요"
            />
          </div>

          <div className="flex flex-col gap-2">
            <label className="text-sm font-semibold text-gray-300">
              총 발행량
            </label>
            <input
              type="number"
              value={totalIssued}
              onChange={(e) => setTotalIssued(e.target.value)}
              className="w-full bg-[#1a1a1a] border border-gray-700 rounded-md p-4 text-white placeholder-gray-600 focus:outline-none focus:border-gray-500"
              placeholder="20"
            />
          </div>

          <div className="flex flex-col gap-2">
            <label className="text-sm font-semibold text-gray-300">
              사진 업로드
            </label>
            <div className="flex gap-3">
              <input
                type="text"
                readOnly
                value={fileName}
                className="flex-1 bg-[#1a1a1a] border border-gray-700 rounded-md p-4 text-white placeholder-gray-600 focus:outline-none"
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
          </div>

          <div className="flex flex-col gap-2">
            <label className="text-sm font-semibold text-gray-300">
              포토카드 설명
            </label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full bg-[#1a1a1a] border border-gray-700 rounded-md p-4 text-white placeholder-gray-600 focus:outline-none focus:border-gray-500 h-40 resize-none"
              placeholder="카드 설명을 입력해 주세요"
            />
          </div>

          <button
            type="submit"
            disabled={createCardMutation.isPending}
            className="w-full bg-gray-600 text-white font-bold py-4 rounded-md mt-6 hover:bg-gray-500 disabled:opacity-50 transition-colors text-center text-lg"
          >
            {createCardMutation.isPending ? '생성 중...' : '생성하기'}
          </button>
        </form>
      </div>
    </div>
  );
}
