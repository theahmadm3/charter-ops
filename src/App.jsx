import { useState } from 'react';
import {
  Button,
  TextField,
  Card,
  CardHeader,
  CardContent,
  Typography,
  Select,
  MenuItem,
  InputLabel,
  FormControl,
  Dialog,
  DialogContent,
  Divider,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Avatar,
  Chip,
  Box,
  Container,
  Grid,
  Paper,
  IconButton,
  List,
  ListItem,
  ListItemText,
  ListItemAvatar
} from '@mui/material';
import {
  Flight,
  LocalGasStation,
  AttachMoney,
  CalendarToday,
  BarChart,
  Build,
  PlayArrow,
  Check,
  ExpandMore,
  Twitter,
  Facebook,
  LinkedIn,
  FormatQuote
} from '@mui/icons-material';

const App = () => {
  const [showTrialForm, setShowTrialForm] = useState(false);
  const [showDemoForm, setShowDemoForm] = useState(false);
  const [billingCycle, setBillingCycle] = useState('monthly');

  // Hero Section Forms
  const TrialForm = () => (
    <Card sx={{ maxWidth: 500, boxShadow: 'none' }}>
      <CardHeader
        title={
          <Typography variant="h5" align="center" color="primary">
            Start Your Free Trial
          </Typography>
        }
      />
      <CardContent sx={{ '& > *': { mb: 2 } }}>
        <TextField fullWidth label="Full Name" placeholder="Enter your full name" />
        <TextField fullWidth label="Company Name" placeholder="Enter your company name" />
        <TextField fullWidth label="Email Address" type="email" placeholder="Enter your email" />
        <TextField fullWidth label="Password" type="password" placeholder="Create a password" />
        <FormControl fullWidth>
          <InputLabel>Company Type (Optional)</InputLabel>
          <Select label="Company Type (Optional)">
            <MenuItem value="small">Small Charter (1-5 aircraft)</MenuItem>
            <MenuItem value="medium">Medium Charter (6-20 aircraft)</MenuItem>
            <MenuItem value="large">Large Charter (20+ aircraft)</MenuItem>
            <MenuItem value="management">Aircraft Management</MenuItem>
          </Select>
        </FormControl>
        <Button fullWidth variant="contained" color="primary" size="large">
          Start Free Trial
        </Button>
      </CardContent>
    </Card>
  );

  const DemoForm = () => (
    <Card sx={{ maxWidth: 500, boxShadow: 'none' }}>
      <CardHeader
        title={
          <Typography variant="h5" align="center" color="primary">
            Book a Demo
          </Typography>
        }
      />
      <CardContent sx={{ '& > *': { mb: 2 } }}>
        <TextField fullWidth label="Full Name" placeholder="Enter your full name" />
        <TextField fullWidth label="Email Address" type="email" placeholder="Enter your email" />
        <TextField fullWidth label="Phone Number (Optional)" placeholder="Enter your phone number" />
        <FormControl fullWidth>
          <InputLabel>Company Size</InputLabel>
          <Select label="Company Size">
            <MenuItem value="1-10">1-10 employees</MenuItem>
            <MenuItem value="11-50">11-50 employees</MenuItem>
            <MenuItem value="51-200">51-200 employees</MenuItem>
            <MenuItem value="200+">200+ employees</MenuItem>
          </Select>
        </FormControl>
        <Button fullWidth variant="contained" color="primary" size="large">
          Schedule Demo
        </Button>
      </CardContent>
    </Card>
  );

  // Data for various sections
  const features = [
    {
      icon: <CalendarToday fontSize="large" />,
      title: 'Automated Booking & Reminders',
      description: 'Streamline your booking process with automated confirmations and smart reminder systems.'
    },
    {
      icon: <BarChart fontSize="large" />,
      title: 'Visual Dashboards & Infographics',
      description: 'Get real-time insights with beautiful charts and comprehensive analytics.'
    },
    {
      icon: <Build fontSize="large" />,
      title: 'Maintenance Tracking & Alerts',
      description: 'Stay ahead of maintenance schedules with automated alerts and tracking.'
    },
    {
      icon: <LocalGasStation fontSize="large" />,
      title: 'Fuel Inventory Log',
      description: 'Monitor fuel consumption and inventory levels across your entire fleet.'
    },
    {
      icon: <AttachMoney fontSize="large" />,
      title: 'Debts & Financial Overview',
      description: 'Complete financial management with automated invoicing and debt tracking.'
    }
  ];

  const fullFeatures = [
    {
      title: 'Booking Automation',
      description: 'Automated booking confirmations, customer communications, and schedule management.'
    },
    {
      title: 'Smart Alerts & Emails',
      description: 'Intelligent notification system for maintenance, bookings, and operational updates.'
    },
    {
      title: 'Fuel Collection & Usage',
      description: 'Comprehensive fuel management with real-time tracking and cost analysis.'
    },
    {
      title: 'Accounting & Receivables',
      description: 'Complete financial management including invoicing, payments, and debt tracking.'
    },
    {
      title: 'Aircraft Maintenance Scheduling',
      description: 'Proactive maintenance scheduling with compliance tracking and alerts.'
    }
  ];

  const plans = [
    {
      name: 'Monthly Plan',
      price: billingCycle === 'monthly' ? '₦45,000' : '₦40,500',
      period: 'per month',
      features: [
        'Up to 5 aircraft',
        'Basic booking management',
        'Email notifications',
        'Basic reporting',
        'Email support'
      ],
      popular: false
    },
    {
      name: 'Quarterly Plan',
      price: billingCycle === 'monthly' ? '₦120,000' : '₦108,000',
      period: 'per quarter',
      features: [
        'Up to 15 aircraft',
        'Advanced booking automation',
        'SMS & Email notifications',
        'Advanced analytics',
        'Priority support',
        'Fuel management'
      ],
      popular: false
    },
    {
      name: 'Annual Plan',
      price: billingCycle === 'monthly' ? '₦420,000' : '₦378,000',
      period: 'per year',
      features: [
        'Unlimited aircraft',
        'Full automation suite',
        'Multi-channel notifications',
        'Custom reporting',
        '24/7 phone support',
        'Complete financial management',
        'API access',
        'Custom integrations'
      ],
      popular: true
    }
  ];

  const testimonials = [
    {
      quote: "CharterOps helped us reduce booking errors by 90%. Game changer for our ops team.",
      name: "Sarah Johnson",
      title: "Operations Manager",
      company: "Skybird Charter",
      avatar: "SJ"
    },
    {
      quote: "The automated maintenance alerts saved us from costly downtime. Excellent platform.",
      name: "Michael Chen",
      title: "Fleet Director",
      company: "Elite Aviation",
      avatar: "MC"
    },
    {
      quote: "Financial management became so much easier. We can track everything in real-time.",
      name: "Amara Okafor",
      title: "CFO",
      company: "West African Jets",
      avatar: "AO"
    }
  ];

  const faqs = [
    {
      question: "Can I integrate with existing tools?",
      answer: "Yes, Charter Ops offers API integration with popular aviation tools, accounting software, and customer management systems. Our team can help you set up custom integrations based on your specific needs."
    },
    {
      question: "Is it secure?",
      answer: "Absolutely. We use enterprise-grade security with 256-bit SSL encryption, regular security audits, and comply with aviation industry data protection standards. Your sensitive business data is always protected."
    },
    {
      question: "Can I get help setting up?",
      answer: "Yes! We provide comprehensive onboarding support including data migration, staff training, and personalized setup assistance. Our support team is available to ensure a smooth transition to Charter Ops."
    },
    {
      question: "What's included in the free trial?",
      answer: "The 30-day free trial includes full access to all features, unlimited bookings, email support, and training resources. No credit card required, and you can cancel anytime."
    },
    {
      question: "How does billing work?",
      answer: "You can choose monthly, quarterly, or annual billing cycles. All plans include automatic updates, regular backups, and our standard support. Annual plans receive a 10% discount."
    },
    {
      question: "Can I customize the system for my specific needs?",
      answer: "Yes, Charter Ops is highly customizable. You can configure workflows, create custom fields, set up automated notifications, and even develop custom integrations through our API."
    }
  ];

  return (
    <Box sx={{ bgcolor: 'background.default' }}>
      {/* Hero Section */}
      <Box sx={{
        position: 'relative',
        minHeight: '100vh',
        bgcolor: 'primary.dark',
        overflow: 'hidden',
        color: 'common.white'
      }}>
        {/* Background Animation */}
        <Box sx={{
          position: 'absolute',
          inset: 0,
          opacity: 0.1,
          '& > *': {
            position: 'absolute',
            borderRadius: '50%',
            filter: 'blur(48px)',
            animation: 'float 6s ease-in-out infinite',
            '&:nth-of-type(2)': {
              animationDelay: '1s'
            }
          }
        }}>
          <Box sx={{
            top: '25%',
            left: '25%',
            width: 256,
            height: 256,
            bgcolor: 'secondary.light'
          }} />
          <Box sx={{
            bottom: '25%',
            right: '25%',
            width: 384,
            height: 384,
            bgcolor: 'primary.light'
          }} />
        </Box>

        {/* Navigation */}
        <Container>
          <Box sx={{
            position: 'relative',
            zIndex: 10,
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            py: 3,
            px: { xs: 2, lg: 3 }
          }}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              <Avatar sx={{ bgcolor: 'secondary.main' }}>
                <Flight />
              </Avatar>
              <Typography variant="h5" component="div" fontWeight="bold">
                Charter Ops
              </Typography>
            </Box>

            <Box sx={{ display: { xs: 'none', md: 'flex' }, gap: 4 }}>
              {['Features', 'Pricing', 'Demo', 'Contact'].map((item) => (
                <Button
                  key={item}
                  href={`#${item.toLowerCase()}`}
                  color="inherit"
                  sx={{ '&:hover': { color: 'secondary.light' } }}
                >
                  {item}
                </Button>
              ))}
            </Box>
          </Box>

          {/* Hero Content */}
          <Box sx={{
            position: 'relative',
            zIndex: 10,
            py: 10,
            px: { xs: 2, lg: 3 }
          }}>
            <Grid container spacing={6} alignItems="center">
              {/* Left Content */}
              <Grid item xs={12} lg={6}>
                <Box sx={{ animation: 'fadeIn 1s ease-in' }}>
                  <Typography variant="h2" component="h1" fontWeight="bold" gutterBottom>
                    Smart ERP for
                    <Box component="span" display="block" color="secondary.main">Private Charter</Box>
                    <Box component="span" color="secondary.light">Companies</Box>
                  </Typography>

                  <Typography variant="h6" color="text.secondary" paragraph>
                    Automate your bookings, operations, and finance in one powerful aviation suite.
                  </Typography>

                  <Box sx={{ display: 'flex', gap: 2, flexDirection: { xs: 'column', sm: 'row' }, mt: 4 }}>
                    <Button
                      variant="contained"
                      color="secondary"
                      size="large"
                      onClick={() => setShowTrialForm(true)}
                      sx={{
                        px: 4,
                        py: 2,
                        fontSize: '1.1rem',
                        fontWeight: 'medium',
                        '&:hover': { transform: 'scale(1.05)' }
                      }}
                    >
                      Start Free Trial
                    </Button>
                    <Dialog open={showTrialForm} onClose={() => setShowTrialForm(false)}>
                      <DialogContent>
                        <TrialForm />
                      </DialogContent>
                    </Dialog>

                    <Button
                      variant="outlined"
                      color="inherit"
                      size="large"
                      onClick={() => setShowDemoForm(true)}
                      sx={{
                        px: 4,
                        py: 2,
                        fontSize: '1.1rem',
                        fontWeight: 'medium',
                        borderWidth: 2,
                        '&:hover': {
                          bgcolor: 'common.white',
                          color: 'primary.dark',
                          borderWidth: 2,
                          transform: 'scale(1.05)'
                        }
                      }}
                    >
                      Book a Demo
                    </Button>
                    <Dialog open={showDemoForm} onClose={() => setShowDemoForm(false)}>
                      <DialogContent>
                        <DemoForm />
                      </DialogContent>
                    </Dialog>
                  </Box>
                </Box>
              </Grid>

              {/* Right Content - Dashboard Mockup */}
              <Grid item xs={12} lg={6}>
                <Box sx={{
                  position: 'relative',
                  animation: 'slideInRight 1s ease-in',
                  bgcolor: 'rgba(255,255,255,0.1)',
                  backdropFilter: 'blur(16px)',
                  borderRadius: 3,
                  p: 4,
                  border: '1px solid rgba(255,255,255,0.2)'
                }}>
                  <Box sx={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    mb: 4
                  }}>
                    <Typography variant="h6" color="common.white" fontWeight="medium">
                      Charter Ops Dashboard
                    </Typography>
                    <Box sx={{ display: 'flex', gap: 0.5 }}>
                      {['error', 'warning', 'success'].map((color) => (
                        <Box key={color} sx={{
                          width: 12,
                          height: 12,
                          borderRadius: '50%',
                          bgcolor: `${color}.main`
                        }} />
                      ))}
                    </Box>
                  </Box>

                  <Grid container spacing={2} sx={{ mb: 4 }}>
                    <Grid item xs={6}>
                      <Paper sx={{
                        bgcolor: 'secondary.light',
                        p: 2,
                        borderRadius: 2,
                        borderLeft: '4px solid',
                        borderColor: 'secondary.main'
                      }}>
                        <Typography variant="body2" color="secondary.contrastText">
                          Active Flights
                        </Typography>
                        <Typography variant="h4" color="common.white">
                          12
                        </Typography>
                      </Paper>
                    </Grid>
                    <Grid item xs={6}>
                      <Paper sx={{
                        bgcolor: 'success.light',
                        p: 2,
                        borderRadius: 2,
                        borderLeft: '4px solid',
                        borderColor: 'success.main'
                      }}>
                        <Typography variant="body2" color="success.contrastText">
                          Revenue Today
                        </Typography>
                        <Typography variant="h4" color="common.white">
                          ₦2.4M
                        </Typography>
                      </Paper>
                    </Grid>
                  </Grid>

                  <Paper sx={{
                    bgcolor: 'rgba(255,255,255,0.05)',
                    p: 2,
                    borderRadius: 2
                  }}>
                    <Typography variant="body2" color="common.white" fontWeight="medium" mb={1}>
                      Flight Schedule
                    </Typography>
                    <Box sx={{ '& > *': { mb: 1 } }}>
                      <Box sx={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        color: 'text.secondary'
                      }}>
                        <Typography variant="body2">Lagos → Abuja</Typography>
                        <Typography variant="body2">14:30</Typography>
                      </Box>
                      <Box sx={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        color: 'text.secondary'
                      }}>
                        <Typography variant="body2">Abuja → Port Harcourt</Typography>
                        <Typography variant="body2">16:45</Typography>
                      </Box>
                    </Box>
                  </Paper>
                </Box>
              </Grid>
            </Grid>
          </Box>
        </Container>
      </Box>

      {/* Features Section */}
      <Box id="features" sx={{ py: 10, bgcolor: 'background.paper' }}>
        <Container>
          <Box sx={{ textAlign: 'center', mb: 8 }}>
            <Typography variant="h3" component="h2" fontWeight="bold" gutterBottom>
              Built for Charter Ops Teams
            </Typography>
            <Typography variant="h6" color="text.secondary" maxWidth="md" mx="auto">
              Everything you need to manage your charter operations efficiently and professionally.
            </Typography>
          </Box>

          <Grid container spacing={4}>
            {features.map((feature, index) => (
              <Grid item xs={12} sm={6} lg={4} key={index}>
                <Card sx={{
                  height: '100%',
                  transition: 'all 0.3s',
                  '&:hover': {
                    transform: 'translateY(-8px)',
                    boxShadow: 6
                  }
                }}>
                  <CardHeader
                    avatar={
                      <Avatar sx={{
                        bgcolor: 'primary.main',
                        color: 'common.white',
                        width: 56,
                        height: 56,
                        '& .MuiSvgIcon-root': { fontSize: 32 }
                      }}>
                        {feature.icon}
                      </Avatar>
                    }
                    title={
                      <Typography variant="h6" fontWeight="medium">
                        {feature.title}
                      </Typography>
                    }
                    sx={{ textAlign: 'center' }}
                  />
                  <CardContent>
                    <Typography variant="body1" color="text.secondary" align="center">
                      {feature.description}
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Container>
      </Box>

      {/* Full Feature Overview Section */}
      <Box sx={{ py: 10, bgcolor: 'background.default' }}>
        <Container>
          <Box sx={{ textAlign: 'center', mb: 8 }}>
            <Typography variant="h3" component="h2" fontWeight="bold" gutterBottom>
              End-to-End Control for Charter Ops
            </Typography>
          </Box>

          <Grid container spacing={6} alignItems="center">
            {/* Dashboard Image */}
            <Grid item xs={12} lg={6}>
              <Box sx={{
                position: 'relative',
                bgcolor: 'primary.light',
                borderRadius: 3,
                p: 4,
                boxShadow: 6
              }}>
                <Paper sx={{ p: 3, borderRadius: 2 }}>
                  <Box sx={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    mb: 3
                  }}>
                    <Typography variant="h5" component="h3" fontWeight="bold">
                      Operations Dashboard
                    </Typography>
                    <Box sx={{ display: 'flex', gap: 0.5 }}>
                      {['error', 'warning', 'success'].map((color) => (
                        <Box key={color} sx={{
                          width: 12,
                          height: 12,
                          borderRadius: '50%',
                          bgcolor: `${color}.main`
                        }} />
                      ))}
                    </Box>
                  </Box>

                  <Grid container spacing={2} sx={{ mb: 3 }}>
                    <Grid item xs={6}>
                      <Paper sx={{
                        bgcolor: 'secondary.light',
                        p: 2,
                        borderRadius: 2,
                        borderLeft: '4px solid',
                        borderColor: 'secondary.main'
                      }}>
                        <Typography variant="body2" color="secondary.contrastText">
                          Total Flights
                        </Typography>
                        <Typography variant="h4" color="text.primary">
                          847
                        </Typography>
                        <Typography variant="body2" color="success.main">
                          ↗ +12% this month
                        </Typography>
                      </Paper>
                    </Grid>
                    <Grid item xs={6}>
                      <Paper sx={{
                        bgcolor: 'success.light',
                        p: 2,
                        borderRadius: 2,
                        borderLeft: '4px solid',
                        borderColor: 'success.main'
                      }}>
                        <Typography variant="body2" color="success.contrastText">
                          Revenue
                        </Typography>
                        <Typography variant="h4" color="text.primary">
                          ₦12.4M
                        </Typography>
                        <Typography variant="body2" color="success.main">
                          ↗ +8% this month
                        </Typography>
                      </Paper>
                    </Grid>
                  </Grid>

                  <Paper sx={{ bgcolor: 'grey.100', p: 2, borderRadius: 2 }}>
                    <Typography variant="body1" fontWeight="medium" mb={2}>
                      Recent Bookings
                    </Typography>
                    <List>
                      {[
                        { route: 'Lagos → Abuja', status: 'Confirmed', color: 'success.main' },
                        { route: 'Abuja → Kano', status: 'Pending', color: 'warning.main' },
                        { route: 'Port Harcourt → Lagos', status: 'Confirmed', color: 'success.main' }
                      ].map((item, i) => (
                        <ListItem key={i} sx={{ px: 0 }}>
                          <ListItemText primary={item.route} />
                          <Typography color={item.color} fontWeight="medium">
                            {item.status}
                          </Typography>
                        </ListItem>
                      ))}
                    </List>
                  </Paper>
                </Paper>
              </Box>
            </Grid>

            {/* Features List */}
            <Grid item xs={12} lg={6}>
              <Box sx={{ '& > *': { mb: 3 } }}>
                {fullFeatures.map((feature, index) => (
                  <Paper key={index} sx={{
                    p: 3,
                    display: 'flex',
                    alignItems: 'flex-start',
                    gap: 3,
                    transition: 'background-color 0.3s',
                    '&:hover': { bgcolor: 'action.hover' }
                  }}>
                    <Avatar sx={{
                      bgcolor: 'secondary.main',
                      color: 'common.white',
                      width: 48,
                      height: 48
                    }}>
                      <Check />
                    </Avatar>
                    <Box>
                      <Typography variant="h6" component="h3" fontWeight="medium" mb={1}>
                        {feature.title}
                      </Typography>
                      <Typography variant="body1" color="text.secondary">
                        {feature.description}
                      </Typography>
                    </Box>
                  </Paper>
                ))}
              </Box>
            </Grid>
          </Grid>
        </Container>
      </Box>

      {/* Demo Section */}
      <Box id="demo" sx={{
        py: 10,
        bgcolor: 'primary.dark',
        color: 'common.white',
        textAlign: 'center'
      }}>
        <Container>
          <Typography variant="h3" component="h2" fontWeight="bold" gutterBottom>
            See It in Action
          </Typography>
          <Typography variant="h6" color="text.secondary" mb={6} maxWidth="md" mx="auto">
            Watch how Charter Ops transforms your aviation business operations with our comprehensive ERP solution.
          </Typography>

          <Box maxWidth="md" mx="auto">
            <Paper sx={{
              bgcolor: 'rgba(255,255,255,0.1)',
              backdropFilter: 'blur(16px)',
              borderRadius: 3,
              p: 4,
              border: '1px solid rgba(255,255,255,0.2)'
            }}>
              <Box sx={{
                aspectRatio: '16/9',
                bgcolor: 'primary.main',
                borderRadius: 2,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}>
                <Box textAlign="center">
                  <Avatar sx={{
                    bgcolor: 'rgba(255,255,255,0.2)',
                    width: 96,
                    height: 96,
                    mb: 3,
                    mx: 'auto'
                  }}>
                    <PlayArrow sx={{ fontSize: 48 }} />
                  </Avatar>
                  <Typography variant="h4" component="h3" fontWeight="medium" mb={2}>
                    Charter Ops Demo Video
                  </Typography>
                  <Typography variant="body1" color="text.secondary" mb={3}>
                    See how our platform streamlines your entire charter operation
                  </Typography>
                  <Button
                    variant="contained"
                    color="secondary"
                    size="large"
                    startIcon={<PlayArrow />}
                    sx={{ px: 6, py: 2 }}
                  >
                    Watch Demo
                  </Button>
                </Box>
              </Box>
            </Paper>
          </Box>
        </Container>
      </Box>

      {/* Pricing Section */}
      <Box id="pricing" sx={{ py: 10, bgcolor: 'background.paper' }}>
        <Container>
          <Box sx={{ textAlign: 'center', mb: 8 }}>
            <Typography variant="h3" component="h2" fontWeight="bold" gutterBottom>
              Simple, Flexible Pricing
            </Typography>
            <Typography variant="h6" color="text.secondary" mb={4}>
              Choose the plan that fits your charter operation
            </Typography>

            <Paper sx={{
              display: 'inline-flex',
              p: 0.5,
              borderRadius: 2,
              boxShadow: 2
            }}>
              <Button
                onClick={() => setBillingCycle('monthly')}
                variant={billingCycle === 'monthly' ? 'contained' : 'text'}
                color="primary"
                sx={{
                  px: 4,
                  py: 1,
                  borderRadius: 2,
                  '&.MuiButton-contained': { boxShadow: 'none' }
                }}
              >
                Monthly
              </Button>
              <Button
                onClick={() => setBillingCycle('annual')}
                variant={billingCycle === 'annual' ? 'contained' : 'text'}
                color="primary"
                sx={{
                  px: 4,
                  py: 1,
                  borderRadius: 2,
                  '&.MuiButton-contained': { boxShadow: 'none' }
                }}
              >
                Annual (Save 10%)
              </Button>
            </Paper>
          </Box>

          <Grid container spacing={4}>
            {plans.map((plan, index) => (
              <Grid item xs={12} md={4} key={index}>
                <Card sx={{
                  height: '100%',
                  position: 'relative',
                  borderColor: plan.popular ? 'secondary.main' : 'divider',
                  borderWidth: plan.popular ? 2 : 1,
                  borderStyle: 'solid',
                  transform: plan.popular ? 'scale(1.02)' : 'none',
                  boxShadow: plan.popular ? 4 : 2
                }}>
                  {plan.popular && (
                    <Chip
                      label="Best Value"
                      color="secondary"
                      sx={{
                        position: 'absolute',
                        top: -16,
                        left: '50%',
                        transform: 'translateX(-50%)',
                        height: 32,
                        '& .MuiChip-label': { fontWeight: 'medium' }
                      }}
                    />
                  )}

                  <CardHeader
                    title={
                      <Typography variant="h5" component="h3" align="center" fontWeight="bold">
                        {plan.name}
                      </Typography>
                    }
                    subheader={
                      <Box textAlign="center">
                        <Typography variant="h3" component="div" fontWeight="bold">
                          {plan.price}
                        </Typography>
                        <Typography variant="body1" color="text.secondary">
                          {plan.period}
                        </Typography>
                      </Box>
                    }
                    sx={{ pb: 0 }}
                  />

                  <CardContent>
                    <List sx={{ mb: 3 }}>
                      {plan.features.map((feature, featureIndex) => (
                        <ListItem key={featureIndex} sx={{ px: 0 }}>
                          <ListItemAvatar sx={{ minWidth: 32 }}>
                            <Check color="success" />
                          </ListItemAvatar>
                          <ListItemText primary={feature} />
                        </ListItem>
                      ))}
                    </List>

                    <Button
                      fullWidth
                      variant="contained"
                      color={plan.popular ? 'secondary' : 'primary'}
                      size="large"
                      sx={{ py: 2 }}
                    >
                      Start Free Trial
                    </Button>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Container>
      </Box>

      {/* Testimonials Section */}
      <Box sx={{ py: 10, bgcolor: 'background.default' }}>
        <Container>
          <Box sx={{ textAlign: 'center', mb: 8 }}>
            <Typography variant="h3" component="h2" fontWeight="bold" gutterBottom>
              Trusted by Growing Aviation Brands
            </Typography>
            <Typography variant="h6" color="text.secondary">
              See what our customers have to say about Charter Ops
            </Typography>
          </Box>

          <Grid container spacing={4}>
            {testimonials.map((testimonial, index) => (
              <Grid item xs={12} md={4} key={index}>
                <Card sx={{ height: '100%' }}>
                  <CardContent sx={{ p: 4 }}>
                    <Box mb={3}>
                      <FormatQuote sx={{
                        color: 'secondary.main',
                        fontSize: 48,
                        mb: 2,
                        opacity: 0.7
                      }} />
                      <Typography variant="body1" color="text.secondary" fontStyle="italic">
                        {`"${testimonial.quote}"`}
                      </Typography>
                    </Box>

                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                      <Avatar sx={{
                        bgcolor: 'secondary.main',
                        color: 'common.white',
                        width: 48,
                        height: 48,
                        mr: 2
                      }}>
                        {testimonial.avatar}
                      </Avatar>
                      <Box>
                        <Typography variant="subtitle1" fontWeight="medium">
                          {testimonial.name}
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                          {testimonial.title}
                        </Typography>
                        <Typography variant="body2" color="secondary.main" fontWeight="medium">
                          {testimonial.company}
                        </Typography>
                      </Box>
                    </Box>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Container>
      </Box>

      {/* FAQ Section */}
      <Box sx={{ py: 10, bgcolor: 'background.paper' }}>
        <Container>
          <Box sx={{ textAlign: 'center', mb: 8 }}>
            <Typography variant="h3" component="h2" fontWeight="bold" gutterBottom>
              Frequently Asked Questions
            </Typography>
            <Typography variant="h6" color="text.secondary">
              Everything you need to know about Charter Ops
            </Typography>
          </Box>

          <Box maxWidth="md" mx="auto">
            {faqs.map((faq, index) => (
              <Accordion key={index} sx={{ mb: 2 }}>
                <AccordionSummary expandIcon={<ExpandMore />}>
                  <Typography variant="subtitle1" fontWeight="medium">
                    {faq.question}
                  </Typography>
                </AccordionSummary>
                <AccordionDetails>
                  <Typography variant="body1" color="text.secondary">
                    {faq.answer}
                  </Typography>
                </AccordionDetails>
              </Accordion>
            ))}
          </Box>
        </Container>
      </Box>

      {/* Final CTA Section */}
      <Box sx={{
        position: 'relative',
        py: 10,
        bgcolor: 'primary.dark',
        color: 'common.white',
        textAlign: 'center',
        overflow: 'hidden'
      }}>
        {/* Background Overlay */}
        <Box sx={{
          position: 'absolute',
          inset: 0,
          opacity: 0.2,
          backgroundImage: 'linear-gradient(to right, rgba(13, 25, 48, 0.8), rgba(66, 79, 149, 0.8))'
        }} />

        {/* Background Elements */}
        <Box sx={{
          position: 'absolute',
          inset: 0,
          opacity: 0.1,
          '& > *': {
            position: 'absolute',
            borderRadius: '50%',
            filter: 'blur(48px)',
            animation: 'float 6s ease-in-out infinite',
            '&:nth-of-type(1)': {
              top: '25%',
              right: '25%',
              width: 256,
              height: 256,
              bgcolor: 'secondary.light'
            },
            '&:nth-of-type(2)': {
              bottom: '25%',
              left: '25%',
              width: 384,
              height: 384,
              bgcolor: 'primary.light',
              animationDelay: '2s'
            }
          }
        }} />

        <Container>
          <Box position="relative" zIndex={10}>
            <Typography variant="h3" component="h2" fontWeight="bold" gutterBottom>
              Start Managing Smarter Today
            </Typography>
            <Typography variant="h6" color="text.secondary" mb={6} maxWidth="md" mx="auto">
              Try all features free for 30 days. No credit card required.
            </Typography>

            <Box sx={{
              display: 'flex',
              gap: 3,
              justifyContent: 'center',
              flexDirection: { xs: 'column', sm: 'row' }
            }}>
              <Button
                variant="contained"
                color="secondary"
                size="large"
                sx={{
                  px: 6,
                  py: 3,
                  fontSize: '1.1rem',
                  fontWeight: 'medium',
                  boxShadow: 6,
                  '&:hover': { transform: 'scale(1.05)' }
                }}
              >
                Start Free Trial
              </Button>
              <Button
                variant="outlined"
                color="inherit"
                size="large"
                sx={{
                  px: 6,
                  py: 3,
                  fontSize: '1.1rem',
                  fontWeight: 'medium',
                  borderWidth: 2,
                  '&:hover': {
                    bgcolor: 'common.white',
                    color: 'primary.dark',
                    borderWidth: 2
                  }
                }}
              >
                Book a Demo
              </Button>
            </Box>

            <Box mt={6} color="text.secondary">
              <Typography variant="body1" mb={2}>
                Join hundreds of charter companies already using Charter Ops
              </Typography>
              <Box sx={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                gap: 4,
                opacity: 0.6
              }}>
                <Typography variant="body2">✈️ Trusted by 200+ Companies</Typography>
                <Typography variant="body2">🛡️ Enterprise Security</Typography>
                <Typography variant="body2">🚀 99.9% Uptime</Typography>
              </Box>
            </Box>
          </Box>
        </Container>
      </Box>

      {/* Footer Section */}
      <Box id="contact" sx={{
        bgcolor: 'primary.main',
        color: 'common.white',
        py: 8
      }}>
        <Container>
          <Grid container spacing={4} mb={6}>
            {/* Logo and Description */}
            <Grid item xs={12} md={6}>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 3 }}>
                <Avatar sx={{ bgcolor: 'secondary.main' }}>
                  <Flight />
                </Avatar>
                <Typography variant="h5" component="div" fontWeight="bold">
                  Charter Ops
                </Typography>
              </Box>
              <Typography variant="body1" color="text.secondary" mb={3} maxWidth="sm">
                The complete ERP solution for private charter companies. Streamline your operations,
                automate your processes, and grow your business with confidence.
              </Typography>
              <Box>
                <Typography variant="body2" color="text.secondary" mb={1}>
                  Ready to get started?
                </Typography>
                <Typography variant="body1" color="secondary.main" fontWeight="medium">
                  📧 hello@charterops.com
                </Typography>
                <Typography variant="body1" color="secondary.main" fontWeight="medium">
                  📞 +234 (0) 801 234 5678
                </Typography>
              </Box>
            </Grid>

            {/* Company Links */}
            <Grid item xs={6} md={3}>
              <Typography variant="h6" component="h3" fontWeight="medium" mb={2}>
                Company
              </Typography>
              <List dense>
                {['About Us', 'Careers', 'Press', 'Blog'].map((item) => (
                  <ListItem key={item} disablePadding>
                    <Button
                      href="#"
                      color="inherit"
                      sx={{
                        justifyContent: 'flex-start',
                        px: 0,
                        '&:hover': { color: 'secondary.main' }
                      }}
                    >
                      {item}
                    </Button>
                  </ListItem>
                ))}
              </List>
            </Grid>

            {/* Support Links */}
            <Grid item xs={6} md={3}>
              <Typography variant="h6" component="h3" fontWeight="medium" mb={2}>
                Support
              </Typography>
              <List dense>
                {['Help Center', 'Contact Us', 'Terms of Service', 'Privacy Policy'].map((item) => (
                  <ListItem key={item} disablePadding>
                    <Button
                      href="#"
                      color="inherit"
                      sx={{
                        justifyContent: 'flex-start',
                        px: 0,
                        '&:hover': { color: 'secondary.main' }
                      }}
                    >
                      {item}
                    </Button>
                  </ListItem>
                ))}
              </List>
            </Grid>
          </Grid>

          <Divider sx={{ bgcolor: 'divider', mb: 4 }} />

          <Box sx={{
            display: 'flex',
            flexDirection: { xs: 'column', md: 'row' },
            justifyContent: 'space-between',
            alignItems: 'center',
            gap: 2
          }}>
            <Typography variant="body2" color="text.secondary">
              © 2024 Charter Ops. All rights reserved.
            </Typography>

            <Box sx={{ display: 'flex', gap: 3 }}>
              {[
                { icon: <Twitter />, name: 'Twitter' },
                { icon: <Facebook />, name: 'Facebook' },
                { icon: <LinkedIn />, name: 'LinkedIn' }
              ].map((social) => (
                <IconButton
                  key={social.name}
                  href="#"
                  color="inherit"
                  sx={{ '&:hover': { color: 'secondary.main' } }}
                >
                  {social.icon}
                </IconButton>
              ))}
            </Box>
          </Box>
        </Container>
      </Box>
    </Box>
  );
};

export default App;
