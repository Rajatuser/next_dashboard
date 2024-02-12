import React from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import { API_ROUTES } from '@/api_routes/routes';
import { toast } from 'react-toastify';
import { useRouter } from 'next/navigation';
import { setServerCookies } from '@/app/setServerCookies';
import Link from 'next/link'; 
import secureLocalStorage from "react-secure-storage";


const Login = () => {
    const router = useRouter();
    const initialValues = {
        email: '',
        password: '',
    };

    const validationSchema = Yup.object({
        email: Yup.string().email('Invalid email address').required('Email is required'),
        password: Yup.string().required('Password is required'),
    });

    const handleSubmit = (values: any, { setSubmitting }: { setSubmitting: (isSubmitting: boolean) => void }) => {
        console.log(values);
        const { ...vals } = values;
        axios.post(`${process.env.NEXT_PUBLIC_BASE_URL}${API_ROUTES.user_login}`, vals)
            .then(res => {
                const response = res.data;
                toast.success(response.message, { position: 'top-center' });
                setServerCookies(response.token, response.user, response.role);
                localStorage.setItem('isLoggedIn', 'true')
                setTimeout(() => {
                    router.push('/dashboard');
                }, 200);
            })
            .catch(err => {
                console.log(err, '###error occurred');
                if(err?.message == "Network Error"){
                    toast.error("Server is down. Try Later!", { position: 'top-center' });
                }else{
                    const error = err.response?.data?.message || 'An error occurred';
                    toast.error(error, { position: 'top-center' });
                }
             
            })
            .finally(() => {
                setSubmitting(false);
            });
    };

    return (
        <div className="bg-white rounded-lg shadow md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800">
            <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
                <h1 className="text-center text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                    Sign in to your account
                </h1>
                <Formik
                    initialValues={initialValues}
                    validationSchema={validationSchema}
                    onSubmit={handleSubmit}
                >
                    {({ isSubmitting, touched, errors }) => (
                        <Form className="space-y-4 md:space-y-6" action="#">
                            <div>
                                <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your email</label>
                                <Field
                                    type="email"
                                    name="email"
                                    id="email"
                                    className={`w-full input-field rounded-lg border border-gray-300 ${touched.email && errors.email ? 'border-red-500' : ''}`}
                                    placeholder="company@domain.com"
                                />
                                <ErrorMessage name="email" component="div" className="text-red-500" />
                            </div>
                            <div>
                                <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Password</label>
                                <Field
                                    type="password"
                                    name="password"
                                    id="password"
                                    placeholder="••••••••"
                                    className={`w-full input-field rounded-lg border border-gray-300 ${touched.password && errors.password ? 'border-red-500' : ''}`}
                                />
                                <ErrorMessage name="password" component="div" className="text-red-500" />
                            </div>
                            <button
                                type="submit"
                                disabled={isSubmitting}
                                className="w-full text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
                            >
                                Sign in
                            </button>
                            <div className="text-center text-sm text-gray-700 dark:text-gray-300">
                                <Link href="/forgotPassword" className='text-blue-600'>
                                    Forgot Password ?
                                </Link>
                            </div>
                        </Form>
                    )}
                </Formik>
            </div>
        </div>
    );
};

export default Login;
