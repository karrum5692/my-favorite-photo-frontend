import React, { useEffect } from 'react';
import '../../../styles/LoginRequiredModal.css';

const LoginRequiredModal = ({ isOpen, onClose, onConfirm }) => {
  // 2. 키보드 Escape 키 입력 시 모달 닫기 기능 추가
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  // 모달이 열려있지 않으면 아무것도 렌더링하지 않음
  if (!isOpen) return null;

  return (
    <div className="modal-overlay" onClick={onClose}>
      {/* 모달 내부를 클릭했을 때는 창이 닫히지 않도록 이벤트 전파 막기 */}
      <div
        className="modal-content"
        onClick={(e) => e.stopPropagation()}
        role="dialog"
        aria-modal="true"
        aria-labelledby="login-modal-title"
        aria-describedby="login-modal-desc"
      >
        {/* 닫기 (X) 버튼 */}
        <button
          type="button"
          className="modal-close-btn"
          onClick={onClose}
          aria-label="닫기"
        >
          ✕
        </button>

        {/* 안내 텍스트 구역 */}
        <div className="modal-body">
          <h3 id="login-modal-title" className="modal-title">
            로그인이 필요합니다.
          </h3>
          <p id="login-modal-desc" className="modal-description">
            로그인 하시겠습니까?
            <br />
            다양한 서비스를 편리하게 이용하실 수 있습니다.
          </p>
        </div>

        {/* 노란색 확인 버튼 */}
        <button type="button" className="modal-confirm-btn" onClick={onConfirm}>
          확인
        </button>
      </div>
    </div>
  );
};

export default LoginRequiredModal;
