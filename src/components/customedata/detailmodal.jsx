import React from 'react';
import { Modal } from 'antd';
import closeIcon from '/assets/svg/task/closeIcon.svg';
import dayjs from 'dayjs'; // Import dayjs

const DetailModal = ({ open, onCancel, data }) => {
  const formattedDate = dayjs(data?.created_at, 'DD/MM/YYYY').format('DD MMMM YYYY');

  return (
    <Modal visible={open} onCancel={onCancel} closable={false} footer={null} width={700} style={{ maxHeight: '80vh', overflowY: 'auto' }}>
      <div className="px-6 py-5 bg-white rounded-[20px] flex flex-col gap-8">
        <div className="flex justify-between items-center">
          <h1 className="text-black text-2xl font-bold leading-relaxed">Detail Data OpenAI</h1>
          <img src={closeIcon} alt="close-icon" onClick={onCancel} className="cursor-pointer" />
        </div>
        <div className="flex flex-col gap-3.5">
          <div className="flex justify-between items-center">
            <div className="text-sky-900 text-xl font-bold leading-snug">{data?.topic}</div>
            <div className="text-zinc-500 text-xs font-medium leading-none">Unggah, {formattedDate}</div>
          </div>
          <div className="flex flex-col gap-2.5">
            <div className="text-zinc-500 text-xs font-bold leading-none">DESKRIPSI</div>
            <div className="text-black text-lg font-normal leading-tight">{data?.description}</div>
          </div>
        </div>
      </div>
    </Modal>
  );
};

export default DetailModal;
