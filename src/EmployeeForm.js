import react, * as React from "react";
import { Page, Grid } from "tabler-react";
import SiteWrapper from "./SiteWrapper.react";
import { Button, Form, FormGroup, Label, Input, Alert } from 'reactstrap';
import { withFormik } from 'formik';
import * as Yup from 'yup';

const EmployeeForm = ({ values, handleChange, handleSubmit, errors, touched, isSubmitting, status }) => {
  return (
    <SiteWrapper>
      <Page.Card title="Employee Registration" />
      <Grid.Col md={6} lg={6} className="align-self-center">
        <Form onSubmit={handleSubmit}>
          {status && status.error && (
            <Alert color="danger">
              {status.error}
            </Alert>
          )}
          
          {status && status.success && (
            <Alert color="success">
              Employee created successfully!
            </Alert>
          )}

          <FormGroup>
            {touched.id && errors.id && <p className="text-danger">{errors.id}</p>}
            <Label for="id">Employee ID</Label>
            <Input
              type="text"
              name="id"
              value={values.id}
              onChange={handleChange}
              id="id"
              placeholder="Employee ID"
              invalid={touched.id && !!errors.id}
            />
          </FormGroup>

          <FormGroup>
            {touched.name && errors.name && <p className="text-danger">{errors.name}</p>}
            <Label for="name">Name</Label>
            <Input
              type="text"
              name="name"
              value={values.name}
              onChange={handleChange}
              id="name"
              placeholder="Employee Name"
              invalid={touched.name && !!errors.name}
            />
          </FormGroup>

          <FormGroup>
            {touched.address && errors.address && <p className="text-danger">{errors.address}</p>}
            <Label for="address">Address</Label>
            <Input
              type="text"
              name="address"
              value={values.address}
              onChange={handleChange}
              id="address"
              placeholder="Employee Address"
              invalid={touched.address && !!errors.address}
            />
          </FormGroup>

          <FormGroup>
            {touched.email && errors.email && <p className="text-danger">{errors.email}</p>}
            <Label for="email">Email ID</Label>
            <Input
              type="email"
              name="email"
              value={values.email}
              onChange={handleChange}
              id="email"
              placeholder="Email ID"
              invalid={touched.email && !!errors.email}
            />
          </FormGroup>

          <FormGroup>
            {touched.phone_number && errors.phone_number && <p className="text-danger">{errors.phone_number}</p>}
            <Label for="phone_number">Phone Number</Label>
            <Input
              type="text"
              name="phone_number"
              value={values.phone_number}
              onChange={handleChange}
              id="phone_number"
              placeholder="Phone Number"
              invalid={touched.phone_number && !!errors.phone_number}
            />
          </FormGroup>

          <FormGroup>
            {touched.annual_package && errors.annual_package && <p className="text-danger">{errors.annual_package}</p>}
            <Label for="annual_package">Annual Package</Label>
            <Input
              type="number"
              name="annual_package"
              value={values.annual_package}
              onChange={handleChange}
              id="annual_package"
              placeholder="Annual Package"
              invalid={touched.annual_package && !!errors.annual_package}
            />
          </FormGroup>

          <FormGroup>
            {touched.designation && errors.designation && <p className="text-danger">{errors.designation}</p>}
            <Label for="designation">Job Role</Label>
            <Input
              type="select"
              name="designation"
              id="designation"
              value={values.designation}
              onChange={handleChange}
              invalid={touched.designation && !!errors.designation}
            >
              <option value="">Select Role</option>
              <option value="Developer">Developer</option>
              <option value="DevOps">DevOps</option>
            </Input>
          </FormGroup>

          <FormGroup>
            {touched.status && errors.status && <p className="text-danger">{errors.status}</p>}
            <Label for="status">Status</Label>
            <Input
              type="select"
              name="status"
              id="status"
              value={values.status}
              onChange={handleChange}
              invalid={touched.status && !!errors.status}
            >
              <option value="">Select Status</option>
              <option value="Ex-Employee">Ex-Employee</option>
              <option value="Current Employee">Current Employee</option>
            </Input>
          </FormGroup>

          <FormGroup>
            {touched.office_location && errors.office_location && <p className="text-danger">{errors.office_location}</p>}
            <Label for="office_location">Location</Label>
            <Input
              type="select"
              name="office_location"
              id="office_location"
              value={values.office_location}
              onChange={handleChange}
              invalid={touched.office_location && !!errors.office_location}
            >
              <option value="">Select Location</option>
              <option value="Delhi">Delhi</option>
              <option value="Bangalore">Bangalore</option>
              <option value="Hyderabad">Hyderabad</option>
              <option value="Newyork">Newyork</option>
            </Input>
          </FormGroup>

          <FormGroup>
            {touched.joining_date && errors.joining_date && <p className="text-danger">{errors.joining_date}</p>}
            <Label for="joining_date">Joining Date</Label>
            <Input
              type="date"
              name="joining_date"
              id="joining_date"
              value={values.joining_date}
              onChange={handleChange}
              invalid={touched.joining_date && !!errors.joining_date}
            />
          </FormGroup>

          <Button color="primary" disabled={isSubmitting}>
            {isSubmitting ? 'Submitting...' : 'Submit'}
          </Button>
        </Form>
      </Grid.Col>
    </SiteWrapper>
  );
};

