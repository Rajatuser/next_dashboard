'use client'

import React, { useEffect, useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { API_ROUTES } from "@/api_routes/routes";
import { usePathname } from "next/navigation";
import {Card, Skeleton} from "@nextui-org/react";
import { ErrorBoundary } from "next/dist/client/components/error-boundary";

const ChangePassword = () => {

  const pathname = usePathname()
  const [loader, setLoader] = useState(true)
  const formik = useFormik({
    initialValues: {
      password: "",
      confirmPassword: "",
      acceptTerms: false,
    },
    validationSchema: Yup.object({
      password: Yup.string()
        .required("Password is required")
        .min(8, "Password must be at least 8 characters"),
      confirmPassword: Yup.string()
        .oneOf([Yup.ref("password")], "Passwords must match")
        .required("Confirm password is required"),
      acceptTerms: Yup.boolean()
        .oneOf([true], "You must accept the Terms and Conditions"),
    }),
    onSubmit: (values) => {

      console.log("Form submitted with values:", values);
    },
  });

  const authorizeUser = async() =>{
    const token = pathname.split("/")[2]
    const headers = {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    }
    let authorize_user = false
    await axios.post(`${process.env.NEXT_PUBLIC_BASE_URL}${API_ROUTES.authorize_user}`,{},{
      headers: headers
    }).then(res=>{
      console.log(res)
      setLoader(false)
      authorize_user = true
    }).catch(err=>{
      console.log(err)
    })
    return authorize_user
  }

  useEffect(()=>{
    const author = async() =>{
      const userCheck = await authorizeUser()
      if (!userCheck){
        throw new Error('Unauthorized User')
      }
    } 
    author()
  
  },[])

  return (
    <div>
    {
      loader ? <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0"><Card className="w-[500px] mx-auto my-10 space-y-5 p-4" radius="lg">
      <Skeleton className="rounded-lg">
        <div className="h-14 rounded-lg bg-default-300"></div>
      </Skeleton>
      <div className="space-y-3">
      <Skeleton className="rounded-lg">
        <div className="h-14 rounded-lg bg-default-300"></div>
      </Skeleton>
      <Skeleton className="rounded-lg">
        <div className="h-14 rounded-lg bg-default-300"></div>
      </Skeleton>
      <Skeleton className="rounded-lg">
        <div className="h-14 rounded-lg bg-default-300"></div>
      </Skeleton>
      </div>
    </Card>
    </div>:
    <section className="bg-gray-50 dark:bg-gray-900">
    <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
      <div className="w-full p-6 bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md dark:bg-gray-800 dark:border-gray-700 sm:p-8">
        <h2 className="mb-1 text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
          Change Password
        </h2>
        
        <form
          onSubmit={formik.handleSubmit}
          className="mt-4 space-y-4 lg:mt-5 md:space-y-5"
          action="#"
        >
          <div>
            <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
              New Password
            </label>
            <input
              type="password"
              // name="password"
              id="password"
              placeholder="••••••••"
              {...formik.getFieldProps("password")}
              className={`${
                formik.touched.password && formik.errors.password
                  ? "border-red-500"
                  : "border-gray-300"
              } bg-gray-50 border text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500`}
            />
            {formik.touched.password && formik.errors.password && (
              <div className="text-red-500">{formik.errors.password}</div>
            )}
          </div>
          <div>
            <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
              Confirm Password
            </label>
            <input
              type="password"
              // name="confirmPassword"
              id="confirmPassword"
              placeholder="••••••••"
              {...formik.getFieldProps("confirmPassword")}
              className={`${
                formik.touched.confirmPassword &&
                formik.errors.confirmPassword
                  ? "border-red-500"
                  : "border-gray-300"
              } bg-gray-50 border text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500`}
            />
            {formik.touched.confirmPassword &&
              formik.errors.confirmPassword && (
                <div className="text-red-500">
                  {formik.errors.confirmPassword}
                </div>
              )}
          </div>
          <div className="flex items-start">
            <div className="flex items-center h-5">
              <input
                id="acceptTerms"
                aria-describedby="acceptTerms"
                type="checkbox"
                checked={formik.values.acceptTerms}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-primary-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-primary-600 dark:ring-offset-gray-800"
              />
            </div>
            <div className="ml-3 text-sm">
              <label className="font-light text-gray-500 dark:text-gray-300">
                I accept the{" "}
                <a
                  className="font-medium text-primary-600 hover:underline dark:text-primary-500"
                  href="#"
                >
                  Terms and Conditions
                </a>
              </label>
            </div>
          </div>
          {formik.touched.acceptTerms && formik.errors.acceptTerms && (
            <div className="text-red-500">{formik.errors.acceptTerms}</div>
          )}
          <button
            type="submit"
            className="w-full text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
          >
            Reset Password
          </button>
        </form>
      </div>
    </div>
  </section>
    }
    </div>
    
  );
};

export default ChangePassword;
