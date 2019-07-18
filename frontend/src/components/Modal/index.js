import React from 'react';

import './index.css';

export default function Modal({
  title,
  children,
  canConfirm,
  canCancel,
  onConfirm,
  onCancel,
}) {
  return (
    <div className='modal'>
      <header className='modal__header'>{title}</header>
      <section className='modal__content'>{children}</section>
      <section className='modal__actions'>
        {canConfirm && (
          <button className='btn' onClick={onConfirm}>
            Confirm
          </button>
        )}
        {canCancel && (
          <button className='btn' onClick={onCancel}>
            Cancel
          </button>
        )}
      </section>
    </div>
  );
}
