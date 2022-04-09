import type { NextApiRequest, NextApiResponse } from "next"

type EndpointData = {
  id: number;
  city: string;
  state: string;
  type: string;
  price: number;
}[]

type Endpoint = {
  data: EndpointData;
}

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Endpoint>
) {
  res.status(200).json({
    data: [
      {
        id: 1,
        city: "Attleboro",
        state: "Georgia",
        type: "Apartment",
        price: 218
      },
      {
        id: 2,
        city: "Enterprise",
        state: "Wyoming",
        type: "Condo",
        price: 696
      },
      {
        id: 3,
        city: "South Hill",
        state: "Montana",
        type: "Condo",
        price: 1190
      }
    ]
  })
}
