import YouTubePlayer from "react-player";
import type { PreviewProps } from "sanity";

export function YouTubePreview(props: PreviewProps) {
  const { title: url } = props;

  return (
    <div className="flex justify-center items-center">
      {typeof url === "string" ? (
        <YouTubePlayer src={url} />
      ) : (
        <p>Add a YouTube URL</p>
      )}
    </div>
  );
}
