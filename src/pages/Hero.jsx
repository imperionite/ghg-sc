import { Button } from '@mui/material';
import { Link } from 'react-router-dom';

const Hero = () => {
  return (
    <>
      {/* Hero Section */}
      <section
        className="relative flex flex-col items-center justify-center text-center px-6 py-20 md:py-32"
        style={{
          minHeight: 'calc(100vh - 64px)',
          background: 'linear-gradient(180deg, #f1f5f9 0%, #cbd5e1 70%, #1e293b 100%)',
          color: '#1e293b',
        }}
      >
        <h1 className="text-4xl md:text-6xl font-extrabold leading-tight mb-6 drop-shadow-sm">
          Empower Your Community to Track GHG Emissions
        </h1>

        <p className="max-w-2xl text-lg md:text-xl text-slate-700 mb-10 leading-relaxed">
          Join GHG-Scout and take climate action at the grassroots level. Estimate, visualize, and interpret emissions data tailored for schools and LGUs.
        </p>

        <Link to="/register" className="relative z-10 mb-8">
          <Button
            variant="contained"
            className="!bg-slate-800 hover:!bg-slate-900 text-white text-lg px-6 py-3 rounded-xl shadow-lg"
          >
            Get Started
          </Button>
        </Link>

        {/* Decorative Wave */}
        <div
          className="absolute bottom-0 left-0 w-full overflow-hidden leading-[0]"
          style={{ height: '160px', marginBottom: '-5px' }}
        >
          <svg
            className="relative block w-full h-full"
            viewBox="0 0 1440 320"
            preserveAspectRatio="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fill="#1e293b"
              fillOpacity="1"
              d="M0,224L48,197.3C96,171,192,117,288,112C384,107,480,149,576,165.3C672,181,768,171,864,138.7C960,107,1056,53,1152,48C1248,43,1344,85,1392,106.7L1440,128L1440,320L0,320Z"
            />
          </svg>
        </div>
      </section>

      {/* Visual Data Section */}
      <section className="bg-slate-800 text-white text-center px-6 py-20 md:py-28 flex flex-col items-center">
        <h2 className="text-3xl md:text-4xl font-bold leading-tight mb-4 max-w-3xl">
          Explore Your Community’s Emissions Data Visually
        </h2>

        <p className="text-lg md:text-xl max-w-2xl mb-10 text-slate-200 leading-relaxed">
          Access the main dashboard to analyze and visualize emissions data collected from your community. Gain insights and track progress with interactive charts and reports.
        </p>

        <Link to="/data">
          <Button
            variant="contained"
            size="large"
            sx={{
              bgcolor: '#fbbf24', // amber-400
              color: '#1e293b', // slate-800
              px: 6,
              py: 2.5,
              fontWeight: 700,
              fontSize: '1rem',
              borderRadius: '1rem',
              boxShadow: '0 8px 15px rgba(251, 191, 36, 0.4)',
              '&:hover': {
                bgcolor: '#f59e0b', // amber-500
                boxShadow: '0 12px 20px rgba(245, 158, 11, 0.6)',
              },
            }}
          >
            Get Visual
          </Button>
        </Link>
      </section>
    </>
  );
};

export default Hero;
