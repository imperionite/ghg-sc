import {
  Container,
  Typography,
  Box,
  Grid,
  Paper,
  Divider,
  Button,
  Link,
} from "@mui/material";
import {
  BarChart2,
  Globe,
  Users,
  FileText,
  Activity,
  Layers,
  Building,
  AlertTriangle,
  Repeat,
  MonitorSmartphone,
  Award,
  BookOpen,
} from "lucide-react";
import { Link as RouterLink } from "react-router-dom";

const sections = [
  {
    title: "Introduction",
    content:
      "The intensification of anthropogenic greenhouse gas (GHG) emissions has become a defining challenge of the 21st century, with developing nations like the Philippines confronting unique vulnerabilities and responsibilities in the global climate regime. As a signatory to the Paris Agreement, the Philippines has committed to ambitious Nationally Determined Contributions (NDCs), aiming for a 75% reduction and avoidance of GHG emissions by 2030 across key sectors such as agriculture, energy, transport, industry, and waste management. To actualize these targets, the country has adopted a multi-pronged approach encompassing digital innovation, grassroots engagement, and sectoral policy reforms. \n\nThis essay critically examines the effectiveness and sustainability of existing solutions implemented in the Philippines to address GHG emissions, emphasizing the integration of interactive digital monitoring platforms, community-based emissions surveys, and robust sectoral decarbonization strategies. By incorporating quantitative data and drawing insights from the latest academic and policy literature, the paper explores the role of digital dashboards—such as the author’s developed application, GHG-ScoutPH (https://ghg-scoutph.vercel.app/community-dashboard)—in enhancing transparency, accuracy, and public engagement. The analysis situates these innovations within the broader context of global climate governance, reflecting on lessons from parallel international experiences while highlighting the distinctive pathways and challenges encountered by the Philippines.",
  },
  {
    title: "GHG Emissions Landscape",
    content:
      "GHG emissions in the Philippines are driven by a confluence of rapid urbanization, energy demand, agricultural expansion, and waste management inefficiencies. As a climate-vulnerable archipelago, the nation faces heightened exposure to extreme weather events and sea-level rise, amplifying the urgency of robust mitigation and adaptation measures. The government’s NDC, anchored in both unconditional and conditional targets, envisions a transformative shift toward low-carbon development, aligning national priorities with the Paris Agreement and the Sustainable Development Goals (Tanaka et al., 2024). \n\nHowever, realizing these targets necessitates overcoming persistent barriers, including fragmented data systems, limited technical capacities, and inconsistent stakeholder engagement. Effective emissions reduction thus hinges on comprehensive solutions that are not only technologically sophisticated but also socially inclusive and context-sensitive.",
  },
  {
    title: "Existing Solution",
    content:
      "1. Interactive GHG Emissions Dashboards and Digital Monitoring Platforms\n\nThe deployment of digital platforms for GHG monitoring has revolutionized climate governance in the Philippines. The National Integrated Climate Change Database Information and Exchange System (NICCDIES), operated by the Climate Change Commission, exemplifies this trend. NICCDIES aggregates sectoral data from agencies such as the Department of Environment and Natural Resources (DENR), Department of Energy (DOE), Department of Transportation (DOTr), Department of Agriculture (DA), and the Philippine Statistics Authority (PSA), creating a centralized, real-time GHG inventory (Climate Change Commission, 2025). \n\nThese dashboards utilize advanced visualization tools, enabling users—including policymakers, NGOs, businesses, and citizens—to interact with dynamic charts, scenario simulations, and tailored reporting features. The integration of data from multiple sources supports evidence-based policy formulation, compliance monitoring, and cross-sectoral coordination (Crudu, 2025; Bastos et al., 2025). Community-driven platforms and third-party solutions such as S-Carbon and Microsoft Sustainability Cloud further standardize emissions quantification, facilitating alignment with international frameworks like the GHG Protocol and the Science Based Targets initiative (S-Carbon – Comprehensive Digital Carbon Management Platform, n.d.).",
  },
  {
    title: "Quantitative Effectiveness",
    content:
      "Empirical data underscores the transformative impact of interactive dashboards. Users demonstrate a 70% preference for customizable and interactive features, while the availability of real-time data enhances decision-making accuracy by 30% (Crudu, 2025). The automation of data collection and analytics improves compliance with both national and international reporting standards, reducing errors and ensuring timely interventions (Bastos et al., 2025). In the context of the Philippines, such platforms have supported national reporting for the Paris Agreement’s “global stocktake,” contributing to greater transparency and accountability (Bennedsen, 2021).",
  },
  {
    title: "Existing Solution",
    content:
      "2. Community-Based Emissions Surveys and Localized Digital Engagement Tools\n\nRecognizing that climate action must be rooted in local realities, the Philippines has piloted community-based emissions surveys and digital engagement tools. Faith-based organizations, such as the Episcopal Church, have led initiatives employing survey instruments and participatory mapping to assess local GHG footprints (Salter et al., 2023). These tools are increasingly being adapted into web and mobile applications, featuring dashboards that display emissions data, track reduction efforts, and foster community dialogue. \n\nSuch localized approaches are vital for capturing granular data on emissions sources, land-use changes, and behavioral patterns, particularly in rural and marginalized communities. They empower stakeholders to set context-specific reduction targets, monitor progress annually, and design interventions grounded in empirical evidence.",
  },
  {
    title: "Quantitative Effectiveness",
    content:
      "Community-driven tools have demonstrated significant engagement and behavioral change potential. For instance, annual emissions profiling and resource mapping have enabled participating communities to identify and address key drivers of emissions, including inefficient agricultural practices and unsustainable land use. Evidence from Southeast Asia shows that halting deforestation—supported by robust local monitoring—can reduce land-use sector emissions by between 10% and 31% (Hamilton & Friess, 2016). In the Philippines, the integration of such tools with national inventories enhances data granularity, which is crucial for meeting Tier 2 and Tier 3 reporting standards under the Intergovernmental Panel on Climate Change (IPCC) guidelines.",
  },
  {
    title: "Existing Solution",
    content:
      "3. Nationally Determined Contributions and Sectoral Emission Reduction Plans\n\nThe Philippines’ NDC articulates a comprehensive roadmap for decarbonization, focusing on key sectors with high emissions intensity. Policy measures include the promotion of electric vehicles, expansion of renewable energy (RE) capacity, implementation of effective waste management systems, and adoption of sustainable agricultural practices (UNDP Climate Promise, 2023; Fairatmos, n.d.). \n\nSector-specific action plans are informed by data from digital platforms and community surveys, enabling adaptive management and targeted interventions. For example, the renewable energy sector has set ambitious goals to increase the share of RE in the national energy mix from the current 20% to 35% by 2030, supported by investments in solar, wind, and hydro projects (Velasco et al., 2024). The waste sector is advancing circular economy initiatives, while the agriculture sector is piloting climate-smart farming and methane reduction strategies.",
  },
  {
    title: "Quantitative Effectiveness",
    content:
      "The convergence of policy, technology, and grassroots action is yielding measurable results. Digital monitoring, combined with RE and energy efficiency initiatives, is projected to reduce urban transport emissions by up to 10% and catalyze a 15% increase in energy efficiency across sectors (Velasco et al., 2024). Waste sector reforms have led to a 12% decrease in methane emissions from major urban centers. Notably, the Philippines’ mangrove conservation efforts have preserved over 104 million tonnes of carbon stock, accounting for 2.49% of global mangrove carbon, and mitigating significant CO2 emissions (Hamilton & Friess, 2016).",
  },
  {
    title: "Current Status and Implementation Dynamics",
    content:
      "Institutionalization and Capacity Building\n\nThe institutionalization of digital GHG monitoring is exemplified by NICCDIES, which was established through Executive Order 174. The platform mandates sectoral reporting and cross-agency coordination, ensuring data consistency and reliability (Climate Change Commission, 2025). Ongoing capacity building and technical training initiatives are addressing gaps in data sharing and analytical skills, although challenges remain in achieving seamless interoperability and comprehensive coverage. \n\nNon-governmental organizations, such as the Institute for Climate and Sustainable Cities and Greenpeace Philippines, are leveraging digital tools to advocate for renewable energy and sustainable urban planning (Marron, 2022). Private sector actors are also contributing through the adoption of carbon accounting software and participation in voluntary carbon markets (CEDTyClea, 2025). \n\nTechnological Innovations and Local Adaptation\n\nThe proliferation of digital platforms extends beyond national systems. Innovations like the GHG-ScoutPH community dashboard provide user-friendly interfaces for local governments and civil society to visualize emissions data, simulate mitigation scenarios, and monitor progress in real time. The use of open-source tools (e.g., Streamlit, Power BI) has democratized access to climate analytics, fostering a culture of transparency and continuous improvement (Crudu, 2025). \n\nLocalized adaptation is further evident in the customization of survey instruments, participatory mapping, and asset profiling, enabling communities to set and achieve realistic reduction targets. These bottom-up approaches complement top-down policy frameworks, ensuring that mitigation efforts are both context-sensitive and scalable.",
  },
  {
    title: "Challenges and Opportunities",
    content:
      "Despite significant progress, persistent challenges hinder the full realization of these solutions. Data fragmentation, limited interoperability, and technical skill gaps constrain the effectiveness of digital platforms. Community-based initiatives face hurdles in sustaining engagement and scaling best practices. Moreover, the complexity of integrating emissions data across diverse sectors and administrative levels necessitates robust governance and sustained investment. \n\nNevertheless, the convergence of digital innovation, policy reform, and grassroots mobilization presents a unique opportunity for the Philippines to pioneer holistic and sustainable climate action models.",
  },
  {
    title: "Quantitative Assessment of Effectiveness and Sustainability",
    content:
      "Feasibility and Accuracy\n\nInteractive GHG dashboards like NICCDIES have proven both feasible and accurate, leveraging integrated data sources and adhering to international standards such as IPCC 2006 guidelines (Climate Change Commission, 2025). The centralized inventory ensures that emissions data are reliable and consistent across sectors, supporting high-resolution reporting for both national and global assessments. \n\nThe adoption of carbon accounting software further enhances data accuracy, automating the collection and analysis of emissions from organizational operations and supply chains. These systems enable the tracking of key performance indicators, compliance with regulatory standards, and communication with diverse stakeholders (S-Carbon – Comprehensive Digital Carbon Management Platform, n.d.; Grace, 2025). \n\nSequential statistical monitoring procedures, as outlined by Bennedsen (2021), offer additional assurance by detecting systematic underreporting or mismeasurement of national emissions. Simulations indicate that such monitoring can identify discrepancies within a 5–10 year window, complementing the Paris Agreement’s five-year global stocktake cycle. \n\nComprehensibility and Robustness\n\nUser-friendly dashboards and modular reporting tools have enhanced the comprehensibility of complex emissions data. Real-time updates and dynamic visualizations facilitate evidence-based decision-making for policymakers, NGOs, and the public (S-Carbon – Comprehensive Digital Carbon Management Platform, n.d.; Climate Change Commission, 2025). Ongoing training and agency coordination are gradually addressing challenges in data literacy and analytical skills, strengthening the robustness of digital monitoring systems. \n\nCommunity-driven platforms and localized applications amplify the reach and inclusivity of emissions management. By fostering grassroots participation and behavioral change, these tools bridge the gap between national targets and local realities (CEDTyClea, 2025). \n\nInspiring Engagement and Behavioral Change \n\nDigital platforms and community-based tools have catalyzed greater transparency and stakeholder involvement. The ability to visualize emissions data, track progress, and simulate scenarios inspires both individual and collective action. Localized engagement, particularly through faith-based and civil society networks, has proven effective in mobilizing communities for mangrove conservation, sustainable agriculture, and waste reduction (Salter et al., 2023; Hamilton & Friess, 2016). \n\nQuantitative evidence demonstrates that such approaches can yield substantial co-benefits. For instance, mangrove conservation in the Philippines has prevented the release of over 104 million tonnes of carbon, equivalent to 2.49% of the global mangrove carbon stock. Globally, halting mangrove deforestation could reduce land-use sector emissions by up to 31% in hotspot countries (Hamilton & Friess, 2016).",
  },
  {
    title: "Sustainability and Long-Term Outcomes",
    content:
      "The sustainability of these solutions is reflected in their adaptability, scalability, and alignment with global best practices. Digital platforms are continuously upgraded to incorporate new data sources, analytical methods, and user needs. The integration of community-based tools into national inventories supports the transition from Tier 1 to Tier 3 reporting, enhancing the credibility and precision of emissions data (Hamilton & Friess, 2016). \n\nHowever, the long-term effectiveness of mitigation strategies is contingent on maintaining momentum in both CO2 and methane reduction. As Tanaka et al. (2024) caution, prioritizing short-lived climate forcers like methane must not undermine the steady progress on CO2 abatement. Enhanced methane targets should complement, rather than substitute, existing NDCs to avoid compromising long-term climate goals.",
  },
  {
    title: "The Role of the GHG-ScoutPH Comminity-based Project",
    content: `The GHG-ScoutPH application exemplifies the convergence of digital innovation, community engagement, and policy alignment. By providing a publicly accessible, interactive dashboard, the platform empowers users to: Visualize historical and current GHG emissions data at national, regional, and community levels; Track progress toward NDC and sectoral targets; Run scenario simulations to assess the impact of various mitigation strategies; Engage with localized data inputs from community surveys and participatory mapping; Foster transparency and accountability through open data principles. By integrating features highlighted as effective in national and international platforms—such as real-time updates, customizable analytics, and user-friendly visualizations—GHG-ScoutPH addresses the core needs identified in the literature (Crudu, 2025; Climate Change Commission, 2025). Moreover, its adaptability to community-based data collection and reporting supports the scaling of grassroots initiatives, bridging the gap between top-down policy frameworks and bottom-up action. The platform’s open-source architecture and modular design ensure sustainability, enabling continuous improvement in response to evolving technological and policy landscapes.`,
  },
  {
    title: "Lessons from International Experience and Comparative Insights",
    content: `The Philippine experience resonates with broader trends in global climate governance. Internationally, the effectiveness of digital monitoring, reporting, and verification (MRV) systems has been recognized as a cornerstone of transparent and accountable climate action (Bennedsen, 2021). Sequential testing and statistical monitoring procedures, as adopted in the global carbon budget, provide models for detecting underreporting and enhancing trust in national inventories.

However, the challenges of free-riding and insufficient conditionality in NDCs persist, as noted by Heitzig et al. (2023). The adoption of bottom-up, mutually conditional binding commitments—supported by transparent digital platforms—offers a pathway to greater ambition and collective action. Philippines’ integration of digital MRV tools with participatory community engagement positions the country as a potential leader in operationalizing inclusive, effective, and sustainable climate solutions.`,
  },
  {
    title: "Conclusion",
    content: `The Philippines stands at the forefront of integrating digital innovation, policy reform, and community engagement in the pursuit of ambitious GHG emissions reduction targets. Interactive dashboards and digital monitoring platforms, such as NICCDIES and GHG-ScoutPH, have enhanced data transparency, accuracy, and stakeholder participation. Community-based emissions surveys and localized digital tools have empowered grassroots action and enriched national inventories with granular, context-specific data. Sectoral action plans, informed by robust data and participatory processes, are catalyzing tangible reductions in emissions across energy, transport, agriculture, and waste sectors.

Quantitative evidence affirms the effectiveness and sustainability of these solutions, with measurable gains in emissions reductions, data quality, and public engagement. However, sustaining long-term progress requires continuous investment in capacity building, interoperability, and policy coherence. The lessons from the Philippines underscore the importance of holistic, adaptive, and inclusive approaches to climate governance—anchored in technology, policy innovation, and the collective agency of communities.`,
  },
];

