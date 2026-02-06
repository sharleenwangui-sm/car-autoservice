import { useState, useEffect, useRef } from "react";
import {
  Car,
  ChevronLeft,
  ChevronRight,
  X,
  Calendar,
  CheckCircle,
  Phone,
} from "lucide-react";
import { Button, Card } from "../ui";

const steps = [
  { id: 1, name: "Vehicle", label: "Vehicle" },
  { id: 2, name: "Services", label: "Services" },
  { id: 3, name: "Schedule", label: "Schedule" },
  { id: 4, name: "Details", label: "Details" },
];

const services = [
  { id: "oil", name: "Full Synthetic Oil Change", price: 79.99 },
  { id: "brake", name: "Brake Pad Replacement", price: 189.0 },
  { id: "tire", name: "Tire Rotation & Balance", price: 45.0 },
  { id: "ac", name: "AC Performance Check", price: 29.99 },
];

const timeSlots = ["08:00 AM", "10:30 AM", "01:30 PM", "03:00 PM"];

const years = Array.from({ length: 30 }, (_, i) => 2024 - i);

export function BookingPage() {
  const [currentStep, setCurrentStep] = useState(1);
  const [currentMonth, setCurrentMonth] = useState(new Date(2024, 9)); // October 2024
  const [formData, setFormData] = useState({
    year: "",
    make: "",
    model: "",
    vin: "",
    selectedServices: [],
    selectedDate: 4,
    selectedTime: "10:30 AM",
    fullName: "",
    email: "",
    phone: "",
  });

  // Refs for each section
  const sectionRefs = {
    1: useRef(null),
    2: useRef(null),
    3: useRef(null),
    4: useRef(null),
  };

  // Check if step is complete
  const isStepComplete = (stepId) => {
    switch (stepId) {
      case 1:
        return formData.year && formData.make && formData.model;
      case 2:
        return formData.selectedServices.length > 0;
      case 3:
        return formData.selectedDate && formData.selectedTime;
      case 4:
        return formData.fullName && formData.email && formData.phone;
      default:
        return false;
    }
  };

  // Auto-advance to next step when current step is completed
  useEffect(() => {
    if (isStepComplete(1) && currentStep === 1) {
      setCurrentStep(2);
    }
  }, [formData.year, formData.make, formData.model]);

  useEffect(() => {
    if (isStepComplete(2) && currentStep === 2) {
      setCurrentStep(3);
    }
  }, [formData.selectedServices]);

  useEffect(() => {
    if (isStepComplete(3) && currentStep === 3) {
      setCurrentStep(4);
    }
  }, [formData.selectedDate, formData.selectedTime]);

  useEffect(() => {
    if (isStepComplete(4) && currentStep === 4) {
      // All steps complete - could show confirmation state
    }
  }, [formData.fullName, formData.email, formData.phone]);

  // Scroll to section when step is clicked
  const scrollToSection = (stepId) => {
    setCurrentStep(stepId);
    sectionRefs[stepId]?.current?.scrollIntoView({
      behavior: "smooth",
      block: "start",
      inline: "nearest",
    });
  };

  const getDaysInMonth = (date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    const firstDay = new Date(year, month, 1).getDay();
    const daysInMonth = new Date(year, month + 1, 0).getDate();

    // Adjust firstDay to start from Monday (0 = Monday, 6 = Sunday)
    const adjustedFirstDay = firstDay === 0 ? 6 : firstDay - 1;

    const days = [];

    // Previous month days
    const prevMonthDays = new Date(year, month, 0).getDate();
    for (let i = adjustedFirstDay - 1; i >= 0; i--) {
      days.push({ day: prevMonthDays - i, currentMonth: false });
    }

    // Current month days
    for (let i = 1; i <= daysInMonth; i++) {
      days.push({ day: i, currentMonth: true });
    }

    return days;
  };

  const toggleService = (serviceId) => {
    setFormData((prev) => ({
      ...prev,
      selectedServices: prev.selectedServices.includes(serviceId)
        ? prev.selectedServices.filter((id) => id !== serviceId)
        : [...prev.selectedServices, serviceId],
    }));
  };

  const getSelectedServicesTotal = () => {
    return formData.selectedServices.reduce((total, serviceId) => {
      const service = services.find((s) => s.id === serviceId);
      return total + (service?.price || 0);
    }, 0);
  };

  const formatMonthYear = (date) => {
    return date.toLocaleDateString("en-US", { month: "long", year: "numeric" });
  };

  const nextMonth = () => {
    setCurrentMonth(
      new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1),
    );
  };

  const prevMonth = () => {
    setCurrentMonth(
      new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1),
    );
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header with Progress */}
      <header className="bg-white border-b sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            <a href="/" className="flex items-center">
              <img
                src="/akwaaba-logo-cropped.png"
                alt="Akwaaba Auto"
                className="h-14 w-auto sm:h-16 transition-transform hover:scale-105"
              />
            </a>

            {/* Progress Steps */}
            <div className="hidden md:flex items-center gap-2">
              {steps.map((step, index) => (
                <div key={step.id} className="flex items-center">
                  <button
                    onClick={() => scrollToSection(step.id)}
                    className="flex items-center gap-2 hover:opacity-80 transition-opacity"
                  >
                    <div
                      className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold ${
                        isStepComplete(step.id)
                          ? "bg-primary text-secondary"
                          : currentStep >= step.id
                            ? "bg-primary text-secondary"
                            : "bg-gray-200 text-gray-500"
                      }`}
                    >
                      {isStepComplete(step.id) ? (
                        <CheckCircle className="w-4 h-4" />
                      ) : (
                        step.id
                      )}
                    </div>
                    <span
                      className={`text-sm ${
                        currentStep >= step.id
                          ? "text-gray-900"
                          : "text-gray-400"
                      }`}
                    >
                      {step.label}
                    </span>
                  </button>
                  {index < steps.length - 1 && (
                    <div
                      className={`w-12 h-0.5 mx-2 ${
                        isStepComplete(step.id) ? "bg-primary" : "bg-gray-200"
                      }`}
                    />
                  )}
                </div>
              ))}
            </div>

            <a
              href="/"
              className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <X className="w-5 h-5 text-gray-500" />
            </a>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Form Area */}
          <div className="lg:col-span-2 space-y-8">
            {/* Step 1: Vehicle Information */}
            <Card className="p-6 scroll-mt-24" ref={sectionRefs[1]}>
              <div className="flex items-center gap-3 mb-6">
                <div
                  className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold ${
                    isStepComplete(1)
                      ? "bg-primary text-secondary"
                      : currentStep >= 1
                        ? "bg-primary text-secondary"
                        : "bg-gray-200 text-gray-500"
                  }`}
                >
                  {isStepComplete(1) ? (
                    <CheckCircle className="w-5 h-5" />
                  ) : (
                    "1"
                  )}
                </div>
                <h2 className="text-xl font-bold text-gray-900">
                  Vehicle Information
                </h2>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-semibold text-gray-900 uppercase tracking-wider mb-2">
                    Year
                  </label>
                  <select
                    value={formData.year}
                    onChange={(e) =>
                      setFormData({ ...formData, year: e.target.value })
                    }
                    className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:border-primary transition-colors bg-white"
                  >
                    <option value="">Select Year</option>
                    {years.map((year) => (
                      <option key={year} value={year}>
                        {year}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-900 uppercase tracking-wider mb-2">
                    Make
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. BMW, Tesla"
                    value={formData.make}
                    onChange={(e) =>
                      setFormData({ ...formData, make: e.target.value })
                    }
                    className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:border-primary transition-colors"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-900 uppercase tracking-wider mb-2">
                    Model
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. X5, Model 3"
                    value={formData.model}
                    onChange={(e) =>
                      setFormData({ ...formData, model: e.target.value })
                    }
                    className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:border-primary transition-colors"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-900 uppercase tracking-wider mb-2">
                    VIN (Optional)
                  </label>
                  <input
                    type="text"
                    placeholder="Vehicle Identification Number"
                    value={formData.vin}
                    onChange={(e) =>
                      setFormData({ ...formData, vin: e.target.value })
                    }
                    className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:border-primary transition-colors"
                  />
                </div>
              </div>
            </Card>

            {/* Step 2: Select Services */}
            <Card className="p-6 scroll-mt-24" ref={sectionRefs[2]}>
              <div className="flex items-center gap-3 mb-6">
                <div
                  className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold ${
                    isStepComplete(2)
                      ? "bg-primary text-secondary"
                      : currentStep >= 2
                        ? "bg-primary text-secondary"
                        : "bg-gray-200 text-gray-500"
                  }`}
                >
                  {isStepComplete(2) ? (
                    <CheckCircle className="w-5 h-5" />
                  ) : (
                    "2"
                  )}
                </div>
                <h2 className="text-xl font-bold text-gray-900">
                  Select Services
                </h2>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {services.map((service) => (
                  <label
                    key={service.id}
                    className={`flex items-center justify-between p-4 border-2 rounded-lg cursor-pointer transition-all ${
                      formData.selectedServices.includes(service.id)
                        ? "border-primary bg-primary/5"
                        : "border-gray-200 hover:border-gray-300"
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <input
                        type="checkbox"
                        checked={formData.selectedServices.includes(service.id)}
                        onChange={() => toggleService(service.id)}
                        className="w-5 h-5 rounded border-gray-300 text-primary focus:ring-primary"
                      />
                      <span className="font-medium text-gray-900">
                        {service.name}
                      </span>
                    </div>
                    <span className="font-bold text-gray-900">
                      ${service.price.toFixed(2)}
                    </span>
                  </label>
                ))}
              </div>
            </Card>

            {/* Step 3: Choose Date & Time */}
            <Card className="p-6 scroll-mt-24" ref={sectionRefs[3]}>
              <div className="flex items-center gap-3 mb-6">
                <div
                  className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold ${
                    isStepComplete(3)
                      ? "bg-primary text-secondary"
                      : currentStep >= 3
                        ? "bg-primary text-secondary"
                        : "bg-gray-200 text-gray-500"
                  }`}
                >
                  {isStepComplete(3) ? (
                    <CheckCircle className="w-5 h-5" />
                  ) : (
                    "3"
                  )}
                </div>
                <h2 className="text-xl font-bold text-gray-900">
                  Choose Date & Time
                </h2>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {/* Calendar */}
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="font-semibold text-gray-900">
                      {formatMonthYear(currentMonth)}
                    </h3>
                    <div className="flex gap-1">
                      <button
                        onClick={prevMonth}
                        className="p-1 hover:bg-gray-100 rounded transition-colors"
                      >
                        <ChevronLeft className="w-5 h-5 text-gray-600" />
                      </button>
                      <button
                        onClick={nextMonth}
                        className="p-1 hover:bg-gray-100 rounded transition-colors"
                      >
                        <ChevronRight className="w-5 h-5 text-gray-600" />
                      </button>
                    </div>
                  </div>

                  <div className="grid grid-cols-7 gap-1 text-center text-sm">
                    {["M", "T", "W", "T", "F", "S", "S"].map((day, i) => (
                      <div key={i} className="py-2 font-medium text-gray-500">
                        {day}
                      </div>
                    ))}
                    {getDaysInMonth(currentMonth).map((item, i) => (
                      <button
                        key={i}
                        onClick={() =>
                          item.currentMonth &&
                          setFormData({ ...formData, selectedDate: item.day })
                        }
                        disabled={!item.currentMonth}
                        className={`py-2 rounded-lg text-sm transition-colors ${
                          !item.currentMonth
                            ? "text-gray-300"
                            : formData.selectedDate === item.day
                              ? "bg-primary text-secondary font-bold"
                              : "text-gray-700 hover:bg-gray-100"
                        }`}
                      >
                        {item.day}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Time Slots */}
                <div>
                  <h3 className="font-semibold text-gray-900 mb-4">
                    Available Slots
                  </h3>
                  <div className="space-y-3">
                    {timeSlots.map((time) => (
                      <button
                        key={time}
                        onClick={() =>
                          setFormData({ ...formData, selectedTime: time })
                        }
                        className={`w-full py-3 px-4 rounded-lg border-2 text-sm font-medium transition-all ${
                          formData.selectedTime === time
                            ? "border-primary bg-primary text-secondary"
                            : "border-gray-200 text-gray-700 hover:border-gray-300"
                        }`}
                      >
                        {time}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </Card>

            {/* Step 4: Contact Details */}
            <Card className="p-6 scroll-mt-24" ref={sectionRefs[4]}>
              <div className="flex items-center gap-3 mb-6">
                <div
                  className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold ${
                    isStepComplete(4)
                      ? "bg-primary text-secondary"
                      : currentStep >= 4
                        ? "bg-primary text-secondary"
                        : "bg-gray-200 text-gray-500"
                  }`}
                >
                  {isStepComplete(4) ? (
                    <CheckCircle className="w-5 h-5" />
                  ) : (
                    "4"
                  )}
                </div>
                <h2 className="text-xl font-bold text-gray-900">
                  Contact Details
                </h2>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-semibold text-gray-900 uppercase tracking-wider mb-2">
                    Full Name
                  </label>
                  <input
                    type="text"
                    placeholder="John Doe"
                    value={formData.fullName}
                    onChange={(e) =>
                      setFormData({ ...formData, fullName: e.target.value })
                    }
                    className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:border-primary transition-colors"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-900 uppercase tracking-wider mb-2">
                    Email Address
                  </label>
                  <input
                    type="email"
                    placeholder="john@example.com"
                    value={formData.email}
                    onChange={(e) =>
                      setFormData({ ...formData, email: e.target.value })
                    }
                    className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:border-primary transition-colors"
                  />
                </div>
                <div className="md:col-span-2">
                  <label className="block text-sm font-semibold text-gray-900 uppercase tracking-wider mb-2">
                    Phone Number
                  </label>
                  <input
                    type="tel"
                    placeholder="+254 712 345678"
                    value={formData.phone}
                    onChange={(e) =>
                      setFormData({ ...formData, phone: e.target.value })
                    }
                    className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:border-primary transition-colors"
                  />
                </div>
              </div>
            </Card>
          </div>

          {/* Booking Summary Sidebar */}
          <div className="lg:col-span-1">
            <div className="sticky top-24">
              <Card className="bg-secondary text-white p-6">
                <div className="flex items-center gap-2 mb-6">
                  <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
                    <Car className="w-4 h-4 text-secondary" />
                  </div>
                  <h3 className="font-bold text-lg">Booking Summary</h3>
                </div>

                {/* Vehicle */}
                <div className="mb-4">
                  <p className="text-xs text-gray-400 uppercase tracking-wider mb-1">
                    Vehicle
                  </p>
                  <p className="font-semibold">
                    {formData.year && formData.make && formData.model
                      ? `${formData.year} ${formData.make} ${formData.model}`
                      : "Not selected"}
                  </p>
                </div>

                {/* Services */}
                <div className="mb-4">
                  <p className="text-xs text-gray-400 uppercase tracking-wider mb-2">
                    Selected Services
                  </p>
                  {formData.selectedServices.length > 0 ? (
                    <div className="space-y-2">
                      {formData.selectedServices.map((serviceId) => {
                        const service = services.find(
                          (s) => s.id === serviceId,
                        );
                        return (
                          <div
                            key={serviceId}
                            className="flex justify-between text-sm"
                          >
                            <span className="text-gray-300">
                              {service?.name}
                            </span>
                            <span>${service?.price.toFixed(2)}</span>
                          </div>
                        );
                      })}
                    </div>
                  ) : (
                    <p className="text-gray-400 text-sm">
                      No services selected
                    </p>
                  )}
                </div>

                {/* Appointment */}
                <div className="mb-6">
                  <p className="text-xs text-gray-400 uppercase tracking-wider mb-1">
                    Appointment
                  </p>
                  <div className="flex items-center gap-2 text-primary">
                    <Calendar className="w-4 h-4" />
                    <span className="font-semibold">
                      Oct {formData.selectedDate}, 2024 at{" "}
                      {formData.selectedTime}
                    </span>
                  </div>
                </div>

                {/* Total */}
                <div className="border-t border-gray-700 pt-4 mb-6">
                  <div className="flex items-baseline justify-between">
                    <span className="text-xs text-gray-400 uppercase tracking-wider">
                      Estimated Total
                    </span>
                    <span className="text-3xl font-bold text-primary">
                      ${getSelectedServicesTotal().toFixed(2)}
                    </span>
                  </div>
                  <p className="text-xs text-gray-500 mt-1">
                    Plus applicable taxes and optional fees.
                  </p>
                </div>

                <Button
                  className="w-full py-4"
                  icon={<CheckCircle className="w-5 h-5" />}
                >
                  Confirm Appointment
                </Button>
              </Card>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-secondary mt-12 py-6">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <a href="/" className="flex items-center">
              <img
                src="/akwaaba-logo-cropped.png"
                alt="Akwaaba Auto"
                className="h-12 w-auto transition-transform hover:scale-105"
              />
            </a>
            <p className="text-gray-500 text-sm">
              © 2026 Akwaaba Auto. All rights reserved. Tell: +(254) 722334455
            </p>
            <a
              href="tel:+254722334455"
              className="flex items-center gap-2 text-gray-400 hover:text-white text-sm transition-colors"
            >
              <Phone className="w-4 h-4" />
              +(254) 722334455
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}
