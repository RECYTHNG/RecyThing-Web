import React from 'react';
import { Modal } from 'antd';

const DetailModal = ({ visible, onCancel, data }) => {
  const formatDate = (dateString) => {
    if (!dateString) return '';
    const date = new Date(dateString.split('/').reverse().join('-'));
    const options = { day: 'numeric', month: 'long', year: 'numeric' };
    return date.toLocaleDateString('id-ID', options);
  };

  return (
    <Modal visible={visible} onCancel={onCancel} footer={null} width={560}>
      <div className="px-6 py-5 bg-white rounded-[20px] flex-col gap-8 inline-flex">
        <h1 className="text-black text-2xl font-bold font-['Nunito'] leading-relaxed">Detail Data OpenAI</h1>
        <div className="flex-col gap-3.5 flex">
          <div className="inline-flex">
            <div className="h-[22px] justify-start items-end gap-2.5 flex">
              <div className="grow shrink basis-0 text-sky-900 text-xl font-bold leading-snug">{data?.topik}</div>
            </div>
            <div className="grow shrink basis-0 justify-end gap-2.5 flex">
              <div className="text-zinc-500 text-xs font-medium leading-none">Unggah, {formatDate(data?.tanggal)}</div>
            </div>
          </div>
          <div className="h-[67px] flex-col gap-2.5 flex">
            <div className="self-stretch gap-2.5 inline-flex">
              <div className="grow shrink basis-0 text-zinc-500 text-xs font-bold leading-none">DESKRIPSI</div>
            </div>
            <div className="text-black text-lg font-normal leading-tight">{data?.deskripsi}</div>
          </div>
        </div>
      </div>
    </Modal>
  );
};

export default DetailModal;
