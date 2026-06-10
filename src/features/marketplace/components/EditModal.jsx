import React from 'react';

const EditModal = () => {
  async function handleEdit(cardId) {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/market/cards/${cardId}`,
      {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({}),
      }
    );
    if (!res.ok) {
      throw new Error('서버로부터 수정하기를 실패하였습니다.');
    }
  }

  return <div>EditModal</div>;
};

export default EditModal;
