'use client'

import React, { useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { API_ROUTES } from "@/api_routes/routes";
import { toast } from 'react-toastify';
import { useRouter } from "next/navigation";
import {Spinner, useScrollShadow} from "@nextui-org/react";
import { setLazyProp } from "next/dist/server/api-utils";

export default function ForgotPassword() {
  const [loader, setloader] = useState(false)
    const router = useRouter()
  const formik = useFormik({
    initialValues: {
      email: "",
    },
    validationSchema: Yup.object({
      email: Yup.string()
        .email("Invalid email address")
        .required("Email is required"),
    }),
    onSubmit: async(values) => {
      setloader(true)
        const {email} = values
        const emails = {"email":[email]}
       await axios.post(`${process.env.NEXT_PUBLIC_BASE_URL}${API_ROUTES.forgot_password}`,emails).then(res=>{
            toast.success(res.data.message, { position: 'top-center' })
            setloader(false)
          }).catch(err=>{
            console.log(err)
          })
    },
  });

  return (
    <section>
    <div className="flex flex-col items-center justify-center h-full md:mt-44 px-6 py-6 mx-auto lg:py-0">
        <div className="w-full p-6 bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md dark:bg-gray-800 dark:border-gray-700 sm:p-8 border">
        <button
            className="mb-4 text-sm text-blue-500 hover:underline"
            onClick={() => {
              router.push('/authenticate');
            }}
          >
            Go Back to Login
          </button>
          <h2 className="mb-1 text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
            Forgot Password ?
          </h2>
          <form
            className="mt-4 space-y-4 lg:mt-5 md:space-y-5"
            onSubmit={formik.handleSubmit}
          >
            <div>
              <label
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                htmlFor="email"
              >
                Enter your email for reset password link
              </label>
              <input
                type="email"
                name="email"
                id="email"
                className={`bg-gray-50 border ${
                  formik.errors.email && formik.touched.email
                    ? "border-red-500"
                    : "border-gray-300"
                } text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500`}
                placeholder="Company@domain.com"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.email}
              />
              {formik.errors.email && formik.touched.email && (
                <div className="text-red-500 text-sm mt-1">
                  {formik.errors.email}
                </div>
              )}
            </div>

            <button
              type="submit"
              disabled={!formik.isValid || formik.isSubmitting}
              className="w-full text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
            >
              {loader ? <Spinner size="sm"></Spinner>:"Get Link"}
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}

