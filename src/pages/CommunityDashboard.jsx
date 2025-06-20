import TimeseriesChart from "../components/charts/TimeseriesChart";
import CommunitySummaryChart from "../components/charts/CommunitySummaryChart";
import CommunityTypeChart from "../components/charts/CommunityTypeChart";
import RegionalTrendsChart from "../components/charts/RegionalTrendsChart";
import SectoralByRegionChart from "../components/charts/SectoralByRegionChart";
import SectoralTrendNationalChart from "../components/charts/SectoralTrendNationalChart";
import SectorByCommunityTypeChart from "../components/charts/SectorByCommunityTypeChart";

export const CommunityDashboard = () => {
  return (
    <div className="p-4 grid grid-cols-1 gap-4">
      <CommunitySummaryChart />
      <TimeseriesChart />
      <CommunityTypeChart />
      <RegionalTrendsChart />
      <SectoralByRegionChart />
      <SectoralTrendNationalChart />
      <SectorByCommunityTypeChart />
    </div>
  );
};
