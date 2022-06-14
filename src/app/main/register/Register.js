import { motion } from "framer-motion";
import GoogleMap from "google-map-react";
import { Link } from "react-router-dom";
import React, { useState } from "react";
import {
  Typography,
  CardContent,
  Card,
  CardHeader,
  CardActions,
} from "@mui/material";
import AddIcCallIcon from "@mui/icons-material/AddIcCall";
import SendIcon from "@mui/icons-material/Send";

import { Grid } from "@mui/material";
import { useFormik } from "formik";
import * as yup from "yup";

import { Button, TextField, MenuItem, Select } from "@mui/material";
import { CircularProgress, FormControl, InputLabel } from "@mui/material";

import { useGetAllCities, useGetAllStates } from "app/reactQuery/hooks/general";

// validation Schema
const validationSchema = yup.object({
  firstName: yup.string().required().label("First Name"),
  lastName: yup.string().required().label("Last name"),
  email: yup
    .string()
    .email("You must enter a valid email")
    .required("You must enter a email"),
  practiceName: yup.string().required().label("Practice Name"),
  practiceAddress: yup.string().required().label("Practice Address"),
  streetAddress: yup.string().required().label("Street Address 2"),
  city: yup.string().required().label("City"),
  state: yup.string().required().label("State"),
  zip: yup.number().required().label("Zip Code"),
});
const center = {
  lat: 59.95,
  lng: 30.33,
  zoom: 11,
};
function Register() {
  const { data: states } = useGetAllStates();
  const { data: cities, isFetching, setCustomState } = useGetAllCities();

  const [waiting, setWaiting] = useState(false);
  const formik = useFormik({
    initialValues: {
      firstName: "",
      lastName: "",
      email: "",
      practiceName: "",
      practiceAddress: "",
      streetAddress: "",
      city: "",
      state: "",
      zip: "",
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      GenerateLead.mutate(values);
    },
  });
  return (
    <div
      className="flex flex-col flex-auto items-center justify-center flex-shrink-0 p-16 md:p-24"
      style={{
        backgroundImage: `url("/assets/images/backgrounds/bg11.jpg")`,
        backgroundSize: "cover",
      }}
    >
      {!waiting && (
        <motion.div
          initial={{ opacity: 0, scale: 0.6 }}
          animate={{ opacity: 1, scale: 1 }}
        >
          <Card className="w-full">
            <CardContent className="flex flex-col items-center justify-center p-16 sm:p-24 md:p-32 w-600">
              <Typography
                variant="h6"
                className="mt-5 mb-10 font-semibold text-18 sm:text-24"
              >
                Sign Up
              </Typography>
              <div className="w-full">
                <form
                  onSubmit={formik.handleSubmit}
                  className="flex flex-col justify-center w-full"
                >
                  <Grid container spacing={1}>
                    <Grid item xs={6} md={6}>
                      <TextField
                        fullWidth
                        className="mb-16"
                        id="firstName"
                        name="firstName"
                        label="First Name"
                        value={formik.values.firstName}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        error={
                          formik.touched.firstName &&
                          Boolean(formik.errors.firstName)
                        }
                        helperText={
                          formik.touched.firstName && formik.errors.firstName
                        }
                        required
                      />
                    </Grid>
                    <Grid item xs={6} md={6}>
                      <TextField
                        fullWidth
                        className="mb-16"
                        id="lastName"
                        name="lastName"
                        label="Last Name"
                        value={formik.values.lastName}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        error={
                          formik.touched.lastName &&
                          Boolean(formik.errors.lastName)
                        }
                        helperText={
                          formik.touched.lastName && formik.errors.lastName
                        }
                        required
                      />
                    </Grid>
                  </Grid>
                  <TextField
                    fullWidth
                    className="mb-16"
                    id="email"
                    name="email"
                    label="Email"
                    value={formik.values.email}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    error={formik.touched.email && Boolean(formik.errors.email)}
                    helperText={formik.touched.email && formik.errors.email}
                    required
                  />
                  <TextField
                    fullWidth
                    className="mb-16"
                    id="practiceName"
                    name="practiceName"
                    label="Practice Name"
                    value={formik.values.practiceName}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    error={
                      formik.touched.practiceName &&
                      Boolean(formik.errors.practiceName)
                    }
                    helperText={
                      formik.touched.practiceName && formik.errors.practiceName
                    }
                    required
                  />
                  <TextField
                    fullWidth
                    className="mb-16"
                    id="practiceAddress"
                    name="practiceAddress"
                    label="Address Line 1"
                    value={formik.values.practiceAddress}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    error={
                      formik.touched.practiceAddress &&
                      Boolean(formik.errors.practiceAddress)
                    }
                    helperText={
                      formik.touched.practiceAddress &&
                      formik.errors.practiceAddress
                    }
                    required
                  />
                  <TextField
                    fullWidth
                    className="mb-16"
                    id="streetAddress"
                    name="streetAddress"
                    label="Address Line 2"
                    value={formik.values.streetAddress}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    error={
                      formik.touched.streetAddress &&
                      Boolean(formik.errors.streetAddress)
                    }
                    helperText={
                      formik.touched.streetAddress &&
                      formik.errors.streetAddress
                    }
                    required
                  />
                  <Grid container spacing={1}>
                    <Grid item xs={6} md={4}>
                      <FormControl fullWidth>
                        <InputLabel id="state">State</InputLabel>
                        <Select
                          labelId="state"
                          id="demo-simple-select"
                          value={formik.values.state}
                          label="State"
                          onChange={(e) => {
                            formik.setFieldValue(
                              "state",
                              String(e.target.value)
                            );
                            // convert state_id into string
                            setCustomState(String(e.target.value));
                          }}
                        >
                          {states?.data?.map((state) => (
                            <MenuItem value={state.id} key={state.id}>
                              {state.name}
                            </MenuItem>
                          ))}
                        </Select>
                      </FormControl>
                    </Grid>
                    <Grid item xs={6} md={4}>
                      <FormControl fullWidth>
                        <InputLabel id="select-city-label">City</InputLabel>
                        <Select
                          labelId="select-city"
                          id="city"
                          value={formik.values.city}
                          label="City"
                          onChange={(e) =>
                            formik.setFieldValue("city", e.target.value)
                          }
                        >
                          {isFetching ? (
                            <CircularProgress />
                          ) : (
                            cities?.data?.map((city) => (
                              <MenuItem value={city.name} key={city.id}>
                                {city.name}
                              </MenuItem>
                            ))
                          )}
                        </Select>
                      </FormControl>
                    </Grid>

                    <Grid item xs={6} md={4}>
                      <TextField
                        fullWidth
                        className="mb-16"
                        id="zip"
                        name="zip"
                        label="Zip"
                        value={formik.values.zip}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        error={formik.touched.zip && Boolean(formik.errors.zip)}
                        helperText={formik.touched.zip && formik.errors.zip}
                        required
                      />
                    </Grid>
                  </Grid>

                  <Button
                    color="primary"
                    variant="contained"
                    className=" mx-auto mt-16"
                    type="submit"
                    disabled={!formik.isValid || !formik.dirty}
                    sx={{
                      backgroundColor: "rgb(0, 37, 79)",
                    }}
                  >
                    Submit
                  </Button>
                </form>
              </div>
              <div className="flex flex-col items-center justify-center pt-24 pb-32">
                <div>
                  <span className="font-normal mr-6">
                    Already have an account?
                  </span>
                  <Link className="font-normal" to="/login">
                    Login
                  </Link>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      )}
      {waiting && (
        <Card sx={{ maxWidth: "1000px" }} className="p-5">
          <Grid container spacing={2}>
            <Grid item xs={6} md={6}>
              <CardHeader title="Thank You for Signing up with Smyl Plan! " />
              <CardContent className="text-16" sx={{ height: "350px" }}>
                We are excited to have you on-boarded. We have received the
                initial information to get you started with onboarding. Our Team
                is reviewing the information and will be updating you with next
                steps shortly. If you have any questions in the meantime feel
                free to reach our team anytime.
              </CardContent>
              <CardActions>
                <Button
                  size="medium"
                  variant="contained"
                  startIcon={<AddIcCallIcon />}
                  sx={{
                    backgroundColor: "rgb(0, 37, 79)",
                  }}
                >
                  Call Us
                </Button>
                <Button
                  size="medium"
                  variant="contained"
                  endIcon={<SendIcon />}
                  sx={{
                    backgroundColor: "rgb(0, 37, 79)",
                  }}
                >
                  Email Us
                </Button>
              </CardActions>
            </Grid>
            <Grid item xs={6} md={6} sx={{ height: "500px" }}>
              <CardHeader title="Contact Us" />
              <GoogleMap
                bootstrapURLKeys={{
                  key: process.env.REACT_APP_MAP_KEY,
                }}
                defaultZoom={center.zoom}
                defaultCenter={[center.lat, center.lng]}
              />
            </Grid>
          </Grid>
        </Card>
      )}
    </div>
  );
}

export default Register;
