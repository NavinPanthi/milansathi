import axios from "axios";

import { cookies } from "next/headers";
export async function POST(req) {
  const { email, password } = await req.json();

  try {
    const response = await axios.post(
      `${process.env.NEXT_PUBLIC_API_URL}/users/login`,
      {
        email,
        password,
      }
    );

    const data = await response.data;

    if (data.status === false) {
      return Response.json({ status: false });
    } else {
      cookies().set("token", data.data.token.access_token);
      return Response.json(data);
    }
  } catch (error) {
    return Response.json(error);
  }
}
