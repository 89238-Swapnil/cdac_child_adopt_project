import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Heart, Users, Building2, FileText, Shield, Clock, Quote } from 'lucide-react';

const Home = () => {
  const { isAuthenticated, isParent, isOrphanage } = useAuth();
  const navigate = useNavigate();

  React.useEffect(() => {
    window.scrollTo(0, 0);
    if (isAuthenticated()) {
      if (isParent()) {
        navigate('/parent/dashboard');
      } else if (isOrphanage()) {
        navigate('/orphanage/dashboard');
      }
    }
  }, [isAuthenticated, isParent, isOrphanage, navigate]);

  const features = [
    {
      icon: Heart,
      title: 'Caring Connections',
      description: 'Connect loving families with children in need of homes through our secure platform.',
    },
    {
      icon: Shield,
      title: 'Secure & Safe',
      description: 'All users are verified and the adoption process follows strict security protocols.',
    },
    {
      icon: Clock,
      title: 'Streamlined Process',
      description: 'Our digital platform makes the adoption process faster and more efficient.',
    },
    {
      icon: FileText,
      title: 'Document Management',
      description: 'Easily manage and submit all required adoption documents online.',
    },
  ];

  const testimonials = [
    {
      name: 'Neha Sharma',
      feedback: 'The process was smooth and clear. We were matched with a beautiful child within weeks!',
    },
    {
      name: 'Ajay & Priya',
      feedback: 'A truly wonderful experience. The platform guided us every step of the way.',
    },
    {
      name: 'Anita Rao',
      feedback: 'As an orphanage admin, it’s a blessing to find a tool that supports secure and loving adoptions.',
    },
  ];

  if (isAuthenticated()) {
    return null;
  }

  return (
    <div className="space-y-16">
      <section className="text-center space-y-8 transition-opacity duration-700 ease-in opacity-100">
        <div className="space-y-4">
          <h1 className="text-4xl md:text-6xl font-bold text-gray-900">Bringing Families Together</h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Our Child Adoption System connects orphanages with loving families, 
            making the adoption process transparent, secure, and efficient.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <Link to="/register/parent">
            <Button size="lg" className="w-full sm:w-auto">
              <Users className="mr-2 h-5 w-5" />
              Register as Parent
            </Button>
          </Link>
          <Link to="/register/orphanage">
            <Button variant="outline" size="lg" className="w-full sm:w-auto">
              <Building2 className="mr-2 h-5 w-5" />
              Register as Orphanage
            </Button>
          </Link>
        </div>

        <div className="text-sm text-gray-500">
          Already have an account?{' '}
          <Link to="/login" className="text-primary hover:underline">
            Sign in here
          </Link>
        </div>
      </section>

      <section className="space-y-8 transition-all duration-700 ease-in">
        <div className="text-center space-y-4">
          <h2 className="text-3xl font-bold text-gray-900">Why Choose Our Platform?</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            We provide a comprehensive solution for the adoption process, ensuring safety, 
            transparency, and efficiency for all parties involved.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <Card key={index} className="text-center">
                <CardHeader>
                  <div className="mx-auto w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                    <Icon className="h-6 w-6 text-primary" />
                  </div>
                  <CardTitle className="text-lg">{feature.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription>{feature.description}</CardDescription>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </section>

      <section className="space-y-8 transition-opacity duration-700 ease-in">
        <div className="text-center space-y-4">
          <h2 className="text-3xl font-bold text-gray-900">How It Works</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Our simple three-step process makes adoption accessible and straightforward.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="text-center space-y-4">
            <div className="mx-auto w-16 h-16 bg-primary rounded-full flex items-center justify-center text-white text-2xl font-bold">
              1
            </div>
            <h3 className="text-xl font-semibold">Register & Verify</h3>
            <p className="text-gray-600">
              Create your account as either a parent or orphanage and complete the verification process.
            </p>
          </div>

          <div className="text-center space-y-4">
            <div className="mx-auto w-16 h-16 bg-primary rounded-full flex items-center justify-center text-white text-2xl font-bold">
              2
            </div>
            <h3 className="text-xl font-semibold">Browse & Connect</h3>
            <p className="text-gray-600">
              Parents can browse available children and orphanages can manage their listings.
            </p>
          </div>

          <div className="text-center space-y-4">
            <div className="mx-auto w-16 h-16 bg-primary rounded-full flex items-center justify-center text-white text-2xl font-bold">
              3
            </div>
            <h3 className="text-xl font-semibold">Submit & Process</h3>
            <p className="text-gray-600">
              Submit adoption requests with required documents and track the approval process.
            </p>
          </div>
        </div>
      </section>

      <section className="space-y-8 transition-all duration-700 ease-in">
        <div className="text-center space-y-4">
          <h2 className="text-3xl font-bold text-gray-900">What People Are Saying</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Hear from parents and orphanages who’ve used our platform.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {testimonials.map((testimonial, index) => (
            <Card key={index} className="text-center p-4">
              <CardHeader>
                <Quote className="mx-auto w-8 h-8 text-primary" />
              </CardHeader>
              <CardContent>
                <p className="text-gray-700 italic mb-4">"{testimonial.feedback}"</p>
                <p className="text-sm font-semibold text-gray-900">{testimonial.name}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      <section className="bg-primary/5 rounded-lg p-8 text-center space-y-6 transition-opacity duration-700 ease-in">
        <h2 className="text-3xl font-bold text-gray-900">Ready to Get Started?</h2>
        <p className="text-gray-600 max-w-2xl mx-auto">
          Join our platform today and take the first step towards creating loving families 
          or helping children find their forever homes.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link to="/register/parent">
            <Button size="lg" className="w-full sm:w-auto">
              Start as Parent
            </Button>
          </Link>
          <Link to="/register/orphanage">
            <Button variant="outline" size="lg" className="w-full sm:w-auto">
              Start as Orphanage
            </Button>
          </Link>
        </div>
      </section>
    </div>
  );
};

export default Home;
