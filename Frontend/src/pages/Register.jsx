import { useState } from "react";
import Link from "@mui/material/Link";
import { useNavigate } from "react-router-dom";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import EmailIcon from "@mui/icons-material/Email";
import LockIcon from "@mui/icons-material/Lock";
import { TextField } from "@mui/material";
import IconButton from "@mui/material/IconButton";
import InputAdornment from "@mui/material/InputAdornment";
import { registerSchema } from "../schemas/user.js";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import Button from "@mui/material/Button";
import PersonIcon from "@mui/icons-material/Person";
import { registerApi } from "../Api/user.js";
import { Circles } from "react-loader-spinner";
export function Register() {
  const {
    control,
    handleSubmit,
    formState: { isValid, errors },
  } = useForm({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      username: "",
      email: "",
      password: "",
    },
    mode: "onChange",
  });
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const onSubmit = (data) => {
    setLoading(true);
    registerApi(data)
      .then(
        (res) =>
          new Promise((resolve) => {
            setTimeout(() => resolve(res), 2000);
          })
      )
      .then((res) => {
        navigate("/login");
        console.log(res.data);
      })
      .catch((e) => {
        console.log(e);
      })
      .finally(() => {
        setLoading(false);
      });
  };
  const [showPassword, setShowPassword] = useState(false);

  function OnClickShowPassword() {
    setShowPassword(!showPassword);
  }

  return (
    // <div className="bg-linear-to-r from-blue-400 to-teal-600 w-screen h-screen flex justify-center items-center">
    //   <div className="bg-white h-3/5 rounded-xl p-7  border-2 flex flex-col gap-4 justify-evenly items-center">
    //     <h1 className="font-[Poppins] font-semibold text-4xl">Login</h1>
    //     <p className="font-[Poppins]">Get started with Ciccada today</p>
    //     <div className="w-90 flex flex-col justify-center items-center">
    //       <form
    //         onSubmit={handleSubmit(onSubmit)}
    //         className="w-full flex flex-col gap-5"
    //       >
    <div className="min-h-screen w-screen bg-linear-to-r from-blue-400 to-teal-600 flex items-center justify-center p-4">
      <div className="bg-white w-full max-w-md rounded-xl p-7 shadow-lg border-2 flex flex-col gap-4">
        <h1 className="font-[Poppins] font-semibold text-4xl text-center">
          Sign Up
        </h1>
        <p className="font-[Poppins] text-center">
          Get started with Ciccada today
        </p>

        {/* <-- restored wrapper div around the form (was missing) */}
        <div className="w-full flex flex-col items-center">
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="w-full flex flex-col gap-5"
          >
            <Controller
              name="username"
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  autoComplete="off"
                  label="Username"
                  type="text"
                  variant="filled"
                  fullWidth
                  error={!!errors.username}
                  helperText={errors.username?.message}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <PersonIcon />
                      </InputAdornment>
                    ),
                  }}
                />
              )}
            />
            <Controller
              name="email"
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  autoComplete="off"
                  label="Email"
                  variant="filled"
                  fullWidth
                  error={!!errors.email}
                  helperText={errors.email?.message}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <EmailIcon />
                      </InputAdornment>
                    ),
                  }}
                />
              )}
            />

            <Controller
              name="password"
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  autoComplete="off"
                  label="Password"
                  type={showPassword ? "text" : "password"}
                  variant="filled"
                  fullWidth
                  error={!!errors.password}
                  helperText={errors.password?.message}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <LockIcon />
                      </InputAdornment>
                    ),
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton onClick={OnClickShowPassword} edge="end">
                          {showPassword ? <VisibilityOff /> : <Visibility />}
                        </IconButton>
                      </InputAdornment>
                    ),
                  }}
                />
              )}
            />
            <Button
              type="submit"
              variant="contained"
              disabled={!isValid}
              sx={{
                backgroundColor: "black",
                color: "white",
                "&:hover": {
                  backgroundColor: "#333",
                },
              }}
            >
              Sign Up
            </Button>
          </form>
          <p>
            Already have an account? <Link href="/login">Login</Link>
          </p>
        </div>
      </div>
      <div
        className={
          loading
            ? "absolute flex justify-center items-center w-screen h-screen bg-[rgba(184,178,178,0.5)]"
            : "hidden"
        }
      >
        <div className="">
          <Circles
            height="80"
            width="80"
            color="#4fa94d"
            ariaLabel="circles-loading"
            wrapperStyle={{}}
            wrapperClass=""
            visible={true}
          />
        </div>
      </div>
    </div>
  );
}
