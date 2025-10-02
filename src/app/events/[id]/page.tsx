'use client';

import { useEffect, useState } from 'react';
import { notFound, useParams } from 'next/navigation';
import { ArrowRight, Calendar, Clock, MapPin, Check, Loader2, Upload, ArrowLeft, Download } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import Header from '@/components/header';

interface EventType {
  id: string;
  title: string;
  date: string;
  time: string;
  location: string;
  description: string;
  image: string;
  registration_link: string | null;
  category: string;
  is_featured?: boolean;
  end_date: string;
  registration_fee: number;
  created_at: string;
  updated_at: string;
  speakers?: Array<{
    name: string;
    role: string;
    image_url?: string;
  }>;
}

type FormData = {
  email: string;
  membershipId: string;
  firstName: string;
  lastName: string;
  whatsapp: string;
  branch: string;
  year: string;
  division: string;
  rollNumber: string;
  isAcmMember: string;
  paymentProof: File | null;
  transactionId: string;
};

type RegistrationStep = 'details' | 'payment' | 'success';

export default function EventPage() {
  const { id } = useParams();
  const [event, setEvent] = useState<EventType | null>(null);
  const [loading, setLoading] = useState(true);
  const [currentStep, setCurrentStep] = useState<RegistrationStep>('details');
  const [formData, setFormData] = useState<FormData>({
    email: '',
    membershipId: '',
    firstName: '',
    lastName: '',
    whatsapp: '',
    branch: '',
    year: '',
    division: '',
    rollNumber: '',
    isAcmMember: '',
    paymentProof: null,
    transactionId: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [screenshotPreview, setScreenshotPreview] = useState<string | null>(null);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target as HTMLInputElement;
    
    // If ACM member is set to "no", clear the membership ID
    if (name === 'isAcmMember' && value === 'no') {
      setFormData(prev => ({ ...prev, isAcmMember: 'no', membershipId: '' }));
    } else {
      setFormData(prev => ({ ...prev, [name]: value }));
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setFormData(prev => ({ ...prev, paymentProof: file }));
      setScreenshotPreview(URL.createObjectURL(file));
    }
  };

  const handleSubmitDetails = (e: React.FormEvent) => {
    e.preventDefault();
    setCurrentStep('payment');
  };

  const handlePaymentBack = () => {
    setCurrentStep('details');
  };

  const handleSubmitPayment = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false);
      setCurrentStep('success');
    }, 1500);
  };

  useEffect(() => {
    const fetchEvent = async () => {
      try {
        const response = await fetch('/data/events_local.json');
        if (!response.ok) {
          throw new Error('Failed to fetch events');
        }
        const events: EventType[] = await response.json();
        const eventData = events.find(event => event.id === id);
        
        if (!eventData) {
          return notFound();
        }

        setEvent(eventData);
      } catch (error) {
        console.error('Error fetching event:', error);
        return notFound();
      } finally {
        setLoading(false);
      }
    };

    fetchEvent();
  }, [id]);

  if (loading) {
    return <div className="min-h-screen bg-black flex items-center justify-center">Loading...</div>;
  }

  if (!event) {
    return null;
  }

  const eventDate = new Date(event.date);
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const isPastEvent = eventDate < today;
  const formattedDate = eventDate.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  return (
    <div className="relative min-h-screen bg-black overflow-hidden">
      {/* Full-page background image with enhanced styling */}
      {event.image && (
        <div className="fixed inset-0 z-0">
          <div className="absolute top-16 bottom-0 left-0 right-0">
            <Image
              src={event.image}
              alt={event.title}
              fill
              className="object-cover object-center"
              priority
              quality={90}
              sizes="100vw"
              style={{
                transform: 'scale(1.05)',
                transition: 'transform 0.5s ease-in-out',
              }}
            />
            <div className="absolute inset-0 bg-black/40 backdrop-blur-[2px]" />
          </div>
        </div>
      )}

      {/* Enhanced content container with glassmorphism effect */}
      <div className="relative z-10 min-h-screen flex justify-end overflow-y-auto">
        <div className="w-full max-w-xl bg-gradient-to-b from-white/5 to-white/[0.03] backdrop-blur-2xl border-l border-white/10 min-h-screen p-8 overflow-y-auto scroll-smooth">
            {/* Event category and title section */}
            <div className="mb-8">
              <div className="flex flex-wrap gap-2 mb-4">
                <span className="px-4 py-1.5 bg-blue-900/80 text-blue-100 text-xs font-medium rounded-full backdrop-blur-sm border border-blue-400/20">
                  {event.category}
                </span>
                {isPastEvent && (
                  <span className="px-3 py-1 bg-amber-900/60 text-amber-100 text-xs font-medium rounded-full backdrop-blur-sm border border-amber-400/20">
                    Past Event
                  </span>
                )}
              </div>
              
              <h1 className="text-4xl md:text-5xl font-bold text-white mb-6 leading-tight">
                {event.title}
              </h1>
              
              {event.registration_fee > 0 && (
                <div className="mb-6">
                  <span className="inline-block px-3 py-1 bg-emerald-900/60 text-emerald-100 text-sm font-medium rounded-full border border-emerald-500/20">
                    Registration: ₹{event.registration_fee}
                  </span>
                </div>
              )}
            </div>
            
            {/* Event details card with enhanced glass effect */}
            <div className="space-y-5 mb-10 bg-white/5 p-7 rounded-2xl border border-white/10 backdrop-blur-lg shadow-xl">
              <div className="flex items-center text-white/90 group">
                <div className="mr-4 p-2 bg-white/5 rounded-lg group-hover:bg-white/10 transition-colors">
                  <Calendar className="h-5 w-5 text-white/80" aria-hidden="true" />
                </div>
                <div>
                  <p className="text-xs font-medium text-white/60 mb-0.5">Date</p>
                  <p className="text-white font-medium">{formattedDate}</p>
                  {event.end_date && event.end_date !== event.date && (
                    <p className="text-sm text-white/70 mt-1">
                      to {new Date(event.end_date).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
                    </p>
                  )}
                </div>
              </div>
              
              <div className="h-px bg-white/10 w-full my-2"></div>
              
              <div className="flex items-center text-white/90 group">
                <div className="mr-4 p-2 bg-white/5 rounded-lg group-hover:bg-white/10 transition-colors">
                  <Clock className="h-5 w-5 text-white/80" aria-hidden="true" />
                </div>
                <div>
                  <p className="text-xs font-medium text-white/60 mb-0.5">Time</p>
                  <p className="text-white font-medium">{event.time}</p>
                </div>
              </div>
              
              <div className="h-px bg-white/10 w-full my-2"></div>
              
              <div className="flex items-start text-white/90 group">
                <div className="mr-4 p-2 bg-white/5 rounded-lg group-hover:bg-white/10 transition-colors mt-0.5">
                  <MapPin className="h-5 w-5 text-white/80" aria-hidden="true" />
                </div>
                <div>
                  <p className="text-xs font-medium text-white/60 mb-0.5">Location</p>
                  <p className="text-white font-medium">{event.location}</p>
                </div>
              </div>
              
              {!isPastEvent && (
              <div className="pt-4 mt-4 border-t border-white/10">
                {currentStep === 'details' && (
                  <form onSubmit={handleSubmitDetails} className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label htmlFor="email" className="block text-sm font-medium text-white/80 mb-1">
                          Email <span className="text-red-500">*</span>
                        </label>
                        <input
                          type="email"
                          id="email"
                          name="email"
                          value={formData.email}
                          onChange={handleInputChange}
                          className="w-full bg-black/50 border border-white/20 rounded-lg px-4 py-2.5 text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                          placeholder="john@example.com"
                          required
                        />
                      </div>
                      <div>
                        <label htmlFor="firstName" className="block text-sm font-medium text-white/80 mb-1">
                          Participant's First Name <span className="text-red-500">*</span>
                        </label>
                        <input
                          type="text"
                          id="firstName"
                          name="firstName"
                          value={formData.firstName}
                          onChange={handleInputChange}
                          className="w-full bg-black/50 border border-white/20 rounded-lg px-4 py-2.5 text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                          placeholder="John"
                          required
                        />
                      </div>
                      <div>
                        <label htmlFor="lastName" className="block text-sm font-medium text-white/80 mb-1">
                          Participant's Last Name <span className="text-red-500">*</span>
                        </label>
                        <input
                          type="text"
                          id="lastName"
                          name="lastName"
                          value={formData.lastName}
                          onChange={handleInputChange}
                          className="w-full bg-black/50 border border-white/20 rounded-lg px-4 py-2.5 text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                          placeholder="Doe"
                          required
                        />
                      </div>
                      <div>
                        <label htmlFor="whatsapp" className="block text-sm font-medium text-white/80 mb-1">
                          WhatsApp Number <span className="text-red-500">*</span>
                        </label>
                        <input
                          type="tel"
                          id="whatsapp"
                          name="whatsapp"
                          value={formData.whatsapp}
                          onChange={handleInputChange}
                          className="w-full bg-black/50 border border-white/20 rounded-lg px-4 py-2.5 text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                          placeholder="+91 98765 43210"
                          required
                        />
                      </div>
                      <div>
                        <label htmlFor="branch" className="block text-sm font-medium text-white/80 mb-1">
                          Branch <span className="text-red-500">*</span>
                        </label>
                        <input
                          type="text"
                          id="branch"
                          name="branch"
                          value={formData.branch}
                          onChange={handleInputChange}
                          className="w-full bg-black/50 border border-white/20 rounded-lg px-4 py-2.5 text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                          placeholder="Computer Science"
                          required
                        />
                      </div>
                      <div>
                        <label htmlFor="year" className="block text-sm font-medium text-white/80 mb-1">
                          Year <span className="text-red-500">*</span>
                        </label>
                        <select
                          id="year"
                          name="year"
                          value={formData.year}
                          onChange={handleInputChange}
                          className="w-full bg-black/50 border border-white/20 rounded-lg px-4 py-2.5 text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                          required
                        >
                          <option value="">Select Year</option>
                          <option value="FE">FE</option>
                          <option value="SE">SE</option>
                          <option value="TE">TE</option>
                          <option value="BE">BE</option>
                        </select>
                      </div>
                      <div>
                        <label htmlFor="division" className="block text-sm font-medium text-white/80 mb-1">
                          Division/Batch <span className="text-red-500">*</span>
                        </label>
                        <input
                          type="text"
                          id="division"
                          name="division"
                          value={formData.division}
                          onChange={handleInputChange}
                          className="w-full bg-black/50 border border-white/20 rounded-lg px-4 py-2.5 text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                          placeholder="e.g., A, B, C"
                          required
                        />
                      </div>
                      <div>
                        <label htmlFor="rollNumber" className="block text-sm font-medium text-white/80 mb-1">
                          Roll Number <span className="text-red-500">*</span>
                        </label>
                        <input
                          type="text"
                          id="rollNumber"
                          name="rollNumber"
                          value={formData.rollNumber}
                          onChange={handleInputChange}
                          className="w-full bg-black/50 border border-white/20 rounded-lg px-4 py-2.5 text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                          placeholder="Enter your roll number"
                          required
                        />
                      </div>
                      <div className="md:col-span-2">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div>
                            <label className="block text-sm font-medium text-white/80 mb-2">
                              Are you an ACM INTERNATIONAL member? <span className="text-red-500">*</span>
                            </label>
                            <div className="flex space-x-4">
                              <label className="inline-flex items-center">
                                <input
                                  type="radio"
                                  name="isAcmMember"
                                  value="yes"
                                  checked={formData.isAcmMember === 'yes'}
                                  onChange={handleInputChange}
                                  className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-white/20"
                                  required
                                />
                                <span className="ml-2 text-white">Yes</span>
                              </label>
                              <label className="inline-flex items-center">
                                <input
                                  type="radio"
                                  name="isAcmMember"
                                  value="no"
                                  checked={formData.isAcmMember === 'no'}
                                  onChange={handleInputChange}
                                  className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-white/20"
                                />
                                <span className="ml-2 text-white">No</span>
                              </label>
                            </div>
                          </div>
                          {formData.isAcmMember === 'yes' && (
                            <div>
                              <label htmlFor="membershipId" className="block text-sm font-medium text-white/80 mb-1">
                                ACM International Membership ID <span className="text-red-500">*</span>
                              </label>
                              <input
                                type="text"
                                id="membershipId"
                                name="membershipId"
                                value={formData.membershipId}
                                onChange={handleInputChange}
                                className="w-full bg-black/50 border border-white/20 rounded-lg px-4 py-2.5 text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                placeholder="Enter your ACM ID"
                                required={formData.isAcmMember === 'yes'}
                              />
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                    <button
                      type="submit"
                      className="w-full bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-500 hover:to-blue-600 text-white font-medium py-3.5 px-6 rounded-xl transition-all duration-300 transform hover:-translate-y-0.5 flex items-center justify-center space-x-2"
                    >
                      <span>Proceed to Payment</span>
                      <ArrowRight className="h-4 w-4" />
                    </button>
                  </form>
                )}

                {currentStep === 'payment' && (
                  <form onSubmit={handleSubmitPayment} className="space-y-6">
                    <div className="bg-black/30 p-5 rounded-xl border border-white/10">
                      <h3 className="text-lg font-semibold text-white mb-4">Payment Details</h3>
                      <div className="grid md:grid-cols-2 gap-6">
                        <div>
                          <div className="bg-white p-4 rounded-lg mb-4">
                            <div className="text-center mb-3">
                              <div className="text-xs text-gray-600 mb-1">Scan to pay</div>
                              <div className="text-sm font-medium text-gray-900">₹{event.registration_fee}</div>
                            </div>
                            <div className="flex justify-center mb-3">
                              <div className="bg-white p-2 rounded">
                                <div className="w-32 h-32 bg-gray-200 flex items-center justify-center text-xs text-gray-500">
                                  UPI QR Code
                                </div>
                              </div>
                            </div>
                            <div className="text-center text-xs text-gray-500 space-y-1">
                              <div>UPI ID: your-upi@id</div>
                              <div>Account Name: SIGAI</div>
                              <div>Bank: Your Bank Name</div>
                            </div>
                          </div>
                        </div>
                        <div className="space-y-4">
                          <div>
                            <label htmlFor="transactionId" className="block text-sm font-medium text-white/80 mb-1">
                              Transaction ID <span className="text-red-500">*</span>
                            </label>
                            <input
                              type="text"
                              id="transactionId"
                              name="transactionId"
                              value={formData.transactionId}
                              onChange={handleInputChange}
                              className="w-full bg-black/50 border border-white/20 rounded-lg px-4 py-2.5 text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                              placeholder="Enter UPI Transaction ID"
                              required
                            />
                          </div>
                          <div>
                            <label className="block text-sm font-medium text-white/80 mb-1">
                              Upload payment screenshot or membership proof <span className="text-red-500">*</span>
                            </label>
                            <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-dashed border-white/20 rounded-lg">
                              <div className="space-y-1 text-center">
                                {screenshotPreview ? (
                                  <div className="relative">
                                    <img src={screenshotPreview} alt="Screenshot preview" className="mx-auto h-32 object-contain" />
                                    <button
                                      type="button"
                                      onClick={() => {
                                        setFormData(prev => ({ ...prev, paymentScreenshot: null }));
                                        setScreenshotPreview(null);
                                      }}
                                      className="absolute -top-2 -right-2 bg-red-500 rounded-full p-1"
                                    >
                                      <svg className="h-4 w-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                      </svg>
                                    </button>
                                  </div>
                                ) : (
                                  <>
                                    <div className="flex justify-center">
                                      <Upload className="h-12 w-12 text-white/40" />
                                    </div>
                                    <div className="flex text-sm text-white/60">
                                      <label
                                        htmlFor="paymentScreenshot"
                                        className="relative cursor-pointer bg-black/50 rounded-md font-medium text-blue-400 hover:text-blue-300 focus-within:outline-none"
                                      >
                                        <span>Upload a file</span>
                                        <input
                                          id="paymentScreenshot"
                                          name="paymentScreenshot"
                                          type="file"
                                          accept="image/*"
                                          className="sr-only"
                                          onChange={handleFileChange}
                                          required
                                        />
                                      </label>
                                      <p className="pl-1">or drag and drop</p>
                                    </div>
                                    <p className="text-xs text-white/40">PNG, JPG, GIF up to 5MB</p>
                                  </>
                                )}
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="flex space-x-4">
                      <button
                        type="button"
                        onClick={handlePaymentBack}
                        className="flex-1 flex items-center justify-center px-4 py-3 bg-white/10 border border-white/20 text-white rounded-lg hover:bg-white/20 transition-colors"
                      >
                        <ArrowLeft className="h-4 w-4 mr-2" />
                        Back
                      </button>
                      <button
                        type="submit"
                        disabled={isSubmitting}
                        className="flex-1 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-500 hover:to-blue-600 text-white font-medium py-3 px-6 rounded-lg transition-all duration-300 flex items-center justify-center"
                      >
                        {isSubmitting ? (
                          <>
                            <Loader2 className="animate-spin h-4 w-4 mr-2" />
                            Processing...
                          </>
                        ) : (
                          <>
                            <span>Confirm Registration</span>
                            <Check className="h-4 w-4 ml-2" />
                          </>
                        )}
                      </button>
                    </div>
                  </form>
                )}

                {currentStep === 'success' && (
                  <div className="text-center py-8">
                    <div className="mx-auto flex items-center justify-center h-16 w-16 rounded-full bg-green-500/20 mb-4">
                      <Check className="h-8 w-8 text-green-400" />
                    </div>
                    <h3 className="text-2xl font-bold text-white mb-2">Registration Successful!</h3>
                    <p className="text-white/70 mb-6">Your ticket has been generated. A confirmation has been sent to your email.</p>
                    <button
                      onClick={() => {
                        // Generate and download ticket
                        const ticketData = {
                          ...formData,
                          event: {
                            title: event.title,
                            date: event.date,
                            time: event.time,
                            location: event.location
                          },
                          registrationId: `SIGAI-${Math.random().toString(36).substr(2, 8).toUpperCase()}`
                        };
                        console.log('Generating ticket with data:', ticketData);
                        // In a real app, this would generate and download a PDF
                        alert('Ticket download would start here in a real implementation');
                      }}
                      className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-blue-600 to-blue-700 text-white font-medium rounded-lg hover:from-blue-500 hover:to-blue-600 transition-colors"
                    >
                      <Download className="h-5 w-5 mr-2" />
                      Download Your Ticket
                    </button>
                  </div>
                )}
              </div>
            )}
            {isPastEvent && (
              <div className="text-center py-4 text-white/60">
                Registration for this event has ended.
              </div>
            )}
            </div>
            
            <div className="prose max-w-none mb-10">
              <h2 className="text-2xl font-bold text-white mb-5 pb-2 border-b border-white/10">
                About This Event
              </h2>
              <div className="text-white/80 leading-relaxed space-y-4">
                {event.description.split('\n\n').map((paragraph, i) => (
                  <p key={i} className="text-white/90">
                    {paragraph}
                  </p>
                ))}
              </div>
            </div>

            {event.speakers && event.speakers.length > 0 && (
              <div className="mt-12">
                <h3 className="text-2xl font-bold text-white mb-6 pb-2 border-b border-white/10">
                  Speakers & Organizers
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  {event.speakers.map((speaker, index) => (
                    <div key={index} className="group flex items-center space-x-4 p-3 rounded-xl hover:bg-white/5 transition-colors duration-200">
                      <div className="relative">
                        {speaker.image_url ? (
                          <Image
                            src={speaker.image_url}
                            alt={speaker.name}
                            width={56}
                            height={56}
                            className="rounded-full h-14 w-14 object-cover border-2 border-white/20 group-hover:border-blue-400/50 transition-colors"
                          />
                        ) : (
                          <div className="h-14 w-14 rounded-full bg-gradient-to-br from-blue-900/80 to-blue-600/80 flex items-center justify-center text-2xl font-bold text-white">
                            {speaker.name.charAt(0)}
                          </div>
                        )}
                      </div>
                      <div>
                        <p className="font-semibold text-white group-hover:text-blue-300 transition-colors">
                          {speaker.name}
                        </p>
                        <p className="text-sm text-gray-300 group-hover:text-white/80 mt-0.5">
                          {speaker.role}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
  );
}
