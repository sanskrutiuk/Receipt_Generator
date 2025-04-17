// src/components/SignatureUploader.js

import React from 'react';
import './SignatureUploader.css'; // optional if you want to separate styles

const SignatureUploader = ({ signaturePreview, handleSignatureUpload, removeSignature }) => {
  return (
    <div className="form-section">
      <label>Signature</label>
      <div className="signature-upload">
        {signaturePreview ? (
          <div className="signature-preview">
            <img 
              src={signaturePreview} 
              alt="Signature Preview" 
              className="signature-image"
            />
            <button 
              type="button" 
              className="remove-signature"
              onClick={removeSignature}
            >
              Remove
            </button>
          </div>
        ) : (
          <div className="signature-placeholder">
            <input
              type="file"
              id="signature-upload"
              accept="image/*"
              onChange={handleSignatureUpload}
              className="signature-input"
            />
            <label htmlFor="signature-upload" className="signature-label">
              <span>+ Upload Signature</span>
            </label>
          </div>
        )}
      </div>
    </div>
  );
};

export default SignatureUploader;
