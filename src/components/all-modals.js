import React, { useState, useEffect } from 'react';
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
} from "@heroui/react";
import { Info, MessageSquare, X, Check, AlertTriangle, Sparkles, FileText, Eye, Zap, Heart } from 'lucide-react';

const AlertBanner = ({ title, color = "warning", onClose }) => {
  const [isVisible, setIsVisible] = useState(true);
  const colorClasses = {
    warning: "bg-gradient-to-r from-amber-50 to-orange-50 border-amber-200 text-amber-800",
    error: "bg-gradient-to-r from-red-50 to-pink-50 border-red-200 text-red-800",
    success: "bg-gradient-to-r from-green-50 to-emerald-50 border-green-200 text-green-800"
  };
  const iconClasses = {
    warning: "text-amber-500",
    error: "text-red-500",
    success: "text-green-500"
  };
  if (!isVisible) return null;
  return (
    <div className={`flex items-center gap-3 p-4 rounded-xl border backdrop-blur-sm mb-4 shadow-sm animate-in slide-in-from-top duration-300 ${colorClasses[color]}`}>
      <div className="p-1.5 bg-white/50 rounded-lg">
        <AlertTriangle className={`w-4 h-4 ${iconClasses[color]}`} />
      </div>
      <span className="text-sm font-medium flex-1">{title}</span>
      {onClose && (
        <button
          onClick={() => { setIsVisible(false); onClose?.(); }}
          className="p-1 hover:bg-white/50 rounded-lg transition-colors"
        >
          <X className="w-4 h-4" />
        </button>
      )}
    </div>
  );
};

const FeatureCard = ({ icon: Icon, title, description, color = "blue" }) => {
  const colorClasses = {
    blue: "bg-blue-50 border-blue-200 text-blue-800",
    green: "bg-green-50 border-green-200 text-green-800",
    purple: "bg-purple-50 border-purple-200 text-purple-800",
    red: "bg-red-50 border-red-200 text-red-800"
  };
  const iconClasses = {
    blue: "text-blue-600",
    green: "text-green-600",
    purple: "text-purple-600",
    red: "text-red-600"
  };
  return (
    <div className={`p-4 rounded-xl border backdrop-blur-sm transition-all duration-300 hover:shadow-md hover:-translate-y-0.5 ${colorClasses[color]}`}>
      <div className="flex items-center gap-3 mb-2">
        <div className={`p-2 bg-white/60 rounded-lg ${iconClasses[color]}`}>
          <Icon className="w-5 h-5" />
        </div>
        <h4 className="font-semibold text-sm">{title}</h4>
      </div>
      <p className="text-sm opacity-80 leading-relaxed">{description}</p>
    </div>
  );
};

