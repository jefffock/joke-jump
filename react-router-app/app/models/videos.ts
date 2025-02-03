import { gqlRequest } from "~/utils/graphql";

export interface Video {
  id: string;
  youtube_id: string;
  created_at: string;
  updated_at: string;
}

export async function getVideos() {
  const query = `
    query GetVideos {
      videos {
        id
        youtube_id
        created_at
        updated_at
      }
    }
  `;

  const data = await gqlRequest<{ videos: Video[] }>(query);
  return data.videos;
}
