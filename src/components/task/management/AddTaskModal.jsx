import { useEffect, useState } from 'react';
import { Button, Form, Upload } from 'antd';
import FloatingLabelInput from '../../global/input/FloatingInput';
import { PlusOutlined } from '@ant-design/icons';
import uploadIcon from '/assets/svg/task/uploadIcon.svg';
import { IoIosAddCircleOutline } from "react-icons/io";
import dayjs from 'dayjs';

const AddTaskModal = ({ isOpen, selectedTask, onStageChange, stages, addStage }) => {
  const [taskName, setTaskName] = useState('');
  const [point, setPoint] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [description, setDescription] = useState('');
  const [image, setImage] = useState(null);

  useEffect(() => {
    setTaskName(selectedTask.name ?? '');
    setPoint(selectedTask.point ?? '');
    setStartDate(selectedTask.startDate ?? '');
    setEndDate(selectedTask ? dayjs(selectedTask.deadline) : null);
    setDescription(selectedTask.description ?? '');
    setImage(selectedTask.image ?? null);
  }, [selectedTask, stages]);

  const handleImageChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      setImage(URL.createObjectURL(e.target.files[0]));
    }
  };

  return (
    <div>
      <Form className='flex gap-[30px]'>
        <Form.Item>
          <Upload.Dragger
            height={256}
            name="files"
            accept=".jpg,.png"
            maxCount={1}
            beforeUpload={() => false}
            onChange={handleImageChange}
            style={{ border: '2px dashed #00476d' }}
          >
            <div className='flex flex-col items-center gap-4 w-[216px]'>
              <div className='ant-upload-drag-icon w-full flex items-center justify-center'>
                <img src={uploadIcon} alt="Uploaded" />
              </div>
              <p className="sub-m text-primary-500 font-bold">Drag & Drop to Upload</p>
              <span className='sub-s font-bold text-secondary-500'>or Browse</span>
              <p className="body-xs text-dark-700">Max 200MB, JPG/PNG</p>
            </div>
          </Upload.Dragger>
        </Form.Item>

        <div className='flex-1'>
          <div className='w-full overflow-auto max-h-[485px] pr-2'>
            <div className='grid grid-cols-2 gap-3'>
              <FloatingLabelInput
                id="name"
                label="Nama Misi"
                placeholder="Masukan Misi"
                value={taskName}
                onChange={(e) => setTaskName(e.target.value)}
              />
              <FloatingLabelInput
                id="point"
                label="Nilai Poin"
                placeholder="Masukan Misi"
                value={point}
                onChange={(e) => setPoint(e.target.value)}
              />
              <FloatingLabelInput
                id="start-date"
                label="Tanggal Mulai"
                placeholder="Masukan Tanggal Mulai"
                type='date'
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
              />
              <FloatingLabelInput
                id="end-date"
                label="Tanggal Selesai"
                placeholder="Masukan Misi"
                type='date'
                value={endDate}
                onChange={(e) => setEndDate(e.target.value)}
              />
              <FloatingLabelInput
                id="point"
                label="Deskripsi"
                placeholder="Masukan Deskripsi"
                className="col-span-2"
                type='desc'
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
            </div>
            <section className='mt-5'>
              <p className='body-m text-primary-500 font-semibold'>Tahapan Misi</p>
              {stages.map((stage, index) => (
                <div key={index} className='flex flex-row gap-2 mt-3'>
                  <span className='mt-2 text-primary-500 body-m'>{index + 1}</span>
                  <div key={index} className='flex-1 w-full flex flex-col gap-3 pb-2'>
                    <FloatingLabelInput
                      id="name"
                      label="Nama Misi"
                      placeholder="Masukan Misi"
                      value={stage.title}
                      onChange={(e) => onStageChange(index, 'title', e.target.value)}
                    />
                    <FloatingLabelInput
                      id="description"
                      label="Deskripsi"
                      placeholder="Masukan Deskripsi"
                      type='desc'
                      value={stage.description}
                      onChange={(e) => onStageChange(index, 'description', e.target.value)}
                    />
                  </div>
                </div>
              ))}
            </section>
          </div>
          <button className='py-2 px-5 bg-primary-500 text-white w-full mt-5 rounded-[5px] text-start btn-m flex flex-row items-center gap-2' onClick={addStage} icon={<PlusOutlined />}>
            <IoIosAddCircleOutline className='text-2xl' />
            Tambah Tahapan Misi
          </button>
        </div>
      </Form>
    </div>
  );
};

export default AddTaskModal;