const Step = ({ number, title, description, isActive = false }) => (
  <div className={`flex items-start gap-4 p-4 rounded-xl transition-all duration-300 ${
    isActive ? 'bg-blue-50 border border-blue-200' : 'hover:bg-gray-50'
  }`}>
    <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-semibold transition-all duration-300 ${
      isActive 
        ? 'bg-blue-600 text-white shadow-lg shadow-blue-200' 
        : 'bg-gray-200 text-gray-600'
    }`}>
      {number}
    </div>
    <div className="flex-1">
      <h4 className="font-semibold text-gray-900 mb-1">{title}</h4>
      <p className="text-sm text-gray-600 leading-relaxed">{description}</p>
    </div>
  </div>
);

export const AboutModal = ({ isOpen, onOpenChange }) => {
  const [activeStep, setActiveStep] = useState(0);
  useEffect(() => {
    if (isOpen) {
      const interval = setInterval(() => setActiveStep(prev => (prev + 1) % 3), 3000);
      return () => clearInterval(interval);
    }
  }, [isOpen]);
  const steps = [
    { title: "Paste Your Texts", description: "Add your original text on the left and the modified version on the right side" },
    { title: "Compare Analysis", description: "Click the Compare button to analyze differences between your texts" },
    { title: "Review Results", description: "See highlighted changes with red for deletions and green for additions" }
  ];
  return (
    <Modal 
      isOpen={isOpen} 
      placement="center" 
      onOpenChange={onOpenChange}
      size="2xl"
      classNames={{
        backdrop: "bg-black/60 backdrop-blur-md",
        base: "border-0 shadow-2xl max-w-2xl mx-4",
        body: "p-0",
        header: "p-0",
        footer: "p-0"
      }}
    >
      <ModalContent className="overflow-hidden">
        {(onClose) => (
          <>
            <ModalHeader className="relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-blue-600 via-blue-700 to-indigo-800"></div>
              <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg%20width=\'60\'%20height=\'60\'%20viewBox=\'0%200%2060%2060\'%20xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cg%20fill=\'none\'%20fill-rule=\'evenodd\'%3E%3Cg%20fill=\'%23ffffff\'%20fill-opacity=\'0.05\'%3E%3Cpath%20d=\'M36%2034v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6%2034v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6%204V0H4v4H0v2h4v4h2V6h4V4H6z\'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')] opacity-30"></div>
              <div className="relative p-6">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div className="p-3 bg-white/10 backdrop-blur-sm rounded-xl border border-white/20">
                      <Info className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <h2 className="text-2xl font-bold text-white">Text Compare Tool</h2>
                      <p className="text-blue-100 text-sm mt-1 flex items-center gap-1">
                        <Sparkles className="w-4 h-4" />
                        Master the art of text comparison
                      </p>
                    </div>
                  </div>
                  <button
                    onClick={onClose}
                    className="p-2 rounded-xl hover:bg-white/10 transition-all duration-200 border border-white/20 backdrop-blur-sm"
                  >
                    <X className="w-5 h-5 text-white" />
                  </button>
                </div>
              </div>
            </ModalHeader>
            <ModalBody className="p-6 space-y-6">
              <div className="bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-200 rounded-2xl p-6">
                <h3 className="font-bold text-blue-900 mb-4 flex items-center gap-2">
                  <Zap className="w-5 h-5" />
                  Quick Start Guide
                </h3>
                <div className="space-y-3">
                  {steps.map((step, idx) => (
                    <Step key={idx} number={idx + 1} {...step} isActive={activeStep === idx} />
                  ))}
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <FeatureCard icon={Eye} title="Visual Highlights" description="Red highlights show deleted text, green shows additions" color="red" />
                <FeatureCard icon={FileText} title="Smart Analysis" description="Advanced algorithm detects even subtle changes" color="green" />
                <FeatureCard icon={Zap} title="Instant Results" description="Get comparison results in milliseconds" color="purple" />
                <FeatureCard icon={Sparkles} title="Clean Interface" description="Use Clean button to reset both text fields" color="blue" />
              </div>
              <div className="bg-gradient-to-r from-amber-50 to-orange-50 border border-amber-200 rounded-2xl p-6">
                <h3 className="font-bold text-amber-900 mb-3 flex items-center gap-2">
                  <Heart className="w-5 h-5" />
                  Pro Tips
                </h3>
                <div className="space-y-2 text-sm text-amber-800">
                  {[
                    "For best results, ensure both texts are properly formatted",
                    "The tool works great with any text length - from sentences to documents",
                    "Results are processed locally - your data stays private",
                  ].map((tip, i) => (
                    <div key={i} className="flex items-start gap-2">
                      <div className="w-1.5 h-1.5 bg-amber-600 rounded-full mt-2"></div>
                      <span>{tip}</span>
                    </div>
                  ))}
                </div>
              </div>
            </ModalBody>
            <ModalFooter className="bg-gradient-to-r from-gray-50 to-gray-100 border-t border-gray-200 p-6">
              <div className="flex items-center justify-between w-full">
                <div className="text-sm text-gray-600">Ready to compare your texts?</div>
                <Button
                  color="primary"
                  variant="solid"
                  onPress={onClose}
                  className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-semibold px-8 py-2 rounded-xl shadow-lg hover:shadow-xl transition-all duration-200"
                >
                  Let&apos;s Start!
                </Button>
              </div>
            </ModalFooter>
          </>
        )}
      </ModalContent>
    </Modal>
  );
};

export const FeedbackModal = ({ isOpen, onOpenChange }) => {
  const [feedback, setFeedback] = useState('');
  const [isAlertVisible, setIsAlertVisible] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [rating, setRating] = useState(0);

  const submitFeedback = async () => {
    if (!feedback.trim()) {
      setIsAlertVisible(true);
      return;
    }
    setIsAlertVisible(false);
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);
      console.log('submit feedback:', { feedback, rating });
      setTimeout(() => {
        setIsSubmitted(false);
        setFeedback('');
        setRating(0);
      }, 3000);
    }, 1500);
  };

  const clearModal = () => {
    setIsAlertVisible(false);
    setFeedback('');
    setIsSubmitted(false);
    setIsSubmitting(false);
    setRating(0);
  };

  const StarRating = ({ rating, onRatingChange }) => (
    <div className="flex items-center gap-1">
      {[1,2,3,4,5].map(star => (
        <button
          key={star}
          type="button"
          onClick={() => onRatingChange(star)}
          className={`w-6 h-6 transition-all duration-200 ${
            star <= rating
              ? 'text-yellow-400 scale-110'
              : 'text-gray-300 hover:text-yellow-300'
          }`}
        >
          ★
        </button>
      ))}
    </div>
  );

  return (
    <Modal
      isOpen={isOpen}
      placement="center"
      onOpenChange={onOpenChange}
      classNames={{
        backdrop: "bg-black/60 backdrop-blur-md",
        base: "border-0 shadow-2xl max-w-lg mx-4",
        body: "p-0",
        header: "p-0",
        footer: "p-0"
      }}
    >
      <ModalContent className="overflow-hidden">
        {(onClose) => (
          <>
            <ModalHeader className="relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-purple-600 via-purple-700 to-pink-600"></div>
              <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg%20width=\'40\'%20height=\'40\'%20viewBox=\'0%200%2040%2040\'%20xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cg%20fill=\'none\'%20fill-rule=\'evenodd\'%3E%3Cg%20fill=\'%23ffffff\'%20fill-opacity=\'0.05\'%3E%3Cpath%20d=\'M20%2020c0%2011.046-8.954%2020-20%2020v20h40V20H20z\'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')] opacity-30"></div>
              <div className="relative p-6">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div className="p-3 bg-white/10 backdrop-blur-sm rounded-xl border border-white/20">
                      <MessageSquare className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <h2 className="text-2xl font-bold text-white">Share Feedback</h2>
                      <p className="text-purple-100 text-sm mt-1 flex items-center gap-1">
                        <Heart className="w-4 h-4" />
                        Help us make it better
                      </p>
                    </div>
                  </div>
                  <button
                    onClick={() => { clearModal(); onClose(); }}
                    className="p-2 rounded-xl hover:bg-white/10 transition-all duration-200 border border-white/20 backdrop-blur-sm"
                  >
                    <X className="w-5 h-5 text-white" />
                  </button>
                </div>
              </div>
            </ModalHeader>
            <ModalBody className="p-6">
              {isSubmitted ? (
                <div className="text-center py-12">
                  <div className="relative">
                    <div className="w-20 h-20 bg-gradient-to-br from-green-400 to-emerald-500 rounded-full flex items-center justify-center mx-auto mb-6 shadow-xl">
                      <Check className="w-10 h-10 text-white animate-in zoom-in duration-500" />
                    </div>
                    <div className="absolute inset-0 w-20 h-20 bg-green-400 rounded-full mx-auto animate-ping opacity-20"></div>
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-3">Thank You!</h3>
                  <p className="text-gray-600 mb-2">Your feedback means the world to us</p>
                  <div className="flex items-center justify-center gap-1 text-yellow-400">
                    {[...Array(rating)].map((_, i) => <span key={i} className="text-xl">★</span>)}
                  </div>
                </div>
              ) : (
                <div className="space-y-6">
                  {isAlertVisible && (
                    <AlertBanner
                      title="Please share your thoughts before submitting"
                      color="warning"
                      onClose={() => setIsAlertVisible(false)}
                    />
                  )}
                  <div className="bg-gradient-to-r from-purple-50 to-pink-50 border border-purple-200 rounded-2xl p-6">
                    <h3 className="font-semibold text-purple-900 mb-3">How was your experience?</h3>
                    <div className="flex items-center gap-4">
                      <StarRating rating={rating} onRatingChange={setRating} />
                      <span className="text-sm text-purple-700">
                        {rating === 0 ? 'Rate your experience' :
                         rating <= 2 ? 'We can do better' :
                         rating <= 4 ? 'Great to hear!' : 'Amazing! 🎉'}
                      </span>
                    </div>
                  </div>
                  <div>
                    <label htmlFor="feedback" className="block text-sm font-semibold text-gray-700 mb-3">
                      Tell us more about your experience
                    </label>
                    <div className="relative">
                      <textarea
                        id="feedback"
                        rows={4}
                        maxLength={500}
                        className="w-full p-4 border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent resize-none text-sm placeholder-gray-400 transition-all duration-200"
                        placeholder="Share your thoughts, suggestions, or report any issues"
                        value={feedback}
                        onChange={(e) => { setFeedback(e.target.value); if (isAlertVisible) setIsAlertVisible(false); }}
                      />
                      <div className="absolute bottom-3 right-3 text-xs text-gray-400">
                        {feedback.length}/500
                      </div>
                    </div>
                  </div>
                  <button
                    type="button"
                    onClick={submitFeedback}
                    disabled={isSubmitting}
                    className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 disabled:from-purple-400 disabled:to-pink-400 text-white font-semibold py-4 px-6 rounded-xl transition-all duration-200 flex items-center justify-center gap-3 shadow-lg hover:shadow-xl disabled:cursor-not-allowed"
                  >
                    {isSubmitting ? (
                      <>
                        <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                        <span>Sending your feedback...</span>
                      </>
                    ) : (
                      <>
                        <Check className="w-5 h-5" />
                        <span>Submit Feedback</span>
                      </>
                    )}
                  </button>
                </div>
              )}
            </ModalBody>
            <ModalFooter className="bg-gradient-to-r from-gray-50 to-gray-100 border-t border-gray-200 p-6">
              <div className="flex items-center justify-between w-full">
                <div className="text-sm text-gray-600">
                  {isSubmitted ? 'We appreciate your time' : 'Your privacy is protected'}
                </div>
                <Button
                  color="default"
                  variant="light"
                  onClick={() => { clearModal(); onClose(); }}
                  className="text-gray-600 hover:text-gray-800 font-medium px-6 py-2 rounded-xl hover:bg-gray-200 transition-all duration-200"
                >
                  {isSubmitted ? 'Close' : 'Maybe Later'}
                </Button>
              </div>
            </ModalFooter>
          </>
        )}
      </ModalContent>
    </Modal>
  );
};
