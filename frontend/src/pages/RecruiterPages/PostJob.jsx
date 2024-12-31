import React, { useEffect, useState } from 'react';
import JobFormDrawer from '../../components/JobFormDrawer';
import axios from 'axios';
import { getToken } from '../../lib/utils';
import { DataTable } from 'mantine-datatable';
import { Menu, ActionIcon, Box, Modal, Text } from '@mantine/core';
import { EllipsisVertical, Trash, Edit, Eye } from 'lucide-react';

const getId = () => '676f991bbe8238cc08cc0f3e';

function PostJob() {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedJob, setSelectedJob] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    const fetchJobs = async () => {
      const id = getId();
      try {
        const response = await axios.get(
          `http://localhost:3000/api/job/${id}/creator`,
          {
            headers: { Authorization: `Bearer ${getToken()}` },
          }
        );
        setJobs(response.data.data);
      } catch (err) {
        setError(err.response?.data?.message || 'Error fetching data');
      } finally {
        setLoading(false);
      }
    };

    fetchJobs();
  }, []);

  const handleRowClick = (job) => {
    setSelectedJob(job.record);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedJob(null);
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="m-10">
      <div className="mb-10">
        <JobFormDrawer />
      </div>

      <DataTable
        borderRadius="md"
        highlightOnHover
        fetching={loading}
        records={jobs}
        columns={[
          {
            accessor: 'index',
            title: 'No',
            render: (_, index) => index + 1,
            width: 50,
          },
          {
            accessor: 'title',
            title: 'Job Title',
          },
          {
            accessor: 'companyName',
            title: 'Company Name',
          },
          {
            accessor: 'location',
            title: 'Location',
          },
          {
            accessor: 'employment',
            title: 'Employment Type',
            render: (job) => job.employment.join(', '),
          },
          {
            accessor: 'isActive',
            title: 'Status',
            render: (job) => (
              <span
                style={{ backgroundColor: job.isActive ? 'green' : 'red' }}
                className="px-2 py-1 rounded-full text-sm"
              >
                {job.isActive ? 'Active' : 'Inactive'}
              </span>
            ),
          },
          {
            accessor: 'applicants',
            title: 'Applicants',
            render: (job) => <span>{job.applicants?.length || 0} </span>,
          },
          {
            accessor: 'actions',
            title: 'Actions',
            render: (job) => (
              <Menu>
                <Menu.Target>
                  <ActionIcon>
                    <EllipsisVertical size={16} />
                  </ActionIcon>
                </Menu.Target>
                <Menu.Dropdown>
                  <Menu.Item
                    icon={<Eye size={16} />}
                    onClick={() => handleRowClick({ record: job })}
                  >
                    View Details
                  </Menu.Item>
                  <Menu.Item
                    icon={<Eye size={16} />}
                    onClick={() => handleRowClick({ record: job })}
                  >
                    View Applicants
                  </Menu.Item>
                  <Menu.Item
                    icon={<Edit size={16} />}
                    onClick={() => console.log('Update job:', job._id)}
                  >
                    Update
                  </Menu.Item>
                  <Menu.Item
                    icon={<Trash size={16} />}
                    color="red"
                    onClick={() => console.log('Delete job:', job._id)}
                  >
                    Deactivate
                  </Menu.Item>
                </Menu.Dropdown>
              </Menu>
            ),
          },
        ]}
      />

      <Modal
        opened={isModalOpen}
        onClose={handleCloseModal}
        title={selectedJob?.title || 'Job Details'}
      >
        {selectedJob ? (
          <Box>
            <Text>
              <strong>Company Name:</strong> {selectedJob.companyName}
            </Text>
            <Text>
              <strong>Location:</strong> {selectedJob.location}
            </Text>
            <Text>
              <strong>Employment Type:</strong>{' '}
              {selectedJob?.employment.join(', ')}
            </Text>
            <Text>
              <strong>Description:</strong> {selectedJob.jobDescription}
            </Text>
            <Text>
              <strong>Requirements:</strong>{' '}
              {selectedJob?.requirement.join(', ')}
            </Text>
            <Text>
              <strong>Experience:</strong> {selectedJob.experience}
            </Text>
            <Text>
              <strong>Salary Range:</strong> ${selectedJob.salaryRange.min} - $
              {selectedJob.salaryRange.max}
            </Text>
            <Text>
              <strong>Applicants:</strong> {selectedJob.applicants?.length || 0}
            </Text>
          </Box>
        ) : (
          <Text>No job selected</Text>
        )}
      </Modal>
    </div>
  );
}

export default PostJob;
