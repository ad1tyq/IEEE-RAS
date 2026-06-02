'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';
import { X, Send, User, Mail, Phone, FileText, Video, Users } from 'lucide-react';

/**
 * Submission Form Component
 * 
 * A sophisticated modal form for hackathon project submissions with:
 * - Cyberpunk-themed design matching Pixel Palettes aesthetic
 * - Integration with Google Sheets via Google Apps Script Web App
 * - Comprehensive validation and error handling
 * - Smooth animations and user feedback
 * - Responsive design with glassmorphism effects
 * 
 * Form Fields:
 * - Email Address (email input with validation)
 * - Team Name (text input)
 * - Project Title (text input)
 * - Team Leader's Email (email input with validation)
 * - Team Leader's WhatsApp (phone number input)
 * - Project Video Link (URL input - Google Drive/YouTube)
 * 
 * Features:
 * - Real-time form validation
 * - Loading states with visual feedback
 * - Success/error notifications
 * - WhatsApp and email validation
 * - Video link validation for Google Drive/YouTube
 * - Escape key and backdrop click to close
 * - Smooth modal animations
 * 
 * @param isOpen - Controls modal visibility
 * @param onClose - Function to close the modal
 * @returns {JSX.Element} Complete submission form modal
 * 
 * @author IEEE RAS MUJ Development Team
 * @version 2.0.0
 * @since 2024
 */

interface SubmissionFormProps {
  isOpen: boolean;
  onClose: () => void;
}

interface FormData {
  emailAddress: string;
  teamName: string;
  projectTitle: string;
  teamLeaderEmail: string;
  teamLeaderWhatsApp: string;
  projectVideoLink: string;
}

interface FormErrors {
  [key: string]: string;
}

