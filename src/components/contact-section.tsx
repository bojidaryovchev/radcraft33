"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Mail, MessageSquare, Calendar, ArrowRight } from "lucide-react";
import { ContactFormData, contactFormSchema } from "@/schemas/contact-form.schema";
import { cn } from "@/lib/utils";
import toast from "react-hot-toast";
import { z } from "zod";
import { Textarea } from "@/components/ui/textarea";

const ContactSection: React.FC = () => {
  const [formData, setFormData] = useState<ContactFormData>({
    name: "",
    email: "",
    projectType: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [errors, setErrors] = useState<Partial<Record<keyof ContactFormData, string>>>({});

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>): void => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));

    // Clear error for this field when user starts typing
    if (errors[name as keyof ContactFormData]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }));
    }
  };

  const validateField = (fieldName: keyof ContactFormData, value: string): string | undefined => {
    try {
      const fieldSchema = contactFormSchema.shape[fieldName];
      fieldSchema.parse(value);
      return undefined;
    } catch (error) {
      if (error instanceof z.ZodError) {
        return error.errors[0]?.message;
      }
      return undefined;
    }
  };

  const handleBlur = (e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>): void => {
    const { name, value } = e.target;
    const error = validateField(name as keyof ContactFormData, value);

    if (error) {
      setErrors((prev) => ({ ...prev, [name]: error }));
    }
  };

  const validateForm = (): boolean => {
    try {
      contactFormSchema.parse(formData);
      setErrors({});
      return true;
    } catch (error) {
      if (error instanceof z.ZodError) {
        const newErrors: Partial<Record<keyof ContactFormData, string>> = {};
        error.errors.forEach((err) => {
          if (err.path[0]) {
            newErrors[err.path[0] as keyof ContactFormData] = err.message;
          }
        });
        setErrors(newErrors);

        // Show toast with first error
        const firstError = error.errors[0];
        if (firstError) {
          toast.error(firstError.message);
        }
      }
      return false;
    }
  };

  const handleSubmit = async (e: React.FormEvent): Promise<void> => {
    e.preventDefault();

    // Validate form before submission
    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);

    // Show loading toast
    const loadingToast = toast.loading("Your message is being sent...");

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        // Dismiss loading toast and show success
        toast.dismiss(loadingToast);
        toast.success("Thank you! Your message was sent successfully! We will reach out to you as soon as possible!", {
          duration: 6000,
        });

        // Reset form
        setFormData({ name: "", email: "", projectType: "", message: "" });
        setErrors({});
      } else {
        throw new Error("Failed to submit form");
      }
    } catch {
      // Dismiss loading toast and show error
      toast.dismiss(loadingToast);
      toast.error("Something went wrong, please try again later", {
        duration: 6000,
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section className="py-20 px-6 max-w-7xl mx-auto">
      <div className="text-center mb-16">
        <h2 className="text-5xl font-bold mb-6 bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
          Let&apos;s Create Together
        </h2>
        <p className="text-xl text-gray-400 max-w-2xl mx-auto">
          Ready to transform your content? Let&apos;s discuss your project and make it viral-worthy.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        {/* Contact Info */}
        <div className="space-y-8">
          <div className="bg-gradient-to-br from-gray-900 to-gray-800 rounded-2xl p-8 border border-gray-700">
            <h3 className="text-2xl font-bold text-white mb-6">Get In Touch</h3>

            <div className="space-y-6">
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 bg-gradient-to-br from-green-600 to-emerald-600 rounded-xl flex items-center justify-center">
                  <Mail className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h4 className="text-white font-semibold">Email</h4>
                  <p className="text-gray-400">hello@videoeditor.com</p>
                </div>
              </div>

              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 bg-gradient-to-br from-green-600 to-emerald-600 rounded-xl flex items-center justify-center">
                  <MessageSquare className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h4 className="text-white font-semibold">Discord</h4>
                  <p className="text-gray-400">VideoEditor#1234</p>
                </div>
              </div>

              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 bg-gradient-to-br from-green-600 to-emerald-600 rounded-xl flex items-center justify-center">
                  <Calendar className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h4 className="text-white font-semibold">Availability</h4>
                  <p className="text-gray-400">24-48 hour turnaround</p>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-gradient-to-br from-green-600/10 to-emerald-600/10 rounded-2xl p-8 border border-green-500/20">
            <h3 className="text-xl font-bold text-white mb-4">Quick Response Guarantee</h3>
            <p className="text-gray-300 text-sm leading-relaxed">
              I respond to all inquiries within 2 hours during business hours. For urgent projects, I offer same-day
              delivery options.
            </p>
          </div>
        </div>

        {/* Contact Form */}
        <div className="bg-gradient-to-br from-gray-900 to-gray-800 rounded-2xl p-8 border border-gray-700">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="name">Name *</Label>

                <Input
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  onBlur={handleBlur}
                  placeholder="John Doe"
                  required
                  disabled={isSubmitting}
                  className={cn(
                    "bg-gray-800 text-white placeholder:text-gray-400",
                    errors.name ? "border-red-500 focus:border-red-500" : "border-gray-600 focus:border-green-500",
                  )}
                />

                {errors.name && <p className="mt-1 text-sm text-red-600">{errors.name}</p>}
              </div>

              <div className="space-y-2">
                <Label htmlFor="email" className="text-white">
                  Email *
                </Label>

                <Input
                  id="email"
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  onBlur={handleBlur}
                  placeholder="johndoe@gmail.com"
                  required
                  disabled={isSubmitting}
                  className={cn(
                    "bg-gray-800 text-white placeholder:text-gray-400",
                    errors.email ? "border-red-500 focus:border-red-500" : "border-gray-600 focus:border-green-500",
                  )}
                />

                {errors.email && <p className="mt-1 text-sm text-red-600">{errors.email}</p>}
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="project" className="text-white">
                Project Type *
              </Label>

              <Input
                id="projectType"
                name="projectType"
                value={formData.projectType}
                onChange={handleInputChange}
                onBlur={handleBlur}
                placeholder="e.g., YouTube video, TikTok compilation, Stream highlights"
                required
                disabled={isSubmitting}
                className={cn(
                  "bg-gray-800 text-white placeholder:text-gray-400",
                  errors.projectType ? "border-red-500 focus:border-red-500" : "border-gray-600 focus:border-green-500",
                )}
              />

              {errors.projectType && <p className="mt-1 text-sm text-red-600">{errors.projectType}</p>}
            </div>

            <div className="space-y-2">
              <Label htmlFor="message" className="text-white">
                Message *
              </Label>

              <Textarea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleInputChange}
                onBlur={handleBlur}
                placeholder="Tell me about your project, timeline, and any specific requirements..."
                rows={5}
                required
                disabled={isSubmitting}
                className={errors.message ? "border-red-500 focus:border-red-500" : ""}
              />

              {errors.message && <p className="mt-1 text-sm text-red-600">{errors.message}</p>}

              <p className="mt-1 text-xs text-slate-500">{formData.message.length}/1000 characters</p>
            </div>

            <Button
              type="submit"
              className="w-full bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white font-semibold py-3 rounded-xl transition-all duration-300 transform hover:scale-105"
            >
              Send Message
              <ArrowRight className="w-5 h-5 ml-2" />
            </Button>
          </form>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
