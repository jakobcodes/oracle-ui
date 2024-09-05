import React, { useState, ChangeEvent } from 'react';
import axios from 'axios';
import { uploadPolicy } from "@/api/api";

// Define the expected structure of the server response
interface UploadResponse {
  status: string;
  storage_path: string;
  size: number;
}

const FileUpload: React.FC = () => {
  // Define the state with appropriate types
  const [file, setFile] = useState<File | null>(null);
  const [fileSuffix, setFileSuffix] = useState<string>('');
  const [uploadStatus, setUploadStatus] = useState<string>('');

  // Handle file input change event
  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files.length > 0) {
      const selectedFile = event.target.files[0];
      setFile(selectedFile);
      setFileSuffix(selectedFile.name.split('.').slice(0, -1).join('.')); // Extract file name without extension
    }
  };

  // Handle file upload
  const handleUpload = async () => {
    if (!file) {
      alert('Please select a file first!');
      return;
    }

    try {
      const reader = new FileReader();
      reader.readAsDataURL(file);

      reader.onloadend = async () => {
        if (reader.result) {
          const base64Content = (reader.result as string).split(',')[1]; // Remove the prefix 'data:application/zip;base64,'

          const payload = {
            file_suffix: fileSuffix,
            content: base64Content,
          };

          const response = uploadPolicy(payload)
            .then(response => {
              if (response.status === 'ok') {
                setUploadStatus(`File uploaded successfully: ${response.storage_path}`);
              }
            });
        }
      };
    } catch (error) {
      console.error('There was an error uploading the file!', error);
      setUploadStatus('Failed to upload file.');
    }
  };

  return (
    <div className="flex flex-col items-center p-6 border border-gray-300 rounded-lg shadow-lg max-w-md mx-auto">
      <h2 className="text-2xl font-bold text-gray-700 mb-4">Upload Stable Baselines 3 Policy</h2>
      <input
        type="file"
        accept=".zip"
        onChange={handleFileChange}
        className="mb-4 p-2 border border-gray-300 rounded-md"
      />
      <button
        onClick={handleUpload}
        className="bg-green-500 text-white py-2 px-6 rounded-lg hover:bg-green-600 transition duration-300"
      >
        Upload
      </button>
      {uploadStatus && (
        <p
          className={`mt-4 text-lg ${
            uploadStatus.includes('success') ? 'text-green-600' : 'text-red-600'
          }`}
        >
          {uploadStatus}
        </p>
      )}
    </div>

  );
};

export default FileUpload;
