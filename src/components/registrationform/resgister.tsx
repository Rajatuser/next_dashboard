'use client'

import React from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { Card, Input } from "@nextui-org/react";
import { Roles } from '../roles/roles';
import axios from 'axios';
import {API_ROUTES} from '@/api_routes/routes'
import { toast } from 'react-toastify';
import { useRouter } from 'next/navigation';


const Register = () => {
    
    const router = useRouter()
    const validationSchema = Yup.object({
        email: Yup.string().email('Invalid email address').required('Email is required'),
        role: Yup.string().required('Role is required'),
        password: Yup.string().min(6, 'Password must be at least 6 characters').required('Password is required'),
        confirmPassword: Yup.string().required('Confirm Password is required').oneOf([Yup.ref('password')], 'Passwords must match'),
        terms: Yup.boolean().oneOf([true], 'You must accept the terms and conditions'),
    });

    const formik = useFormik({
        initialValues: {
            email: '',
            role: '',
            password: '',
            confirmPassword: '',
            terms: false,
        },
        validationSchema: validationSchema,
        onSubmit: (values,  { resetForm }) => {
            const {confirmPassword,terms,...otherProps} = values
            axios.post(`${process.env.NEXT_PUBLIC_BASE_URL}${API_ROUTES.user_registration}`,otherProps).then(res=>{
                const response = res.data
                toast.success(response.message,{position:"top-center"});
                resetForm()
                setTimeout(()=>{
                    router.push('/authenticate?page=login')
                ,500})
            }).catch(err=>{
                const error = err.response.data.message
                toast.error(error,{position:"top-center"})
                // resetForm()
            })
        },
    });

    return (
        <Card className="bg-white rounded-lg shadow md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800">
            <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
                <h1 className="text-xl text-center font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                    Create an account
                </h1>
                <form className="space-y-4 md:space-y-6" onSubmit={formik.handleSubmit}>
                    <div>
                        <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Email</label>
                        <input
                            type="email"
                            id="email"
                            name="email"
                            value={formik.values.email}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            className={`${formik.touched.email && formik.errors.email ? 'border-red-500' : ''
                                } bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500`}
                            placeholder="company@domain.com"
                        />
                        {formik.touched.email && formik.errors.email && (
                            <div className="text-red-500">{formik.errors.email}</div>
                        )}
                    </div>

                    <div>
                        <label htmlFor="role" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Role</label>
                        <select
                            id="role"
                            name="role"
                            value={formik.values.role}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            className={`${formik.touched.role && formik.errors.role ? 'border-red-500' : ''
                                } bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500`}
                        >
                            <option disabled value="">Select Role</option>
                            {Roles.map(item => (
                                <option key={item.label} value={item.value}>
                                    {item.value}
                                </option>
                            ))}
                        </select>
                        {formik.touched.role && formik.errors.role && (
                            <div className="text-red-500">{formik.errors.role}</div>
                        )}
                    </div>

                    <div>
                        <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Password</label>
                        <input
                            type="password"
                            id="password"
                            name="password"
                            value={formik.values.password}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            className={`${formik.touched.password && formik.errors.password ? 'border-red-500' : ''
                                } bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500`}
                            placeholder="Enter Password"
                        />
                        {formik.touched.password && formik.errors.password && (
                            <div className="text-red-500">{formik.errors.password}</div>
                        )}
                    </div>

                    <div>
                        <label htmlFor="confirmPassword" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Password</label>
                        <input
                            type="password"
                            id="confirmPassword"
                            name="confirmPassword"
                            value={formik.values.confirmPassword}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            className={`${formik.touched.confirmPassword && formik.errors.confirmPassword ? 'border-red-500' : ''
                                } bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500`}
                            placeholder="Confrm Password"
                        />
                        {formik.touched.confirmPassword && formik.errors.confirmPassword && (
                            <div className="text-red-500">{formik.errors.confirmPassword}</div>
                        )}
                    </div>

                    <div className="flex items-start">
                        <div className="flex items-center h-5">
                            <input 
                             type="checkbox"
                             id="terms"
                             name="terms"
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            className={`${formik.touched.terms && formik.errors.terms ? 'border-red-500' : ''
                                } bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500`}/>
                        </div>
                        <div className="ml-3 text-sm">
                            <label className="font-light text-gray-500 dark:text-gray-300">I accept the <a className="font-medium text-primary-600 hover:underline dark:text-primary-500" href="#">Terms and Conditions</a></label>
                        </div>
                    </div>
                    <div>
                    {formik.touched.terms && formik.errors.terms && (
                            <div className="text-red-500">{formik.errors.terms}</div>
                        )}
                    </div>

                   
                    <button
                        type="submit"
                        className="w-full text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
                    >
                        Create an account
                    </button>
                </form>
            </div>
        </Card>
    );
};

export default Register;
