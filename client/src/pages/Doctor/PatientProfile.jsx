import React, { useEffect, useState } from 'react';
import axios from "axios";
import Layout from '../../components/Layout';
import { Col, Form, Input, Row } from 'antd';
import { useDispatch } from 'react-redux';
import { hideLoading, showLoading } from '../../redux/alertsSlice';
import { Link, useParams } from 'react-router-dom';

function PatientProfile() {
  const params = useParams();
  const [patients, setPatients] = useState([]);
  const dispatch = useDispatch();

  const BASE_URL = "http://hapi.fhir.org/baseR4";

  useEffect(() => {
    dispatch(showLoading());
    axios
      .get(BASE_URL + "/Patient/" + params.userId)
      .then(res => setPatients(res.data))
      .catch((error) => {
        console.log(error);
      })
    dispatch(hideLoading());
  }, []);

  const myArray = [];
  const myObject = patients;
  myArray.push(myObject);

  return (
    <Layout>
      <h1 className="page-title">Patient Profile</h1>
      <hr className="spacer" />
      <h1 className="card-title mt-3">Personal Information</h1>

      {myArray.map((patient) => (

        <Form layout="vertical">

          <Row className='py-5' gutter={20}>
            <Col span={8} xs={24} sm={24} lg={8}>
              <Form.Item
                label="Id"
                name="id"
              >
                <Input key={patient.id} disabled placeholder={(patient.id != null && patient.id) || "-"} />
              </Form.Item>
            </Col>
            <Col span={8} xs={24} sm={24} lg={8}>
              <Form.Item
                label="First Name"
                name="firstName"
              >
                <Input disabled placeholder={(patient.name != null && patient.name[0].given[0]) || "-"} />
              </Form.Item>
            </Col>
            <Col span={8} xs={24} sm={24} lg={8}>
              <Form.Item
                label="Last Name"
                name="lastName"
              >
                <Input disabled placeholder={(patient.name != null && patient.name[0].family) || "-"} />
              </Form.Item>
            </Col>
            <Col span={8} xs={24} sm={24} lg={8}>
              <Form.Item
                label="Phone Number"
                name="phoneNumber"
              >
                <Input disabled placeholder={(patient.telecom != null && patient.telecom[0].value) || "-"} />
              </Form.Item>
            </Col>
            <Col span={8} xs={24} sm={24} lg={8}>
              <Form.Item
                label="Email"
                name="email"
              >
                <Input disabled placeholder="user@example.com" />
              </Form.Item>
            </Col>
            <Col span={8} xs={24} sm={24} lg={8}>
              <Form.Item
                label="Address"
                name="address"
              >
                <Input disabled placeholder="-" />
              </Form.Item>
            </Col>
            <Col span={8} xs={24} sm={24} lg={8}>
              <Form.Item
                label="Gender"
                name="gender"
              >
                <Input key={patient.gender} disabled placeholder={(patient.gender != null && patient.gender) || "-"} />
              </Form.Item>
            </Col>
            <Col span={8} xs={24} sm={24} lg={8}>
              <Form.Item
                label="Birth Date"
                name="birthDate"
              >
                <Input key={patient.birthDate} disabled placeholder={(patient.birthDate != null && patient.birthDate) || "-"} />
              </Form.Item>
            </Col>
          </Row>

          <div className="is-flex is-justify-content-end">
            <Link to='/doctor/patients' className='view-btn-patient'>Volver</Link>
          </div>
        </Form>

      ))}

    </Layout>
  );
};

export default PatientProfile;