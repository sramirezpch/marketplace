import type { NextPage } from "next";

const Home: NextPage = () => {
  const requestAccount = async () => {
    console.log("Requesting account");
  };

  return (
    <div>
      <button className="border-2 px-3 py-1 bg-white" onClick={requestAccount}>
        Connect wallet
      </button>
    </div>
  );
};

export default Home;
