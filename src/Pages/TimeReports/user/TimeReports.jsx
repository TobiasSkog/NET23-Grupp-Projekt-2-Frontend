import React, { useState, useEffect } from 'react';
import { Button } from 'react-bootstrap';
import axios from 'axios';
import { useLocation, useNavigate } from 'react-router-dom';
import ReportModal from './ReportModal'; // Modal for adding new reports
import ReportListModal from './ReportListModal'; // Modal for listing reports
import EditReportModal from './EditReportModal'; // Modal for editing a report

const TimeReports = ({ userSignal }) => {
	const [showReportModal, setShowReportModal] = useState(false);
	const [showReportListModal, setShowReportListModal] = useState(false);
	const [showEditReportModal, setShowEditReportModal] = useState(false);
	const [projects, setProjects] = useState([]);
	const [timeReports, setTimeReports] = useState([]);
	const [selectedReport, setSelectedReport] = useState(null);
	const [reportData, setReportData] = useState({ date: '', hours: '', note: '', projectId: '' });
  
	const location = useLocation();
	const navigate = useNavigate();
	const user = userSignal.value; 
  
	useEffect(() => {
	  if (!user) {
		navigate('/');
		return;
	  }
	  fetchProjects();
	  fetchTimeReports();
	}, [user, navigate]);

	useEffect(() => {
		if (location.pathname === '/timereports/user') {
		  setShowReportModal(true);
		}
	  }, [location.pathname]);

  const fetchProjects = async () => {
    try {
      const response = await axios.get('http://localhost:3001/databases/projects');
      setProjects(response.data || []);
    } catch (error) {
      console.error('Failed to fetch projects:', error);
    }
  };

  const fetchTimeReports = async () => {
    try {
      const response = await axios.get('http://localhost:3001/databases/timereports');
      const userTimeReports = response.data.filter(report => report.person === user.id);
      setTimeReports(userTimeReports);
    } catch (error) {
      console.error('Failed to fetch time reports:', error);
    }
  };

  const openReportModal = () => setShowReportModal(true);
  const closeReportModal = () => setShowReportModal(false);
  const openReportListModal = () => setShowReportListModal(true);
  const closeReportListModal = () => setShowReportListModal(false);

  const handleEditReportSelection = (report) => {
    setSelectedReport(report);
    setShowReportListModal(false);
    setShowEditReportModal(true);
  };

  const closeEditReportModal = () => {
    setShowEditReportModal(false);
    setSelectedReport(null); // Reset selected report on modal close
    fetchTimeReports(); // Refetch reports to reflect any updates
  };

  const handleSubmitReport = async (report) => {
    try {
      const response = await axios.post('http://localhost:3001/pages/timereports', report);
      console.log('Report added:', response.data);
    } catch (error) {
      console.error('Failed to add time report:', error);
    }
    closeReportModal();
  };

  const handleUpdateReport = async (updatedReport) => {
    try {
		const response = await axios.patch(
			`http://localhost:3001/pages/timeReports/user/${updatedReport.id}`,
			{
			  date: updatedReport.date,
			  hours: updatedReport.hours,
			  note: updatedReport.note,
			  personId: updatedReport.person,
			  projectId: updatedReport.project,
			}
		  );
      console.log('Report updated:', response.data);
      closeEditReportModal();
    } catch (error) {
      console.error('Failed to update report:', error);
    }
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', paddingTop: '2rem' }}>
      <Button onClick={openReportModal} style={{ marginBottom: '1rem' }}>
        Report Time
      </Button>
      <Button onClick={openReportListModal}>
        View/Edit Time Reports
      </Button>

      <ReportModal
        showModal={showReportModal}
        closeModal={closeReportModal}
        projects={projects}
        reportData={reportData}
        setReportData={setReportData}
        userId={user.id}
		handleSubmit={handleSubmitReport}
        location={location}
      />

      <ReportListModal
        showModal={showReportListModal}
        closeModal={closeReportListModal}
        reports={timeReports}
        onEditReport={handleEditReportSelection}
      />

      <EditReportModal
        showModal={showEditReportModal}
        closeModal={closeEditReportModal}
        selectedReport={selectedReport}
        handleUpdateReport={handleUpdateReport}
        // additional props and event handlers as needed
      />
    </div>
  );
};

export default TimeReports;