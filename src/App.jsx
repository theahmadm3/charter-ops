/* eslint-disable react/no-unescaped-entities */
import { useState } from 'react';
import { Container, Row, Col, Card, Button, Form, Modal, Nav, Navbar, Accordion, Badge } from 'react-bootstrap';

const App = () => {
  const [showTrialModal, setShowTrialModal] = useState(false);
  const [showDemoModal, setShowDemoModal] = useState(false);
  const [billingCycle, setBillingCycle] = useState('monthly');

  // Trial Form Modal
  const TrialModal = () => (
    <Modal show={showTrialModal} onHide={() => setShowTrialModal(false)} centered>
      <Modal.Header closeButton>
        <Modal.Title className="tw-text-2xl tw-font-bold tw-text-blue-900">
          Start Your Free Trial
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group className="tw-mb-4">
            <Form.Label>Full Name</Form.Label>
            <Form.Control type="text" placeholder="Enter your full name" />
          </Form.Group>
          <Form.Group className="tw-mb-4">
            <Form.Label>Company Name</Form.Label>
            <Form.Control type="text" placeholder="Enter your company name" />
          </Form.Group>
          <Form.Group className="tw-mb-4">
            <Form.Label>Email Address</Form.Label>
            <Form.Control type="email" placeholder="Enter your email" />
          </Form.Group>
          <Form.Group className="tw-mb-4">
            <Form.Label>Password</Form.Label>
            <Form.Control type="password" placeholder="Create a password" />
          </Form.Group>
          <Form.Group className="tw-mb-4">
            <Form.Label>Company Type (Optional)</Form.Label>
            <Form.Select>
              <option>Select company type</option>
              <option value="small">Small Charter (1-5 aircraft)</option>
              <option value="medium">Medium Charter (6-20 aircraft)</option>
              <option value="large">Large Charter (20+ aircraft)</option>
              <option value="management">Aircraft Management</option>
            </Form.Select>
          </Form.Group>
          <Button
            variant="primary"
            size="lg"
            className="tw-w-full tw-bg-blue-800 tw-border-blue-800 hover:tw-bg-blue-900"
          >
            Start Free Trial
          </Button>
        </Form>
      </Modal.Body>
    </Modal>
  );

  // Demo Form Modal
  const DemoModal = () => (
    <Modal show={showDemoModal} onHide={() => setShowDemoModal(false)} centered>
      <Modal.Header closeButton>
        <Modal.Title className="tw-text-2xl tw-font-bold tw-text-blue-900">
          Book a Demo
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group className="tw-mb-4">
            <Form.Label>Full Name</Form.Label>
            <Form.Control type="text" placeholder="Enter your full name" />
          </Form.Group>
          <Form.Group className="tw-mb-4">
            <Form.Label>Email Address</Form.Label>
            <Form.Control type="email" placeholder="Enter your email" />
          </Form.Group>
          <Form.Group className="tw-mb-4">
            <Form.Label>Phone Number (Optional)</Form.Label>
            <Form.Control type="tel" placeholder="Enter your phone number" />
          </Form.Group>
          <Form.Group className="tw-mb-4">
            <Form.Label>Company Size</Form.Label>
            <Form.Select>
              <option>Select company size</option>
              <option value="1-10">1-10 employees</option>
              <option value="11-50">11-50 employees</option>
              <option value="51-200">51-200 employees</option>
              <option value="200+">200+ employees</option>
            </Form.Select>
          </Form.Group>
          <Button
            variant="primary"
            size="lg"
            className="tw-w-full tw-bg-sky-600 tw-border-sky-600 hover:tw-bg-sky-700"
          >
            Schedule Demo
          </Button>
        </Form>
      </Modal.Body>
    </Modal>
  );

  // Data for sections
  const features = [
    {
      icon: "📅",
      title: "Automated Booking & Reminders",
      description: "Streamline your booking process with automated confirmations and smart reminder systems.",
    },
    {
      icon: "📊",
      title: "Visual Dashboards & Infographics",
      description: "Get real-time insights with beautiful charts and comprehensive analytics.",
    },
    {
      icon: "🔧",
      title: "Maintenance Tracking & Alerts",
      description: "Stay ahead of maintenance schedules with automated alerts and tracking.",
    },
    {
      icon: "⛽",
      title: "Fuel Inventory Log",
      description: "Monitor fuel consumption and inventory levels across your entire fleet.",
    },
    {
      icon: "💰",
      title: "Debts & Financial Overview",
      description: "Complete financial management with automated invoicing and debt tracking.",
    },
  ];

  const fullFeatures = [
    {
      title: "Booking Automation",
      description: "Automated booking confirmations, customer communications, and schedule management.",
    },
    {
      title: "Smart Alerts & Emails",
      description: "Intelligent notification system for maintenance, bookings, and operational updates.",
    },
    {
      title: "Fuel Collection & Usage",
      description: "Comprehensive fuel management with real-time tracking and cost analysis.",
    },
    {
      title: "Accounting & Receivables",
      description: "Complete financial management including invoicing, payments, and debt tracking.",
    },
    {
      title: "Aircraft Maintenance Scheduling",
      description: "Proactive maintenance scheduling with compliance tracking and alerts.",
    },
  ];

  const plans = [
    {
      name: "Monthly Plan",
      price: billingCycle === "monthly" ? "₦45,000" : "₦40,500",
      period: "per month",
      features: [
        "Up to 5 aircraft",
        "Basic booking management",
        "Email notifications",
        "Basic reporting",
        "Email support",
      ],
      popular: false,
    },
    {
      name: "Quarterly Plan",
      price: billingCycle === "monthly" ? "₦120,000" : "₦108,000",
      period: "per quarter",
      features: [
        "Up to 15 aircraft",
        "Advanced booking automation",
        "SMS & Email notifications",
        "Advanced analytics",
        "Priority support",
        "Fuel management",
      ],
      popular: false,
    },
    {
      name: "Annual Plan",
      price: billingCycle === "monthly" ? "₦420,000" : "₦378,000",
      period: "per year",
      features: [
        "Unlimited aircraft",
        "Full automation suite",
        "Multi-channel notifications",
        "Custom reporting",
        "24/7 phone support",
        "Complete financial management",
        "API access",
        "Custom integrations",
      ],
      popular: true,
    },
  ];

  const testimonials = [
    {
      quote: "CharterOps helped us reduce booking errors by 90%. Game changer for our ops team.",
      name: "Sarah Johnson",
      title: "Operations Manager",
      company: "Skybird Charter",
      avatar: "SJ",
    },
    {
      quote: "The automated maintenance alerts saved us from costly downtime. Excellent platform.",
      name: "Michael Chen",
      title: "Fleet Director",
      company: "Elite Aviation",
      avatar: "MC",
    },
    {
      quote: "Financial management became so much easier. We can track everything in real-time.",
      name: "Amara Okafor",
      title: "CFO",
      company: "West African Jets",
      avatar: "AO",
    },
  ];

  const faqs = [
    {
      question: "Can I integrate with existing tools?",
      answer: "Yes, Charter Ops offers API integration with popular aviation tools, accounting software, and customer management systems. Our team can help you set up custom integrations based on your specific needs.",
    },
    {
      question: "Is it secure?",
      answer: "Absolutely. We use enterprise-grade security with 256-bit SSL encryption, regular security audits, and comply with aviation industry data protection standards. Your sensitive business data is always protected.",
    },
    {
      question: "Can I get help setting up?",
      answer: "Yes! We provide comprehensive onboarding support including data migration, staff training, and personalized setup assistance. Our support team is available to ensure a smooth transition to Charter Ops.",
    },
    {
      question: "What's included in the free trial?",
      answer: "The 30-day free trial includes full access to all features, unlimited bookings, email support, and training resources. No credit card required, and you can cancel anytime.",
    },
    {
      question: "How does billing work?",
      answer: "You can choose monthly, quarterly, or annual billing cycles. All plans include automatic updates, regular backups, and our standard support. Annual plans receive a 10% discount.",
    },
    {
      question: "Can I customize the system for my specific needs?",
      answer: "Yes, Charter Ops is highly customizable. You can configure workflows, create custom fields, set up automated notifications, and even develop custom integrations through our API.",
    },
  ];

  return (
    <div className="tw-min-h-screen tw-bg-white tw-font-sans" style={{ fontFamily: 'Montserrat, sans-serif' }}>
      {/* Hero Section */}
      <section className="tw-relative tw-min-h-screen tw-bg-gradient-to-br tw-from-blue-900 tw-to-sky-700 tw-overflow-hidden">
        {/* Background Animation */}
        <div className="tw-absolute tw-inset-0 tw-opacity-10">
          <div className="tw-absolute tw-top-1/4 tw-left-1/4 tw-w-64 tw-h-64 tw-bg-sky-400 tw-rounded-full tw-blur-3xl tw-animate-pulse"></div>
          <div className="tw-absolute tw-bottom-1/4 tw-right-1/4 tw-w-96 tw-h-96 tw-bg-blue-400 tw-rounded-full tw-blur-3xl tw-animate-pulse" style={{ animationDelay: '1s' }}></div>
        </div>

        {/* Navigation */}
        <Navbar expand="lg" variant="dark" className="tw-relative tw-z-10">
          <Container>
            <Navbar.Brand className="tw-flex tw-items-center tw-space-x-2">
              <div className="tw-w-10 tw-h-10 tw-bg-sky-500 tw-rounded-lg tw-flex tw-items-center tw-justify-center">
                <span className="tw-text-white tw-font-bold tw-text-xl">✈</span>
              </div>
              <span className="tw-text-white tw-text-2xl tw-font-bold">Charter Ops</span>
            </Navbar.Brand>
            <Navbar.Toggle />
            <Navbar.Collapse>
              <Nav className="tw-ms-auto">
                <Nav.Link href="#features" className="tw-text-white hover:tw-text-sky-300">Features</Nav.Link>
                <Nav.Link href="#pricing" className="tw-text-white hover:tw-text-sky-300">Pricing</Nav.Link>
                <Nav.Link href="#demo" className="tw-text-white hover:tw-text-sky-300">Demo</Nav.Link>
                <Nav.Link href="#contact" className="tw-text-white hover:tw-text-sky-300">Contact</Nav.Link>
              </Nav>
            </Navbar.Collapse>
          </Container>
        </Navbar>

        {/* Hero Content */}
        <Container className="tw-relative tw-z-10 tw-py-20">
          <Row className="tw-justify-center">
            <Col lg={8} xl={6}>
              <div className="tw-text-center tw-space-y-8 tw-mb-12">
                <h1 className="tw-text-5xl lg:tw-text-7xl tw-font-bold tw-text-white tw-leading-tight">
                  Smart ERP for
                  <span className="tw-text-sky-400 tw-block">Private Charter</span>
                  <span className="tw-text-sky-300">Companies</span>
                </h1>
                <p className="tw-text-xl tw-text-gray-200 tw-leading-relaxed">
                  Automate your bookings, operations, and finance in one powerful aviation suite.
                </p>
                <div className="tw-flex tw-flex-col sm:tw-flex-row tw-gap-4 tw-justify-center">
                  <Button
                    size="lg"
                    className="tw-bg-sky-600 tw-border-sky-600 hover:tw-bg-sky-700 tw-px-8 tw-py-3 tw-text-lg tw-font-semibold"
                    onClick={() => setShowTrialModal(true)}
                  >
                    Start Free Trial
                  </Button>
                  <Button
                    size="lg"
                    variant="outline-light"
                    className="tw-border-2 tw-px-8 tw-py-3 tw-text-lg tw-font-semibold"
                    onClick={() => setShowDemoModal(true)}
                  >
                    Book a Demo
                  </Button>
                </div>
              </div>
            </Col>
          </Row>
          <Row className="tw-justify-center">
            <Col lg={8} xl={6}>
              <div className="tw-relative">
                <Card className="tw-bg-white/10 tw-backdrop-blur-lg tw-border-white/20">
                  <Card.Body className="tw-p-8">
                    <div className="tw-flex tw-items-center tw-justify-between tw-mb-6">
                      <h3 className="tw-text-white tw-text-xl tw-font-semibold">Charter Ops Dashboard</h3>
                      <div className="tw-flex tw-space-x-2">
                        <div className="tw-w-3 tw-h-3 tw-bg-red-500 tw-rounded-full"></div>
                        <div className="tw-w-3 tw-h-3 tw-bg-yellow-500 tw-rounded-full"></div>
                        <div className="tw-w-3 tw-h-3 tw-bg-green-500 tw-rounded-full"></div>
                      </div>
                    </div>
                    <Row>
                      <Col sm={6}>
                        <div className="tw-bg-sky-500/20 tw-rounded-lg tw-p-4 tw-mb-4">
                          <div className="tw-text-sky-200 tw-text-sm">Active Flights</div>
                          <div className="tw-text-white tw-text-2xl tw-font-bold">12</div>
                        </div>
                      </Col>
                      <Col sm={6}>
                        <div className="tw-bg-green-500/20 tw-rounded-lg tw-p-4 tw-mb-4">
                          <div className="tw-text-green-200 tw-text-sm">Revenue Today</div>
                          <div className="tw-text-white tw-text-2xl tw-font-bold">₦2.4M</div>
                        </div>
                      </Col>
                    </Row>
                    <div className="tw-bg-white/5 tw-rounded-lg tw-p-4">
                      <div className="tw-text-white tw-text-sm tw-mb-2">Flight Schedule</div>
                      <div className="tw-space-y-2">
                        <div className="tw-flex tw-justify-between tw-text-gray-300 tw-text-sm">
                          <span>Lagos → Abuja</span>
                          <span>14:30</span>
                        </div>
                        <div className="tw-flex tw-justify-between tw-text-gray-300 tw-text-sm">
                          <span>Abuja → Port Harcourt</span>
                          <span>16:45</span>
                        </div>
                      </div>
                    </div>
                  </Card.Body>
                </Card>
              </div>
            </Col>
          </Row>
        </Container>
      </section>

      {/* Features Section */}
      <section id="features" className="tw-py-20 tw-bg-gray-50">
        <Container>
          <div className="tw-text-center tw-mb-16">
            <h2 className="tw-text-4xl lg:tw-text-5xl tw-font-bold tw-text-blue-900 tw-mb-4">
              Built for Charter Ops Teams
            </h2>
            <p className="tw-text-xl tw-text-gray-600 tw-max-w-3xl tw-mx-auto">
              Everything you need to manage your charter operations efficiently and professionally.
            </p>
          </div>
          <Row>
            {features.map((feature, index) => (
              <Col md={6} lg={4} key={index} className="tw-mb-8">
                <Card className="tw-h-full tw-border-0 tw-shadow-lg hover:tw-shadow-xl tw-transition-all tw-duration-300 hover:tw-translate-y-1">
                  <Card.Body className="tw-text-center">
                    <div className="tw-text-6xl tw-mb-4">{feature.icon}</div>
                    <Card.Title className="tw-text-blue-900 tw-text-xl tw-font-semibold tw-mb-3">
                      {feature.title}
                    </Card.Title>
                    <Card.Text className="tw-text-gray-600 tw-leading-relaxed">
                      {feature.description}
                    </Card.Text>
                  </Card.Body>
                </Card>
              </Col>
            ))}
          </Row>
        </Container>
      </section>

      {/* Full Feature Overview Section */}
      <section className="tw-py-20 tw-bg-white">
        <Container>
          <div className="tw-text-center tw-mb-16">
            <h2 className="tw-text-4xl lg:tw-text-5xl tw-font-bold tw-text-blue-900 tw-mb-4">
              End-to-End Control for Charter Ops
            </h2>
          </div>
          <Row className="tw-items-center">
            <Col lg={6}>
              <div className="tw-bg-gradient-to-br tw-from-blue-100 tw-to-sky-100 tw-rounded-2xl tw-p-8 tw-shadow-2xl">
                <Card className="tw-shadow-lg">
                  <Card.Body>
                    <div className="tw-flex tw-justify-between tw-items-center tw-mb-6">
                      <h3 className="tw-text-blue-900 tw-text-2xl tw-font-bold">Operations Dashboard</h3>
                      <div className="tw-flex tw-space-x-2">
                        <div className="tw-w-3 tw-h-3 tw-bg-red-500 tw-rounded-full"></div>
                        <div className="tw-w-3 tw-h-3 tw-bg-yellow-500 tw-rounded-full"></div>
                        <div className="tw-w-3 tw-h-3 tw-bg-green-500 tw-rounded-full"></div>
                      </div>
                    </div>
                    <Row className="tw-mb-6">
                      <Col sm={6}>
                        <div className="tw-bg-sky-50 tw-rounded-lg tw-p-4 tw-border-l-4 tw-border-sky-500">
                          <div className="tw-text-sky-600 tw-text-sm tw-font-medium">Total Flights</div>
                          <div className="tw-text-blue-900 tw-text-3xl tw-font-bold">847</div>
                          <div className="tw-text-green-600 tw-text-sm">↗ +12% this month</div>
                        </div>
                      </Col>
                      <Col sm={6}>
                        <div className="tw-bg-green-50 tw-rounded-lg tw-p-4 tw-border-l-4 tw-border-green-500">
                          <div className="tw-text-green-600 tw-text-sm tw-font-medium">Revenue</div>
                          <div className="tw-text-blue-900 tw-text-3xl tw-font-bold">₦12.4M</div>
                          <div className="tw-text-green-600 tw-text-sm">↗ +8% this month</div>
                        </div>
                      </Col>
                    </Row>
                    <div className="tw-bg-gray-50 tw-rounded-lg tw-p-4">
                      <div className="tw-text-blue-900 tw-font-medium tw-mb-3">Recent Bookings</div>
                      <div className="tw-space-y-2">
                        <div className="tw-flex tw-justify-between tw-items-center">
                          <span className="tw-text-gray-600">Lagos → Abuja</span>
                          <Badge bg="success">Confirmed</Badge>
                        </div>
                        <div className="tw-flex tw-justify-between tw-items-center">
                          <span className="tw-text-gray-600">Abuja → Kano</span>
                          <Badge bg="warning">Pending</Badge>
                        </div>
                        <div className="tw-flex tw-justify-between tw-items-center">
                          <span className="tw-text-gray-600">Port Harcourt → Lagos</span>
                          <Badge bg="success">Confirmed</Badge>
                        </div>
                      </div>
                    </div>
                  </Card.Body>
                </Card>
              </div>
            </Col>
            <Col lg={6}>
              <div className="tw-space-y-8">
                {fullFeatures.map((feature, index) => (
                  <div key={index} className="tw-flex tw-items-start tw-space-x-6 tw-p-6 tw-rounded-lg hover:tw-bg-gray-50 tw-transition-colors">
                    <div className="tw-flex-shrink-0 tw-w-12 tw-h-12 tw-bg-sky-500 tw-rounded-lg tw-flex tw-items-center tw-justify-center">
                      <span className="tw-text-white tw-font-bold tw-text-lg">✓</span>
                    </div>
                    <div>
                      <h3 className="tw-text-blue-900 tw-text-xl tw-font-semibold tw-mb-2">{feature.title}</h3>
                      <p className="tw-text-gray-600 tw-leading-relaxed">{feature.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </Col>
          </Row>
        </Container>
      </section>

      {/* Demo Section */}
      <section id="demo" className="tw-py-20 tw-bg-gradient-to-r tw-from-blue-800 tw-to-sky-700">
        <Container className="tw-text-center">
          <h2 className="tw-text-4xl lg:tw-text-5xl tw-font-bold tw-text-white tw-mb-8">
            See It in Action
          </h2>
          <p className="tw-text-xl tw-text-gray-200 tw-mb-12 tw-max-w-3xl tw-mx-auto">
            Watch how Charter Ops transforms your aviation business operations with our comprehensive ERP solution.
          </p>
          <div className="tw-max-w-4xl tw-mx-auto">
            <Card className="tw-bg-white/10 tw-backdrop-blur-lg tw-border-white/20">
              <Card.Body className="tw-p-8">
                <div className="tw-aspect-video tw-bg-gradient-to-br tw-from-blue-900 tw-to-sky-900 tw-rounded-lg tw-flex tw-items-center tw-justify-center">
                  <div className="tw-text-center">
                    <div className="tw-w-24 tw-h-24 tw-bg-white/20 tw-rounded-full tw-flex tw-items-center tw-justify-center tw-mx-auto tw-mb-6">
                      <svg className="tw-w-12 tw-h-12 tw-text-white" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M8 5v14l11-7z" />
                      </svg>
                    </div>
                    <h3 className="tw-text-white tw-text-2xl tw-font-semibold tw-mb-4">Charter Ops Demo Video</h3>
                    <p className="tw-text-gray-300 tw-mb-6">See how our platform streamlines your entire charter operation</p>
                    <Button size="lg" className="tw-bg-sky-600 tw-border-sky-600 hover:tw-bg-sky-700 tw-px-8 tw-py-3 tw-text-lg tw-font-semibold">
                      Watch Demo
                    </Button>
                  </div>
                </div>
              </Card.Body>
            </Card>
          </div>
        </Container>
      </section>

      {/* Pricing Section */}
      <section id="pricing" className="tw-py-20 tw-bg-gray-50">
        <Container>
          <div className="tw-text-center tw-mb-16">
            <h2 className="tw-text-4xl lg:tw-text-5xl tw-font-bold tw-text-blue-900 tw-mb-4">
              Simple, Flexible Pricing
            </h2>
            <p className="tw-text-xl tw-text-gray-600 tw-mb-8">
              Choose the plan that fits your charter operation
            </p>
            <div className="tw-flex tw-justify-center">
              <div className="tw-bg-white tw-rounded-lg tw-p-1 tw-shadow-md">
                <Button
                  variant={billingCycle === 'monthly' ? 'primary' : 'light'}
                  onClick={() => setBillingCycle('monthly')}
                  className="tw-px-6 tw-py-2"
                >
                  Monthly
                </Button>
                <Button
                  variant={billingCycle === 'annual' ? 'primary' : 'light'}
                  onClick={() => setBillingCycle('annual')}
                  className="tw-px-6 tw-py-2"
                >
                  Annual (Save 10%)
                </Button>
              </div>
            </div>
          </div>
          <Row>
            {plans.map((plan, index) => (
              <Col md={4} key={index} className="tw-mb-8 tw-flex tw-flex-col tw-justify-between">
                <Card className={`tw-h-full tw-relative tw-transition-all tw-duration-300 ${plan.popular ? 'tw-border-sky-500 tw-shadow-xl tw-scale-105' : 'tw-border-gray-200 hover:tw-shadow-lg hover:tw-translate-y-1'}`}>
                  {plan.popular && (
                    <div className="tw-absolute -tw-top-3 tw-left-1/2 tw-transform -tw-translate-x-1/2">
                      <Badge bg="primary" className="tw-bg-sky-500 tw-px-4 tw-py-1">
                        Best Value ✅
                      </Badge>
                    </div>
                  )}
                  <Card.Body className="tw-text-center tw-flex tw-flex-col tw-justify-between">
                    <Card.Title className="tw-text-blue-900 tw-text-2xl tw-font-bold tw-mb-2">
                      {plan.name}
                    </Card.Title>
                    <div className="tw-text-4xl tw-font-bold tw-text-blue-900 tw-mb-2">
                      {plan.price}
                    </div>
                    <div className="tw-text-gray-600 tw-mb-4">{plan.period}</div>
                    <ul className="tw-list-none tw-space-y-3 tw-mb-8 tw-text-left">
                      {plan.features.map((feature, featureIndex) => (
                        <li key={featureIndex} className="tw-flex tw-items-center">
                          <span className="tw-text-green-500 tw-mr-3">✓</span>
                          <span className="tw-text-gray-700">{feature}</span>
                        </li>
                      ))}
                    </ul>
                    <Button
                      size="lg"
                      className={`tw-w-full tw-py-3 tw-font-semibold ${plan.popular ? 'tw-bg-sky-600 tw-border-sky-600 hover:tw-bg-sky-700' : 'tw-bg-blue-800 tw-border-blue-800 hover:tw-bg-blue-900'}`}
                    >
                      Start Free Trial
                    </Button>
                  </Card.Body>
                </Card>
              </Col>
            ))}
          </Row>
        </Container>
      </section>

      {/* Testimonials Section */}
      <section className="tw-py-20 tw-bg-white">
        <Container>
          <div className="tw-text-center tw-mb-16">
            <h2 className="tw-text-4xl lg:tw-text-5xl tw-font-bold tw-text-blue-900 tw-mb-4">
              Trusted by Growing Aviation Brands
            </h2>
            <p className="tw-text-xl tw-text-gray-600">
              See what our customers have to say about Charter Ops
            </p>
          </div>
          <Row>
            {testimonials.map((testimonial, index) => (
              <Col md={4} key={index} className="tw-mb-8">
                <Card className="tw-h-full tw-border-0 tw-shadow-lg hover:tw-shadow-xl tw-transition-shadow">
                  <Card.Body className="tw-p-8">
                    <div className="tw-mb-6">
                      <svg className="tw-w-8 tw-h-8 tw-text-sky-500 tw-mb-4" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-10zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
                      </svg>
                      <p className="tw-text-gray-700 tw-text-lg tw-leading-relaxed">
                        "{testimonial.quote}"
                      </p>
                    </div>
                    <div className="tw-flex tw-items-center">
                      <div className="tw-w-12 tw-h-12 tw-bg-sky-500 tw-rounded-full tw-flex tw-items-center tw-justify-center tw-mr-4">
                        <span className="tw-text-white tw-font-semibold">{testimonial.avatar}</span>
                      </div>
                      <div>
                        <div className="tw-font-semibold tw-text-blue-900">{testimonial.name}</div>
                        <div className="tw-text-gray-600 tw-text-sm">{testimonial.title}</div>
                        <div className="tw-text-sky-600 tw-text-sm tw-font-medium">{testimonial.company}</div>
                      </div>
                    </div>
                  </Card.Body>
                </Card>
              </Col>
            ))}
          </Row>
        </Container>
      </section>

      {/* FAQ Section */}
      <section className="tw-py-20 tw-bg-gray-50">
        <Container>
          <div className="tw-text-center tw-mb-16">
            <h2 className="tw-text-4xl lg:tw-text-5xl tw-font-bold tw-text-blue-900 tw-mb-4">
              Frequently Asked Questions
            </h2>
            <p className="tw-text-xl tw-text-gray-600">
              Everything you need to know about Charter Ops
            </p>
          </div>
          <div className="tw-max-w-4xl tw-mx-auto">
            <Accordion>
              {faqs.map((faq, index) => (
                <Accordion.Item eventKey={index.toString()} key={index} className="tw-mb-4 tw-bg-white tw-rounded-lg tw-shadow-sm tw-border tw-border-gray-200">
                  <Accordion.Header className="tw-text-left tw-text-blue-900 tw-font-semibold">
                    {faq.question}
                  </Accordion.Header>
                  <Accordion.Body className="tw-text-gray-600 tw-leading-relaxed">
                    {faq.answer}
                  </Accordion.Body>
                </Accordion.Item>
              ))}
            </Accordion>
          </div>
        </Container>
      </section>

      {/* Final CTA Section */}
      <section className="tw-relative tw-py-20 tw-bg-gradient-to-br tw-from-blue-900 tw-via-blue-800 tw-to-sky-900 tw-overflow-hidden">
        <div className="tw-absolute tw-inset-0 tw-opacity-20">
          <div className="tw-absolute tw-inset-0 tw-bg-gradient-to-r tw-from-blue-900/80 tw-to-sky-900/80"></div>
        </div>
        <div className="tw-absolute tw-inset-0 tw-opacity-10">
          <div className="tw-absolute tw-top-1/4 tw-right-1/4 tw-w-64 tw-h-64 tw-bg-sky-400 tw-rounded-full tw-blur-3xl tw-animate-pulse"></div>
          <div className="tw-absolute tw-bottom-1/4 tw-left-1/4 tw-w-96 tw-h-96 tw-bg-blue-400 tw-rounded-full tw-blur-3xl tw-animate-pulse" style={{ animationDelay: '2s' }}></div>
        </div>
        <Container className="tw-relative tw-z-10 tw-text-center">
          <h2 className="tw-text-4xl lg:tw-text-6xl tw-font-bold tw-text-white tw-mb-6">
            Start Managing Smarter Today
          </h2>
          <p className="tw-text-xl tw-text-gray-200 tw-mb-12 tw-max-w-3xl tw-mx-auto">
            Try all features free for 30 days. No credit card required.
          </p>
          <div className="tw-flex tw-flex-col sm:tw-flex-row tw-gap-6 tw-justify-center">
            <Button
              size="lg"
              className="tw-bg-sky-600 tw-border-sky-600 hover:tw-bg-sky-700 tw-px-12 tw-py-4 tw-text-xl tw-font-semibold tw-shadow-2xl"
              onClick={() => setShowTrialModal(true)}
            >
              Start Free Trial
            </Button>
            <Button
              size="lg"
              variant="outline-light"
              className="tw-border-2 tw-px-12 tw-py-4 tw-text-xl tw-font-semibold"
              onClick={() => setShowDemoModal(true)}
            >
              Book a Demo
            </Button>
          </div>
          <div className="tw-mt-12 tw-text-gray-300">
            <p className="tw-text-lg">Join hundreds of charter companies already using Charter Ops</p>
            <div className="tw-flex tw-justify-center tw-items-center tw-mt-6 tw-space-x-8 tw-opacity-60">
              <div className="tw-text-sm">✈️ Trusted by 200+ Companies</div>
              <div className="tw-text-sm">🛡️ Enterprise Security</div>
              <div className="tw-text-sm">🚀 99.9% Uptime</div>
            </div>
          </div>
        </Container>
      </section>

      {/* Footer Section */}
      <footer id="contact" className="tw-bg-blue-900 tw-text-white tw-py-16">
        <Container>
          <Row className="tw-mb-12">
            <Col md={6}>
              <div className="tw-flex tw-items-center tw-space-x-2 tw-mb-6">
                <div className="tw-w-10 tw-h-10 tw-bg-sky-500 tw-rounded-lg tw-flex tw-items-center tw-justify-center">
                  <span className="tw-text-white tw-font-bold tw-text-xl">✈</span>
                </div>
                <span className="tw-text-2xl tw-font-bold">Charter Ops</span>
              </div>
              <p className="tw-text-gray-300 tw-leading-relaxed tw-max-w-md tw-mb-6">
                The complete ERP solution for private charter companies. Streamline your operations, automate your processes, and grow your business with confidence.
              </p>
              <div>
                <p className="tw-text-gray-300 tw-mb-2">Ready to get started?</p>
                <p className="tw-text-sky-400 tw-font-semibold">📧 hello@charterops.com</p>
                <p className="tw-text-sky-400 tw-font-semibold">📞 +234 (0) 801 234 5678</p>
              </div>
            </Col>
            <Col md={3}>
              <h3 className="tw-text-lg tw-font-semibold tw-mb-4">Company</h3>
              <ul className="tw-list-none tw-space-y-2">
                <li><a href="#" className="tw-text-gray-300 hover:tw-text-sky-400 tw-no-underline">About Us</a></li>
                <li><a href="#" className="tw-text-gray-300 hover:tw-text-sky-400 tw-no-underline">Careers</a></li>
                <li><a href="#" className="tw-text-gray-300 hover:tw-text-sky-400 tw-no-underline">Press</a></li>
                <li><a href="#" className="tw-text-gray-300 hover:tw-text-sky-400 tw-no-underline">Blog</a></li>
              </ul>
            </Col>
            <Col md={3}>
              <h3 className="tw-text-lg tw-font-semibold tw-mb-4">Support</h3>
              <ul className="tw-list-none tw-space-y-2">
                <li><a href="#" className="tw-text-gray-300 hover:tw-text-sky-400 tw-no-underline">Help Center</a></li>
                <li><a href="#" className="tw-text-gray-300 hover:tw-text-sky-400 tw-no-underline">Contact Us</a></li>
                <li><a href="#" className="tw-text-gray-300 hover:tw-text-sky-400 tw-no-underline">Terms of Service</a></li>
                <li><a href="#" className="tw-text-gray-300 hover:tw-text-sky-400 tw-no-underline">Privacy Policy</a></li>
              </ul>
            </Col>
          </Row>
          <hr className="tw-border-gray-700 tw-mb-8" />
          <Row className="tw-items-center">
            <Col md={6}>
              <div className="tw-text-gray-400 tw-mb-4 md:tw-mb-0">
                © 2024 Charter Ops. All rights reserved.
              </div>
            </Col>
            <Col md={6} className="tw-text-md-end">
              <div className="tw-flex tw-space-x-6 tw-justify-end">
                <a href="#" className="tw-text-gray-400 hover:tw-text-sky-400">
                  <svg className="tw-w-6 tw-h-6" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z" />
                  </svg>
                </a>
                <a href="#" className="tw-text-gray-400 hover:tw-text-sky-400">
                  <svg className="tw-w-6 tw-h-6" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                  </svg>
                </a>
              </div>
            </Col>
          </Row>
        </Container>
      </footer>

      {/* Modals */}
      <TrialModal />
      <DemoModal />
    </div>
  );
};

export default App;