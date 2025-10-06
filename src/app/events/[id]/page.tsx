'use client';

import { useEffect, useState } from 'react';
import { notFound, useParams } from 'next/navigation';
import { ArrowLeft, Calendar, Clock, MapPin, Check, Loader2, Upload, X, AlertCircle } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { QRCodeSVG } from 'qrcode.react';

interface EventType {
  idx: number;
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
  registration_fee: number; // For backward compatibility (non-member fee & common fee)
  registration_fee_member?: number; // ACM Member fee
  registration_fee_non_member?: number; // Non-member fee
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
  const [currentFee, setCurrentFee] = useState<number>(0);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  // Random fill function for testing
  const handleRandomFill = () => {
    const firstNames = ['John', 'Jane', 'Alex', 'Sarah', 'Michael', 'Emma', 'David', 'Olivia', 'James', 'Sophia'];
    const lastNames = ['Smith', 'Johnson', 'Williams', 'Brown', 'Jones', 'Garcia', 'Miller', 'Davis', 'Rodriguez', 'Martinez'];
    const branches = ['Computer Science', 'Information Technology', 'Electronics', 'Mechanical', 'Civil'];
    const years = ['FE', 'SE', 'TE', 'BE'];
    const divisions = ['A', 'B', 'C', 'D'];
    const randomAcmStatus = ['yes', 'no'];
    
    // Generate alphanumeric transaction ID
    const generateTransactionId = () => {
      const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
      let txnId = 'TXN';
      for (let i = 0; i < 12; i++) {
        txnId += chars.charAt(Math.floor(Math.random() * chars.length));
      }
      return txnId;
    };
    
    const randomFirstName = firstNames[Math.floor(Math.random() * firstNames.length)];
    const randomLastName = lastNames[Math.floor(Math.random() * lastNames.length)];
    const randomBranch = branches[Math.floor(Math.random() * branches.length)];
    const randomYear = years[Math.floor(Math.random() * years.length)];
    const randomDivision = divisions[Math.floor(Math.random() * divisions.length)];
    const randomPhone = `${Math.floor(7000000000 + Math.random() * 2999999999)}`;
    const randomRollNumber = `${randomYear}${Math.floor(1000 + Math.random() * 9000)}`;
    const randomEmail = `${randomFirstName.toLowerCase()}.${randomLastName.toLowerCase()}${Math.floor(100 + Math.random() * 900)}@example.com`;
    const randomIsAcm = randomAcmStatus[Math.floor(Math.random() * randomAcmStatus.length)];
    const randomMembershipId = randomIsAcm === 'yes' ? `ACM${Math.floor(10000 + Math.random() * 90000)}` : '';
    
    setFormData({
      ...formData,
      email: randomEmail,
      firstName: randomFirstName,
      lastName: randomLastName,
      whatsapp: randomPhone,
      branch: randomBranch,
      year: randomYear,
      division: randomDivision,
      rollNumber: randomRollNumber,
      isAcmMember: randomIsAcm,
      membershipId: randomMembershipId,
      transactionId: generateTransactionId(),
    });

    // Update fee based on ACM membership
    if (event) {
      if (randomIsAcm === 'yes') {
        setCurrentFee(event.registration_fee_member || event.registration_fee || 0);
      } else {
        setCurrentFee(event.registration_fee_non_member || event.registration_fee || 0);
      }
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target as HTMLInputElement;
    
    if (name === 'isAcmMember') {
      if (value === 'no') {
        setFormData(prev => ({ ...prev, isAcmMember: 'no', membershipId: '' }));
        // Set non-member fee
        const fee = event?.registration_fee_non_member ?? event?.registration_fee ?? 0;
        setCurrentFee(fee);
      } else {
        setFormData(prev => ({ ...prev, isAcmMember: value }));
        // Set member fee
        const fee = event?.registration_fee_member ?? 0;
        setCurrentFee(fee);
      }
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

  const handleSubmitPayment = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setErrorMessage(null);

    try {
      // Prepare registration data
      const registrationPayload = {
        eventId: event?.idx.toString() || '',
        eventTitle: event?.title || '',
        eventDate: event?.date || '',
        eventTime: event?.time || '',
        eventLocation: event?.location || '',
        firstName: formData.firstName,
        lastName: formData.lastName,
        email: formData.email,
        phone: formData.whatsapp,
        rollNumber: formData.rollNumber,
        branch: formData.branch,
        year: formData.year,
        division: formData.division,
        isAcmMember: formData.isAcmMember === 'yes',
        membershipId: formData.isAcmMember === 'yes' ? formData.membershipId : null,
        transactionId: formData.transactionId,
        feeAmount: currentFee,
      };

      // Call registration API
      const response = await fetch('/api/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(registrationPayload),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Registration failed. Please try again.');
      }

      // Download PDF by calling the API
      const pdfResponse = await fetch('/api/generate-pdf', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          registrationData: data.data.registrationData,
          attendanceHash: data.data.attendanceHash,
          registrationId: data.data.registrationId,
        }),
      });

