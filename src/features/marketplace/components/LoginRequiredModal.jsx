import React, { useEffect, useRef } from 'react'; // 1. useRef 추가
import '../../../styles/LoginRequiredModal.css';

const LoginRequiredModal = ({ isOpen, onClose, onConfirm }) => {
  // 포커스 제어를 위한 Ref 선언
  const modalRef = useRef(null);
  const previousFocusRef = useRef(null);

  useEffect(() => {
    if (!isOpen) return;

    // 모달이 열릴 때 이전에 포커스가 있던 요소를 저장
    previousFocusRef.current = document.activeElement;

    // 모달 내부에 초점을 맞출 수 있는 태그들 수집
    const focusableElements = modalRef.current?.querySelectorAll(
      'button, [href], input, select, textarea, [tabindex="0"]'
    );
    const firstElement = focusableElements?.[0];
    const lastElement = focusableElements?.[focusableElements.length - 1];

    // 모달이 열리면 첫 번째 요소(X 버튼)에 포커스 자동 지정
    if (firstElement) firstElement.focus();

    const handleKeyDown = (e) => {
      // Escape 키 입력 시 모달 닫기
      if (e.key === 'Escape') {
        onClose();
        return;
      }

      // Tab 키가 모달 외부로 탈출하지 못하도록 가두기 (Focus Trap)
      if (e.key === 'Tab') {
        if (e.shiftKey) {
          // Shift + Tab: 역방향 이동 시 첫 번째 요소면 마지막 요소로 보냄
          if (document.activeElement === firstElement) {
            lastElement.focus();
            e.preventDefault();
          }
        } else {
          // Tab: 정방향 이동 시 마지막 요소면 첫 번째 요소로 보냄
          if (document.activeElement === lastElement) {
            firstElement.focus();
            e.preventDefault();
          }
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);

    // 모달이 닫힐 때 원래 누르고 있던 화면의 버튼으로 포커스를 돌려줌
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      if (previousFocusRef.current) {
        previousFocusRef.current.focus();
      }
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div
        ref={modalRef} // 2. modalRef 연결
        className="modal-content"
        onClick={(e) => e.stopPropagation()}
        role="dialog"
        aria-modal="true"
        aria-labelledby="login-modal-title"
        aria-describedby="login-modal-desc"
        tabIndex="-1" // 키보드 포커스를 프로그래밍 방식으로 주기 위해 추가
      >
        <button
          type="button"
          className="modal-close-btn"
          onClick={onClose}
          aria-label="닫기"
        >
          ✕
        </button>

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

        <button type="button" className="modal-confirm-btn" onClick={onConfirm}>
          확인
        </button>
      </div>
    </div>
  );
};

export default LoginRequiredModal;
