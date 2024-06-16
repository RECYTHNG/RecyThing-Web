import { Modal } from 'antd';
import DeleteImage from '/assets/images/DeleteImage.png';
import { useDeleteData } from '../../hooks/useFetch';

export const DeleteModal = ({ isVisible, onOk, onCancel, admin }) => {
  const { mutateAsync: deleteData } = useDeleteData();

  const handleDelete = async (e) => {
    e.preventDefault();

    try {
      await deleteData({ endpoint: `/custom-data/${admin.id}` });
      onOk(); // Notify the parent component that the deletion was successful
    } catch (error) {
      console.error('Error deleting data:', error);
    }
  };

  return (
    <Modal open={isVisible} onCancel={onCancel} width={569} footer={null}>
      <div className="flex flex-col p-2 gap-2 justify-center items-center">
        <div className="w-[307px]">
          <img src={DeleteImage} alt="Delete Image" />
        </div>
        <h4 className="h4 font-bold text-center text-2xl leading-relaxed">
          Apakah Anda yakin ingin menghapus
          <br />
          <span className="block mt-1">data ini?</span>
        </h4>
        <p className="body-m text-center text-[#959595]">Data yang dihapus tidak dapat dipulihkan</p>
        <div className="flex gap-2 w-full mt-4">
          <button type="button" className="flex-1 rounded-[5px] bg-transparent border border-primary-500 btn-l font-bold py-4" onClick={onCancel}>
            Batal
          </button>
          <button type="button" className="flex-1 rounded-[5px] bg-danger-500 text-white btn-l font-bold py-4" onClick={handleDelete}>
            Hapus
          </button>
        </div>
      </div>
    </Modal>
  );
};
