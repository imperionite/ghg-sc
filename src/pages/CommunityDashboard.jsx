import { Card, CardContent, Typography, Link } from "@mui/material";
import TimeseriesChart from "../components/charts/TimeseriesChart";
import CommunitySummaryChart from "../components/charts/CommunitySummaryChart";
import CommunityTypeChart from "../components/charts/CommunityTypeChart";
import RegionalTrendsChart from "../components/charts/RegionalTrendsChart";
import SectoralByRegionChart from "../components/charts/SectoralByRegionChart";
import SectoralTrendNationalChart from "../components/charts/SectoralTrendNationalChart";
import SectorByCommunityTypeChart from "../components/charts/SectorByCommunityTypeChart";

const CommunityDashboard = () => {
  return (
    <div className="p-4 grid grid-cols-1 gap-6">
      {/* Community Summary Section with Text Narrative */}
      <Card className="w-full">
        <CardContent className="space-y-4">
          <Typography variant="h3" className="font-semibold">
            🌱 Our collective impact begins locally.
          </Typography>
          <Typography variant="body2" className="text-gray-700">
            This chart reveals how different communities across the country
            contribute to greenhouse gas emissions. Each bar represents a city
            and its region, showing the total emissions in kilograms. The data
            reflects both the <strong>carbon footprint</strong> and{" "}
            <strong>community engagement</strong> in climate action.
          </Typography>
          <Typography variant="body2" className="text-gray-700">
            By analyzing which regions submit the most data — and which generate
            the highest emissions — we uncover where{" "}
            <strong>carbon reduction efforts</strong> need to be prioritized.
            Are some communities leading in carbon reduction, or are others
            still facing greater challenges? This <strong>transparency</strong>{" "}
            empowers local solutions tailored to local needs.
          </Typography>
          <Typography variant="body2" className="text-gray-700">
            <strong>Why this matters:</strong> Our app makes the invisible
            visible, turning complex emissions data into a clear, actionable
            picture for communities. By increasing <strong>awareness</strong>,
            we inspire targeted actions — from{" "}
            <strong>city-wide policies</strong> to{" "}
            <strong>household changes</strong> — all of which reduce our
            collective environmental impact.
          </Typography>
          <Typography variant="body2" className="text-gray-700">
            <strong>What this chart shows:</strong>
          </Typography>
          <Typography variant="body2" className="text-gray-700">
            - <strong>Higher emissions</strong> may correlate with larger
            populations or more carbon-intensive activities (e.g.,
            transportation, energy consumption).
          </Typography>
          <Typography variant="body2" className="text-gray-700">
            - <strong>Frequent data submissions</strong> reflect communities
            that are more engaged and aware of their emissions, while low
            participation suggests a need for <strong>improved advocacy</strong>{" "}
            or better access to climate action tools.
          </Typography>
          <Typography variant="body2" className="text-gray-700">
            <strong>How you can use this:</strong> Find your city or region on
            the chart and compare your emissions to other areas. This chart can
            serve as a conversation starter to{" "}
            <strong>identify local challenges</strong> and{" "}
            <strong>form partnerships</strong> aimed at reducing carbon
            footprints. Together, we can transform{" "}
            <strong>data into meaningful action</strong>.
          </Typography>
          <CommunitySummaryChart />
        </CardContent>
      </Card>

      {/* Timeseries Chart */}
      <Card className="w-full">
        <CardContent className="space-y-4">
          <Typography variant="h4" className="font-semibold">
            🌿 Every day, our choices shape the future.
          </Typography>
          <Typography variant="body2" className="text-gray-700">
            This chart allows us to track whether our collective emissions are
            rising, steady, or falling over time. By observing the patterns, we
            can spot the impacts of <strong>advocacy campaigns</strong>,{" "}
            <strong>local government programs</strong>, or even{" "}
            <strong>national events</strong> on our emissions.
          </Typography>
          <Typography variant="body2" className="text-gray-700">
            Are emissions dropping over time? That’s a sign of growing{" "}
            <strong>environmental responsibility</strong>. Are there spikes? We
            can investigate and respond. This chart is the story of how{" "}
            <strong>small actions</strong> build to create{" "}
            <strong>national change</strong>.
          </Typography>
          <Typography variant="body2" className="text-gray-700">
            <strong>Why this matters:</strong> Our app turns{" "}
            <strong>community emissions data</strong> into a clear picture of
            progress. By seeing trends, we become more accountable and{" "}
            <strong>data-driven</strong>, allowing us to adopt policies that
            directly influence our carbon footprint.
          </Typography>
          <Typography variant="body2" className="text-gray-700">
            <strong>What this chart shows:</strong>
          </Typography>
          <Typography variant="body2" className="text-gray-700">
            - This graph visualizes whether we’re heading in the right
            direction: <strong>Are emissions decreasing?</strong> Are there
            sudden spikes?
          </Typography>
          <Typography variant="body2" className="text-gray-700">
            - Over time, you'll start seeing patterns. For instance, emissions
            may drop during <strong>awareness campaigns</strong> or rise during{" "}
            <strong>holidays</strong> due to increased{" "}
            <strong>transport</strong> and <strong>energy consumption</strong>.
          </Typography>
          <Typography variant="body2" className="text-gray-700">
            - <strong>Collective trends</strong> highlight the power of
            community action — when the curve bends downward, it means change is
            happening.
          </Typography>
          <Typography variant="body2" className="text-gray-700">
            <strong>How you can use this:</strong> This chart helps us see the
            bigger picture. If emissions are decreasing, it’s a sign that we’re
            on the right path. If not, we can respond and drive actions to bend
            the curve. Every bit of data submitted helps build the story of our
            collective impact.
          </Typography>
          <TimeseriesChart />
        </CardContent>
      </Card>

      <Card className="w-full">
        <CardContent className="space-y-4">
          <Typography variant="h4" className="font-semibold">
            🏘 Different communities, different challenges.
          </Typography>
          <Typography variant="body2" className="text-gray-700">
            The following charts compares the average carbon emissions of different
            community types — such as <strong>schools</strong>,{" "}
            <strong>barangays</strong>, and{" "}
            <strong>other local structures</strong>. By analyzing these
            differences, we can pinpoint where the{" "}
            <strong>largest sources of emissions</strong> come from and where{" "}
            <strong>efforts</strong> can have the greatest impact.
          </Typography>
          <Typography variant="body2" className="text-gray-700">
            Is your community type contributing more emissions than others?
            That’s an opportunity to <strong>lead improvements</strong>. Are you
            already performing well? Now’s your chance to{" "}
            <strong>share your strategies</strong> and inspire other communities
            to follow your lead.
          </Typography>
          <Typography variant="body2" className="text-gray-700">
            <strong>Our advocacy:</strong>
          </Typography>
          <Typography variant="body2" className="text-gray-700">
            Our approach tailors solutions to the unique needs of different
            community structures. For example, we have{" "}
            <strong>energy-saving programs</strong> for schools, and{" "}
            <strong>transport policies</strong> for local government units
            (LGUs). By using data, we can match the right{" "}
            <strong>solutions</strong> to each community's{" "}
            <strong>specific challenges</strong>.
          </Typography>
          <Typography variant="body2" className="text-gray-700">
            <strong>How to use this insight:</strong>
          </Typography>
          <Typography variant="body2" className="text-gray-700">
            - <strong>Learn from peers</strong>: If your community type shows
            higher emissions, it’s an opportunity to lead the charge in{" "}
            <strong>reducing emissions</strong>.
          </Typography>
          <Typography variant="body2" className="text-gray-700">
            - If you’re already doing well,{" "}
            <strong>share your strategies</strong> to inspire others and help
            them achieve similar successes.
          </Typography>
          <CommunityTypeChart />
           <SectorByCommunityTypeChart />
        </CardContent>
      </Card>

      <Card className="w-full">
        <CardContent className="space-y-4">
          <Typography variant="h4" className="font-semibold">
            📈 Which regions are leading the way?
          </Typography>
          <Typography variant="body2" className="text-gray-700">
            This chart shows how emissions fluctuate across different regions
            over time. Some regions might display steady progress as local
            solutions take hold, while others may show spikes that signal the
            need for <strong>new initiatives</strong> and{" "}
            <strong>policy adjustments</strong>.
          </Typography>
          <Typography variant="body2" className="text-gray-700">
            Your region's story is an important part of the{" "}
            <strong>national narrative</strong>. Use this insight to forge{" "}
            <strong>local partnerships</strong> and drive{" "}
            <strong>collective change</strong>.
          </Typography>
          <Typography variant="body2" className="text-gray-700">
            <strong>Why this matters:</strong> Tracking emissions at the
            regional level helps identify which areas are making consistent
            improvements and which might need additional support. For instance,
            if a region shows a steady decline in emissions, it could be the
            result of successful local policies like{" "}
            <strong>improved public transportation</strong> or{" "}
            <strong>waste segregation</strong>.
          </Typography>
          <Typography variant="body2" className="text-gray-700">
            <strong>Encouragement:</strong> Let this chart spark{" "}
            <strong>friendly regional competition</strong> — who’s leading the
            way in <strong>climate action</strong>? Friendly rivalry can
            motivate regions to <strong>accelerate progress</strong> and share
            strategies for reducing emissions.
          </Typography>
          <Typography variant="body2" className="text-gray-700">
            <strong>Our advocacy:</strong> Our approach to{" "}
            <strong>regional emissions monitoring</strong> helps tailor{" "}
            <strong>region-specific action plans</strong>. By identifying trends
            at the regional level, we can focus efforts where they’re most
            needed, ensuring that the solutions are both{" "}
            <strong>relevant</strong> and <strong>impactful</strong>.
          </Typography>
          <Typography variant="body2" className="text-gray-700">
            <strong>How you can use this insight:</strong>
          </Typography>
          <Typography variant="body2" className="text-gray-700">
            - Use the trends to identify which regions are{" "}
            <strong>leading</strong> in emissions reduction and learn from their
            successful strategies.
          </Typography>
          <Typography variant="body2" className="text-gray-700">
            - If your region is lagging behind, this chart can highlight areas
            where targeted action is needed to help improve local policies and
            drive change.
          </Typography>
          <RegionalTrendsChart />
        </CardContent>
      </Card>

      <Card className="w-full">
        <CardContent className="space-y-4">
          <Typography variant="h4" className="font-semibold">
            ⚡ Where do we need to focus most?
          </Typography>
          <Typography variant="body2" className="text-gray-700">
            The charts reveals how emissions from various sectors change over
            time. Are we seeing improvement in{" "}
            <strong>transport emissions</strong>, but still struggling with{" "}
            <strong>energy consumption</strong>? Are{" "}
            <strong>waste emissions</strong> going down because more people are{" "}
            <strong>composting</strong> and <strong>recycling</strong>?
          </Typography>
          <Typography variant="body2" className="text-gray-700">
            By understanding these trends, communities and leaders can make{" "}
            <strong>data-driven decisions</strong> and prioritize the right{" "}
            <strong>solutions</strong> at the right time.
          </Typography>
          <Typography variant="body2" className="text-gray-700">
            <strong>Why this matters:</strong> This chart shows which sectors
            are contributing the most to <strong>national emissions</strong> and
            how those contributions are shifting over time. For example:
          </Typography>
          <Typography variant="body2" className="text-gray-700">
            - If <strong>transport emissions</strong> are rising, it could
            suggest an increase in <strong>fossil-fuel travel</strong>,
            signaling a need for cleaner transportation options.
          </Typography>
          <Typography variant="body2" className="text-gray-700">
            - If <strong>waste emissions</strong> are declining, it might
            reflect the positive impact of community efforts like{" "}
            <strong>composting</strong> or more widespread{" "}
            <strong>recycling</strong>.
          </Typography>
          <Typography variant="body2" className="text-gray-700">
            <strong>Call to action:</strong> Know where you can make the{" "}
            <strong>biggest impact</strong>. By understanding sectoral trends,
            you can focus your efforts on the areas that need the most
            attention. This insight helps <strong>everyone</strong> see the{" "}
            <strong>bigger picture</strong>, making it easier to{" "}
            <strong>align</strong> efforts for greater change.
          </Typography>
          <Typography variant="body2" className="text-gray-700">
            <strong>Relationship to our advocacy:</strong> Our approach uses{" "}
            <strong>data-driven sectoral programs</strong> to target the most
            pressing issues. Whether it's offering{" "}
            <strong>clean energy incentives</strong> or launching{" "}
            <strong>waste segregation drives</strong>, our data helps focus
            efforts where they are most needed.
          </Typography>
          <Typography variant="body2" className="text-gray-700">
            <strong>How you can use this insight:</strong>
          </Typography>
          <Typography variant="body2" className="text-gray-700">
            - <strong>Focus on the sectors that need the most help</strong>: If
            a particular sector, like transport or energy, is lagging behind in
            emissions reduction, that’s where you can direct more resources and
            advocacy.
          </Typography>
          <Typography variant="body2" className="text-gray-700">
            - <strong>Support community-driven programs</strong>: If waste
            emissions are declining, continue supporting local efforts like{" "}
            <strong>recycling</strong> and <strong>composting</strong>.
          </Typography>
          <SectoralByRegionChart />
          <SectoralTrendNationalChart />
        </CardContent>
      </Card>
    </div>
  );
};

export default CommunityDashboard;
