import React from 'react';

const Preview = ({ formData }) => {
  if (!formData) {
    return <p className="text-center text-danger">No data to preview. Go back and fill the form.</p>;
  }

  const { fileName, includeRef, includeLib, additionalInfo, previewUrl, fileType } = formData;

  return (
    <div className='preview-wrap container'>
      <div className="preview-card">
        <h2 className="preview-title"> Form Data Preview</h2>
        <ul className="preview-list">
          <li className="preview-item">
            <strong>File:</strong> {fileName || 'None'}

            {fileType === 'image' && previewUrl && (
              <div className="file-preview mt-2">

                <img
                  src={previewUrl}
                  alt="Uploaded Preview"
                  className="preview-image"
                />
              </div>
            )}
            {fileType === 'pdf' && previewUrl && (
              <div className="file-preview mt-2">

                <a
                  href={previewUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="preview-link"
                >
                  View PDF
                </a>
              </div>
            )}
          </li>
          <li className="preview-item">

            <strong>Include Project Reference:</strong> {includeRef ? 'Yes' : 'No'}
          </li>
          <li className="preview-item">
            
            <strong>Include Company Library:</strong> {includeLib ? 'Yes' : 'No'}
          </li>
          <li className="preview-item">
            <strong>Additional Information:</strong>
            <div className="info-box">{additionalInfo || 'None'}</div>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Preview;