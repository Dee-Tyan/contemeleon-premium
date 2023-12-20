import React from "react";
import Image from "next/image";

const FeatureSection = ({
  title,
  description,
  imageUrl,
  altText,
  featureTitle,
  featureDescription,
  orderLast,
}) => {
  return (
    <div className=" border-2 bg-[#7E061] rounded-lg">
      <div className={`relative ${orderLast ? "sm:flex-row-reverse" : ""}`}>
        <div
          className={`flex flex-col items-center lg:gap-4 animated fadeIn sm:flex-row ${
            orderLast ? "sm:flex-row-reverse" : ""
          }`}
        >
          <div className="flex justify-between items-center mb-8 sm:w-1/2 md:w-5/12">
            <Image
              className="rounded h-full"
              src={imageUrl}
              alt={altText}
            />
          </div>
          <div className="flex flex-col justify-center mt-5 mb-8 md:mt-0 sm:w-1/2 md:w-7/12 sm:pr-16">
            <p className="mb-2 text-sm font-semibold leading-none text-left uppercase">
              {featureTitle}
            </p>
            <h3 className="mt-2 text-lg sm:text-left md:text-xl">
              {featureTitle}
            </h3>
            <p className="mt-5 text-lg text md:text-left lg:px-2">
              {featureDescription}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FeatureSection;
