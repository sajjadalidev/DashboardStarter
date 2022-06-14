import { Card, CardContent, Typography } from "@mui/material";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { TextField, Icon, IconButton } from "@mui/material";
import { yupResolver } from "@hookform/resolvers/yup";
import { InputAdornment, Button } from "@mui/material";
import { useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { useSelector, useDispatch } from "react-redux";
import EmailIcon from "@mui/icons-material/Email";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import * as yup from "yup";
import _ from "@lodash";
import { submitLogin } from "app/auth/store/loginSlice";

const defaultValues = {
  email: "",
  password: "",
};
/**
 * Form Validation Schema
 */
const schema = yup.object().shape({
  email: yup
    .string()
    .email("You must enter a valid email")
    .required("You must enter a email"),
  password: yup
    .string()
    .required("Please enter your password.")
    .min(8, "Password should be of minimum 8 characters length"),
});
function Login() {
  const login = useSelector(({ auth }) => auth.login);
  const { control, formState, handleSubmit, setError } = useForm({
    mode: "onChange",
    defaultValues,
    resolver: yupResolver(schema),
  });
  const { isValid, dirtyFields, errors } = formState;
  const dispatch = useDispatch();
  const [showPassword, setShowPassword] = useState(false);

  useEffect(() => {
    login.errors.forEach((error) => {
      setError(error.type, {
        type: "manual",
        message: error.message,
      });
    });
  }, [login.errors, setError]);

  const onSubmit = (model) => {
    dispatch(submitLogin(model));
  };

  return (
    <div
      className="flex flex-col flex-auto items-center justify-center "
      style={{
        backgroundImage: `url("/assets/images/backgrounds/bg11.jpg")`,
        backgroundSize: "cover",
      }}
    >
      <div className="flex flex-col items-center justify-center w-full">
        <motion.div
          initial={{ opacity: 0, scale: 0.6 }}
          animate={{ opacity: 1, scale: 1 }}
        >
          <Card className="w-full">
            <CardContent className="flex flex-col items-center justify-center p-16 sm:p-24 md:p-32 w-400">
              <Typography
                variant="h6"
                className="mt-16 mb-24 font-semibold text-18 sm:text-24"
              >
                Sign In
              </Typography>

              <div className="w-full">
                <form
                  className="flex flex-col justify-center w-full"
                  onSubmit={handleSubmit(onSubmit)}
                >
                  <Controller
                    name="email"
                    control={control}
                    render={({ field }) => (
                      <TextField
                        {...field}
                        className="mb-16"
                        type="text"
                        label="Email"
                        error={!!errors.email}
                        helperText={errors?.email?.message}
                        InputProps={{
                          endAdornment: (
                            <InputAdornment position="end">
                              <EmailIcon className="text-20" color="action" />
                            </InputAdornment>
                          ),
                        }}
                        variant="outlined"
                        required
                      />
                    )}
                  />

                  <Controller
                    name="password"
                    control={control}
                    render={({ field }) => (
                      <TextField
                        {...field}
                        className="mb-16"
                        type="password"
                        label="Password"
                        error={!!errors.password}
                        helperText={errors?.password?.message}
                        InputProps={{
                          className: "pr-2",
                          type: showPassword ? "text" : "password",
                          endAdornment: (
                            <InputAdornment position="end">
                              <IconButton
                                onClick={() => setShowPassword(!showPassword)}
                                size="large"
                              >
                                <Icon className="text-20" color="action">
                                  {showPassword ? (
                                    <VisibilityIcon
                                      className="text-20 mb-10"
                                      color="action"
                                    />
                                  ) : (
                                    <VisibilityOffIcon
                                      className="text-20 mb-10"
                                      color="action"
                                    />
                                  )}
                                </Icon>
                              </IconButton>
                            </InputAdornment>
                          ),
                        }}
                        variant="outlined"
                        required
                      />
                    )}
                  />

                  <Button
                    type="submit"
                    variant="contained"
                    color="primary"
                    className="w-full mx-auto mt-16"
                    aria-label="LOG IN"
                    disabled={_.isEmpty(dirtyFields) || !isValid}
                    sx={{
                      backgroundColor: "rgb(0, 37, 79)",
                    }}
                  >
                    Log in
                  </Button>
                </form>
              </div>

              <div className="flex flex-col items-center justify-center pt-32 pb-24">
                <div>
                  <span className="font-normal mr-8">
                    Don't have an account?
                  </span>
                  <Link className="font-normal" to="/register">
                    Register
                  </Link>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  );
}

export default Login;
