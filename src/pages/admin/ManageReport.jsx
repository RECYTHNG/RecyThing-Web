import { useEffect, useMemo, useState } from 'react';
import { Modal, Tag, Button, Input } from 'antd';
import Filters from '../../components/Report/Filters';
import Tables from '../../components/global/Table';
import LabeledValue from '../../components/Report/LabeledValue';
import ContentLayout from '../../layouts/ContentLayout';
import FloatingLabelInput from '../../components/global/input/FloatingInput';
import { useFetch, useUpdateData } from '../../hooks/useFetch';
import { getHour } from '../../utils/helper/getHour';
import { toast } from 'react-toastify';

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

const mapStatus = (status) => {
  switch (status) {
    case 'approve':
      return 'Accepted';
    case 'reject':
      return 'Rejected';
    case 'need review':
      return 'Need Review';
    default:
      return status;
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
          <LabeledValue labelWidth={135} label="Reporting Time" value={selectedReport.hour} />
          <LabeledValue labelWidth={135} label="Location" value={selectedReport.location} />
          <LabeledValue labelWidth={135} label="Detail Location" value={selectedReport.detailLocation} />
        </div>
        <div className="flex flex-col gap-3">
          <LabeledValue labelWidth={135} label="Description" value={selectedReport.description} />
          <LabeledValue
            labelWidth={135}
            label="Photo Evidence"
            value={
              <div className="grid grid-cols-3 gap-2">
                {selectedReport?.photo?.map((photoUrl, idx) => (
                  <div key={'photo-' + idx} className="aspect-square w-[78px]">
                    <img src={photoUrl} alt="img1" className="w-full object-cover object-center" />
                  </div>
                ))}
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
  const [reason, setReason] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [reportCategory, setReportCategory] = useState('');
  const [status, setStatus] = useState('');
  const [date, setDate] = useState('');

  const buildQueryParams = () => {
    const params = [];
    if (reportCategory) params.push(`report_type=${reportCategory}`);
    if (status) params.push(`status=${status}`);
    if (date) params.push(`date=${date}`);
    return params.join('&');
  };

  const queryParams = buildQueryParams();
  const fetchUrl = `/reports?page=${currentPage}&limit=${pageSize}${queryParams ? `&${queryParams}` : ''}`;

  const { data: reportData, isLoading } = useFetch(fetchUrl, [], [fetchUrl]);
  const { mutateAsync: updateStatus } = useUpdateData();

  console.log(reportData)

  const data = useMemo(
    () =>
      reportData?.data?.reports?.map((data) => ({
        id: data.id,
        author_id: data.author.id,
        name: data.author.name,
        category: data.report_type,
        status: mapStatus(data.status),
        date: new Date(data.created_at).toLocaleDateString('id-ID'),
        hour: getHour(data.created_at),
        ss: data.created_at,
        location: `${data.city}, ${data.province}`,
        detailLocation: `${data.address}, ${data.city}, ${data.province}`,
        description: data.description,
        photo: data.report_images,
      })) || [],
    [reportData]
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
    updateStatus({ endpoint: `/report/${selectedReport.id}`, updatedData: { status: 'approve' } })
      .then((data) => {
        setIsModalVisible(false);
        toast.success('The Report Was Accepted');
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleCancel = () => {
    setIsModalVisible(false);
    setReason('');
  };

  const handleReject = () => {
    setIsModalVisible(false);
    setIsRejectModalVisible(true);
  };

  const handleRejectCancel = () => {
    setIsRejectModalVisible(false);
    setIsModalVisible(true);
    setReason('');
  };

  const handleRejectOk = () => {
    updateStatus({ endpoint: `/report/${selectedReport.id}`, updatedData: { status: 'reject', reason } })
      .then((data) => {
        setIsRejectModalVisible(false);
        setReason('');
        toast.error('The Report Was Rejected');
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handlePageChange = (page, pageSize) => {
    setCurrentPage(page);
    setPageSize(pageSize);
  };

  const handleFilterChange = (newCategory, newStatus, newDate) => {
    setReportCategory(newCategory);
    setStatus(newStatus);
    setDate(newDate);
  };

  return (
    <ContentLayout title={'Manage Report'}>
      <div className="px-6 py-9">
        <div className="flex items-end justify-end text-[#414141]">
          <Filters reportCategory={reportCategory} status={status} date={date} onFilterChange={handleFilterChange} />
        </div>
        <Tables pagination={true} initialPageSize={10} data={{ items: data, totalCount: reportData?.data?.total || 0 }} columns={columns} enableRowClick onRowClick={showModal} onPageChange={handlePageChange} isLoading={isLoading} />
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

        <Modal open={isRejectModalVisible} onOk={handleRejectOk} onCancel={handleRejectCancel} centered closeIcon={false} width={633} footer={false}>
          <h3 className="h4 font-bold">Are you sure you want to reject this report?</h3>
          <FloatingLabelInput type="desc" label={'Type Your Reason Here'} value={reason} onChange={(e) => setReason(e.target.value)} placeholder={''} className="mt-[30px]" />
          <div className="flex flex-col gap-3 mt-11 btn-m font-bold">
            <button className="py-3 w-full bg-primary-500 text-white rounded-[5px]" onClick={handleRejectOk}>
              Reject
            </button>
            <button className="py-3 w-full border border-primary-500 text-primary-500 rounded-[5px]" onClick={handleRejectCancel}>
              Cancel
            </button>
          </div>
        </Modal>
      </div>
    </ContentLayout>
  );
};

export default ManageReport;
