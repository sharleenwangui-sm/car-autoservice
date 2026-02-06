// import React from "react";
// import Services, { getAllCategories } from "./Service.jsx";

// const Service = () => {
//   const categories = getAllCategories();

//   return (
//     <div className="container mx-auto px-4 py-8">
//       <h1 className="text-4xl font-bold text-center mb-2">Our Car Services</h1>
//       <p className="text-gray-600 text-center mb-10 max-w-2xl mx-auto">
//         Professional automotive services with transparent pricing and quality
//         guarantees. Book your service today and experience excellence in car
//         care.
//       </p>

//       {/* Service Categories Navigation */}
//       <div className="flex flex-wrap gap-2 justify-center mb-10">
//         <button className="px-4 py-2 bg-blue-600 text-white rounded-full hover:bg-blue-700 transition">
//           All Services
//         </button>
//         {categories.map((category) => (
//           <button
//             key={category}
//             className="px-4 py-2 bg-gray-200 rounded-full hover:bg-gray-300 transition"
//           >
//             {category}
//           </button>
//         ))}
//       </div>

//       {/* Services Grid */}
//       <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
//         {Service.map((service) => (
//           <div
//             key={service.id}
//             className="bg-white rounded-xl shadow-lg overflow-hidden border border-gray-200 hover:shadow-xl transition-shadow"
//           >
//             <div className="p-6">
//               {/* Service Header */}
//               <div className="flex justify-between items-start mb-4">
//                 <h3 className="text-xl font-bold text-gray-800">
//                   {service.name}
//                 </h3>
//                 {service.popular && (
//                   <span className="bg-green-100 text-green-800 text-xs font-semibold px-3 py-1 rounded-full">
//                     Popular
//                   </span>
//                 )}
//               </div>

//               {/* Description */}
//               <p className="text-gray-600 mb-4">{service.description}</p>

//               {/* Price and Time */}
//               <div className="flex justify-between items-center mb-4">
//                 <div>
//                   <span className="text-2xl font-bold text-blue-600">
//                     ${service.price}
//                   </span>
//                   <span className="text-gray-500 text-sm ml-1">+ tax</span>
//                 </div>
//                 <div className="flex items-center text-gray-500">
//                   <svg
//                     className="w-5 h-5 mr-1"
//                     fill="none"
//                     stroke="currentColor"
//                     viewBox="0 0 24 24"
//                   >
//                     <path
//                       strokeLinecap="round"
//                       strokeLinejoin="round"
//                       strokeWidth={2}
//                       d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
//                     />
//                   </svg>
//                   {service.timeTaken}
//                 </div>
//               </div>

//               {/* Category */}
//               <div className="mb-4">
//                 <span className="inline-block bg-gray-100 text-gray-700 text-sm font-medium px-3 py-1 rounded">
//                   {service.category}
//                 </span>
//               </div>

//               {/* Included Services */}
//               <div className="mb-6">
//                 <h4 className="font-semibold text-gray-700 mb-2">Includes:</h4>
//                 <ul className="space-y-1">
//                   {service.includes.map((item, index) => (
//                     <li key={index} className="flex items-center text-gray-600">
//                       <svg
//                         className="w-4 h-4 text-green-500 mr-2"
//                         fill="none"
//                         stroke="currentColor"
//                         viewBox="0 0 24 24"
//                       >
//                         <path
//                           strokeLinecap="round"
//                           strokeLinejoin="round"
//                           strokeWidth={2}
//                           d="M5 13l4 4L19 7"
//                         />
//                       </svg>
//                       {item}
//                     </li>
//                   ))}
//                 </ul>
//               </div>

//               {/* Action Buttons */}
//               <div className="flex gap-3">
//                 <button className="flex-1 bg-blue-600 text-white font-semibold py-3 rounded-lg hover:bg-blue-700 transition">
//                   Book Now
//                 </button>
//                 <button className="px-4 py-3 border border-gray-300 rounded-lg hover:bg-gray-50 transition">
//                   Learn More
//                 </button>
//               </div>
//             </div>
//           </div>
//         ))}
//       </div>

//       {/* Stats Section */}
//       <div className="mt-16 bg-gray-50 rounded-xl p-8 text-center">
//         <h2 className="text-2xl font-bold mb-6">Why Choose Our Services?</h2>
//         <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
//           <div>
//             <div className="text-3xl font-bold text-blue-600 mb-2">30+</div>
//             <div className="text-gray-700">Professional Services</div>
//           </div>
//           <div>
//             <div className="text-3xl font-bold text-blue-600 mb-2">24/7</div>
//             <div className="text-gray-700">Customer Support</div>
//           </div>
//           <div>
//             <div className="text-3xl font-bold text-blue-600 mb-2">100%</div>
//             <div className="text-gray-700">Quality Guarantee</div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Services;