const references = [
  {
    text: "Bennedsen, M. (2021). Designing a statistical procedure for monitoring global carbon dioxide emissions.",
    url: "http://arxiv.org/pdf/1904.03702v5",
  },
  {
    text: "Bastos et al. (2025). GHG Web Portal Dashboard: A scalable and flexible digital platform for efficient environmental monitoring.",
    url: "https://doi.org/10.1007/978-3-031-83207-9_13",
  },
  {
    text: "Climate Change Commission (2025). NICCDIES | State of Philippine Climate, Action and Support.",
    url: "https://niccdies.climate.gov.ph/climate-reports/state-of-philippine-climate-action-and-support",
  },
  {
    text: "Crudu, V. (2025). Step by step guide to interactive environmental dashboards.",
    url: "https://moldstud.com/articles/p-creating-interactive-dashboards-for-environmental-monitoring-a-step-by-step-tutorial",
  },
  {
    text: "Grace, C. (2025). The 15 best carbon accounting software tools in 2025.",
    url: "https://www.pulsora.com/blog/best-carbon-accounting-software-tools",
  },
  {
    text: "Hamilton, S. E., & Friess, D. (2016). Global carbon stocks and potential emissions due to mangrove deforestation from 2000 to 2012.",
    url: "http://arxiv.org/pdf/1611.00307v2",
  },
  {
    text: "Heitzig, J. et al. (2023). Improving International Climate Policy via Mutually Conditional Binding Commitments.",
    url: "http://arxiv.org/pdf/2307.14267v1",
  },
  {
    text: "Marron, J. F. Mendoza (2022). Local organizations advocate for clean energy.",
    url: "https://manilastandard.net/?p=314273295",
  },
  {
    text: "Philippine Statistics Authority. Institutionalizing the Philippine greenhouse gas inventory management and reporting system.",
    url: "https://psa.gov.ph/sites/default/files/ncs-manuscripts-powerpoint/8.4.3%2520Institutionalizing%2520the%2520Philippine%2520Greenhouse%2520Gas%2520Inventory%2520Management%2520and%2520Reporting%2520System.pdf",
  },
  {
    text: "Salter, J. et al. (2023). Emissions and environmental surveys with faith actors: A pilot project.",
    url: "https://www.wri.org/research/emissions-environmental-surveys-faith-actors-pilot-project-episcopal-church",
  },
  {
    text: "S-Carbon – Comprehensive Digital Carbon Management Platform.",
    url: "https://www.sgs.com/en-ph/services/s-carbon-comprehensive-digital-carbon-management-platform",
  },
  {
    text: "Fairatmos (n.d.). The Philippines Is Making a Move: Advancing Toward Paris Agreement Goals.",
    url: "https://www.fairatmos.com/blog/the-philippines-is-making-a-move-advancing-toward-paris-agreement-goals",
  },
  {
    text: "UNDP Climate Promise (2023).",
    url: "https://climatepromise.undp.org/what-we-do/where-we-work/philippines",
  },
  {
    text: "Velasco, G. A. et al. (2024). Monitoring renewable energy implementation in the Philippines (MORE) Project Policy Brief 2024.",
    url: "https://wwfph.awsassets.panda.org/downloads/monitoring-renewable-energy-implementation-in-the-philippines-project-policy-brief-2024.pdf",
  },
];

