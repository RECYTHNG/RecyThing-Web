import { useMemo, useState } from 'react';
import { Modal, Tag, Button, Input } from 'antd';
import Filters from '../../components/Report/Filters';
import Tables from '../../components/global/Table';
import LabeledValue from '../../components/Report/LabeledValue';
import ContentLayout from '../../layouts/ContentLayout';
import FloatingLabelInput from '../../components/global/input/FloatingInput';
import { useFetch } from '../../hooks/useFetch';

const { TextArea } = Input;

const getStatusColor = (status) => {
  switch (status) {
    case 'Need Review':
      return 'bg-warning-500 text-white';
    case 'Rejected':
      return 'bg-danger-500 text-white';
    case 'Accepted':
      return 'bg-success-500 text-white';
    default:
      return '';
  }
};

const ModalContent = ({ selectedReport }) => (
  <div>
    <div className="flex items-start justify-between">
      <div className="flex gap-5">
        <div className="aspect-square w-[65px] rounded-full">
          <img src="https://placehold.co/65x65" alt="profile" className="w-full object-cover object-center rounded-full" />
        </div>
        <div className="flex flex-col gap-3 body-m">
          <LabeledValue label="Full Name" value={selectedReport.name} />
          <LabeledValue label="User ID" value={selectedReport.id} />
        </div>
      </div>
    </div>
    <div className="mt-14">
      <div className="grid grid-cols-2 gap-4">
        <div className="flex flex-col gap-2">
          <LabeledValue labelWidth={135} label="Report ID" value={selectedReport.id} />
          <LabeledValue labelWidth={135} label="Report Category" value={selectedReport.category} />
          <LabeledValue labelWidth={135} label="Status" value={<Tag className={`${getStatusColor(selectedReport.status)} rounded-full border-none px-5 py-[2px]`}>{selectedReport.status}</Tag>} />
          <LabeledValue labelWidth={135} label="Reporting Date" value={selectedReport.date} />
          <LabeledValue labelWidth={135} label="Reporting Time" value="19:00" />
          <LabeledValue labelWidth={135} label="Location" value={selectedReport.location} />
          <LabeledValue labelWidth={135} label="Detail Location" value="Jl. Kolonel Masturi No.246, Cipageran, Kec. Cimahi Utara, Kota Cimahi, Jawa Barat 40511" />
        </div>
        <div className="flex flex-col gap-3">
          <LabeledValue labelWidth={135} label="Report ID" value="I found rubbish piled up in the Kolmas area. To be precise, the Kolmas Regency complex. The pile of rubbish is near the security guard's office" />
          <LabeledValue
            labelWidth={135}
            label="Report ID"
            value={
              <div className="grid grid-cols-3 gap-2">
                <div className="aspect-square w-[78px]">
                  <img src="https://placehold.co/78x78" alt="img1" className="w-full object-cover object-center" />
                </div>
                <div className="aspect-square w-[78px]">
                  <img src="https://placehold.co/95x95" alt="img1" className="w-full object-cover object-center" />
                </div>
                <div className="aspect-square w-[78px]">
                  <img src="https://placehold.co/100x100" alt="img1" className="w-full object-cover object-center" />
                </div>
              </div>
            }
          />
        </div>
      </div>
    </div>
  </div>
);

