import Button from "./button";
export default function Login() {
  const AUTH_URL =
    "https://accounts.spotify.com/authorize?client_id=fb9a97862c6740ce936275cbbbcc8551&response_type=code&redirect_uri=http://localhost:3000&scope=streaming%20user-read-email%20user-read-private%20user-library-read%20user-library-modify%20user-read-playback-state%20user-modify-playback-state";

  return (
    <div className="w-full bg-image flex justify-center items-center h-screen">
      <div className="px-4 py-4 bg-black fixed top-0 left-0 w-full">
        <Button children="ssss">
          <a className="px-3 py-1 text-white font-bold" href={AUTH_URL}>
            Login Spotify
          </a>
        </Button>
      </div>
      <div className="w-full  text-green-500 text-center ">
        <p className="text-7xl font-black">
          Escuchar <br /> es <br /> todo
        </p>
        <p className="mt-4">
          Ingresa con la cuenta: <b></b> y contraseña: <b></b>{" "}
        </p>
      </div>
    </div>
  );
}
