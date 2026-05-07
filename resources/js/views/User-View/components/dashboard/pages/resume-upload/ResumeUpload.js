import React, { useState } from 'react';
import { FiUpload, FiFile, FiX } from 'react-icons/fi';
import './ResumeUpload.scss';

export default function ResumeUpload() {
    const [file, setFile] = useState(null);
    const [dragging, setDragging] = useState(false);

    const handleFile = (f) => {
        if (f && f.type === 'application/pdf') {
            setFile(f);
        }
    };

    const handleDrop = (e) => {
        e.preventDefault();
        setDragging(false);
        handleFile(e.dataTransfer.files[0]);
    };

    const handleChange = (e) => {
        handleFile(e.target.files[0]);
    };

    const handleRemove = () => setFile(null);

    return (
        <div className="resume-upload">
            <div className="resume-upload__header">
                <div className="resume-upload__icon"><FiUpload size={18} /></div>
                <div>
                    <h3 className="resume-upload__title">Resume / CV</h3>
                    <p className="resume-upload__subtitle">Upload your latest resume</p>
                </div>
            </div>
            <div className="resume-upload__body">
                {file ? (
                    <div className="resume-upload__file">
                        <FiFile size={20} />
                        <div className="resume-upload__file-info">
                            <span className="resume-upload__file-name">{file.name}</span>
                            <span className="resume-upload__file-size">{(file.size / 1024).toFixed(1)} KB</span>
                        </div>
                        <button className="resume-upload__remove" onClick={handleRemove}>
                            <FiX size={16} />
                        </button>
                    </div>
                ) : (
                    <div
                        className={`resume-upload__drop ${dragging ? 'resume-upload__drop--active' : ''}`}
                        onDragOver={(e) => { e.preventDefault(); setDragging(true); }}
                        onDragLeave={() => setDragging(false)}
                        onDrop={handleDrop}
                        onClick={() => document.getElementById('resume-input').click()}
                    >
                        <FiUpload size={28} />
                        <p>Drag and drop your PDF here or <span>browse</span></p>
                        <input
                            id="resume-input"
                            type="file"
                            accept=".pdf"
                            onChange={handleChange}
                            style={{ display: 'none' }}
                        />
                    </div>
                )}
            </div>
        </div>
    );
}