const ManageReport = () => {
  const [selectedReport, setSelectedReport] = useState(null);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isRejectModalVisible, setIsRejectModalVisible] = useState(false);
  const { data: reportData } = useFetch('/reports')
  // console.log(reportData)

  const data = useMemo(
    () => [
      { id: 'RPT001', name: 'Harry Gani Darmawan', category: 'Rubbish', status: 'Need Review', date: '12/12/2022', location: 'Cimahi, Jawa Barat' },
      { id: 'RPT002', name: 'Harry Gani Darmawan', category: 'Rubbish', status: 'Need Review', date: '22/12/2021', location: 'Cimahi, Jawa Barat' },
      { id: 'RPT003', name: 'Harry Gani Darmawan', category: 'Rubbish', status: 'Rejected', date: '31/12/2023', location: 'Cimahi, Jawa Barat' },
      { id: 'RPT004', name: 'Harry Gani Darmawan', category: 'Rubbish', status: 'Rejected', date: '21/12/2033', location: 'Cimahi, Jawa Barat' },
      { id: 'RPT005', name: 'Harry Gani Darmawan', category: 'Rubbish', status: 'Accepted', date: '11/12/2012', location: 'Cimahi, Jawa Barat' },
      { id: 'RPT006', name: 'Harry Gani Darmawan', category: 'Rubbish', status: 'Accepted', date: '19/12/2011', location: 'Cimahi, Jawa Barat' },
      { id: 'RPT007', name: 'Harry Gani Darmawan', category: 'Littering', status: 'Accepted', date: '02/12/2041', location: 'Cimahi, Jawa Barat' },
      { id: 'RPT008', name: 'Harry Gani Darmawan', category: 'Rubbish', status: 'Rejected', date: '05/12/2002', location: 'Cimahi, Jawa Barat' },
      { id: 'RPT009', name: 'Harry Gani Darmawan', category: 'Littering', status: 'Rejected', date: '03/12/2003', location: 'Cimahi, Jawa Barat' },
      { id: 'RPT010', name: 'Harry Gani Darmawan', category: 'Littering', status: 'Rejected', date: '10/12/2041', location: 'Cimahi, Jawa Barat' },
    ],
    []
  );

  const columns = useMemo(
    () => [
      { title: 'Report ID', dataIndex: 'id', key: 'id' },
      { title: 'Name', dataIndex: 'name', key: 'name' },
      {
        title: 'Report Category',
        dataIndex: 'category',
        key: 'category',
        width: 150,
      },
      {
        title: 'Status',
        dataIndex: 'status',
        key: 'status',
        align: 'center',
        render: (status) => <Tag className={`${getStatusColor(status)} rounded-full border-none px-5 py-[2px] text-base`}>{status}</Tag>,
      },
      { title: 'Date', dataIndex: 'date', key: 'date' },
      { title: 'Location', dataIndex: 'location', key: 'location' },
    ],
    []
  );

  const showModal = (report) => {
    setSelectedReport(report);
    setIsModalVisible(true);
  };

  const handleOk = () => {
    // Call api approve
    setIsModalVisible(false);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  const handleReject = () => {
    setIsModalVisible(false);
    setIsRejectModalVisible(true);
  };

  const handleRejectCancel = () => {
    setIsRejectModalVisible(false);
    setIsModalVisible(true);
  };

  const handleRejectOk = () => {
    // Call api reject
    setIsRejectModalVisible(false);
  };

  return (
    <ContentLayout title={'Manage Report'}>
      <div className="px-6 py-9">
        <div className="flex items-end justify-end text-[#414141]">
          <Filters />
        </div>
        <Tables
          pagination={true}
          initialPageSize={10}
          data={data}
          columns={columns}
          enableRowClick
          onRowClick={showModal}
        />
        <Modal
          open={isModalVisible}
          width={890}
          centered
          onOk={handleOk}
          onCancel={handleCancel}
          styles={{
            content: {
              padding: '40px',
            },
          }}
          footer={[
            <Button key="approve" className="text-base rounded-[4px] bg-success-400 hover:bg-success-500 py-1 px-[6px] text-white border-none" onClick={handleOk}>
              Approve
            </Button>,
            <Button key="reject" className="text-base rounded-[4px] bg-danger-500 hover:bg-danger-600 py-1 px-[6px] text-white border-none" onClick={handleReject}>
              Reject
            </Button>,
          ]}
        >
          {selectedReport && <ModalContent selectedReport={selectedReport} />}
        </Modal>

        <Modal
          open={isRejectModalVisible}
          onOk={handleRejectOk}
          onCancel={handleRejectCancel}
          centered
          closeIcon={false}
          width={633}
        >
          <h3 className='h4 font-bold'>Are you sure you want to reject this report?</h3>
          <FloatingLabelInput 
          type='desc'
          label={"Type Your Reason Here"}
          placeholder={""}
          className="mt-[30px]"
          />
          <div className='flex flex-col gap-3 mt-11 btn-m font-bold'>
            <button className='py-3 w-full bg-primary-500 text-white rounded-[5px]'>Reject</button>
            <button className='py-3 w-full border border-primary-500 text-primary-500 rounded-[5px]'>Cancel</button>
          </div>
        </Modal>
      </div>
    </ContentLayout>
  );
};

export default ManageReport;
