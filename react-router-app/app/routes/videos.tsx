import { useLoaderData, type LoaderFunction } from "react-router";
import JokeJumper from "~/components/JokeJumper";
import { getVideos } from "~/models/videos";
import type { Video } from "~/models/videos";

export const clientLoader: LoaderFunction = async () => {
  const videos = await getVideos();
  console.log("videos in loader:>>", videos);
  return { videos };
};

export default function Videos() {
  const { videos } = useLoaderData<{ videos: Video[] }>();

  return (
    <div>
      <h1>Videos</h1>
        <ul>
        {videos.map((video) => (
          <li key={video.id}>
            <JokeJumper videoId={video.youtube_id} />
          </li>
        ))}
      </ul>
    </div>
  );
}
