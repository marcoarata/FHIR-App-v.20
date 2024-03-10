import React, { useEffect, useState } from 'react';
import axios from "axios";
import Layout from '../../components/Layout'
import { Table } from 'antd';
import { useDispatch } from 'react-redux';
import { hideLoading, showLoading } from '../../redux/alertsSlice';
import { Link } from 'react-router-dom';

function Patients() {
  const [patients, setPatients] = useState([]);
  const dispatch = useDispatch();

  const BASE_URL = "http://hapi.fhir.org/baseR4";

  useEffect(() => {
    dispatch(showLoading());
    axios
      .get(BASE_URL + "/Patient")
      .then(res => setPatients(res.data))
      .catch((error) => {
        console.log(error);
      })
    dispatch(hideLoading());
  }, []);

  const columns = [
    {
      title: "Id",
      dataIndex: "resource.id",
      render: (text, record) => <span>{record.resource.id}</span>,
    },
    {
      title: "First Name",
      dataIndex: "resource.name[0].given",
      render: (text, record) => <span>{(record.resource.name != null && record.resource.name[0].given[0]) || "-"}</span>,
    },
    {
      title: "Last Name",
      dataIndex: "resource.name[0].family",
      render: (text, record) => <span>{(record.resource.name != null && record.resource.name[0].family) || "-"}</span>,
    },
    {
      title: "Phone Number",
      dataIndex: "resource.telecom[0].value",
      render: (text, record) => <span>{(record.resource.telecom != null && record.resource.telecom[0].value) || "-"}</span>,
    },
    {
      title: "View More",
      render: (text, record) => (
        <Link to={`/doctor/patients/${record.resource.id}`} className='view-btn'>View</Link>
      ),
    },

  ];

  return (
    <Layout>
      <h1 className="page-title">Patients</h1>
      <hr className="spacer" />
      <Table columns={columns} dataSource={patients.entry} />
    </Layout>
  );
};

export default Patients;