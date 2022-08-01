import { gql, GraphQLClient } from "graphql-request";
import type { NextApiRequest, NextApiResponse } from "next";

type Data = {
  name: string;
};

const graphqlAPI = process.env.NEXT_PUBLIC_GRAPHCMS_ENDPOINT;
const graphqlToken = process.env.NEXT_GRAPHCMS_TOKEN;

export default async function comments(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  const graphqlClient = new GraphQLClient(graphqlAPI!, {
    headers: { authorization: `Bearer ${graphqlToken}` },
  });

  const query = gql`
    mutation CreateComment(
      $name: String!
      $email: String!
      $comment: String!
      $slug: String!
    ) {
      createComment(
        data: {
          name: $name
          email: $email
          comment: $comment
          post: { connect: { slug: $slug } }
        }
      ) {
        id
      }
    }
  `;

  try {
    const result = await graphqlClient.request(query, req.body);

    return res.status(200).send(result);
  } catch (error) {
    console.log(error);
    res.status(500);
  }
}
