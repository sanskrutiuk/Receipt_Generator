import React from 'react';
import './ReceiptPreview.css';

const ReceiptPreview = () => {
  return (
    <div className="preview-container">
      <div className="preview-receipt">
        <div className="preview-receipt-header">
          <div className="preview-receipt-number">
            <div className="preview-text">Receipt #REC123</div>
            <div className="preview-text-small">Date: 01/01/2024</div>
          </div>
          <div className="preview-logo-box"></div>
        </div>
        
        <div className="preview-section">
          <div className="preview-label">From</div>
          <div className="preview-text">John Doe</div>
          <div className="preview-text-small">john@example.com</div>
        </div>

        <div className="preview-section">
          <div className="preview-label">Bill To</div>
          <div className="preview-text">Jane Smith</div>
          <div className="preview-text-small">jane@example.com</div>
        </div>

        <div className="preview-section">
          <div className="preview-label">Amount</div>
          <div className="preview-amount">₹ 1,000.00</div>
        </div>

        <div className="preview-signature">
          <div className="preview-sign-box"></div>
        </div>
      </div>

      <div className="preview-receipt preview-receipt-back">
        <div className="preview-watermark">RECEIPT</div>
      </div>
    </div>
  );
};

export default ReceiptPreview; 