      if (pdfResponse.ok) {
        // Download the PDF
        const blob = await pdfResponse.blob();
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `${event?.title.replace(/[^a-zA-Z0-9]/g, '_')}_${formData.rollNumber}.pdf`;
        document.body.appendChild(a);
        a.click();
        window.URL.revokeObjectURL(url);
        document.body.removeChild(a);
      } else {
        console.warn('PDF generation failed, but registration was successful');
      }

      // Move to success step
      setCurrentStep('success');
    } catch (error) {
      console.error('Registration error:', error);
      setErrorMessage(error instanceof Error ? error.message : 'An unexpected error occurred. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  useEffect(() => {
    const fetchEvent = async () => {
      try {
        const response = await fetch('/data/events_local.json');
        if (!response.ok) {
          throw new Error('Failed to fetch events');
        }
        const events: EventType[] = await response.json();
        const eventData = events.find(event => event.idx === parseInt(id as string));
        
        if (!eventData) {
          return notFound();
        }

        setEvent(eventData);
        // Set initial fee (non-member by default)
        const initialFee = eventData.registration_fee_non_member ?? eventData.registration_fee ?? 0;
        setCurrentFee(initialFee);
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
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-gray-400" />
      </div>
    );
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
      {/* Animated Background */}
      <div className="fixed inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-br from-black via-gray-900 to-black">
          {/* Animated orbs */}
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl animate-pulse" style={{ animationDuration: '4s' }} />
          <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl animate-pulse" style={{ animationDuration: '6s', animationDelay: '1s' }} />
          <div className="absolute top-1/2 left-1/2 w-96 h-96 bg-indigo-500/10 rounded-full blur-3xl animate-pulse" style={{ animationDuration: '5s', animationDelay: '2s' }} />
        </div>
        {/* Grid pattern overlay */}
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:50px_50px]" />
      </div>

      <header className="sticky top-0 z-50 bg-black/40 backdrop-blur-xl border-b border-white/10">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <Link href="/events" className="inline-flex items-center text-sm text-gray-400 hover:text-white transition-colors">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Events
          </Link>
        </div>
      </header>

      <div className="relative z-10 max-w-7xl mx-auto px-6 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          <div className="lg:col-span-2 space-y-12">
            <div className="space-y-4">
              <div className="flex flex-wrap gap-2">
                <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-blue-500/20 text-blue-300 border border-blue-500/30 backdrop-blur-sm">
                  {event.category}
                </span>
                {isPastEvent && (
                  <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-amber-500/20 text-amber-300 border border-amber-500/30 backdrop-blur-sm">
                    Past Event
                  </span>
                )}
                {(event.registration_fee > 0 || event.registration_fee_member || event.registration_fee_non_member) && (
                  <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-green-500/20 text-green-300 border border-green-500/30 backdrop-blur-sm">
                    {event.registration_fee_member !== undefined && event.registration_fee_non_member !== undefined
                      ? `₹${event.registration_fee_member} - ₹${event.registration_fee_non_member}`
                      : `₹${event.registration_fee}`}
                  </span>
                )}
              </div>
              
              <h1 className="text-4xl md:text-5xl font-bold text-white tracking-tight">
                {event.title}
              </h1>
              
              <div className="flex flex-wrap gap-6 text-sm text-gray-400">
                <div className="flex items-center gap-2">
                  <Calendar className="h-4 w-4 text-blue-400" />
                  <span>{formattedDate}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="h-4 w-4 text-blue-400" />
                  <span>{event.time}</span>
                </div>
                <div className="flex items-center gap-2">
                  <MapPin className="h-4 w-4 text-blue-400" />
                  <span>{event.location}</span>
                </div>
              </div>
            </div>

            <div className="relative aspect-video rounded-2xl overflow-hidden bg-black/40 backdrop-blur-md border border-white/10">
              <Image
                src={event.image}
                alt={event.title}
                fill
                className="object-contain"
                priority
              />
            </div>

            <div className="prose max-w-none">
              <h2 className="text-2xl font-semibold text-white mb-4">About this event</h2>
              <div className="text-gray-300 leading-relaxed space-y-4">
                {event.description.split('\n\n').map((paragraph, i) => (
                  <p key={i}>{paragraph}</p>
                ))}
              </div>
            </div>

            {event.speakers && event.speakers.length > 0 && (
              <div>
                <h2 className="text-2xl font-semibold text-white mb-6">Speakers & Organizers</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {event.speakers.map((speaker, index) => (
                    <div key={index} className="flex items-center gap-4 p-4 rounded-xl bg-white/5 backdrop-blur-md border border-white/10 hover:border-white/20 hover:bg-white/10 transition-all">
                      {speaker.image_url ? (
                        <Image
                          src={speaker.image_url}
                          alt={speaker.name}
                          width={48}
                          height={48}
                          className="rounded-full border-2 border-white/20"
                        />
                      ) : (
                        <div className="h-12 w-12 rounded-full bg-white/10 backdrop-blur-sm flex items-center justify-center text-lg font-semibold text-white border border-white/20">
                          {speaker.name.charAt(0)}
                        </div>
                      )}
                      <div>
                        <p className="font-semibold text-white">{speaker.name}</p>
                        <p className="text-sm text-gray-400">{speaker.role}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          <div className="lg:col-span-1">
            <div className="sticky top-24 space-y-6">
              {/* Event Details Summary - Always visible at top */}
              <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-xl p-5 space-y-3 text-sm shadow-xl">
                <h3 className="text-base font-semibold text-white mb-3">Event Details</h3>
                <div className="flex justify-between items-center">
                  <span className="text-gray-400 flex items-center gap-2">
                    <Calendar className="h-4 w-4 text-blue-400" />
                    Date
                  </span>
                  <span className="font-medium text-white">{formattedDate}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-400 flex items-center gap-2">
                    <Clock className="h-4 w-4 text-blue-400" />
                    Time
                  </span>
                  <span className="font-medium text-white">{event.time}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-400 flex items-center gap-2">
                    <MapPin className="h-4 w-4 text-blue-400" />
                    Location
                  </span>
                  <span className="font-medium text-white text-right">{event.location}</span>
                </div>
                {(event.registration_fee > 0 || event.registration_fee_member || event.registration_fee_non_member) && (
                  <div className="pt-3 border-t border-white/10 space-y-2">
                    <span className="text-gray-400 font-medium block mb-2">Registration Fees</span>
                    {event.registration_fee_member !== undefined && (
                      <div className="flex justify-between items-center">
                        <span className="text-gray-300 text-sm">ACM Members</span>
                        <span className="font-bold text-green-400">₹{event.registration_fee_member}</span>
                      </div>
                    )}
                    {event.registration_fee_non_member !== undefined && (
                      <div className="flex justify-between items-center">
                        <span className="text-gray-300 text-sm">Non-Members</span>
                        <span className="font-bold text-blue-400">₹{event.registration_fee_non_member}</span>
                      </div>
                    )}
                    {(!event.registration_fee_member && !event.registration_fee_non_member && event.registration_fee > 0) && (
                      <div className="flex justify-between items-center">
                        <span className="text-gray-300 text-sm">Fee</span>
                        <span className="font-bold text-green-400">₹{event.registration_fee}</span>
                      </div>
                    )}
                  </div>
                )}
              </div>

              {/* Registration Form */}
              {!isPastEvent ? (
                <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-6 shadow-2xl">
                  {currentStep === 'details' && (
                    <>
                      <div className="mb-6">
                        <div className="flex items-center justify-between mb-2">
                          <h3 className="text-xl font-semibold text-white">Register for event</h3>
                          <button
                            type="button"
                            onClick={handleRandomFill}
                            className="px-3 py-1.5 text-xs font-medium bg-purple-600 hover:bg-purple-700 text-white rounded-lg transition-colors duration-200 flex items-center gap-2"
                          >
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-3.5 w-3.5" viewBox="0 0 20 20" fill="currentColor">
                              <path fillRule="evenodd" d="M11.3 1.046A1 1 0 0112 2v5h4a1 1 0 01.82 1.573l-7 10A1 1 0 018 18v-5H4a1 1 0 01-.82-1.573l7-10a1 1 0 011.12-.38z" clipRule="evenodd" />
                            </svg>
                            Random Fill Test
                          </button>
                        </div>
                        <p className="text-sm text-gray-400">Fill in your details to secure your spot</p>
                      </div>
                      
                      <form onSubmit={handleSubmitDetails} className="space-y-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-300 mb-1">
                            Email <span className="text-red-400">*</span>
                          </label>
                          <input
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={handleInputChange}
                            className="w-full px-3 py-2 bg-white/5 border border-white/20 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm text-white placeholder-gray-500 backdrop-blur-sm"
                            placeholder="you@example.com"
                            required
                          />
                        </div>

                        <div className="grid grid-cols-2 gap-3">
                          <div>
                            <label className="block text-sm font-medium text-gray-300 mb-1">
                              First Name <span className="text-red-400">*</span>
                            </label>
                            <input
                              type="text"
                              name="firstName"
                              value={formData.firstName}
                              onChange={handleInputChange}
                              className="w-full px-3 py-2 bg-white/5 border border-white/20 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm text-white placeholder-gray-500 backdrop-blur-sm"
                              required
                            />
                          </div>
                          <div>
                            <label className="block text-sm font-medium text-gray-300 mb-1">
                              Last Name <span className="text-red-400">*</span>
                            </label>
                            <input
                              type="text"
                              name="lastName"
                              value={formData.lastName}
                              onChange={handleInputChange}
                              className="w-full px-3 py-2 bg-white/5 border border-white/20 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm text-white placeholder-gray-500 backdrop-blur-sm"
                              required
                            />
                          </div>
                        </div>

                        <div>
                          <label className="block text-sm font-medium text-gray-300 mb-1">
                            WhatsApp Number <span className="text-red-400">*</span>
                          </label>
                          <input
                            type="tel"
                            name="whatsapp"
                            value={formData.whatsapp}
                            onChange={handleInputChange}
                            className="w-full px-3 py-2 bg-white/5 border border-white/20 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm text-white placeholder-gray-500 backdrop-blur-sm"
                            placeholder="+91 98765 43210"
                            required
                          />
                        </div>

                        <div>
                          <label className="block text-sm font-medium text-gray-300 mb-1">
                            Branch <span className="text-red-400">*</span>
                          </label>
                          <input
                            type="text"
                            name="branch"
                            value={formData.branch}
                            onChange={handleInputChange}
                            className="w-full px-3 py-2 bg-white/5 border border-white/20 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm text-white placeholder-gray-500 backdrop-blur-sm"
                            placeholder="Computer Science"
                            required
                          />
                        </div>

                        <div className="grid grid-cols-2 gap-3">
                          <div>
                            <label className="block text-sm font-medium text-gray-300 mb-1">
                              Year <span className="text-red-400">*</span>
                            </label>
                            <select
                              name="year"
                              value={formData.year}
                              onChange={handleInputChange}
                              className="w-full px-3 py-2 bg-white/5 border border-white/20 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm text-white backdrop-blur-sm"
                              required
                            >
                              <option value="" className="bg-gray-900">Select</option>
                              <option value="FE" className="bg-gray-900">FE</option>
                              <option value="SE" className="bg-gray-900">SE</option>
                              <option value="TE" className="bg-gray-900">TE</option>
                              <option value="BE" className="bg-gray-900">BE</option>
                            </select>
                          </div>
                          <div>
                            <label className="block text-sm font-medium text-gray-300 mb-1">
                              Division <span className="text-red-400">*</span>
                            </label>
                            <input
                              type="text"
                              name="division"
                              value={formData.division}
                              onChange={handleInputChange}
                              className="w-full px-3 py-2 bg-white/5 border border-white/20 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm text-white placeholder-gray-500 backdrop-blur-sm"
                              placeholder="A, B, C"
                              required
                            />
                          </div>
                        </div>

                        <div>
                          <label className="block text-sm font-medium text-gray-300 mb-1">
                            Roll Number <span className="text-red-400">*</span>
                          </label>
                          <input
                            type="text"
                            name="rollNumber"
                            value={formData.rollNumber}
                            onChange={handleInputChange}
                            className="w-full px-3 py-2 bg-white/5 border border-white/20 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm text-white placeholder-gray-500 backdrop-blur-sm"
                            required
                          />
                        </div>

                        <div>
                          <label className="block text-sm font-medium text-gray-300 mb-3">
                            ACM Member? <span className="text-red-400">*</span>
                          </label>
                          <div className="grid grid-cols-2 gap-3">
                            <label className="relative flex items-center justify-center cursor-pointer group">
                              <input
                                type="radio"
                                name="isAcmMember"
                                value="yes"
                                checked={formData.isAcmMember === 'yes'}
                                onChange={handleInputChange}
                                className="sr-only peer"
                                required
                              />
                              <div className="w-full px-4 py-3 rounded-lg border-2 border-white/20 bg-white/5 backdrop-blur-sm transition-all peer-checked:border-blue-500 peer-checked:bg-blue-500/20 group-hover:border-white/30">
                                <div className="flex items-center justify-center gap-2">
                                  <div className="w-4 h-4 rounded-full border-2 border-current flex items-center justify-center peer-checked:border-blue-400">
                                    <div className="w-2 h-2 rounded-full bg-current opacity-0 peer-checked:opacity-100 transition-opacity"></div>
                                  </div>
                                  <span className="text-sm font-medium text-gray-300 peer-checked:text-blue-300">Yes</span>
                                </div>
                              </div>
                            </label>
                            <label className="relative flex items-center justify-center cursor-pointer group">
                              <input
                                type="radio"
                                name="isAcmMember"
                                value="no"
                                checked={formData.isAcmMember === 'no'}
                                onChange={handleInputChange}
                                className="sr-only peer"
                              />
                              <div className="w-full px-4 py-3 rounded-lg border-2 border-white/20 bg-white/5 backdrop-blur-sm transition-all peer-checked:border-blue-500 peer-checked:bg-blue-500/20 group-hover:border-white/30">
                                <div className="flex items-center justify-center gap-2">
                                  <div className="w-4 h-4 rounded-full border-2 border-current flex items-center justify-center peer-checked:border-blue-400">
                                    <div className="w-2 h-2 rounded-full bg-current opacity-0 peer-checked:opacity-100 transition-opacity"></div>
                                  </div>
                                  <span className="text-sm font-medium text-gray-300 peer-checked:text-blue-300">No</span>
                                </div>
                              </div>
                            </label>
                          </div>
                        </div>

                        {formData.isAcmMember === 'yes' && (
                          <div>
                            <label className="block text-sm font-medium text-gray-300 mb-1">
                              ACM Membership ID <span className="text-red-400">*</span>
                            </label>
                            <input
                              type="text"
                              name="membershipId"
                              value={formData.membershipId}
                              onChange={handleInputChange}
                              className="w-full px-3 py-2 bg-white/5 border border-white/20 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm text-white placeholder-gray-500 backdrop-blur-sm"
                              required={formData.isAcmMember === 'yes'}
                            />
                          </div>
                        )}

                        <button
                          type="submit"
                          className="w-full bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-500 hover:to-blue-600 text-white py-3 rounded-lg font-medium transition-all duration-300 transform hover:scale-[1.02]"
                        >
                          Continue to Payment
                        </button>
                      </form>
                    </>
                  )}

                  {currentStep === 'payment' && (
                    <>
                      <div className="mb-6">
                        <button
                          onClick={handlePaymentBack}
                          className="text-sm text-gray-300 hover:text-white flex items-center gap-1 mb-4 transition-colors"
                        >
                          <ArrowLeft className="h-4 w-4" />
                          Back
                        </button>
                        <h3 className="text-xl font-semibold text-white mb-2">Payment</h3>
                        <p className="text-sm text-gray-400">Complete your registration</p>
                      </div>

                      <form onSubmit={handleSubmitPayment} className="space-y-4">
                        {errorMessage && (
                          <div className="flex items-start gap-3 p-4 bg-red-500/10 border border-red-500/30 rounded-lg backdrop-blur-sm">
                            <AlertCircle className="h-5 w-5 text-red-400 flex-shrink-0 mt-0.5" />
                            <div className="flex-1">
                              <p className="text-sm font-medium text-red-300">Registration Failed</p>
                              <p className="text-sm text-red-200 mt-1">{errorMessage}</p>
                            </div>
                          </div>
                        )}
                        
                        <div className="bg-white/5 backdrop-blur-md border border-white/10 p-4 rounded-lg space-y-3">
                          <div className="text-center">
                            <div className="inline-block bg-white p-4 rounded-2xl border-4 border-blue-500/30 shadow-xl">
                              <QRCodeSVG
                                value={`upi://pay?pa=sanat.karkhanis2@okicici&am=${currentFee}&cu=INR`}
                                size={180}
                                level="H"
                                includeMargin={false}
                                fgColor="#000000"
                                bgColor="#ffffff"
                              />
                            </div>
                            <p className="text-lg font-bold text-white mt-4">₹{currentFee}</p>
                            <p className="text-xs text-gray-400 mt-1">
                              {formData.isAcmMember === 'yes' ? '(ACM Member Rate)' : '(Non-Member Rate)'}
                            </p>
                            <p className="text-sm text-gray-300 mt-2 font-medium">Scan QR to Pay</p>
                            <p className="text-xs text-gray-400 mt-1">UPI ID: sanat.karkhanis2@okicici</p>
                          </div>
                        </div>

                        <div>
                          <label className="block text-sm font-medium text-gray-300 mb-1">
                            Transaction ID <span className="text-red-400">*</span>
                          </label>
                          <input
                            type="text"
                            name="transactionId"
                            value={formData.transactionId}
                            onChange={handleInputChange}
                            className="w-full px-3 py-2 bg-white/5 border border-white/20 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm text-white placeholder-gray-500 backdrop-blur-sm"
                            placeholder="Enter transaction ID"
                            required
                          />
                        </div>

                        {/* Payment Screenshot Upload - Temporarily Disabled */}
                        {/* <div>
                          <label className="block text-sm font-medium text-gray-300 mb-1">
                            Payment Screenshot <span className="text-red-400">*</span>
                          </label>
                          {screenshotPreview ? (
                            <div className="relative">
                              <img src={screenshotPreview} alt="Preview" className="w-full h-32 object-cover rounded-lg" />
                              <button
                                type="button"
                                onClick={() => {
                                  setFormData(prev => ({ ...prev, paymentProof: null }));
                                  setScreenshotPreview(null);
                                }}
                                className="absolute top-2 right-2 bg-red-500/80 backdrop-blur-sm text-white p-1 rounded-full hover:bg-red-600 transition-colors"
                              >
                                <X className="h-4 w-4" />
                              </button>
                            </div>
                          ) : (
                            <label className="block border-2 border-dashed border-white/20 rounded-lg p-6 text-center cursor-pointer hover:border-white/30 transition-colors bg-white/5 backdrop-blur-sm">
                              <Upload className="h-8 w-8 text-gray-400 mx-auto mb-2" />
                              <span className="text-sm text-gray-300">Click to upload</span>
                              <input
                                type="file"
                                accept="image/*"
                                onChange={handleFileChange}
                                className="hidden"
                                required
                              />
                            </label>
                          )}
                        </div> */}

                        <button
                          type="submit"
                          disabled={isSubmitting}
                          className="w-full bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-500 hover:to-blue-600 text-white py-3 rounded-lg font-medium transition-all duration-300 transform hover:scale-[1.02] disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none flex items-center justify-center gap-2"
                        >
                          {isSubmitting ? (
                            <>
                              <Loader2 className="h-4 w-4 animate-spin" />
                              Processing...
                            </>
                          ) : (
                            'Complete Registration'
                          )}
                        </button>
                      </form>
                    </>
                  )}

                  {currentStep === 'success' && (
                    <div className="text-center py-8">
                      <div className="inline-flex items-center justify-center w-16 h-16 bg-green-500/20 backdrop-blur-md border border-green-500/30 rounded-full mb-4">
                        <Check className="h-8 w-8 text-green-400" />
                      </div>
                      <h3 className="text-xl font-semibold text-white mb-2">Registration Complete!</h3>
                      <p className="text-sm text-gray-300 mb-2">
                        Your registration has been confirmed.
                      </p>
                      <p className="text-sm text-gray-400 mb-6">
                        Your registration PDF with QR code has been downloaded. Please keep it safe for event attendance.
                      </p>
                      <button
                        onClick={() => window.location.reload()}
                        className="w-full bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-500 hover:to-blue-600 text-white py-3 rounded-lg font-medium transition-all duration-300 transform hover:scale-[1.02]"
                      >
                        Done
                      </button>
                    </div>
                  )}
                </div>
              ) : (
                <div className="bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl p-6 text-center">
                  <p className="text-sm text-gray-400">Registration for this event has ended.</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
