export default function CareersPage() {
  const openPositions = [
    {
      id: 1,
      title: "Fashion Designer",
      department: "Design",
      location: "New York, NY",
      type: "Full-time"
    },
    {
      id: 2,
      title: "E-commerce Manager",
      department: "Digital",
      location: "Remote",
      type: "Full-time"
    },
    {
      id: 3,
      title: "Customer Service Representative",
      department: "Customer Service",
      location: "New York, NY",
      type: "Full-time"
    },
    {
      id: 4,
      title: "Marketing Coordinator",
      department: "Marketing",
      location: "New York, NY",
      type: "Full-time"
    },
    {
      id: 5,
      title: "Retail Store Manager",
      department: "Retail",
      location: "Los Angeles, CA",
      type: "Full-time"
    }
  ];

  const benefits = [
    "Competitive salary and benefits package",
    "Health, dental, and vision insurance",
    "Employee discount on all products",
    "Flexible working hours",
    "Professional development opportunities",
    "Collaborative and creative work environment"
  ];

  return (
    <div className="min-h-screen bg-white py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl sm:text-5xl font-bold mb-4">Careers at AMIORE</h1>
          <p className="text-xl text-gray-600 mb-2">Join our team and help shape the future of menswear</p>
          <p className="text-gray-500">We're always looking for talented individuals to join our growing team</p>
        </div>

        <div className="bg-gray-50 rounded-lg p-8 mb-12">
          <h2 className="text-2xl font-semibold mb-4">Why Work With Us?</h2>
          <p className="text-gray-600 mb-6">
            At AMIORE, we believe in fostering a creative, collaborative, and inclusive environment where 
            talented individuals can thrive. We're passionate about menswear and committed to creating 
            exceptional experiences for our customers.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {benefits.map((benefit, index) => (
              <div key={index} className="flex items-start">
                <svg className="w-5 h-5 text-gray-900 mr-2 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                <span className="text-gray-700">{benefit}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="mb-12">
          <h2 className="text-2xl font-semibold mb-6">Open Positions</h2>
          <div className="space-y-4">
            {openPositions.map((position) => (
              <div key={position.id} className="bg-white border border-gray-200 rounded-lg p-6 hover:shadow-md transition-shadow">
                <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-4">
                  <div>
                    <h3 className="text-xl font-semibold mb-2">{position.title}</h3>
                    <div className="flex flex-wrap gap-3 text-sm text-gray-600">
                      <span className="flex items-center">
                        <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                        </svg>
                        {position.department}
                      </span>
                      <span className="flex items-center">
                        <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                        </svg>
                        {position.location}
                      </span>
                      <span className="flex items-center">
                        <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        {position.type}
                      </span>
                    </div>
                  </div>
                  <button className="btn btn-outline mt-4 md:mt-0">Apply Now</button>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-gray-900 text-white rounded-lg p-8 text-center">
          <h2 className="text-2xl font-semibold mb-4">Don't see a position that fits?</h2>
          <p className="mb-6 opacity-90">
            We're always interested in hearing from talented individuals. Send us your resume 
            and we'll keep you in mind for future opportunities.
          </p>
          <button className="btn bg-white text-gray-900 hover:bg-gray-100">Submit General Application</button>
        </div>
      </div>
    </div>
  );
}
