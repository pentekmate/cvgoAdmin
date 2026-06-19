import CvColorTrends from '../Components/CvColorTrends';
import DownloadCvTypes from '../Components/DownloadCvTypes';
import { DownloadChart } from '../Components/DownloadsChart';

export const Home = () => {
  return (
    <div className="w-screen min-h-screen bg-darkModeBG font-inter">
      <p>CV letöltések</p>
      <div className="flex">
        <DownloadChart></DownloadChart>
        {/* <DownloadCvTypes></DownloadCvTypes> */}
      </div>

      {/* <CvColorTrends></CvColorTrends> */}
    </div>
  );
};
