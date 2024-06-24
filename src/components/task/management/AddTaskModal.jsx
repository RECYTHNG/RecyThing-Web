import { useEffect, useState } from 'react';
import { Button, Form, Modal, Upload, message } from 'antd';
import FloatingLabelInput from '../../global/input/FloatingInput';
import { PlusOutlined } from '@ant-design/icons';
import uploadIcon from '/assets/svg/task/uploadIcon.svg';
import { IoIosAddCircleOutline } from "react-icons/io";
import dayjs from 'dayjs';
import { usePostFormData, usePatchFormData } from '../../../hooks/useFetch';
import { toast } from 'react-toastify';

const AddTaskModal = ({ isOpen, onClose, selectedTask }) => {
  const [taskName, setTaskName] = useState('');
  const [point, setPoint] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [description, setDescription] = useState('');
  const [stages, setStages] = useState([{ title: '', description: '' }, { title: '', description: '' }]);
  const [image, setImage] = useState(null);
  const [imgDisplay, setImgDisplay] = useState('');
  const { mutateAsync: addTask } = usePostFormData();
  const { mutateAsync: updateTask } = usePatchFormData();

  const handleStageChange = (index, key, value) => {
    const newStages = [...stages];
    newStages[index][key] = value;
    setStages(newStages);
  };

  const addStage = () => {
    setStages([...stages, { title: '', description: '' }]);
  };

  useEffect(() => {
    const initialStage = selectedTask?.stages?.map(({ title, description }) => ({ title, description })) ?? [{ title: '', description: '' }, { title: '', description: '' }]
    setTaskName(selectedTask?.name ?? '');
    setPoint(selectedTask?.point ?? '');
    setStartDate(selectedTask ? dayjs(selectedTask.startDate, "DD/MM/YYYY") : null);
    setEndDate(selectedTask ? dayjs(selectedTask.deadline, "DD/MM/YYYY") : null);
    setDescription(selectedTask?.description ?? '');
    setStages(initialStage)
    setImgDisplay(selectedTask?.thumbnail ?? '')
  }, [selectedTask]);

  const handleImageChange = (info) => {
    if (info.file) {
      setImage(info.file);
      setImgDisplay(URL.createObjectURL(info.file));
      }
    console.log(info)
  };

  const handleEdit = async () => {
    toast.loading("Sedang Mengupdate Task");
    const formData = new FormData();

    formData.append('json_data', JSON.stringify({
      title: taskName,
      description,
      start_date:  dayjs(startDate).format('YYYY-MM-DD'),
      end_date: dayjs(endDate).format('YYYY-MM-DD'),
      point: parseInt(point),
      task_steps: stages.map(stage => ({
        title: stage.title,
        description: stage.description
      }))
    }));
  
    if (image) {
      formData.append('thumbnail', image);
    }

    for (let [key, value] of formData.entries()) {
      console.log(`${key}:`, value);
    }
  
    updateTask({ endpoint: `/tasks/${selectedTask.id}`, updatedData: formData })
    .then((_) => {
      toast.dismiss();
      onClose();
      toast.success("Sukses Update Data Task");
    }).catch((_) => {
      toast.dismiss();
      toast.error("Gagal Update Data Task")
    })
  };

  const handleSubmit = async () => {
    toast.loading("Sedang Membuat Task");
    const formData = new FormData();

    formData.append('json_data', JSON.stringify({
      title: taskName,
      description,
      start_date:  dayjs(startDate).format('YYYY-MM-DD'),
      end_date: dayjs(endDate).format('YYYY-MM-DD'),
      point: parseInt(point),
      task_steps: stages.map(stage => ({
        title: stage.title,
        description: stage.description
      }))
    }));
  
    if (image) {
      formData.append('thumbnail', image);
    }
  
    addTask({ endpoint: '/tasks', newData: formData })
    .then((data) => {
      onClose()
      toast.success("Data Berhasil Ditambah");
    }).catch((err) => {
      toast.error("Gagal Menambahkan Task")
    })
  };
  

  return (
    <Modal
      open={isOpen}
      width={890}
      centered
      onCancel={onClose}
      closable={false}
      title={<h2 className='font-bold h4'>Tambah Data Misi</h2>}
      styles={{
        content: {
          padding: '20px 24px',
        },
      }}
      footer={[
        <Button key="close" className="btn-m font-bold text-primary-500 h-[42px] px-[22px] rounded-[5px] border border-primary-500" onClick={onClose}>
          Kembali
        </Button>,
        <Button onClick={selectedTask ? handleEdit : handleSubmit} className="btn-m font-bold text-white h-[42px] px-[22px] rounded-[5px] bg-primary-500">
          {selectedTask ? 'Simpan' : 'Tambah'}
        </Button>,
      ]}
    >
      <Form className='flex gap-[30px]'>
        <Form.Item>
          <Upload.Dragger
            name="files"
            accept=".jpg,.jpeg,.png"
            maxCount={1}
            showUploadList={false}
            beforeUpload={() => false}
            onChange={handleImageChange}
            style={{ border: '2px dashed #00476d' }}
          >
            <div className='flex flex-col items-center justify-center w-[232px] aspect-square'>
              {imgDisplay ?
              <img src={imgDisplay} className='w-full h-full object-cover object-center'/>
              :
                <div className='flex flex-col items-center gap-4'>
                  <div className='ant-upload-drag-icon w-full flex items-center justify-center'>
                    <img src={uploadIcon} alt="Uploaded" />
                  </div>
                  <p className="sub-m text-primary-500 font-bold">Drag & Drop to Upload</p>
                  <span className='sub-s font-bold text-secondary-500'>or Browse</span>
                  <p className="body-xs text-dark-700">Max 200MB, JPG/PNG</p>
                </div>
          }
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
                placeholder="Masukan Poin"
                value={point}
                onChange={(e) => setPoint(e.target.value)}
              />
              <FloatingLabelInput
                id="start-date"
                label="Tanggal Mulai"
                placeholder="Masukan Tanggal Mulai"
                type='date'
                value={startDate}
                onChange={(date) => setStartDate(date)}
              />
              <FloatingLabelInput
                id="end-date"
                label="Tanggal Selesai"
                placeholder="Masukan Tanggal Selesai"
                type='date'
                value={endDate}
                onChange={(date) => setEndDate(date)}
              />
              <FloatingLabelInput
                id="description"
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
                  <div className='flex-1 w-full flex flex-col gap-3 pb-2'>
                    <FloatingLabelInput
                      id={`stage-title-${index}`}
                      label="Nama Misi"
                      placeholder="Masukan Misi"
                      value={stage.title}
                      onChange={(e) => handleStageChange(index, 'title', e.target.value)}
                    />
                    <FloatingLabelInput
                      id={`stage-description-${index}`}
                      label="Deskripsi"
                      placeholder="Masukan Deskripsi"
                      type='desc'
                      value={stage.description}
                      onChange={(e) => handleStageChange(index, 'description', e.target.value)}
                    />
                  </div>
                </div>
              ))}
            </section>
          </div>
          <button
            type='button'
            className='py-2 px-5 bg-primary-500 text-white w-full mt-5 rounded-[5px] text-start btn-m flex flex-row items-center gap-2'
            onClick={addStage}
          >
            <IoIosAddCircleOutline className='text-2xl' />
            Tambah Tahapan Misi
          </button>
        </div>
      </Form>
    </Modal>
  );
};

export default AddTaskModal;
