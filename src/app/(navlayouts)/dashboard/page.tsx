'use client'
import React, { useEffect, useState } from "react"
import { Table, TableHeader, TableColumn, TableBody, TableRow, TableCell, Skeleton, Card, Spinner, Pagination, Chip } from "@nextui-org/react";
import axios from 'axios';
import { API_ROUTES } from "@/api_routes/routes";
import { getServerCookies } from "@/app/getServerCookies";


export default function Dashboard() {
   const [columnsvals, setColumnvals] = useState<string[]>([])
   const [rows, setRows] = useState<string[]>([])
   const [loader, setLoader] = useState(true)

   const fetchUsers = (token: string) => {
      axios.get(`${process.env.NEXT_PUBLIC_BASE_URL}${API_ROUTES.get_all_users}`, {
         headers: {
            'Authorization': `Bearer ${token}`
         }
      }).then(res => {
         const response = res.data
         console.log(response.data)
         setColumnvals(Object.keys(response?.data[0]))
         setRows(response.data)
         setLoader(false)
      }).catch(err => {
         // const error = err.response.data.message
      })
   }

   const [page, setPage] = React.useState(1);
   const rowsPerPage = 15;

   const pages = Math.ceil(rows.length / rowsPerPage);

   const items = React.useMemo(() => {
      const start = (page - 1) * rowsPerPage;
      const end = start + rowsPerPage;

      return rows.slice(start, end);
   }, [page, rows]);


   useEffect(() => {
      const getToken = async () => {
         const token = await getServerCookies('token')
         if (token !== undefined)
            fetchUsers(token.value)
      }
      getToken()

   }, [])

   return (
      <>
         <div className="p-4 sm:ml-64">
            <div className="p-4 rounded-lg dark:border-gray-700 mt-14">
               {
                  loader ? <Card className="w-full space-y-5 p-4" radius="lg"><Skeleton className="w-full rounded-lg">
                     <div className="h-9 w-4/5 rounded-lg bg-default-200"></div>
                  </Skeleton> <Spinner /></Card> :
                     <Table aria-label="Example static collection table" bottomContent={
                        <div className="flex w-full justify-center">
                           <Pagination
                              isCompact
                              showControls
                              showShadow
                              color="secondary"
                              page={page}
                              total={pages}
                              onChange={(page) => setPage(page)}
                           />
                        </div>
                     }
                        classNames={{
                           wrapper: "min-h-[222px]",
                        }}>
                        <TableHeader>
                           {
                              columnsvals.length > 0 ? columnsvals.map((val, index) => (
                                 <TableColumn key={index}>{val}</TableColumn>
                              )) : <Skeleton className="w-4/5 rounded-lg">
                                 <div className="h-3 w-4/5 rounded-lg bg-default-200"></div>
                              </Skeleton>
                           }

                        </TableHeader>
                        <TableBody items={items}>
                           {(item: any) => (
                              <TableRow key={item.id}>
                                 <TableCell>{item.id}</TableCell>
                                 <TableCell>{item.email}</TableCell>
                                 <TableCell>{item.role}</TableCell>
                                 <TableCell>
                                    <Chip className="capitalize" color={JSON.stringify(item.active) == 'true' ? 'success' : 'warning'} size="sm" variant="flat">
                                       {JSON.stringify(item.active) == 'true' ? 'Active' : 'Inactive'}
                                    </Chip></TableCell>
                              </TableRow>
                           )}
                        </TableBody>
                     </Table>

               }

            </div>
         </div>
      </>
   )
}