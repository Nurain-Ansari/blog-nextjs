"use server";

import { CommonError } from "@/types/serverActionResponse";

export default async function actionFeaturedImage(
  reqData: FormData
): Promise<any | CommonError> {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BACKEND_API_URL}/uploads`,
    {
      method: "POST",
      headers: {
        // Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: reqData,
    }
  );
  const resData = await res.json();
  return resData;
}
