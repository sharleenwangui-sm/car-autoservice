import { useState, useEffect, useRef } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import {
  Car,
  ChevronLeft,
  ChevronRight,
  X,
  Calendar,
  CheckCircle,
  ArrowLeft,
  Download,
} from "lucide-react";
import { Button, Card } from "../ui";
import { serviceData } from "../data/service";

export function BookingPage() {
  const { serviceId } = useParams();
  const navigate = useNavigate();

  // Helper function to handle both numeric and text prices
  const extractPrice = (priceString) => {
    if (typeof priceString === "number") return priceString;
    if (!priceString) return 0;

    // Check if price contains non-numeric text (like "Varies", "Custom Quote")
    const textPrices = [
      "varies",
      "custom quote",
      "request quote",
      "available now",
      "on request",
    ];
    const lowerPrice = priceString.toString().toLowerCase();

    // If it's a text price, return 0 (we'll display the original string instead)
    if (textPrices.some((text) => lowerPrice.includes(text))) {
      return 0;
    }

    // Extract numeric value for actual prices
    const numericPrice = priceString.toString().replace(/[^0-9.]/g, "");
    const price = parseFloat(numericPrice);
    return isNaN(price) ? 0 : price;
  };

  // Map serviceData - keep BOTH original price string AND numeric value
  const services = serviceData.map((service) => ({
    id: service.id.toString(),
    name: service.name,
    price: extractPrice(service.price),
    priceDisplay: service.price, // Keep original price string for display
  }));

  const steps = [
    { id: 1, name: "Services", label: "Services" },
    { id: 2, name: "Vehicle", label: "Vehicle" },
    { id: 3, name: "Schedule", label: "Schedule" },
    { id: 4, name: "Details", label: "Details" },
  ];

  const timeSlots = ["08:00 AM", "10:30 AM", "01:30 PM", "03:00 PM"];
  const years = Array.from({ length: 30 }, (_, i) => 2024 - i);

  const currencies = {
    USD: { symbol: "$", rate: 1, name: "US Dollar" },
    KES: { symbol: "KSh", rate: 150, name: "Kenyan Shilling" },
    EUR: { symbol: "€", rate: 0.92, name: "Euro" },
    GBP: { symbol: "£", rate: 0.79, name: "British Pound" },
  };

  const [currentStep, setCurrentStep] = useState(1);
  const [currentMonth, setCurrentMonth] = useState(new Date(2024, 9));
  const [selectedCurrency, setSelectedCurrency] = useState("KES");
  const [showReceipt, setShowReceipt] = useState(false);
  const [formData, setFormData] = useState({
    selectedServices: [],
    year: "",
    make: "",
    model: "",
    vin: "",
    selectedDate: 4,
    selectedTime: "10:30 AM",
    fullName: "",
    email: "",
    phone: "",
  });

  // Pre-select service from URL
  useEffect(() => {
    if (serviceId) {
      const serviceExists = services.find((s) => s.id === serviceId);
      if (serviceExists) {
        setFormData((prev) => ({
          ...prev,
          selectedServices: [serviceId],
        }));
      }
    }
  }, [serviceId]);

  const sectionRefs = {
    1: useRef(null),
    2: useRef(null),
    3: useRef(null),
    4: useRef(null),
  };

  const isStepComplete = (stepId) => {
    switch (stepId) {
      case 1:
        return formData.selectedServices.length > 0;
      case 2:
        return formData.year && formData.make && formData.model;
      case 3:
        return formData.selectedDate && formData.selectedTime;
      case 4:
        return formData.fullName && formData.email && formData.phone;
      default:
        return false;
    }
  };

  useEffect(() => {
    if (isStepComplete(1) && currentStep === 1) setCurrentStep(2);
  }, [formData.selectedServices]);

  useEffect(() => {
    if (isStepComplete(2) && currentStep === 2) setCurrentStep(3);
  }, [formData.year, formData.make, formData.model]);

  useEffect(() => {
    if (isStepComplete(3) && currentStep === 3) setCurrentStep(4);
  }, [formData.selectedDate, formData.selectedTime]);

  const scrollToSection = (stepId) => {
    setCurrentStep(stepId);
    sectionRefs[stepId]?.current?.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  };

  const getDaysInMonth = (date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    const firstDay = new Date(year, month, 1).getDay();
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    const adjustedFirstDay = firstDay === 0 ? 6 : firstDay - 1;
    const days = [];
    const prevMonthDays = new Date(year, month, 0).getDate();

    for (let i = adjustedFirstDay - 1; i >= 0; i--) {
      days.push({ day: prevMonthDays - i, currentMonth: false });
    }
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

  const convertCurrency = (amount) => {
    const rate = currencies[selectedCurrency].rate;
    const convertedAmount = amount * rate;
    return convertedAmount.toLocaleString("en-US", {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    });
  };

  const getCurrencySymbol = () => currencies[selectedCurrency].symbol;

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

  const handleConfirmBooking = () => {
    if (
      isStepComplete(1) &&
      isStepComplete(2) &&
      isStepComplete(3) &&
      isStepComplete(4)
    ) {
      setShowReceipt(true);
    }
  };

  const handlePrintReceipt = () => {
    window.print();
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b sticky top-0 z-50 shadow-sm">
        <div className="max-w-7xl mx-auto px-3 sm:px-4 lg:px-8">
          <div className="flex items-center justify-between h-16 sm:h-20">
            <div className="flex items-center gap-2 sm:gap-3">
              <Link
                to="/"
                className="flex items-center gap-1 sm:gap-2 px-2 sm:px-3 py-2 hover:bg-gray-100 rounded-lg transition-colors text-gray-600 hover:text-gray-900"
              >
                <ArrowLeft className="w-4 h-4 sm:w-5 sm:h-5" />
                <span className="hidden sm:inline text-sm font-medium">
                  Back
                </span>
              </Link>
              <Link to="/" className="flex items-center">
                <img
                  src="/new-akwaaba-logo.png"
                  alt="Akwaaba Auto"
                  className="h-10 w-auto sm:h-12 md:h-14"
                />
              </Link>
            </div>

            <div className="hidden lg:flex items-center gap-2">
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

            <div className="flex items-center gap-2">
              <select
                value={selectedCurrency}
                onChange={(e) => setSelectedCurrency(e.target.value)}
                className="px-2 sm:px-3 py-1.5 sm:py-2 border border-gray-200 rounded-lg focus:outline-none focus:border-primary transition-colors bg-white text-xs sm:text-sm"
              >
                {Object.entries(currencies).map(([code]) => (
                  <option key={code} value={code}>
                    {code}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile Progress Indicator */}
      <div className="lg:hidden bg-white border-b px-4 py-3">
        <div className="flex justify-between items-center max-w-7xl mx-auto">
          {steps.map((step) => (
            <button
              key={step.id}
              onClick={() => scrollToSection(step.id)}
              className="flex flex-col items-center gap-1"
            >
              <div
                className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold ${
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
              <span className="text-xs text-gray-600">{step.label}</span>
            </button>
          ))}
        </div>
      </div>

      <main className="max-w-7xl mx-auto px-3 sm:px-4 lg:px-8 py-6 sm:py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 sm:gap-8">
          <div className="lg:col-span-2 space-y-6 sm:space-y-8">
            {/* Step 1: Select Services */}
            <Card className="p-4 sm:p-6 scroll-mt-24" ref={sectionRefs[1]}>
              <div className="flex items-center gap-3 mb-4 sm:mb-6">
                <div
                  className={`w-7 h-7 sm:w-8 sm:h-8 rounded-full flex items-center justify-center text-sm font-bold ${
                    isStepComplete(1)
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
                <h2 className="text-lg sm:text-xl font-bold text-gray-900">
                  Select Services
                </h2>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                {services.map((service) => (
                  <label
                    key={service.id}
                    className={`flex items-center justify-between p-3 sm:p-4 border-2 rounded-lg cursor-pointer transition-all ${
                      formData.selectedServices.includes(service.id)
                        ? "border-primary bg-primary/5"
                        : "border-gray-200 hover:border-gray-300"
                    }`}
                  >
                    <div className="flex items-center gap-2 sm:gap-3 flex-1 min-w-0">
                      <input
                        type="checkbox"
                        checked={formData.selectedServices.includes(service.id)}
                        onChange={() => toggleService(service.id)}
                        className="w-4 h-4 sm:w-5 sm:h-5 rounded border-gray-300 text-primary focus:ring-primary flex-shrink-0"
                      />
                      <span className="font-medium text-gray-900 text-xs sm:text-sm truncate">
                        {service.name}
                      </span>
                    </div>
                    <span className="font-bold text-gray-900 text-xs sm:text-sm ml-2 flex-shrink-0">
                      {service.price === 0
                        ? service.priceDisplay
                        : `${getCurrencySymbol()}${convertCurrency(service.price)}`}
                    </span>
                  </label>
                ))}
              </div>
            </Card>

            {/* Step 2: Vehicle Information */}
            <Card className="p-4 sm:p-6 scroll-mt-24" ref={sectionRefs[2]}>
              <div className="flex items-center gap-3 mb-4 sm:mb-6">
                <div
                  className={`w-7 h-7 sm:w-8 sm:h-8 rounded-full flex items-center justify-center text-sm font-bold ${
                    isStepComplete(2)
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
                <h2 className="text-lg sm:text-xl font-bold text-gray-900">
                  Vehicle Information
                </h2>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                <div>
                  <label className="block text-xs sm:text-sm font-semibold text-gray-900 uppercase tracking-wider mb-2">
                    Year
                  </label>
                  <select
                    value={formData.year}
                    onChange={(e) =>
                      setFormData({ ...formData, year: e.target.value })
                    }
                    className="w-full px-3 sm:px-4 py-2 sm:py-3 border border-gray-200 rounded-lg focus:outline-none focus:border-primary transition-colors bg-white text-sm"
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
                  <label className="block text-xs sm:text-sm font-semibold text-gray-900 uppercase tracking-wider mb-2">
                    Make
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. BMW, Tesla"
                    value={formData.make}
                    onChange={(e) =>
                      setFormData({ ...formData, make: e.target.value })
                    }
                    className="w-full px-3 sm:px-4 py-2 sm:py-3 border border-gray-200 rounded-lg focus:outline-none focus:border-primary transition-colors text-sm"
                  />
                </div>
                <div>
                  <label className="block text-xs sm:text-sm font-semibold text-gray-900 uppercase tracking-wider mb-2">
                    Model
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. X5, Model 3"
                    value={formData.model}
                    onChange={(e) =>
                      setFormData({ ...formData, model: e.target.value })
                    }
                    className="w-full px-3 sm:px-4 py-2 sm:py-3 border border-gray-200 rounded-lg focus:outline-none focus:border-primary transition-colors text-sm"
                  />
                </div>
                <div>
                  <label className="block text-xs sm:text-sm font-semibold text-gray-900 uppercase tracking-wider mb-2">
                    VIN (Optional)
                  </label>
                  <input
                    type="text"
                    placeholder="Vehicle ID"
                    value={formData.vin}
                    onChange={(e) =>
                      setFormData({ ...formData, vin: e.target.value })
                    }
                    className="w-full px-3 sm:px-4 py-2 sm:py-3 border border-gray-200 rounded-lg focus:outline-none focus:border-primary transition-colors text-sm"
                  />
                </div>
              </div>
            </Card>

            {/* Step 3: Date & Time */}
            <Card className="p-4 sm:p-6 scroll-mt-24" ref={sectionRefs[3]}>
              <div className="flex items-center gap-3 mb-4 sm:mb-6">
                <div
                  className={`w-7 h-7 sm:w-8 sm:h-8 rounded-full flex items-center justify-center text-sm font-bold ${
                    isStepComplete(3)
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
                <h2 className="text-lg sm:text-xl font-bold text-gray-900">
                  Choose Date & Time
                </h2>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="font-semibold text-gray-900 text-sm sm:text-base">
                      {formatMonthYear(currentMonth)}
                    </h3>
                    <div className="flex gap-1">
                      <button
                        onClick={prevMonth}
                        className="p-1 hover:bg-gray-100 rounded transition-colors"
                      >
                        <ChevronLeft className="w-4 h-4 sm:w-5 sm:h-5 text-gray-600" />
                      </button>
                      <button
                        onClick={nextMonth}
                        className="p-1 hover:bg-gray-100 rounded transition-colors"
                      >
                        <ChevronRight className="w-4 h-4 sm:w-5 sm:h-5 text-gray-600" />
                      </button>
                    </div>
                  </div>

                  <div className="grid grid-cols-7 gap-1 text-center text-xs sm:text-sm">
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
                        className={`py-2 rounded-lg text-xs sm:text-sm transition-colors ${
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

                <div>
                  <h3 className="font-semibold text-gray-900 mb-4 text-sm sm:text-base">
                    Available Slots
                  </h3>
                  <div className="space-y-2 sm:space-y-3">
                    {timeSlots.map((time) => (
                      <button
                        key={time}
                        onClick={() =>
                          setFormData({ ...formData, selectedTime: time })
                        }
                        className={`w-full py-2 sm:py-3 px-3 sm:px-4 rounded-lg border-2 text-xs sm:text-sm font-medium transition-all ${
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
            <Card className="p-4 sm:p-6 scroll-mt-24" ref={sectionRefs[4]}>
              <div className="flex items-center gap-3 mb-4 sm:mb-6">
                <div
                  className={`w-7 h-7 sm:w-8 sm:h-8 rounded-full flex items-center justify-center text-sm font-bold ${
                    isStepComplete(4)
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
                <h2 className="text-lg sm:text-xl font-bold text-gray-900">
                  Contact Details
                </h2>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                <div>
                  <label className="block text-xs sm:text-sm font-semibold text-gray-900 uppercase tracking-wider mb-2">
                    Full Name
                  </label>
                  <input
                    type="text"
                    placeholder="John Doe"
                    value={formData.fullName}
                    onChange={(e) =>
                      setFormData({ ...formData, fullName: e.target.value })
                    }
                    className="w-full px-3 sm:px-4 py-2 sm:py-3 border border-gray-200 rounded-lg focus:outline-none focus:border-primary transition-colors text-sm"
                  />
                </div>
                <div>
                  <label className="block text-xs sm:text-sm font-semibold text-gray-900 uppercase tracking-wider mb-2">
                    Email
                  </label>
                  <input
                    type="email"
                    placeholder="john@example.com"
                    value={formData.email}
                    onChange={(e) =>
                      setFormData({ ...formData, email: e.target.value })
                    }
                    className="w-full px-3 sm:px-4 py-2 sm:py-3 border border-gray-200 rounded-lg focus:outline-none focus:border-primary transition-colors text-sm"
                  />
                </div>
                <div className="sm:col-span-2">
                  <label className="block text-xs sm:text-sm font-semibold text-gray-900 uppercase tracking-wider mb-2">
                    Phone Number
                  </label>
                  <input
                    type="tel"
                    placeholder="+254 712 345678"
                    value={formData.phone}
                    onChange={(e) =>
                      setFormData({ ...formData, phone: e.target.value })
                    }
                    className="w-full px-3 sm:px-4 py-2 sm:py-3 border border-gray-200 rounded-lg focus:outline-none focus:border-primary transition-colors text-sm"
                  />
                </div>
              </div>
            </Card>
          </div>
          {/* Booking Summary Sidebar */}
          <div className="lg:col-span-3 xl:col-span-4">
            <div className="sticky top-20 sm:top-24">
              <Card className="bg-secondary text-white p-4 sm:p-6 lg:p-8 min-h-[600px] lg:min-h-[700px]">
                <div className="flex items-center gap-2 mb-6 sm:mb-8">
                  <div className="w-8 h-8 sm:w-10 sm:h-10 bg-primary rounded-lg flex items-center justify-center">
                    <Car className="w-5 h-5 sm:w-6 sm:h-6 text-secondary" />
                  </div>
                  <h3 className="font-bold text-lg sm:text-xl lg:text-2xl text-black">
                    Booking Summary
                  </h3>
                </div>

                <div className="mb-6 sm:mb-8">
                  <p className="text-sm sm:text-base lg:text-lg text-black font-bold uppercase tracking-wider mb-3 sm:mb-4">
                    Selected Services
                  </p>
                  {formData.selectedServices.length > 0 ? (
                    <div className="space-y-3 sm:space-y-4">
                      {formData.selectedServices.map((serviceId) => {
                        const service = services.find(
                          (s) => s.id === serviceId,
                        );
                        return (
                          <div
                            key={serviceId}
                            className="flex justify-between items-center text-base sm:text-lg lg:text-xl p-2 sm:p-3 bg-white/10 rounded-lg"
                          >
                            <span className="text-black font-semibold truncate mr-4 flex-1">
                              {service?.name}
                            </span>
                            <span className="flex-shrink-0 text-black font-bold whitespace-nowrap">
                              {service?.price === 0
                                ? service?.priceDisplay
                                : `${getCurrencySymbol()}${convertCurrency(service?.price || 0)}`}
                            </span>
                          </div>
                        );
                      })}
                    </div>
                  ) : (
                    <p className="text-black font-semibold text-base sm:text-lg lg:text-xl p-4 bg-white/10 rounded-lg text-center">
                      No services selected
                    </p>
                  )}
                </div>

                <div className="mb-6 sm:mb-8">
                  <p className="text-sm sm:text-base lg:text-lg text-black font-bold uppercase tracking-wider mb-2 sm:mb-3">
                    Vehicle
                  </p>
                  <p className="font-bold text-black text-base sm:text-lg lg:text-xl p-3 sm:p-4 bg-white/10 rounded-lg">
                    {formData.year && formData.make && formData.model
                      ? `${formData.year} ${formData.make} ${formData.model}`
                      : "Not selected"}
                  </p>
                </div>

                <div className="mb-8 sm:mb-10">
                  <p className="text-sm sm:text-base lg:text-lg text-black font-bold uppercase tracking-wider mb-2 sm:mb-3">
                    Appointment
                  </p>
                  <div className="flex items-center gap-3 text-primary p-3 sm:p-4 bg-white/10 rounded-lg">
                    <Calendar className="w-5 h-5 sm:w-6 sm:h-6 lg:w-7 lg:h-7 flex-shrink-0" />
                    <span className="font-bold text-black text-base sm:text-lg lg:text-xl">
                      Oct {formData.selectedDate}, 2024 at{" "}
                      {formData.selectedTime}
                    </span>
                  </div>
                </div>

                <div className="border-t-2 border-black pt-6 sm:pt-8 mb-8 sm:mb-10">
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                    <div>
                      <span className="text-base sm:text-lg lg:text-xl text-black font-bold uppercase tracking-wider">
                        Estimated Total
                      </span>
                      <p className="text-sm sm:text-base lg:text-lg text-black font-semibold mt-2">
                        Plus applicable taxes and optional fees.
                      </p>
                    </div>
                    <div className="text-right">
                      <span className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-black block">
                        {getCurrencySymbol()}
                        {convertCurrency(getSelectedServicesTotal())}
                      </span>
                      <span className="text-sm sm:text-base lg:text-lg text-black font-semibold mt-1 sm:mt-2 block">
                        {currencies[selectedCurrency].name}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="mt-auto pt-4">
                  <Button
                    className="w-full py-4 sm:py-5 lg:py-6 text-base sm:text-lg lg:text-xl font-bold"
                    icon={
                      <CheckCircle className="w-5 h-5 sm:w-6 sm:h-6 lg:w-7 lg:h-7" />
                    }
                    onClick={handleConfirmBooking}
                  >
                    Confirm Appointment
                  </Button>
                </div>
              </Card>
            </div>
          </div>{" "}
        </div>
      </main>

      {/* Receipt Modal */}
      {showReceipt && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-3 sm:p-4">
          <div className="bg-white rounded-xl max-w-md w-full max-h-[90vh] overflow-y-auto">
            <div className="p-4 sm:p-6">
              <div className="flex items-center justify-between mb-4 sm:mb-6">
                <h2 className="text-xl sm:text-2xl font-bold text-gray-900">
                  Receipt
                </h2>
                <button
                  onClick={() => setShowReceipt(false)}
                  className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                >
                  <X className="w-5 h-5 text-gray-500" />
                </button>
              </div>

              <div className="space-y-4 sm:space-y-6">
                <div className="text-center border-b pb-4">
                  <img
                    src="/new-akwaaba-logo.png"
                    alt="Akwaaba Auto"
                    className="h-12 sm:h-16 w-auto mx-auto mb-2"
                  />
                  <p className="text-sm text-gray-600">Booking Confirmation</p>
                  <p className="text-xs text-gray-500">
                    Confirmation #
                    {Math.random().toString(36).substr(2, 9).toUpperCase()}
                  </p>
                </div>

                <div>
                  <h3 className="font-semibold text-gray-900 mb-2 text-sm sm:text-base">
                    Customer Details
                  </h3>
                  <div className="space-y-1 text-xs sm:text-sm">
                    <p className="text-gray-600">
                      Name:{" "}
                      <span className="text-gray-900 font-medium">
                        {formData.fullName}
                      </span>
                    </p>
                    <p className="text-gray-600">
                      Email:{" "}
                      <span className="text-gray-900 font-medium">
                        {formData.email}
                      </span>
                    </p>
                    <p className="text-gray-600">
                      Phone:{" "}
                      <span className="text-gray-900 font-medium">
                        {formData.phone}
                      </span>
                    </p>
                  </div>
                </div>

                <div>
                  <h3 className="font-semibold text-gray-900 mb-2 text-sm sm:text-base">
                    Vehicle
                  </h3>
                  <p className="text-xs sm:text-sm text-gray-900 font-medium">
                    {formData.year} {formData.make} {formData.model}
                  </p>
                  {formData.vin && (
                    <p className="text-xs text-gray-600">VIN: {formData.vin}</p>
                  )}
                </div>

                <div>
                  <h3 className="font-semibold text-gray-900 mb-2 text-sm sm:text-base">
                    Appointment
                  </h3>
                  <p className="text-xs sm:text-sm text-gray-900 font-medium">
                    October {formData.selectedDate}, 2024
                  </p>
                  <p className="text-xs sm:text-sm text-gray-600">
                    {formData.selectedTime}
                  </p>
                </div>

                <div>
                  <h3 className="font-semibold text-gray-900 mb-3 text-sm sm:text-base">
                    Services
                  </h3>
                  <div className="space-y-2">
                    {formData.selectedServices.map((serviceId) => {
                      const service = services.find((s) => s.id === serviceId);
                      return (
                        <div
                          key={serviceId}
                          className="flex justify-between text-xs sm:text-sm"
                        >
                          <span className="text-gray-700">{service?.name}</span>
                          <span className="text-gray-900 font-medium">
                            {service?.price === 0
                              ? service?.priceDisplay
                              : `${getCurrencySymbol()}${convertCurrency(service?.price || 0)}`}
                          </span>
                        </div>
                      );
                    })}
                  </div>
                </div>

                <div className="border-t pt-4">
                  <div className="flex justify-between items-center">
                    <span className="text-base sm:text-lg font-bold text-gray-900">
                      Total
                    </span>
                    <div className="text-right">
                      <span className="text-xl sm:text-2xl font-bold text-primary block">
                        {getCurrencySymbol()}
                        {convertCurrency(getSelectedServicesTotal())}
                      </span>
                      <span className="text-xs text-gray-500">
                        {currencies[selectedCurrency].name}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="flex gap-3 pt-4">
                  <Button
                    className="flex-1 text-sm"
                    onClick={handlePrintReceipt}
                    icon={<Download className="w-4 h-4" />}
                  >
                    Print/Save
                  </Button>
                  <Button
                    className="flex-1 bg-gray-200 text-gray-900 hover:bg-gray-300 text-sm"
                    onClick={() => setShowReceipt(false)}
                  >
                    Close
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Footer */}
      <footer className="bg-secondary mt-8 sm:mt-12 py-4 sm:py-6">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row items-center justify-center gap-4 md:gap-8">
            <Link to="/" className="flex items-center">
              <img
                src="/new-akwaaba-logo.png"
                alt="Akwaaba Auto"
                className="h-10 sm:h-12 w-auto"
              />
            </Link>
            <p className="text-gray-500 text-xs sm:text-sm text-center">
              © 2026 Akwaaba Auto. All rights reserved. Tel: +(254) 722334455
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