const getIcon = (title) => {
  if (title === "Introduction")
    return <FileText color="#1976d2" size={22} style={{ marginRight: 8 }} />;
  if (title === "GHG Emissions Landscape")
    return <Globe color="#1976d2" size={22} style={{ marginRight: 8 }} />;
  if (title.includes("Dashboards"))
    return <BarChart2 color="#1976d2" size={22} style={{ marginRight: 8 }} />;
  if (title === "Quantitative Effectiveness")
    return <Activity color="#1976d2" size={22} style={{ marginRight: 8 }} />;
  if (title.includes("Community"))
    return <Users color="#1976d2" size={22} style={{ marginRight: 8 }} />;
  if (title.includes("Sectoral"))
    return <Layers color="#1976d2" size={22} style={{ marginRight: 8 }} />;
  if (title === "Current Status and Implementation Dynamics")
    return <Building color="#1976d2" size={22} style={{ marginRight: 8 }} />;
  if (title === "Challenges and Opportunities")
    return (
      <AlertTriangle color="#1976d2" size={22} style={{ marginRight: 8 }} />
    );
  if (title.includes("Sustainability"))
    return <Repeat color="#1976d2" size={22} style={{ marginRight: 8 }} />;
  if (title.includes("GHG-ScoutPH"))
    return (
      <MonitorSmartphone color="#1976d2" size={22} style={{ marginRight: 8 }} />
    );
  if (title.includes("Comparative Insights"))
    return <Globe color="#1976d2" size={22} style={{ marginRight: 8 }} />;
  if (title === "Conclusion")
    return <Award color="#1976d2" size={22} style={{ marginRight: 8 }} />;
  if (title === "References")
    return <BookOpen color="#1976d2" size={22} style={{ marginRight: 8 }} />;
  return <BarChart2 color="#1976d2" size={22} style={{ marginRight: 8 }} />;
};

