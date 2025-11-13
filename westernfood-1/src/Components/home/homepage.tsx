import { Newspaper } from "lucide-react";

export function Homepage() {
  return (
    <>
      <div className="w-full h-[60vh] bg-red-100 flex relative">
        <img src="/bg1.svg" className="w-full h-full object-cover" />
        <div className="absolute inset-0 flex gap-2 flex-col items-start justify-end">
          <div className="w-[8%] h-[8%] ml-12 border border-[#FF4655]/50 bg-[#FF4655]/20 flex justify-center items-center">
            <p className="text-[#FF4655] text-xl">LIVE NOW</p>
          </div>
          <h1 className="text-5xl text-white pl-12">
            Welcome to Valorant Esports Hub
          </h1>
          <p className="text-white text-2xl pl-12">
            Stay updated with the latest news, stats, and tournaments
          </p>
        </div>
      </div>
      <div className="w-full h-[35vh] flex items-center justify-around">
        {/* Box 1 */}
        <div className="card w-96 h-[175px] bg-[#1C252E] card-md shadow-sm">
          <div className="card-body">
            <div className="w-[40px] h-[40px] flex justify-center items-center rounded-xl bg-white">
              <Newspaper className="bg-white" />
            </div>
            <h2 className="card-title text-[#ECE8E1]">News</h2>
            <p className="text-[#8A8D91]">
              Read the latest updates from the Valorant competitive scene
            </p>
          </div>
        </div>
        {/* Box 2 */}
        <div className="card w-96 h-[175px] bg-[#1C252E] card-md shadow-sm">
          <div className="card-body">
            <div className="w-[40px] h-[40px] flex justify-center items-center rounded-xl bg-white">
              <Newspaper className="bg-white" />
            </div>
            <h2 className="card-title text-[#ECE8E1]">Player Stats</h2>
            <p className="text-[#8A8D91]">
              View top player rankings and performance statistics
            </p>
          </div>
        </div>
        {/* Box 3 */}
        <div className="card w-96 h-[175px] bg-[#1C252E] card-md shadow-sm">
          <div className="card-body">
            <div className="w-[40px] h-[40px] flex justify-center items-center rounded-xl bg-white">
              <Newspaper className="bg-white" />
            </div>
            <h2 className="card-title text-[#ECE8E1]">Upcoming Events</h2>
            <p className="text-[#8A8D91]">
              Check out upcoming tournaments and competitions
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