export default function SubmissionForm({ isOpen, onClose }: SubmissionFormProps) {
  const [formData, setFormData] = useState<FormData>({
    emailAddress: '',
    teamName: '',
    projectTitle: '',
    teamLeaderEmail: '',
    teamLeaderWhatsApp: '',
    projectVideoLink: ''
  });

  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [submitMessage, setSubmitMessage] = useState('');

  /**
   * Validates email format using regex
   * @param email - Email string to validate
   * @returns boolean indicating if email is valid
   */
  const validateEmail = (email: string): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  /**
   * Validates WhatsApp number format
   * @param whatsapp - WhatsApp number to validate
   * @returns boolean indicating if WhatsApp number is valid
   */
  const validateWhatsApp = (whatsapp: string): boolean => {
    // Remove all non-digit characters
    const cleanNumber = whatsapp.replace(/\D/g, '');
    // Check if it's between 10-15 digits (international format)
    return cleanNumber.length >= 10 && cleanNumber.length <= 15;
  };

  /**
   * Validates if the video link is from Google Drive or YouTube
   * @param url - Video URL to validate
   * @returns boolean indicating if URL is valid
   */
  const validateVideoLink = (url: string): boolean => {
    if (!url) return false;
    const cleanUrl = url.toLowerCase().trim();
    return cleanUrl.includes('drive.google.com') || 
           cleanUrl.includes('youtube.com') || 
           cleanUrl.includes('youtu.be');
  };

  /**
   * Validates the entire form and returns validation errors
   * @returns Object containing field errors
   */
  const validateForm = (): FormErrors => {
    const newErrors: FormErrors = {};

    // Required field validations
    if (!formData.emailAddress.trim()) {
      newErrors.emailAddress = 'Email address is required';
    } else if (!validateEmail(formData.emailAddress)) {
      newErrors.emailAddress = 'Please enter a valid email address';
    }

    if (!formData.teamName.trim()) {
      newErrors.teamName = 'Team name is required';
    }

    if (!formData.projectTitle.trim()) {
      newErrors.projectTitle = 'Project title is required';
    }

    if (!formData.teamLeaderEmail.trim()) {
      newErrors.teamLeaderEmail = 'Team leader email is required';
    } else if (!validateEmail(formData.teamLeaderEmail)) {
      newErrors.teamLeaderEmail = 'Please enter a valid email address';
    }

    if (!formData.teamLeaderWhatsApp.trim()) {
      newErrors.teamLeaderWhatsApp = 'Team leader WhatsApp is required';
    } else if (!validateWhatsApp(formData.teamLeaderWhatsApp)) {
      newErrors.teamLeaderWhatsApp = 'Please enter a valid WhatsApp number (10-15 digits)';
    }

    if (!formData.projectVideoLink.trim()) {
      newErrors.projectVideoLink = 'Project video link is required';
    } else if (!validateVideoLink(formData.projectVideoLink)) {
      newErrors.projectVideoLink = 'Please provide a valid Google Drive or YouTube link';
    }

    return newErrors;
  };

  /**
   * Handles form input changes and clears related errors
   * @param field - The form field being updated
   * @param value - The new value for the field
   */
  const handleInputChange = (field: keyof FormData, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    
    // Clear error for this field if it exists
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }
    
    // Clear submit status when user starts typing again
    if (submitStatus !== 'idle') {
      setSubmitStatus('idle');
      setSubmitMessage('');
    }
  };

  /**
   * Submits form data to Google Sheets via Google Apps Script Web App
   */
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate form
    const formErrors = validateForm();
    if (Object.keys(formErrors).length > 0) {
      setErrors(formErrors);
      return;
    }

    setIsSubmitting(true);
    setSubmitStatus('idle');

    try {
      // Google Apps Script Web App URL
      const webAppUrl = 'https://script.google.com/macros/s/AKfycbwjGBTxN_6sfJONvbL4-F7OoVZhsmFKApEPSlnXAd4QSvwHXVtxk6tWKOvqiu0fAmYL/exec';
      
      await fetch(webAppUrl, {
        method: 'POST',
        mode: 'no-cors', // Required for Google Apps Script
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData)
      });

      // Due to no-cors mode, we can't access the response
      // We'll assume success if no error is thrown
      setSubmitStatus('success');
      setSubmitMessage('Your project submission has been recorded successfully! Thank you for participating in Pixel Palettes.');
      
      // Reset form after successful submission
      setTimeout(() => {
        setFormData({
          emailAddress: '',
          teamName: '',
          projectTitle: '',
          teamLeaderEmail: '',
          teamLeaderWhatsApp: '',
          projectVideoLink: ''
        });
        onClose();
      }, 3000);

    } catch (error) {
      console.error('Submission error:', error);
      setSubmitStatus('error');
      setSubmitMessage('Failed to submit your project. Please try again or contact support if the issue persists.');
    } finally {
      setIsSubmitting(false);
    }
  };

  /**
   * Handles modal close with form reset
   */
  const handleClose = () => {
    if (!isSubmitting) {
      setErrors({});
      setSubmitStatus('idle');
      setSubmitMessage('');
      onClose();
    }
  };

  /**
   * Handles escape key to close modal
   */
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Escape' && !isSubmitting) {
      handleClose();
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm"
          onClick={handleClose}
          onKeyDown={handleKeyDown}
          tabIndex={-1}
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            className="relative w-full max-w-2xl max-h-[90vh] overflow-hidden rounded-2xl bg-gradient-to-br from-gray-900/95 to-black/95 backdrop-blur-md border border-purple-500/20 shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div className="relative p-6 border-b border-purple-500/20">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-2xl font-bold bg-gradient-to-r from-purple-400 to-pink-600 bg-clip-text text-transparent">
                    Submit Your Project
                  </h2>
                  <p className="mt-1 text-gray-400">
                    Share your amazing creation with the world
                  </p>
                </div>
                <button
                  onClick={handleClose}
                  disabled={isSubmitting}
                  className="p-2 text-gray-400 hover:text-white hover:bg-purple-500/20 rounded-lg transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <X size={24} />
                </button>
              </div>
            </div>

            {/* Form Content */}
            <div className="p-6 max-h-[calc(90vh-140px)] overflow-y-auto custom-scrollbar">
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Email Address */}
                <div className="space-y-2">
                  <label className="flex items-center text-sm font-medium text-gray-300">
                    <Mail size={16} className="mr-2" />
                    Email Address *
                  </label>
                  <input
                    type="email"
                    value={formData.emailAddress}
                    onChange={(e) => handleInputChange('emailAddress', e.target.value)}
                    className={`w-full px-4 py-3 bg-gray-800/50 border rounded-lg transition-all duration-200 focus:outline-none focus:ring-2 ${
                      errors.emailAddress 
                        ? 'border-red-500 focus:ring-red-500/50' 
                        : 'border-gray-600 focus:border-purple-500 focus:ring-purple-500/50'
                    }`}
                    placeholder="your.email@example.com"
                    disabled={isSubmitting}
                  />
                  {errors.emailAddress && (
                    <p className="text-sm text-red-400">{errors.emailAddress}</p>
                  )}
                </div>

                {/* Team Name */}
                <div className="space-y-2">
                  <label className="flex items-center text-sm font-medium text-gray-300">
                    <Users size={16} className="mr-2" />
                    Team Name *
                  </label>
                  <input
                    type="text"
                    value={formData.teamName}
                    onChange={(e) => handleInputChange('teamName', e.target.value)}
                    className={`w-full px-4 py-3 bg-gray-800/50 border rounded-lg transition-all duration-200 focus:outline-none focus:ring-2 ${
                      errors.teamName 
                        ? 'border-red-500 focus:ring-red-500/50' 
                        : 'border-gray-600 focus:border-purple-500 focus:ring-purple-500/50'
                    }`}
                    placeholder="Your awesome team name"
                    disabled={isSubmitting}
                  />
                  {errors.teamName && (
                    <p className="text-sm text-red-400">{errors.teamName}</p>
                  )}
                </div>

                {/* Project Title */}
                <div className="space-y-2">
                  <label className="flex items-center text-sm font-medium text-gray-300">
                    <FileText size={16} className="mr-2" />
                    Project Title *
                  </label>
                  <input
                    type="text"
                    value={formData.projectTitle}
                    onChange={(e) => handleInputChange('projectTitle', e.target.value)}
                    className={`w-full px-4 py-3 bg-gray-800/50 border rounded-lg transition-all duration-200 focus:outline-none focus:ring-2 ${
                      errors.projectTitle 
                        ? 'border-red-500 focus:ring-red-500/50' 
                        : 'border-gray-600 focus:border-purple-500 focus:ring-purple-500/50'
                    }`}
                    placeholder="Your project title"
                    disabled={isSubmitting}
                  />
                  {errors.projectTitle && (
                    <p className="text-sm text-red-400">{errors.projectTitle}</p>
                  )}
                </div>

                                 {/* Team Leader's Email */}
                 <div className="space-y-2">
                   <label className="flex items-center text-sm font-medium text-gray-300">
                     <User size={16} className="mr-2" />
                     Team Leader&apos;s Email *
                   </label>
                  <input
                    type="email"
                    value={formData.teamLeaderEmail}
                    onChange={(e) => handleInputChange('teamLeaderEmail', e.target.value)}
                    className={`w-full px-4 py-3 bg-gray-800/50 border rounded-lg transition-all duration-200 focus:outline-none focus:ring-2 ${
                      errors.teamLeaderEmail 
                        ? 'border-red-500 focus:ring-red-500/50' 
                        : 'border-gray-600 focus:border-purple-500 focus:ring-purple-500/50'
                    }`}
                    placeholder="leader@example.com"
                    disabled={isSubmitting}
                  />
                  {errors.teamLeaderEmail && (
                    <p className="text-sm text-red-400">{errors.teamLeaderEmail}</p>
                  )}
                </div>

                                 {/* Team Leader's WhatsApp */}
                 <div className="space-y-2">
                   <label className="flex items-center text-sm font-medium text-gray-300">
                     <Phone size={16} className="mr-2" />
                     Team Leader&apos;s WhatsApp *
                   </label>
                  <input
                    type="tel"
                    value={formData.teamLeaderWhatsApp}
                    onChange={(e) => handleInputChange('teamLeaderWhatsApp', e.target.value)}
                    className={`w-full px-4 py-3 bg-gray-800/50 border rounded-lg transition-all duration-200 focus:outline-none focus:ring-2 ${
                      errors.teamLeaderWhatsApp 
                        ? 'border-red-500 focus:ring-red-500/50' 
                        : 'border-gray-600 focus:border-purple-500 focus:ring-purple-500/50'
                    }`}
                    placeholder="+91 9876543210"
                    disabled={isSubmitting}
                  />
                  {errors.teamLeaderWhatsApp && (
                    <p className="text-sm text-red-400">{errors.teamLeaderWhatsApp}</p>
                  )}
                  <p className="text-xs text-gray-500">
                    Include country code for international numbers
                  </p>
                </div>

                {/* Project Video Link */}
                <div className="space-y-2">
                  <label className="flex items-center text-sm font-medium text-gray-300">
                    <Video size={16} className="mr-2" />
                    Project Video Link (Google Drive/YouTube) *
                  </label>
                  <input
                    type="url"
                    value={formData.projectVideoLink}
                    onChange={(e) => handleInputChange('projectVideoLink', e.target.value)}
                    className={`w-full px-4 py-3 bg-gray-800/50 border rounded-lg transition-all duration-200 focus:outline-none focus:ring-2 ${
                      errors.projectVideoLink 
                        ? 'border-red-500 focus:ring-red-500/50' 
                        : 'border-gray-600 focus:border-purple-500 focus:ring-purple-500/50'
                    }`}
                    placeholder="https://drive.google.com/... or https://youtube.com/..."
                    disabled={isSubmitting}
                  />
                  {errors.projectVideoLink && (
                    <p className="text-sm text-red-400">{errors.projectVideoLink}</p>
                  )}
                  <p className="text-xs text-gray-500">
                    Make sure your video is publicly accessible or viewable with the link
                  </p>
                </div>

                {/* Submit Status */}
                {submitStatus !== 'idle' && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className={`p-4 rounded-lg border ${
                      submitStatus === 'success' 
                        ? 'bg-green-500/10 border-green-500/30 text-green-400' 
                        : 'bg-red-500/10 border-red-500/30 text-red-400'
                    }`}
                  >
                    <p className="text-sm">{submitMessage}</p>
                  </motion.div>
                )}

                {/* Submit Button */}
                <motion.button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full flex items-center justify-center px-6 py-3 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white font-semibold rounded-lg transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed transform hover:scale-[1.02] active:scale-[0.98]"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  {isSubmitting ? (
                    <>
                      <motion.div
                        animate={{ rotate: 360 }}
                        transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                        className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full mr-2"
                      />
                      Submitting...
                    </>
                  ) : (
                    <>
                      <Send size={20} className="mr-2" />
                      Submit Project
                    </>
                  )}
                </motion.button>
              </form>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}