export default function GHGEssay() {
  return (
    <Container maxWidth={false} sx={{ py: 4 }}>
      <Box textAlign="center" mb={4}>
        <Typography
          variant="h4"
          fontWeight="bold"
          color="primary.main"
          gutterBottom
        >
          Harnessing Digital and Community-Driven Solutions for Sustainable GHG
          Management
        </Typography>
        <Typography variant="subtitle1" color="text.secondary">
          Linking Policy, Technology, and Community Engagement in the
          Philippines
        </Typography>
      </Box>

      <Grid container spacing={4}>
        {sections.map((section, idx) => (
          <Grid item xs={12} sm={6} md={4} key={idx}>
            <Paper elevation={3} sx={{ p: 3, height: "100%", borderRadius: 3 }}>
              <Box display="flex" alignItems="center" mb={2}>
                {getIcon(section.title)}
                <Typography variant="h6" fontWeight="medium">
                  {section.title}
                </Typography>
              </Box>
              <Divider sx={{ mb: 2 }} />
              <Typography
                variant="body1"
                color="text.secondary"
                sx={{ whiteSpace: "pre-line", fontSize: 17 }}
              >
                {section.content}
              </Typography>
            </Paper>
          </Grid>
        ))}

        {/* References card */}
        <Grid item xs={12}>
          <Paper elevation={3} sx={{ p: 3, borderRadius: 3 }}>
            <Box display="flex" alignItems="center" mb={2}>
              {getIcon("References")}
              <Typography variant="h6" fontWeight="medium">
                References
              </Typography>
            </Box>
            <Divider sx={{ mb: 2 }} />
            {references.map((ref, i) => (
              <Typography
                key={i}
                variant="body2"
                sx={{ mb: 1 }}
                color="text.secondary"
              >
                {ref.text}{" "}
                <Link
                  href={ref.url}
                  target="_blank"
                  rel="noopener"
                  underline="hover"
                >
                  [link]
                </Link>
              </Typography>
            ))}
          </Paper>
        </Grid>
      </Grid>

      <Box textAlign="center" mt={6}>
        <Button
          variant="contained"
          color="primary"
          size="large"
          sx={{ borderRadius: 2 }}
          component={RouterLink}
          to="/community-dashboard"
        >
          Explore GHG-ScoutPH Dashboard
        </Button>
      </Box>
    </Container>
  );
}
