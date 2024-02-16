
import React from "react";
import {Card, Skeleton} from "@nextui-org/react";


export default function Loading(){
    return (
        <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0"><Card className="w-[500px] mx-auto my-10 space-y-5 p-4" radius="lg">
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
    </div>
    )
}