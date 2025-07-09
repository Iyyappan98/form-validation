import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FiUpload } from "react-icons/fi";

const Form = ({ setFormData }) => {
    const navigate = useNavigate();
    const [data, setData] = useState({
        fileName: '',
        includeRef: false,

        includeLib: false,
        additionalInfo: ''


    });

    const [previewUrl, setPreviewUrl] = useState(null);

    const [fileType, setFileType] = useState(null);

    const [isDragging, setIsDragging] = useState(false);

    const [errors, setErrors] = useState({
        file: '',
        checkboxes: '',
        additionalInfo: ''
    });

    const handleFile = (file) => {
        if (!file) return;

        const maxSizeInBytes = 2 * 1024 * 1024;

        if (file.size > maxSizeInBytes) {
            setErrors(prev => ({ ...prev, file: ' File size should not exceed 2MB.' }));
            setPreviewUrl(null);

            setFileType(null);

            setData(prev => ({ ...prev, fileName: '' }));
            return;
        }

        if (!(file.type.startsWith('image/') || file.type === 'application/pdf')) {
            setErrors(prev => ({ ...prev, file: ' Only image and PDF files are allowed.' }));

        setPreviewUrl(null);

     setFileType(null);


            setData(prev => ({ ...prev, fileName: '' }));
            return;
        }

        
        setErrors(prev => ({ ...prev, file: '' }));

        const fileUrl = URL.createObjectURL(file);
    setPreviewUrl(fileUrl);
        setData(prev => ({ ...prev, fileName: file.name }));

        if (file.type.startsWith('image/')) {
            setFileType('image');
        } else if (file.type === 'application/pdf') {
            setFileType('pdf');
        }
    };

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        handleFile(file);
    };

    const handleDrop = (e) => {
        e.preventDefault();
        setIsDragging(false);
        const file = e.dataTransfer.files[0];
        handleFile(file);
    };

    const handleDragOver = (e) => {
        e.preventDefault();
        setIsDragging(true);
    };

    const handleDragLeave = () => {
        setIsDragging(false);
    };

    const handleCheckboxChange = (e) => {
        const { name, checked } = e.target;

        setData(prev => {
            const updated = { ...prev, [name]: checked };

            //    console.log(updated)
            if (updated.includeRef || updated.includeLib) {
                setErrors(prevErrors => ({ ...prevErrors, checkboxes: '' }));
            }

            return updated;
        });
    };

    const handleTextChange = (e) => {
        const value = e.target.value;
        setData(prev => ({ ...prev, additionalInfo: value }));
    //    console.log(setData)
        
        if (value.trim() !== '') {
            setErrors(prev => ({ ...prev, additionalInfo: '' }));
            //    console.log(setErrors)
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        let isValid = true;
        const newErrors = {
            file: '',
            checkboxes: '',
            additionalInfo: ''
        };

    if (!previewUrl) {
            newErrors.file = 'Please upload a valid image or PDF (max 2MB).';
            isValid = false;
        }

         if (!data.includeRef && !data.includeLib) {
            newErrors.checkboxes = 'Please select at least one option.';
            isValid = false;
        }

if (!data.additionalInfo.trim()) {
            newErrors.additionalInfo = 'Please enter additional information.';
            isValid = false;
        }

        setErrors(newErrors);

        if (!isValid) return;

        setFormData({ ...data, previewUrl, fileType });

        navigate('/preview');
    };

    return (
        <div className='form-wrap'>
            <div className='container'>
                <form onSubmit={handleSubmit}>
                    <div className='form-group'>

                       
                        <div className='form-item mb-4'>
                            <label>Document Template</label>
                            <label
                                className={`upload-img px-5 py-5 ${isDragging ? 'dragging' : ''}`}
                                onDrop={handleDrop}
                                onDragOver={handleDragOver}
                                onDragLeave={handleDragLeave}
                            >
                                <input
                                    type='file'
                                    onChange={handleFileChange}
                                    className='file-input'
                                    accept="image/*,application/pdf"
                                />
                                {previewUrl ? (
                                    fileType === 'image' ? (
                                        <img src={previewUrl} alt="preview" style={{ maxWidth: '100%', maxHeight: '250px', objectFit: 'contain' }} />
                                    ) : fileType === 'pdf' ? (
                                        <a href={previewUrl} target="_blank" rel="noopener noreferrer" style={{ fontWeight: '500', color: '#333', textDecoration: 'none', fontSize: '16px', background: '#f5f5f5', padding: '10px 20px', borderRadius: '8px' }}>
                                            Click to View: {data.fileName}
                                        </a>
                                    ) : (
                                        <p>Unsupported file</p>
                                    )
                                ) : (
                                    <>
                                        <FiUpload />
                                        <p className='upload-txt'><span>Upload a file</span> or drag and drop</p>
                                        <p className='file-size'>PDF, Image files up to 2MB</p>
                                    </>
                                )}
                                {errors.file && (
                                    <p style={{ color: 'red', marginTop: '10px', fontSize: '14px' }}>
                                        {errors.file}
                                    </p>
                                )}
                            </label>
                        </div>

                        
                        <div className='form-item mb-4'>
                            <div className='mb-3'>Include<span>*</span></div>
                            <div>
                                <input type='checkbox' name='includeRef' checked={data.includeRef} onChange={handleCheckboxChange} />
                                <label className='ps-3'>Project Reference Material</label>
                            </div>
                            <div>
                                <input type='checkbox' name='includeLib' checked={data.includeLib} onChange={handleCheckboxChange} />
                                <label className='ps-3'>Company Library</label>
                            </div>
                            {errors.checkboxes && (
                                <p style={{ color: 'red', marginTop: '5px', fontSize: '14px' }}>{errors.checkboxes}</p>
                            )}
                        </div>

                       
                        <div className='form-item mb-4'>
                            <div className='mb-3'>Additional Information</div>
                            <textarea
                                rows={5}
                                value={data.additionalInfo}
                                onChange={handleTextChange}
                                placeholder='Enter your additional information here'
                                style={{ borderColor: errors.additionalInfo ? 'red' : '' }}
                            />
                            {errors.additionalInfo && (
                                <p style={{ color: 'red', marginTop: '5px', fontSize: '14px' }}>{errors.additionalInfo}</p>
                            )}
                        </div>

                        
                        <button type='submit'>Run Again</button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default Form;