// Validation schema
const validationSchema = Yup.object().shape({
  id: Yup.string()
    .required('Employee ID is required')
    .min(1, 'Employee ID must be at least 1 character'),
  name: Yup.string()
    .required('Name is required')
    .min(2, 'Name must be at least 2 characters'),
  address: Yup.string()
    .required('Address is required'),
  email: Yup.string()
    .email('Invalid email format')
    .required('Email is required'),
  phone_number: Yup.string()
    .required('Phone number is required')
    .matches(/^[0-9]{10}$/, 'Phone number must be exactly 10 digits'),
  annual_package: Yup.number()
    .required('Annual package is required')
    .positive('Annual package must be positive'),
  designation: Yup.string()
    .required('Job role is required'),
  status: Yup.string()
    .required('Status is required'),
  office_location: Yup.string()
    .required('Location is required'),
  joining_date: Yup.date()
    .required('Joining date is required')
    .max(new Date(), 'Joining date cannot be in the future')
});

const FormikApp = withFormik({
  mapPropsToValues() {
    return {
      id: '',
      name: '',
      address: '',
      email: '',
      phone_number: '',
      annual_package: '',
      designation: '',
      status: '',
      office_location: '',
      joining_date: ''
    };
  },

  validationSchema,

  handleSubmit(values, { resetForm, setErrors, setSubmitting, setStatus }) {
    // Clear previous status
    setStatus(null);
    
    // Prepare the payload to match API expectations
    const payload = {
      id: values.id,
      name: values.name,
      address: values.address,
      email: values.email,
      phone_number: values.phone_number,
      annual_package: values.annual_package.toString(),
      department: values.department,
      designation: values.designation,
      status: values.status,
      office_location: values.office_location,
      joining_date: values.joining_date
    };

    console.log("Submitting:", JSON.stringify(payload, null, 2));

    fetch('/api/v1/employee/create', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify(payload)
    })
      .then(response => {
        console.log('Response status:', response.status);
        console.log('Response headers:', response.headers);
        
        if (!response.ok) {
          return response.text().then(errorText => {
            console.error('Error response:', errorText);
            try {
              const errorJson = JSON.parse(errorText);
              throw new Error(errorJson.message || errorJson.error || 'Failed to create employee');
            } catch (parseError) {
              throw new Error(errorText || `HTTP ${response.status}: Failed to create employee`);
            }
          });
        }
        
        return response.json();
      })
      .then(data => {
        console.log("Employee created successfully:", data);
        setStatus({ success: true });
        
        // Send notification
        return fetch('/notification/send', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(payload)
        });
      })
      .then(notificationRes => {
        if (!notificationRes.ok) {
          console.warn("Notification failed, but employee was created successfully");
        } else {
          console.log("Notification sent successfully");
        }
        resetForm();
      })
      .catch(error => {
        console.error("Submission error:", error);
        setStatus({ error: error.message });
      })
      .finally(() => {
        setSubmitting(false);
      });
  }
})(EmployeeForm);

export default FormikApp;
