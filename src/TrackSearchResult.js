export default function TrackSearchResult({ track, chooseTrack }) {
  function handlePlay() {
    chooseTrack(track);
  }

  return (
    <div className="flex justify-center items-center">
      <div
        className="flex flex-col m-2 items-center justify-center text-white"
        style={{ cursor: "pointer" }}
        onClick={handlePlay}
      >
        <img
          src={track.albumUrl}
          style={{ height: "6rem", width: "6rem" }}
          alt=""
        />
        <div className="flex flex-col justify-center items-center ">
          <div>{track.title}</div>
          <div className="text-muted">{track.artist}</div>
        </div>
      </div>
    </div>
  );
}
