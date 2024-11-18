import type { PreviewProps } from "sanity";
import YouTubePlayer from "react-player/youtube";

export function YouTubePreview(props: PreviewProps) {
  const { title: url } = props;

  return (
    <div className="flex justify-center items-center">
      {typeof url === "string" ? (
        <YouTubePlayer url={url} />
      ) : (
        <p>Add a YouTube URL</p>
      )}
    </div>
  );
}
