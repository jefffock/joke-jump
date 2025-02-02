import YouTube, { type YouTubeProps } from "react-youtube";
import { useRef } from "react";
import TimestampButton from "./TimestampButton";

export default function JokeJumper() {
  const playerRef = useRef<any>(null);

  const onPlayerReady: YouTubeProps["onReady"] = (event) => {
    playerRef.current = event.target;
    console.log("onPlayerReady", event.target);
  };

  const onPause: YouTubeProps["onPause"] = (event) => {
    console.log("onPause", event);
    event.target.pauseVideo();
  };

  const handlePauseClick = () => {
    playerRef.current?.pauseVideo();
  };

  const handleTimestampClick = (timestamp: number) => {
    playerRef.current?.seekTo(timestamp);
  };

  //https://www.youtube.com/watch?v=7GfWXN5Lp1s&ab_channel=RodneyDangerfield
  const opts: YouTubeProps["opts"] = {
    height: "390",
    width: "640",
    playerVars: {
      // https://developers.google.com/youtube/player_parameters
      autoplay: 1,
      color: "white",
      enablejsapi: 1,
    },
  };

  const timestamps = [
    { startTime: 100, label: "Joke 1" },
    { startTime: 200, label: "Joke 2" },
    { startTime: 300, label: "Joke 3" },
    { startTime: 400, label: "Joke 4" },
    { startTime: 500, label: "Joke 5" },
    { startTime: 600, label: "Joke 6" },
    { startTime: 700, label: "Joke 7" },
    { startTime: 800, label: "Joke 8" },
    { startTime: 900, label: "Joke 9" },
    { startTime: 1000, label: "Joke 10" },
  ];

  return (
    <>
      <YouTube
        videoId="7GfWXN5Lp1s"
        opts={opts}
        onReady={onPlayerReady}
        onPause={onPause}
      />
      {/* <button type='button' onClick={handlePauseClick}>Pause</button>  */}
      {timestamps.map((timestamp) => (
        <TimestampButton
          key={timestamp.startTime}
          timestamp={timestamp.startTime}
          label={timestamp.label}
          handleTimestampClick={handleTimestampClick}
        />
      ))}
    </>
  );
}
