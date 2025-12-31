import React, { useState } from 'react';

interface ContactFormProps {
  type?: 'contact' | 'membership';
}

const AgreementListItem: React.FC<{children: React.ReactNode}> = ({ children }) => (
    <li className="flex items-start">
        <span className="text-naps-teal mr-3 text-lg leading-tight">✅</span>
        <span className="flex-1 text-gray-400">{children}</span>
    </li>
);

const ContactForm: React.FC<ContactFormProps> = ({ type = 'contact' }) => {
  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
    interest: type === 'membership' ? 'volunteer' : 'question',
    agreement: false,
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value, type: inputType } = e.target;
    const isCheckbox = inputType === 'checkbox';
    
    setFormData(prevState => ({
      ...prevState,
      [name]: isCheckbox ? (e.target as HTMLInputElement).checked : value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);

    // IMPORTANT: This is a public test endpoint.
    // For your live website, create a new form on formspree.io and replace this URL with your own unique endpoint.
    const FORM_ENDPOINT = "https://formspree.io/f/xgegrvjq"; 

    try {
        // Format the message to include all form data in a readable way
        const formattedMessage = type === 'membership' 
          ? `Interest Type: ${formData.interest === 'volunteer' ? 'Volunteer' : 'Join a Committee'}\n\n${formData.message}${formData.interest === 'volunteer' && formData.agreement ? '\n\n✅ Volunteer Agreement Accepted' : ''}`
          : formData.message;

        // Create form data object with all fields
        const formPayload = {
          name: formData.name,
          email: formData.email,
          message: formattedMessage,
          _subject: type === 'membership' 
            ? `NAPS ${formData.interest === 'volunteer' ? 'Volunteer' : 'Committee'} Interest - ${formData.name}`
            : `NAPS Contact Form - ${formData.name}`,
          _format: 'plain'
        };

        const response = await fetch(FORM_ENDPOINT, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            body: JSON.stringify(formPayload),
        });

        if (response.ok) {
            setSubmitted(true);
            // Reset form
            setFormData({
              name: '',
              email: '',
              message: '',
              interest: type === 'membership' ? 'volunteer' : 'question',
              agreement: false,
            });
        } else {
            const errorData = await response.json();
            const errorMessage = errorData.error || 'Something went wrong.';
            setError(`Failed to send message: ${errorMessage}`);
        }
    } catch (err) {
        setError('An unexpected error occurred. Please check your network connection and try again.');
    } finally {
        setIsSubmitting(false);
    }
  };


  if (submitted) {
    return (
      <div className="bg-gray-800/40 backdrop-blur-xl p-8 rounded-2xl shadow-[0_8px_32px_rgba(15,107,107,0.15)] border border-gray-700/50 text-center transition-all duration-500 hover:shadow-[0_12px_48px_rgba(15,107,107,0.35)] hover:border-naps-teal/50">
        <div className="mb-4">
          <svg className="w-16 h-16 text-naps-teal mx-auto drop-shadow-[0_0_20px_rgba(15,107,107,0.6)]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        </div>
        <h3 className="text-2xl font-bold text-naps-teal mb-4 drop-shadow-[0_0_15px_rgba(15,107,107,0.6)]">Thank You!</h3>
        <p className="text-gray-300">Your message has been sent successfully. We will get back to you shortly.</p>
      </div>
    );
  }

  const messagePlaceholder = type === 'membership' 
    ? "Tell us a bit about yourself and why you're interested..." 
    : "Let us know how we can help...";

  return (
    <div className="bg-gray-800/40 backdrop-blur-xl p-8 rounded-2xl shadow-[0_8px_32px_rgba(15,107,107,0.15)] border border-gray-700/50 transition-all duration-500 hover:shadow-[0_12px_48px_rgba(15,107,107,0.25)] hover:border-naps-teal/30">
      <form onSubmit={handleSubmit} className="space-y-6">
        
        {type === 'membership' && (
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Would you like to volunteer or be part of a committee?
            </label>
            <div className="flex items-center space-x-6 mt-2 text-gray-300">
              <label className="flex items-center space-x-2 cursor-pointer">
                <input
                  type="radio"
                  name="interest"
                  value="volunteer"
                  checked={formData.interest === 'volunteer'}
                  onChange={handleChange}
                  className="w-4 h-4 text-naps-teal bg-gray-900/50 border-gray-600 focus:ring-naps-teal focus:ring-offset-gray-800 focus:ring-2"
                />
                <span>Volunteer</span>
              </label>
              <label className="flex items-center space-x-2 cursor-pointer">
                <input
                  type="radio"
                  name="interest"
                  value="committee"
                  checked={formData.interest === 'committee'}
                  onChange={handleChange}
                  className="w-4 h-4 text-naps-teal bg-gray-900/50 border-gray-600 focus:ring-naps-teal focus:ring-offset-gray-800 focus:ring-2"
                />
                <span>Join a committee</span>
              </label>
            </div>
          </div>
        )}

        <div>
          <label htmlFor="name" className="block text-sm font-medium text-gray-300 mb-2">
            Full Name
          </label>
          <input
            type="text"
            name="name"
            id="name"
            value={formData.name}
            onChange={handleChange}
            required
            className="w-full px-4 py-2 bg-gray-900/50 border border-gray-600 rounded-md text-gray-200 focus:ring-naps-teal focus:border-naps-teal transition"
            placeholder="Your Name"
          />
        </div>
        <div>
          <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-2">
            Email Address
          </label>
          <input
            type="email"
            name="email"
            id="email"
            value={formData.email}
            onChange={handleChange}
            required
            className="w-full px-4 py-2 bg-gray-900/50 border border-gray-600 rounded-md text-gray-200 focus:ring-naps-teal focus:border-naps-teal transition"
            placeholder="you@example.com"
          />
        </div>

        {type === 'membership' && formData.interest === 'volunteer' && (
          <div className="space-y-4 p-4 -m-2 rounded-lg bg-gray-900/30 border border-gray-700">
            <h4 className="text-lg font-semibold text-gray-100 border-b border-gray-700 pb-2">Volunteer Agreement – NAPS</h4>
            <p className="text-gray-400 text-sm">I am volunteering with NAPS and agree to:</p>
            <ul className="space-y-2 text-sm">
                <AgreementListItem>Support events and activities responsibly</AgreementListItem>
                <AgreementListItem>Follow NAPS guidelines during volunteering</AgreementListItem>
                <AgreementListItem>Treat everyone respectfully</AgreementListItem>
                <AgreementListItem>Allow NAPS to use photos/videos of me for promotion</AgreementListItem>
            </ul>
            <div className="pt-2">
               <label className="flex items-start space-x-3 cursor-pointer">
                <input
                  type="checkbox"
                  name="agreement"
                  checked={formData.agreement}
                  onChange={handleChange}
                  required={formData.interest === 'volunteer'}
                  className="form-checkbox h-5 w-5 bg-gray-900/50 border-gray-600 text-naps-teal focus:ring-naps-teal focus:ring-offset-gray-800 rounded mt-0.5"
                />
                <span className="text-gray-300 text-sm">By submitting this form, I confirm that I understand and agree to this volunteer agreement.</span>
              </label>
            </div>
          </div>
        )}

        <div>
          <label htmlFor="message" className="block text-sm font-medium text-gray-300 mb-2">
            Your Message
          </label>
          <textarea
            name="message"
            id="message"
            rows={5}
            value={formData.message}
            onChange={handleChange}
            required
            className="w-full px-4 py-2 bg-gray-900/50 border border-gray-600 rounded-md text-gray-200 focus:ring-naps-teal focus:border-naps-teal transition"
            placeholder={messagePlaceholder}
          ></textarea>
        </div>
        
        {error && (
            <div className="bg-red-900/50 border border-red-700 text-red-200 px-4 py-3 rounded-md text-sm">
                <p>{error}</p>
            </div>
        )}

        <div>
          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full bg-naps-teal hover:bg-naps-dark-teal text-white font-bold py-3 px-6 rounded-md transition-all duration-300 transform hover:scale-105 shadow-[0_4px_20px_rgba(15,107,107,0.4)] hover:shadow-[0_8px_30px_rgba(15,107,107,0.6)] disabled:bg-gray-600 disabled:cursor-not-allowed disabled:scale-100 disabled:shadow-none flex items-center justify-center relative overflow-hidden group"
          >
            <span className="relative z-10">
            {isSubmitting ? (
                <>
                    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Sending...
                </>
            ) : (
                'Send Message'
            )}
            </span>
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700"></div>
          </button>
        </div>
      </form>
    </div>
  );
};

export default ContactForm;
