import { ChangeEvent, useState } from "react";

type UploadProps = {
  onFileChange: (file: File) => void;
}

export function Upload({ onFileChange }: UploadProps){
  const [fileName, setFileName] = useState<string>('');

  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    const selectedFile = event.target.files?.[0];
    setFileName(selectedFile ? selectedFile.name : '');

    if (selectedFile) {
      onFileChange(selectedFile);
    }
  };
  return(
  <>
    <div className="flex justify-between mt-10">
      <label htmlFor="fileInput" className="block text-sm font-medium text-gray-700 mb-2 mt-3">
        Escolher Arquivo
      </label>
      <div className="flex items-center">
        <input
          id="fileInput"
          type="file"
          className="hidden"
          onChange={handleFileChange}
        />
        <label
          htmlFor="fileInput"
          className="px-4 py-2 bg-blue-500 text-white rounded-md cursor-pointer hover:bg-blue-600"
        >
          Procurar
        </label>
      </div>
    </div>
    <div className="mt-5">
      <span className="ml-2">{fileName}</span>
    </div>
  </>)
}