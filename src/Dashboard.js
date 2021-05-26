import { useState, useEffect } from "react";
import useAuth from "./useAuth";
import spotifyWebApi from "spotify-web-api-node";
import TrackSearchResult from "./TrackSearchResult";
import Player from "./player";
import axios from "axios";

const spotifyApi = new spotifyWebApi({
  clientId: "fb9a97862c6740ce936275cbbbcc8551",
  country: "SV",
  timestamp: "2014-10-23T09:00:00",
});

export default function Dashboard({ code }) {
  console.log({ code });
  const accessToken = useAuth(code);
  const [search, setSearch] = useState("");
  const [searchResult, setSearchResult] = useState([]);
  const [playingTrack, setPlayingTrack] = useState();
  const [lyrics, setLyrics] = useState();

  function chooseTrack(track) {
    setPlayingTrack(track);
    setSearch("");
    setLyrics("");
  }
  useEffect(() => {
    if (!playingTrack) return;
    axios
      .get("http://localhost:3001/lyrics", {
        params: {
          track: playingTrack.title,
          artist: playingTrack.artist,
        },
      })
      .then((res) => {
        setLyrics(res.data.lyrics);
      });
  }, [playingTrack]);

  useEffect(() => {
    if (!accessToken) return;
    spotifyApi.setAccessToken(accessToken);
  }, [accessToken]);

  useEffect(() => {
    if (!search) return setSearchResult([]);
    if (!accessToken) return;

    let cancel = false;
    spotifyApi.searchTracks(search).then((res) => {
      console.log(res);
      if (cancel) return;
      setSearchResult(
        res.body.tracks.items.map((track) => {
          const smallestAlbumImage = track.album.images.reduce(
            (smallest, image) => {
              if (image.height < smallest.height) return image;
              return smallest;
            },
            track.album.images[0]
          );
          return {
            artist: track.artists[0].name,
            title: track.name,
            uri: track.uri,
            albumUrl: smallestAlbumImage.url,
          };
        })
      );
    });
    return () => (cancel = true);
  }, [search, accessToken]);

  /*useEffect(() => {
    if (!search) return setSearchResult([]);
    if (!accessToken) return;
    let cancel = false;
    spotifyApi
      .getFeaturedPlaylists({
        country: "SV",
      })
      .then((res) => {
        console.log({ res });
        if (cancel) return;
        setSearchResult(
          res.body.playlists.items.map((track) => {
            /*const smallestAlbumImage = track.album.images.reduce(
              (smallest, image) => {
                if (image.height < smallest.height) return image;
                return smallest;
              },
              track.album.images[0]
            );
            return {
              title: track.name,
              uri: track.uri,
            };
          })
        );
      });
    return () => (cancel = true);
  }, [search, accessToken]);*/

  return (
    <div className=" flex flex-col justify-center items-center min-h-screen fondo">
      <div className="w-2/4 min-h-screen text-white">
        <div className="w-full h-full relative pb-14">
          <input
            type="search"
            placeholder="Busca tu cancion preferida"
            className="w-full px-2 border rounded py-2"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <div className="">
            {searchResult.map((track) => (
              <TrackSearchResult
                track={track}
                key={track.uri}
                chooseTrack={chooseTrack}
              />
            ))}
          </div>
          {searchResult.length === 0 && (
            <div className="text-center flex justify-center items-center w-5/12 m-auto space-y-1.5 text-xl pt-8 px-14">
              {lyrics}
            </div>
          )}
        </div>
      </div>
      <div className="fixed bottom-0 w-full ">
        <Player accessToken={accessToken} trackUri={playingTrack?.uri} />
      </div>
    </div>
  );
}
