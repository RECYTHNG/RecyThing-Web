import { Modal } from 'antd';
import pointIcon from '/assets/svg/task/pointIcon.svg';
import stepLine from '/assets/svg/task/stepLine.svg';
import closeIcon from '/assets/svg/task/closeIcon.svg';

const DetailTaskModal = ({ isOpen, onClose, selectedTask }) => {
  return (
    <Modal
      open={isOpen}
      width={890}
      centered
      onCancel={onClose}
      closeIcon={<img src={closeIcon} alt='close-icon'/>}
      title={<h2 className='font-bold h4'>Detail Misi</h2>}
      styles={{
        content: {
          padding: '20px 24px',
        },
      }}
      footer={false}
    >
      <div className='flex gap-[30px] max-h-[440px] overflow-auto pr-7'>
        <div className='flex flex-col items-center justify-center h-[237px] w-fit aspect-square'>
          <img src={selectedTask?.thumbnail} className='w-full h-full object-cover object-center rounded-[20px]' />
        </div>
        <div className='w-full flex flex-col gap-5'>
          <div className='flex justify-between items-start gap-10'>
            <h3 className='h4 text-primary-500 font-bold flex-1'>{selectedTask?.name}</h3>
            <div className='flex flex-row items-center gap-1 px-[10px] py-[6px] bg-warning-300 text-primary-500 text-xs font-semibold rounded-[10px]'>
              <img src={pointIcon} alt="point-icon" />
              {selectedTask?.point} Poin
            </div>
          </div>
          <div className='flex flex-row items-center gap-20'>
            <div className='flex-1'>
              <span className='sub-m text-primary-500 font-semibold mb-[10px]'>Deskripsi</span>
              <p className='body-s'>{selectedTask?.description}</p>
            </div>
            <div>
              <span className='sub-m text-primary-500 font-semibold mb-[10px]'>Tanggal</span>
              <p className='body-s'>{selectedTask?.startDate} - {selectedTask?.deadline}</p>
            </div>
          </div>
          <div className='body-s flex flex-col gap-5'>
            <span className='text-primary-500 font-bold'>Tahapan Misi</span>
            <ul className="flex flex-col gap-1">
              {selectedTask?.stages?.map((stages, idx) => (
                <li key={stages.id} className="flex items-start ">
                  <div className='h-full flex flex-col items-center'>
                    <div className="flex-shrink-0 w-9 h-9 bg-primary-500 text-white rounded-full flex items-center justify-center">
                      {idx + 1}
                    </div>
                    {idx < selectedTask?.stages.length - 1 && (
                      <img src={stepLine} alt="stepline" className="mt-1" />
                    )}
                  </div>
                  <div className="ml-4 pb-5">
                    <h4 className="font-semibold body-s">{stages?.title}</h4>
                    <p className='body-s pt-[10px]'>{stages?.description}</p>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </Modal>
  );
};

export default DetailTaskModal;
