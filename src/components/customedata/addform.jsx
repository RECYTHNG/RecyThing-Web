import React, { useState } from 'react';
import { usePostData } from '../../hooks/useFetch';
import { toast } from 'react-toastify';

const AddDataForm = ({ onCancel, onAdd }) => {
  const [topic, setTopic] = useState('');
  const [description, setDescription] = useState('');
  const [isTopicFocused, setIsTopicFocused] = useState(false);
  const [isDescriptionFocused, setIsDescriptionFocused] = useState(false);
  const { mutateAsync: postData } = usePostData();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const customData = {
      topic: topic,
      description: description,
    };

    toast.loading('Sedang Menambahkan Data');

    try {
      await postData({ endpoint: '/custom-data', newData: customData });
      toast.dismiss();
      toast.success('Data berhasil ditambah!');
      onAdd();
      setTopic('');
      setDescription('');
    } catch (error) {
      toast.dismiss();
      toast.error('Terjadi Kesalahan Ketika Menambahkan Data');
      console.error('Erro add data:', error);
    }
  };

  return (
    <div className="px-6 py-5 bg-white rounded-2xl flex flex-col gap-6">
      <h1 className="text-black text-2xl font-bold leading-relaxed">Tambah Data OpenAI</h1>
      <form className="w-full" onSubmit={handleSubmit}>
        <div className="relative mb-5">
          <input
            type="text"
            placeholder={isTopicFocused ? 'Masukkan Topik' : ''}
            value={topic}
            onChange={(e) => setTopic(e.target.value)}
            onFocus={() => setIsTopicFocused(true)}
            onBlur={() => setIsTopicFocused(false)}
            className="block w-full px-3 pt-4 pb-2 text-base text-gray-900 border border-gray-300 rounded-md shadow-sm appearance-none focus:outline-none focus:primary-500 focus:border-primary-500 peer"
          />
          <label
            htmlFor="topic"
            className={`absolute left-3 -top-2.5 bg-white px-1 text-gray-700 text-sm transition-all transform ${
              topic || isTopicFocused ? '-top-2.5 text-sm text-primary-500' : 'top-3.5 text-base'
            } peer-focus:-top-2.5 peer-focus:text-sm peer-focus:text-primary-500`}
          >
            Topik
          </label>
        </div>
        <div className="relative mb-5">
          <textarea
            placeholder={isDescriptionFocused ? 'Masukkan Deskripsi' : ''}
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            onFocus={() => setIsDescriptionFocused(true)}
            onBlur={() => setIsDescriptionFocused(false)}
            className="block w-full px-3 pt-4 pb-2 text-base text-gray-900 border border-gray-300 rounded-md shadow-sm appearance-none focus:outline-none focus:ring-primary-500 focus:border-primary-500 peer resize-none"
            rows="4"
          />
          <label
            htmlFor="description"
            className={`absolute left-3 -top-2.5 bg-white px-1 text-gray-700 text-sm transition-all transform ${
              description || isDescriptionFocused ? '-top-2.5 text-sm text-primary-500' : 'top-2 text-base'
            } peer-focus:-top-2.5 peer-focus:text-sm peer-focus:text-primary-500`}
          >
            Deskripsi
          </label>
        </div>
        <div className="flex justify-end gap-4">
          <button
            type="button"
            className="px-4 py-2 border border-sky-900 rounded-md text-sky-900 font-bold"
            onClick={() => {
              setTopic('');
              setDescription('');
              onCancel();
            }}
          >
            Batal
          </button>
          <button type="submit" className="px-4 py-2 bg-sky-900 text-white rounded-md shadow font-bold">
            Tambah
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddDataForm;
